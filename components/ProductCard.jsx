export default function ProductCard({ product }) {
  return (
    <a
      href={`/product/${product.id}`}
      className="crate-card group block hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-line/30">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.verified && (
          <span className="absolute top-2 left-2 stamp bg-white/90">
            ✓ Vérifié
          </span>
        )}
      </div>

      <div className="p-3 space-y-2">
        <p className="manifest-label">
          {product.country} · {product.yearsOnPlatform} ans sur la plateforme
        </p>

        <h3 className="font-medium text-sm leading-snug line-clamp-2 min-h-[2.5em]">
          {product.title}
        </h3>

        <div className="flex items-baseline gap-1 font-mono">
          <span className="text-lg font-semibold text-navy">
            {product.priceMin}–{product.priceMax}
          </span>
          <span className="text-xs text-ink/50">$US</span>
        </div>

        <p className="text-xs text-ink/60">
          MOQ&nbsp;: {product.moq} {product.unit}
        </p>

        {product.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {product.certifications.map((c) => (
              <span
                key={c}
                className="text-[10px] font-mono border border-line px-1.5 py-0.5 text-ink/60"
              >
                {c}
              </span>
            ))}
          </div>
        )}

        {product.reorderRate > 0 && (
          <p className="text-[11px] text-rust font-medium pt-1">
            ↻ Taux de réachat {product.reorderRate}%
          </p>
        )}
      </div>
    </a>
  );
}
