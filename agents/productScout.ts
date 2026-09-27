import { searchProducts } from "@/lib/serper";
import type { ShoppingState } from "@/types/shopping";

export async function productScoutAgent(
  state: ShoppingState
): Promise<ShoppingState> {
  const products = await searchProducts(state.searchQuery);

  return {
    ...state,
    products,
    status: "matching",
  };
}