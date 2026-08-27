"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";

export default function SellerDashboard() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    moq: 1,
    unit: "pièce",
  });
  const [tiers, setTiers] = useState([
    { minQty: 1, maxQty: "", unitPrice: "" },
  ]);
  const [status, setStatus] = useState({ loading: false, error: "", success: false });

  const updateTier = (i, field, value) => {
    const next = [...tiers];
    next[i][field] = value;
    setTiers(next);
  };

  const addTier = () =>
    setTiers([...tiers, { minQty: "", maxQty: "", unitPrice: "" }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: false });

    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      setStatus({ loading: false, error: "Connecte-toi d'abord pour publier un produit.", success: false });
      return;
    }

    const { data: newProduct, error } = await supabase
      .from("products")
      .insert({
        seller_id: userData.user.id,
        title: product.title,
        description: product.description,
        moq: product.moq,
        unit: product.unit,
        status: "active",
      })
      .select()
      .single();

    if (error) {
      setStatus({ loading: false, error: error.message, success: false });
      return;
    }

    const tierRows = tiers
      .filter((t) => t.minQty && t.unitPrice)
      .map((t) => ({
        product_id: newProduct.id,
        min_qty: Number(t.minQty),
        max_qty: t.maxQty ? Number(t.maxQty) : null,
        unit_price: Number(t.unitPrice),
      }));

    if (tierRows.length > 0) {
      await supabase.from("price_tiers").insert(tierRows);
    }

    setStatus({ loading: false, error: "", success: true });
    setProduct({ title: "", description: "", moq: 1, unit: "pièce" });
    setTiers([{ minQty: 1, maxQty: "", unitPrice: "" }]);
  };

  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <p className="manifest-label mb-2">Espace vendeur</p>
        <h1 className="font-display text-2xl font-bold mb-6">Publier un nouveau lot</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="manifest-label block mb-1">Nom du produit</label>
            <input
              required
              value={product.title}
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              className="w-full border border-line px-3 py-2 bg-white outline-none focus:border-navy"
            />
          </div>

          <div>
            <label className="manifest-label block mb-1">Description</label>
            <textarea
              rows={4}
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              className="w-full border border-line px-3 py-2 bg-white outline-none focus:border-navy"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="manifest-label block mb-1">MOQ (quantité min.)</label>
              <input
                type="number"
                min={1}
                required
                value={product.moq}
                onChange={(e) => setProduct({ ...product, moq: e.target.value })}
                className="w-full border border-line px-3 py-2 bg-white outline-none focus:border-navy"
              />
            </div>
            <div>
              <label className="manifest-label block mb-1">Unité</label>
              <input
                value={product.unit}
                onChange={(e) => setProduct({ ...product, unit: e.target.value })}
                className="w-full border border-line px-3 py-2 bg-white outline-none focus:border-navy"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="manifest-label">Paliers de prix</label>
              <button type="button" onClick={addTier} className="text-xs font-semibold text-navy underline">
                + Ajouter un palier
              </button>
            </div>

            <div className="space-y-2">
              {tiers.map((t, i) => (
                <div key={i} className="grid grid-cols-3 gap-2 crate-card p-2">
                  <input
                    type="number"
                    placeholder="Qté min"
                    value={t.minQty}
                    onChange={(e) => updateTier(i, "minQty", e.target.value)}
                    className="border border-line px-2 py-1.5 text-sm outline-none focus:border-navy"
                  />
                  <input
                    type="number"
                    placeholder="Qté max (option.)"
                    value={t.maxQty}
                    onChange={(e) => updateTier(i, "maxQty", e.target.value)}
                    className="border border-line px-2 py-1.5 text-sm outline-none focus:border-navy"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Prix $US"
                    value={t.unitPrice}
                    onChange={(e) => updateTier(i, "unitPrice", e.target.value)}
                    className="border border-line px-2 py-1.5 text-sm outline-none focus:border-navy"
                  />
                </div>
              ))}
            </div>
          </div>

          {status.error && <p className="text-rust text-sm">{status.error}</p>}
          {status.success && <p className="text-teal text-sm">Produit publié avec succès.</p>}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-amber text-navyDeep font-semibold py-2.5 hover:bg-amber/90 disabled:opacity-50"
          >
            {status.loading ? "Publication..." : "Publier le produit"}
          </button>
        </form>
      </div>
    </main>
  );
}
