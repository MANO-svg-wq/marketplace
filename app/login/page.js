"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "" });

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setStatus({ loading: false, error: error.message });
      return;
    }

    window.location.href = "/";
  };

  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-md mx-auto px-4 py-12">
        <p className="manifest-label mb-2">Accès compte</p>
        <h1 className="font-display text-2xl font-bold mb-6">Connexion</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="manifest-label block mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-line px-3 py-2 bg-white outline-none focus:border-navy"
            />
          </div>
          <div>
            <label className="manifest-label block mb-1">Mot de passe</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-line px-3 py-2 bg-white outline-none focus:border-navy"
            />
          </div>

          {status.error && <p className="text-rust text-sm">{status.error}</p>}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-navy text-paper font-semibold py-2.5 hover:bg-navy/90 disabled:opacity-50"
          >
            {status.loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="text-sm text-ink/60 mt-4">
          Pas encore de compte ? <a href="/register" className="text-navy font-medium underline">S&apos;inscrire</a>
        </p>
      </div>
    </main>
  );
}
