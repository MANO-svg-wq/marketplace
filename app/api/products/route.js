import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET /api/products — liste les produits actifs avec leurs paliers de prix
export async function GET() {
  const { data, error } = await supabase
    .from("products")
    .select("*, price_tiers(*), profiles(company_name, country, verified)")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ products: data });
}
