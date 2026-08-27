"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";

export default function RegisterPage() {
  const [role, setRole] = useState("buyer");
  const [form, setForm] = useState({ email: "", password: "", companyName: "", country: "" });
  const [status, setStatus] = useState({ loading: false, error: "", success: false });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: false });

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setStatus({ loading: false, error: error.message, success: false });
      return;
    }

    // Crée le profil associé (rôle, entreprise, pays)
    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        role,
        company_name: form.companyName,
        country: form.country,
      });
    }

    setStatus({ loading: false, error: "", success: true });
  };

  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-md mx-auto px-4 py-12">
        <p className="manifest-label mb-2">Nouveau compte</p>
        <h1 className="font-display text-2xl font-bold mb-6">Rejoindre la plateforme</h1>

        <div className="flex border border-line mb-6">
          <button
            type="button"
            onClick={() => setRole("buyer")}
            className={`flex-1 py-2.5 text-sm font-semibold ${role === "buyer" ? "bg-navy text-paper" : "bg-white text-ink/60"}`}
          >
            Je suis acheteur
          </button>
          <button
            type="button"
            onClick={() => setRole("seller")}
            className={`flex-1 py-2.5 text-sm font-semibold ${role === "seller" ? "bg-navy text-paper" : "bg-white text-ink/60"}`}
          >
            Je suis vendeur
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="manifest-label block mb-1">Nom de l&apos;entreprise</label>
            <input
              name="companyName"
              required
              value={form.companyName}
              onChange={handleChange}
              className="w-full border border-line px-3 py-2 bg-white outline-none focus:border-navy"
            />
          </div>
          <div>
            <label className="manifest-label block mb-1">Pays</label>
            <input
              name="country"
              required
              value={form.country}
              onChange={handleChange}
              className="w-full border border-line px-3 py-2 bg-white outline-none focus:border-navy"
            />
          </div>
          <div>
            <label className="manifest-label block mb-1">Email professionnel</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-line px-3 py-2 bg-white outline-none focus:border-navy"
            />
          </div>
          <div>
            <label className="manifest-label block mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              value={form.password}
              onChange={handleChange}
              className="w-full border border-line px-3 py-2 bg-white outline-none focus:border-navy"
            />
          </div>

          {status.error && (
            <p className="text-rust text-sm">{status.error}</p>
          )}
          {status.success && (
            <p className="text-teal text-sm">
              Compte créé. Vérifie ta boîte mail pour confirmer ton adresse.
            </p>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-amber text-navyDeep font-semibold py-2.5 hover:bg-amber/90 disabled:opacity-50"
          >
            {status.loading ? "Création en cours..." : "Créer mon compte"}
          </button>
        </form>

        <p className="text-sm text-ink/60 mt-4">
          Déjà inscrit ? <a href="/login" className="text-navy font-medium underline">Se connecter</a>
        </p>
      </div>
    </main>
  );
}
