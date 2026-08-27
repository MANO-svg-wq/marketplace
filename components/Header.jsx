"use client";

import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");

  return (
    <header className="bg-navyDeep text-paper sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 border-b border-white/10">
          <a href="/" className="font-display font-700 text-xl tracking-tight">
            Négoce<span className="text-amber">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="/" className="hover:text-amber transition-colors">Produits</a>
            <a href="/categories" className="hover:text-amber transition-colors">Catégories</a>
            <a href="/seller/dashboard" className="hover:text-amber transition-colors">Vendre</a>
            <a href="/login" className="hover:text-amber transition-colors">Connexion</a>
            <a
              href="/register"
              className="bg-amber text-navyDeep px-3 py-1.5 font-semibold hover:bg-amber/90 transition-colors"
            >
              Créer un compte
            </a>
          </nav>
        </div>

        <div className="py-4">
          <div className="flex items-stretch max-w-2xl">
            <span className="manifest-label bg-white/5 border border-white/15 border-r-0 flex items-center px-3 text-paper/50">
              N° manifeste
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un produit, une catégorie, un fournisseur..."
              className="flex-1 bg-white text-ink px-4 py-2.5 outline-none placeholder:text-ink/40"
            />
            <button className="bg-amber text-navyDeep px-6 font-semibold hover:bg-amber/90 transition-colors">
              Chercher
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
