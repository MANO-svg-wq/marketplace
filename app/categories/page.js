"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { categories, recommendations } from "@/lib/categoriesData";

export default function CategoriesPage() {
  const [active, setActive] = useState(categories[0].slug);

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <p className="manifest-label mb-1">Registre des marchandises</p>
        <h1 className="font-display text-2xl font-bold mb-6">Catégories</h1>

        <div className="grid grid-cols-[160px_1fr] md:grid-cols-[220px_1fr] gap-0 border border-line bg-white">
          {/* Menu latéral */}
          <nav className="border-r border-line bg-paper/60">
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActive(c.slug)}
                className={`w-full text-left px-3 py-3 text-sm border-l-4 transition-colors ${
                  active === c.slug
                    ? "border-amber bg-white font-semibold text-navy"
                    : "border-transparent text-ink/70 hover:bg-white/60"
                }`}
              >
                {c.name}
              </button>
            ))}
          </nav>

          {/* Contenu */}
          <div className="p-4 md:p-6">
            {/* Bannière stock local */}
            <div className="bg-teal text-paper p-4 flex items-center justify-between mb-6 relative overflow-hidden">
              <div>
                <p className="font-display font-bold text-lg">Stock local disponible</p>
                <ul className="mt-2 space-y-1 text-sm text-paper/90">
                  <li>✓ Livraison en 5 jours</li>
                  <li>✓ Sans frais d&apos;importation</li>
                </ul>
              </div>
              <span className="stamp bg-paper/10 border-paper/40 text-paper hidden sm:inline-flex">
                Entrepôt régional
              </span>
            </div>

            <div className="flex items-baseline justify-between mb-3">
              <h2 className="font-display text-lg font-semibold">Recommandations</h2>
              <p className="manifest-label">
                {categories.find((c) => c.slug === active)?.name}
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-3 gap-y-6">
              {recommendations.map((r) => (
                <a key={r.name} href="/" className="group text-center">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden border border-line bg-white">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {r.tag && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="stamp bg-rust text-paper border-rust text-[10px]">
                          {r.tag}
                        </span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-2 text-ink/80 leading-snug">{r.name}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
