"use client";
import React, { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    // Funciones del modal (abrir/cerrar)
    const modal = document.getElementById("imageModal");
    const img = document.getElementById("teamListImage");
    const modalImg = document.getElementById("modalImage");

    window.openModal = () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
    };

    window.closeModal = () => {
      modal.style.display = "none";
    };
  }, []);

  return (
    <main>
      <div className="site-bg" aria-hidden="true"></div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="page-content">
        <div className="scroll-progress" id="scroll-progress"></div>

        {/* BOTÓN WHATSAPP */}
        <a
          href="https://chat.whatsapp.com/HhDKe19pgl8EeggcRZjwxX"
          className="whatsapp-float"
          target="_blank"
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

        {/* SECCIÓN HERO */}
        <section className="hero">
          <div className="hero-content">
            <div className="club-logo">
              <img src="logo_cultural_lima.png" alt="Logo CCDL" className="logo" />
            </div>
            <h1>El corazón del CCDL late en cada uno de nosotros</h1>

            {/* CORAZÓN SVG */}
            <div className="heart-container">
              <svg
                role="img"
                aria-labelledby="titleDesc"
                viewBox="0 0 240 220"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "160px",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
              >
                <title id="titleDesc">Marca el número 1</title>
                <defs>
                  <filter id="sombraCorazon" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow
                      dx="0"
                      dy="4"
                      stdDeviation="6"
                      floodColor="#000000"
                      floodOpacity="0.35"
                    />
                  </filter>
                </defs>

                <path
                  d="M120 195 C110 180, 40 130, 40 80 C40 45, 70 30, 95 40 C110 45, 120 60, 120 60 C120 60, 130 45, 145 40 C170 30, 200 45, 200 80 C200 130, 130 180, 120 195Z"
                  fill="#ffffff"
                  filter="url(#sombraCorazon)"
                />

                <text
                  x="120"
                  y="90"
                  textAnchor="middle"
                  fill="#0D4F8B"
                  fontFamily="Montserrat, Arial, sans-serif"
                  fontWeight="700"
                  fontSize="18"
                  letterSpacing="0.6"
                >
                  MARCA EL #
                </text>

                <text
                  x="120"
                  y="150"
                  textAnchor="middle"
                  fill="#C41E3A"
                  fontFamily="Montserrat, Arial Black, sans-serif"
                  fontWeight="900"
                  fontSize="64"
                  style={{
                    filter: "drop-shadow(2px 2px 4px rgba(196, 30, 58, 0.3))",
                  }}
                >
                  1
                </text>
              </svg>
            </div>

            <h2 style={{ fontSize: "2rem", marginBottom: "1rem", fontWeight: "600" }}>
              Juan Alberto Jara "Frejol"
            </h2>
            <p style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>
              2025 - 2027
            </p>
            <p>
              Nuestro Club Cultural Deportivo Lima merece una dirección visionaria,
              transparente y comprometida con el bienestar de todos sus socios.
            </p>
            <a href="#propuesta" className="cta-button" style={{ position: "relative" }}>
              Conoce nuestra Propuesta
            </a>
          </div>
        </section>

        {/* (AQUÍ SIGUE TU CONTENIDO) */}
      </div>
    </main>
  );
}
