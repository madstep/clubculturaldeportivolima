import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://jjclubcultural.vercel.app"),
  title: 'Juan Alberto Jara "Frejol" - Marca x la Lista 1 - Propuesta 2025-2027 | CCDL',
  description:
    "Conoce la propuesta de Juan Alberto Jara 'Frejol' para el Club Cultural Deportivo Lima. Plan integral de trabajo 2025-2027: transparencia, modernización e inclusión.",
  keywords: [
    "ACCCDL",
    "CCDL",
    "Club Cultural Deportivo Lima",
    "Juan Alberto Jara Arias",
    "Frejol",
    "elecciones 2025",
    "lista 1",
    "propuesta electoral",
  ],
  authors: [{ name: "Carlos Alberto Obregón Guerra" }],
  openGraph: {
    type: "website",
    url: "/",
    title: "Juan Alberto Jara 'Frejol' - Marca x la Lista 1 - Únete al Cambio",
    description:
      "Propuesta integral de la Lista 1 para transformar el Club Cultural Deportivo Lima. Transparencia, modernización e inclusión para todos los socios.",
    siteName: "Club Cultural Deportivo Lima",
    locale: "es_PE",
    images: [
      {
        url: "/logo_cultural_lima.png",
        alt: "Logo del Club Cultural Deportivo Lima",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Alberto Jara 'Frejol' - Marca x la Lista 1 - Únete al Cambio",
    description:
      "Propuesta integral de la Lista 1 para transformar el Club Cultural Deportivo Lima.",
    images: ["/logo_cultural_lima.png"],
    creator: "@Frejol2025",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  alternates: {
    canonical: "https://jjclubcultural.vercel.app",
    languages: {
      "es-PE": "https://jjclubcultural.vercel.app",
    },
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
