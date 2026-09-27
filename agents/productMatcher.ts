import { askOpenRouter } from "@/lib/openrouter";
import type { Product, ShoppingState } from "@/types/shopping";

export async function productMatcherAgent(state: ShoppingState): Promise<ShoppingState> {
  if (!state.products.length) return { ...state, matchedProducts: [], status: "analyzing" };

  const compact = state.products.map(({ id, title, source, price }) => ({ id, title, source, price }));
  const result = await askOpenRouter<{ productIds: string[] }>(`Group these shopping results by the user's requested product. Remove obvious unrelated products and accessories. Keep the most relevant products. Return JSON {"productIds":[...]} using only IDs from the input. Query: ${state.searchQuery}\nProducts: ${JSON.stringify(compact)}`);
  const ids = new Set(result.productIds);
  const matchedProducts = state.products.filter(p => ids.has(p.id));
  return { ...state, matchedProducts: matchedProducts.length ? matchedProducts : state.products, status: "analyzing" };
}
