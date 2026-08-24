# Négoce — Marketplace B2B

Plateforme de commerce de gros (type Alibaba) : recherche de produits, prix
par palier selon la quantité, comptes acheteur/vendeur, publication de
produits avec MOQ et paliers de prix.

## Stack

- **Next.js 14** (App Router) — frontend + API
- **Tailwind CSS** — styles
- **Supabase** (PostgreSQL + Auth) — base de données et authentification

## Démarrage rapide

### 1. Installer les dépendances
```bash
npm install
```

### 2. Créer un projet Supabase
1. Va sur [supabase.com](https://supabase.com) → crée un nouveau projet (gratuit)
2. Ouvre **SQL Editor** → colle le contenu de `supabase/schema.sql` → exécute
3. Va dans **Project Settings > API** → copie l'URL et la clé "anon public"

### 3. Configurer les variables d'environnement
```bash
cp .env.example .env.local
```
Remplis `.env.local` avec tes clés Supabase.

### 4. Lancer en local
```bash
npm run dev
```
Ouvre [http://localhost:3000](http://localhost:3000)

## Structure du projet

```
app/
  page.js                 → page d'accueil (recherche + grille produits)
  login/page.js            → connexion
  register/page.js         → inscription (acheteur ou vendeur)
  seller/dashboard/page.js → publication produit + paliers de prix
  api/products/route.js    → API REST des produits
components/
  Header.jsx               → navigation + barre de recherche
  ProductCard.jsx           → carte produit (prix, MOQ, certifications)
lib/
  supabaseClient.js         → connexion à Supabase
  mockProducts.js           → données de démo (page d'accueil sans backend)
supabase/
  schema.sql                → structure complète de la base de données
```

## Ce qui est fonctionnel dans ce MVP

- ✅ Interface visuelle complète (accueil, produit, comptes)
- ✅ Base de données structurée (produits, paliers de prix, devis, messages)
- ✅ Inscription / connexion avec rôle acheteur ou vendeur
- ✅ Publication de produit avec paliers de prix dynamiques
- ✅ Sécurité de base (Row Level Security Supabase)

## Ce qu'il reste à construire pour un vrai lancement

- Page produit individuelle détaillée (`app/product/[id]/page.js` à compléter)
- Messagerie temps réel acheteur ↔ vendeur (Supabase Realtime)
- Upload d'images produit (Supabase Storage)
- Système de paiement / séquestre (Trade Assurance)
- Modération des annonces et vérification des vendeurs
- Recherche full-text ou par image
- Multi-langue et multi-devise

## Déploiement

Le plus simple : déployer sur [Vercel](https://vercel.com) (gratuit pour démarrer),
en connectant ce dossier à un repo GitHub, puis en renseignant les mêmes
variables d'environnement dans les réglages du projet Vercel.
