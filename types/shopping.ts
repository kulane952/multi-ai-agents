export type Product = {
  id: string;
  title: string;
  link: string;
  source: string;
  price: number | null;
  oldPrice?: number | null;
  rating?: number | null;
  reviews?: number | null;
  thumbnail?: string;
  productId?: string;
  raw?: unknown;
};

export type ShoppingState = {
  searchQuery: string;
  status: "idle" | "planning" | "scouting" | "matching" | "analyzing" | "checking" | "comparing" | "completed" | "failed";
  products: Product[];
  matchedProducts: Product[];
  priceAnalysis: PriceAnalysis[];
  deals: Deal[];
  comparison: Comparison | null;
  error: string | null;
};

export type PriceAnalysis = {
  productId: string;
  price: number | null;
  averagePrice: number | null;
  differencePercent: number | null;
  position: "below-average" | "average" | "above-average" | "unknown";
};

export type Deal = {
  productId: string;
  isDeal: boolean;
  reason: string;
  confidence: number;
};

export type Comparison = {
  summary: string;
  recommendations: { productId: string; reason: string }[];
};
