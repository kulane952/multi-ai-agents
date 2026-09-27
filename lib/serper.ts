import type { Product } from "@/types/shopping";

export async function searchProducts(
  query: string
): Promise<Product[]> {
  const apiKey = process.env.SERPER_API_KEY;

  if (!apiKey) {
    throw new Error("SERPER_API_KEY is not defined");
  }

  const response = await fetch(
    "https://google.serper.dev/shopping",
    {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: query,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `Serper API ${response.status}: ${error}`
    );
  }

  const data = await response.json();

  const results = Array.isArray(data.shopping)
    ? data.shopping
    : [];

  return results.map((item: any, index: number) => ({
    id: String(
      item.productId ??
        `${item.source ?? "source"}-${index}-${item.title ?? "product"}`
    )
      .replace(/\s+/g, "-")
      .toLowerCase(),

    title: String(item.title ?? "Untitled product"),

    link: String(item.link ?? ""),

    source: String(item.source ?? "Unknown"),

    price:
      typeof item.price === "number"
        ? item.price
        : null,

    oldPrice:
      typeof item.oldPrice === "number"
        ? item.oldPrice
        : null,

    rating:
      typeof item.rating === "number"
        ? item.rating
        : null,

    reviews:
      typeof item.ratingCount === "number"
        ? item.ratingCount
        : null,

    thumbnail:
      typeof item.imageUrl === "string"
        ? item.imageUrl
        : undefined,

    productId:
      item.productId
        ? String(item.productId)
        : undefined,

    raw: item,
  }));
}