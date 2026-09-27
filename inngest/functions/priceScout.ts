import { inngest } from "../client";
import { supervisorAgent } from "@/agents/supervisor";
import { productScoutAgent } from "@/agents/productScout";
import { productMatcherAgent } from "@/agents/productMatcher";
import { priceAnalyzerAgent } from "@/agents/priceAnalyzer";
import { dealCheckerAgent } from "@/agents/dealChecker";
import { comparisonAgent } from "@/agents/comparison";
import { connectMongoDB } from "@/lib/mongodb";
import { SearchRun } from "@/models/SearchRun";
import type { ShoppingState } from "@/types/shopping";

export const priceScoutFunction = inngest.createFunction(
  { id: "price-scout-workflow", triggers: { event: "price-scout/search" } },
  async ({ event, step }) => {
    let state: ShoppingState = {
      searchQuery: event.data.query,
      status: "planning",
      products: [], matchedProducts: [], priceAnalysis: [], deals: [], comparison: null, error: null
    };

    try {
      state = await step.run("supervisor-agent", () => supervisorAgent(state));
      state = await step.run("product-scout-agent", () => productScoutAgent(state));
      state = await step.run("product-matcher-agent", () => productMatcherAgent(state));
      state = await step.run("price-analyzer-agent", () => priceAnalyzerAgent(state));
      state = await step.run("deal-checker-agent", () => dealCheckerAgent(state));
      state = await step.run("comparison-agent", () => comparisonAgent(state));

      await step.run("save-search", async () => {
        await connectMongoDB();
        await SearchRun.create({ query: state.searchQuery, status: state.status, state });
      });

      return state;
    } catch (error) {
      const failed: ShoppingState = { ...state, status: "failed", error: error instanceof Error ? error.message : "Unknown error" };
      try {
        await step.run("save-failed-search", async () => {
          await connectMongoDB();
          await SearchRun.create({ query: failed.searchQuery, status: failed.status, state: failed });
        });
      } catch {}
      return failed;
    }
  }
);
