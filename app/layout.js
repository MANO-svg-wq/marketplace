import "./globals.css";

export const metadata = {
  title: "Négoce — La place de marché du commerce de gros",
  description: "Achetez et vendez en gros, directement auprès des fournisseurs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-paper text-ink font-body">{children}</body>
    </html>
  );
}
