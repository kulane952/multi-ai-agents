import type { PriceAnalysis, ShoppingState } from "@/types/shopping";

export async function priceAnalyzerAgent(state: ShoppingState): Promise<ShoppingState> {
  const priced = state.matchedProducts.filter(p => typeof p.price === "number") as Array<typeof state.matchedProducts[number] & { price: number }>;
  const prices = priced.map(p => p.price);
  const average = prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : null;

  const priceAnalysis: PriceAnalysis[] = state.matchedProducts.map(p => {
    if (p.price == null || average == null || average === 0) return { productId: p.id, price: p.price, averagePrice: average, differencePercent: null, position: "unknown" };
    const differencePercent = ((p.price - average) / average) * 100;
    return {
      productId: p.id,
      price: p.price,
      averagePrice: Number(average.toFixed(2)),
      differencePercent: Number(differencePercent.toFixed(2)),
      position: differencePercent < -5 ? "below-average" : differencePercent > 5 ? "above-average" : "average"
    };
  });

  return { ...state, priceAnalysis, status: "checking" };
}
