import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/lib/mockProducts";

const categories = [
  "Électronique", "Énergie solaire", "Textile", "Agroalimentaire",
  "Véhicules", "Machines", "Emballage", "Beauté",
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero — manifeste de cargaison */}
      <section className="bg-navy text-paper border-b-4 border-amber">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-[1.3fr_1fr] gap-8 items-center">
          <div>
            <p className="manifest-label text-amber mb-3">Manifeste de cargaison — édition du jour</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">
              Achetez en gros,<br />directement à la source.
            </h1>
            <p className="mt-4 text-paper/70 max-w-md">
              Des milliers de fournisseurs vérifiés. Des prix qui baissent avec la quantité.
              Négociez, comparez, commandez — sans intermédiaire.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="/register" className="bg-amber text-navyDeep px-5 py-2.5 font-semibold hover:bg-amber/90">
                Commencer à acheter
              </a>
              <a href="/seller/dashboard" className="border border-paper/30 px-5 py-2.5 font-semibold hover:bg-white/5">
                Devenir vendeur
              </a>
            </div>
          </div>

          <div className="border border-paper/20 bg-white/5 p-4 font-mono text-xs space-y-2">
            <div className="flex justify-between border-b border-paper/10 pb-2">
              <span className="text-paper/50">MANIFESTE N°</span>
              <span>2026-08-23-BF</span>
            </div>
            <div className="flex justify-between"><span className="text-paper/50">Fournisseurs actifs</span><span>48 210</span></div>
            <div className="flex justify-between"><span className="text-paper/50">Produits référencés</span><span>2,1 M</span></div>
            <div className="flex justify-between"><span className="text-paper/50">Pays desservis</span><span>190+</span></div>
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              className="border border-line px-3 py-1.5 text-sm font-medium bg-white hover:border-navy hover:text-navy transition-colors"
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grille produits */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-xl font-semibold">Sur le quai aujourd&apos;hui</h2>
          <p className="manifest-label">{mockProducts.length} lots disponibles</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
