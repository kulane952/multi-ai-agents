import { askOpenRouter } from "@/lib/openrouter";
import type { Comparison, ShoppingState } from "@/types/shopping";

export async function comparisonAgent(state: ShoppingState): Promise<ShoppingState> {
  const input = state.matchedProducts.map(p => ({ id: p.id, title: p.title, source: p.source, price: p.price, oldPrice: p.oldPrice, rating: p.rating, reviews: p.reviews }));
  const result = await askOpenRouter<Comparison>(`Compare these shopping options for the query "${state.searchQuery}". Use only supplied facts. Return JSON with summary and recommendations, each recommendation containing productId and reason. Do not invent specifications or prices. Options: ${JSON.stringify(input)} Price analysis: ${JSON.stringify(state.priceAnalysis)} Deals: ${JSON.stringify(state.deals)}`);
  return { ...state, comparison: result, status: "completed" };
}
