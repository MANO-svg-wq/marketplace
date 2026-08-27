-- ============================================================
-- SCHÉMA DE BASE DE DONNÉES — MARKETPLACE B2B
-- À exécuter dans Supabase > SQL Editor
-- ============================================================

-- Extension pour générer des UUID
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------
-- 1. PROFILS (acheteurs et vendeurs)
-- ------------------------------------------------------------
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('buyer', 'seller', 'admin')) default 'buyer',
  company_name text,
  full_name text,
  country text,
  phone text,
  avatar_url text,
  verified boolean default false,
  years_on_platform int default 0,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- 2. CATÉGORIES
-- ------------------------------------------------------------
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  parent_id uuid references categories(id)
);

-- ------------------------------------------------------------
-- 3. PRODUITS
-- ------------------------------------------------------------
create table products (
  id uuid primary key default uuid_generate_v4(),
  seller_id uuid not null references profiles(id) on delete cascade,
  category_id uuid references categories(id),
  title text not null,
  description text,
  images text[] default '{}',
  moq int not null default 1,               -- Minimum Order Quantity
  unit text default 'pièce',
  certifications text[] default '{}',        -- ex: {'CE','FCC','UKCA'}
  status text not null check (status in ('draft','active','archived')) default 'draft',
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- 4. PALIERS DE PRIX (tiered pricing — coeur du modèle B2B)
-- ------------------------------------------------------------
create table price_tiers (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  min_qty int not null,          -- ex: 2
  max_qty int,                   -- null = illimité
  unit_price numeric(10,2) not null,
  currency text default 'USD'
);

-- ------------------------------------------------------------
-- 5. DEMANDES DE DEVIS (RFQ)
-- ------------------------------------------------------------
create table quote_requests (
  id uuid primary key default uuid_generate_v4(),
  buyer_id uuid not null references profiles(id) on delete cascade,
  product_id uuid references products(id),
  quantity int not null,
  target_price numeric(10,2),
  message text,
  status text check (status in ('open','answered','closed')) default 'open',
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- 6. MESSAGERIE ACHETEUR <-> VENDEUR
-- ------------------------------------------------------------
create table conversations (
  id uuid primary key default uuid_generate_v4(),
  buyer_id uuid not null references profiles(id) on delete cascade,
  seller_id uuid not null references profiles(id) on delete cascade,
  product_id uuid references products(id),
  created_at timestamptz default now()
);

create table messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_id uuid not null references profiles(id),
  content text not null,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- 7. AVIS / TAUX DE RÉACHAT
-- ------------------------------------------------------------
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  buyer_id uuid references profiles(id),
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- INDEX UTILES
-- ------------------------------------------------------------
create index idx_products_seller on products(seller_id);
create index idx_products_category on products(category_id);
create index idx_price_tiers_product on price_tiers(product_id);
create index idx_messages_conversation on messages(conversation_id);

-- ------------------------------------------------------------
-- SÉCURITÉ (Row Level Security) — bases à activer
-- ------------------------------------------------------------
alter table profiles enable row level security;
alter table products enable row level security;
alter table quote_requests enable row level security;
alter table messages enable row level security;

-- Tout le monde peut voir les produits actifs
create policy "Produits actifs visibles publiquement"
  on products for select
  using (status = 'active');

-- Un vendeur ne modifie que ses propres produits
create policy "Vendeur gère ses produits"
  on products for all
  using (auth.uid() = seller_id);

-- Un utilisateur voit/modifie son propre profil
create policy "Utilisateur gère son profil"
  on profiles for all
  using (auth.uid() = id);

-- Seuls les 2 participants voient leurs messages
create policy "Messages visibles par les participants"
  on messages for select
  using (
    exists (
      select 1 from conversations c
      where c.id = conversation_id
      and (c.buyer_id = auth.uid() or c.seller_id = auth.uid())
    )
  );
