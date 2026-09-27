import { askOpenRouter } from "@/lib/openrouter";
import type { Deal, ShoppingState } from "@/types/shopping";

export async function dealCheckerAgent(state: ShoppingState): Promise<ShoppingState> {
  const input = state.matchedProducts.map(p => ({ id: p.id, title: p.title, price: p.price, oldPrice: p.oldPrice, source: p.source }));
  const result = await askOpenRouter<{ deals: Deal[] }>(`Identify possible shopping deals from these results. A deal should have evidence such as a listed old price, meaningful discount, or unusually low current price. Do not invent facts. Return JSON {"deals":[{"productId":string,"isDeal":boolean,"reason":string,"confidence":number}]}. Products: ${JSON.stringify(input)}`);
  return { ...state, deals: result.deals ?? [], status: "comparing" };
}
