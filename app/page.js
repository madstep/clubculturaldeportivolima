"use client";

import Head from "next/head";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function HomePage() {
  return (
    <><Analytics />
    <SpeedInsights />
      <Head>
        <title>
          Juan Alberto Jara "Frejol" - Marca x la Lista 1 - Propuesta 2025-2027 | CCDL
        </title>
        <meta
          name="description"
          content="Conoce la propuesta de Juan Alberto Jara 'Frejol' para el Club Cultural Deportivo Lima. Plan integral de trabajo 2025-2027: transparencia, modernización e inclusión."
        />
        <meta
          name="keywords"
          content="ACCCDL,CCDL, Club Cultural Deportivo Lima, Juan Alberto Jara Arias, Frejol, elecciones 2025, lista 1, propuesta electoral"
        />
        <meta name="author" content="Carlos Alberto Obregón Guerra" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jjclubcultural.vercel.app/" />
        <meta
          property="og:title"
          content="Juan Alberto Jara 'Frejol' - Marca x la Lista 1 - Unete al Cambio"
        />
        <meta
          property="og:description"
          content="Propuesta integral de la Lista 1 para transformar el Club Cultural Deportivo Lima. Transparencia, modernización e inclusión para todos los socios."
        />
        <meta
          property="og:image"
          content="https://jjclubcultural.vercel.app/logo_cultural_lima.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://jjclubcultural.vercel.app/" />
        <meta
          property="twitter:title"
          content="Juan Alberto Jara 'Frejol' - Marca x la Lista 1 - Unete al Cambio"
        />
        <meta
          property="twitter:description"
          content="Propuesta integral de la Lista 1 para transformar el Club Cultural Deportivo Lima."
        />
        <meta
          property="twitter:image"
          content="https://jjclubcultural.vercel.app/logo_cultural_lima.png"
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className="site-bg" aria-hidden="true"></div>

      <div className="page-content">
        <div className="scroll-progress" id="scroll-progress"></div>

        {/* Botón flotante de WhatsApp */}
        <a
          href="https://chat.whatsapp.com/HhDKe19pgl8EeggcRZjwxX"
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Únete al grupo de WhatsApp"
          title="¡Únete a nuestro grupo!"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="30"
            height="30"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>

        <section className="hero">
          <div className="hero-content">
            <div className="club-logo">
              <img src="/logo_cultural_lima.png" alt="Logo CCDL" className="logo" />
            </div>
            <h1>El corazón del CCDL latesss...</h1>
          </div>
        </section>
      </div>

      <style jsx>{`
        /* Todo tu CSS del HTML original va aquí */
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }
        .hero {
          background: linear-gradient(135deg, rgba(13,79,139,0.86) 0%, rgba(26,107,184,0.86) 100%);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
        }
        .logo {
          max-height: 250px;
        }
        .whatsapp-float {
          position: fixed;
          width: 60px;
          height: 60px;
          bottom: 40px;
          right: 40px;
          background-color: #25d366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }
        .whatsapp-float:hover {
          background-color: #128C7E;
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
}
