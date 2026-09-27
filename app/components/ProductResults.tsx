import type { ShoppingState } from "@/types/shopping";

export default function ProductResults({
  state,
}: {
  state: ShoppingState | null;
}) {
  if (!state) {
    return (
      <div className="rounded-2xl border p-8 text-zinc-500">
        No search yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* STATUS */}
      <div className="rounded-2xl border p-5">
        <p className="text-sm text-zinc-500">Status</p>

        <p className="mt-1 font-semibold">{state.status}</p>

        {state.error && (
          <p className="mt-2 text-sm text-red-600">
            {state.error}
          </p>
        )}
      </div>

      {/* PRODUCTS */}
      <section>
        <h2 className="mb-3 text-xl font-semibold">
          Products ({state.matchedProducts?.length ?? 0})
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {state.matchedProducts?.map((product) => (
            <article
              key={product.id}
              className="rounded-2xl border p-5"
            >
              <h3 className="font-semibold">
                {product.title}
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                {product.source}
              </p>

              <p className="mt-3 text-2xl font-bold">
                {product.price == null
                  ? "Price unavailable"
                  : `$${product.price.toFixed(2)}`}
              </p>

              {product.oldPrice != null && (
                <p className="text-sm text-zinc-500 line-through">
                  ${product.oldPrice.toFixed(2)}
                </p>
              )}

              {product.rating != null && (
                <p className="mt-2 text-sm">
                  ⭐ {product.rating}
                  {product.reviews != null &&
                    ` (${product.reviews} reviews)`}
                </p>
              )}

              {product.link && (
                <a
                  href={product.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm underline"
                >
                  View product
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* PRICE ANALYSIS */}
      {state.priceAnalysis?.length > 0 && (
        <section className="rounded-2xl border p-5">
          <h2 className="text-xl font-semibold">
            Price Analysis
          </h2>

          <div className="mt-4 space-y-4">
            {state.priceAnalysis.map((analysis, index) => (
              <div
                key={index}
                className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900"
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  <Info
                    label="Total Options"
                    value={analysis.totalOptions}
                  />

                  <Info
                    label="Prices Available"
                    value={analysis.pricesAvailable}
                  />

                  <Info
                    label="Deals Identified"
                    value={analysis.dealsIdentified}
                  />
                </div>

                {analysis.priceNote && (
                  <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
                    {analysis.priceNote}
                  </p>
                )}

                {analysis.dealsNote && (
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    {analysis.dealsNote}
                  </p>
                )}

                {analysis.topRatedExamples?.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">
                      Top Rated Examples
                    </p>

                    <ul className="mt-2 space-y-1 text-sm text-zinc-500">
                      {analysis.topRatedExamples.map(
                        (item, itemIndex) => (
                          <li key={itemIndex}>
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* DEALS */}
      {state.deals && (
        <section className="rounded-2xl border p-5">
          <h2 className="text-xl font-semibold">
            Deals
          </h2>

          <pre className="mt-4 overflow-auto rounded-xl bg-zinc-100 p-4 text-sm dark:bg-zinc-900">
            {JSON.stringify(state.deals, null, 2)}
          </pre>
        </section>
      )}

      {/* COMPARISON */}
      {state.comparison && (
        <section className="rounded-2xl border p-5">
          <h2 className="text-xl font-semibold">
            Comparison
          </h2>

          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            {state.comparison.summary}
          </p>

          {state.comparison.recommendations?.length > 0 && (
            <div className="mt-4 space-y-3">
              {state.comparison.recommendations.map(
                (recommendation) => (
                  <div
                    key={recommendation.productId}
                    className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900"
                  >
                    <p className="font-medium">
                      {recommendation.productId}
                    </p>

                    <p className="text-sm text-zinc-500">
                      {recommendation.reason}
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean | null | undefined;
}) {
  return (
    <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900">
      <p className="text-sm text-zinc-500">{label}</p>

      <p className="mt-1 text-lg font-semibold">
        {String(value ?? "N/A")}
      </p>
    </div>
  );
}