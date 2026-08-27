import Header from "@/components/Header";
import { mockProducts } from "@/lib/mockProducts";

export default function ProductPage({ params }) {
  const product = mockProducts.find((p) => p.id === params.id) || mockProducts[0];

  // Paliers de prix simulés à partir de la fourchette du produit
  const tiers = [
    { minQty: product.moq, maxQty: product.moq * 10 - 1, price: product.priceMax },
    { minQty: product.moq * 10, maxQty: product.moq * 50 - 1, price: (product.priceMax + product.priceMin) / 2 },
    { minQty: product.moq * 50, maxQty: null, price: product.priceMin },
  ];

  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-[1.1fr_1fr] gap-10">
        <div>
          <div className="crate-card aspect-square overflow-hidden">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          </div>
        </div>

        <div>
          <p className="manifest-label mb-2">
            {product.country} · {product.yearsOnPlatform} ans sur la plateforme
            {product.verified && <span className="text-teal"> · ✓ Fournisseur vérifié</span>}
          </p>
          <h1 className="font-display text-2xl font-bold mb-4">{product.title}</h1>

          <div className="crate-card p-4 mb-6">
            <p className="manifest-label mb-2">Paliers de prix</p>
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="text-left text-ink/50 border-b border-line">
                  <th className="py-1 font-normal">Quantité</th>
                  <th className="py-1 font-normal">Prix / {product.unit}</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t, i) => (
                  <tr key={i} className="border-b border-line/50 last:border-0">
                    <td className="py-1.5">
                      {t.minQty}{t.maxQty ? `–${t.maxQty}` : "+"}
                    </td>
                    <td className="py-1.5 font-semibold text-navy">
                      {t.price.toFixed(2)} $US
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-ink/70 mb-1">
            <span className="font-medium">MOQ :</span> {product.moq} {product.unit}
          </p>
          {product.certifications.length > 0 && (
            <p className="text-sm text-ink/70 mb-6">
              <span className="font-medium">Certifications :</span> {product.certifications.join(", ")}
            </p>
          )}

          <div className="flex gap-3">
            <button className="bg-amber text-navyDeep font-semibold px-5 py-2.5 hover:bg-amber/90">
              Demander un devis
            </button>
            <button className="border border-navy text-navy font-semibold px-5 py-2.5 hover:bg-navy hover:text-paper transition-colors">
              Contacter le fournisseur
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
