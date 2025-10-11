"use client";

import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

export default function Page() {
  useEffect(() => {
    // Script de Vercel Analytics
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };

    const script = document.createElement("script");
    script.defer = true;
    script.src = "/_vercel/insights/script.js";
    document.head.appendChild(script);

    // Scroll progress bar
    const progress = document.getElementById("scroll-progress");
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progressWidth = (scrollTop / docHeight) * 100;
      progress.style.width = progressWidth + "%";
    };
    window.addEventListener("scroll", handleScroll);

    // Countdown
    const targetDate = new Date("2025-12-15T00:00:00").getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) return;
      document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
      document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    // Toggle fases
    window.togglePhase = (num) => {
      const content = document.getElementById(`content-${num}`);
      const icon = document.getElementById(`icon-${num}`);
      if (content.classList.contains("active")) {
        content.classList.remove("active");
        icon.classList.remove("rotated");
      } else {
        document.querySelectorAll(".phase-content").forEach(el => el.classList.remove("active"));
        document.querySelectorAll(".expand-icon").forEach(el => el.classList.remove("rotated"));
        content.classList.add("active");
        icon.classList.add("rotated");
      }
    };

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Juan Alberto Jara "Frejol" - Marca x la Lista 1 - Propuesta 2025-2027 | CCDL</title>
        <meta name="description" content="Conoce la propuesta de Juan Alberto Jara 'Frejol' para el Club Cultural Deportivo Lima. Plan integral de trabajo 2025-2027: transparencia, modernización e inclusión." />
        <meta name="keywords" content="ACCCDL,CCDL, Club Cultural Deportivo Lima, Juan Alberto Jara Arias, Frejol, elecciones 2025, lista 1, propuesta electoral" />
        <meta name="author" content="Carlos Alberto Obregón Guerra" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jjclubcultural.vercel.app/" />
        <meta property="og:title" content="Juan Alberto Jara 'Frejol' - Marca x la Lista 1 - Unete al Cambio" />
        <meta property="og:description" content="Propuesta integral de la Lista 1 para transformar el Club Cultural Deportivo Lima. Transparencia, modernización e inclusión para todos los socios." />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://jjclubcultural.vercel.app/" />
        <meta property="twitter:title" content="Juan Alberto Jara 'Frejol' - Marca x la Lista 1 - Unete al Cambio" />
        <meta property="twitter:description" content="Propuesta integral de la Lista 1 para transformar el Club Cultural Deportivo Lima." />

        <link rel="icon" href="logo.png" />
      </Head>

      <style>{`/* Pega aquí todo el CSS original tal cual */`}</style>

      <div className="site-bg" aria-hidden="true"></div>

      <div className="page-content">
        <div className="scroll-progress" id="scroll-progress"></div>

        {/* Botón WhatsApp */}
        <a
          href="https://chat.whatsapp.com/HhDKe19pgl8EeggcRZjwxX"
          className="whatsapp-float"
          target="_blank"
          aria-label="Únete al grupo de WhatsApp"
          title="¡Únete a nuestro grupo!"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30" height="30">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967..."/>
          </svg>
        </a>

        {/* --- Contenido principal (todo tu HTML dentro de JSX) --- */}
        <section className="hero">
          <div className="hero-content">
            <div className="club-logo">
              <img src="/logo_cultural_lima.png" alt="Logo CCDL" className="logo" />
            </div>
            <h1>El corazón del CCDL late en cada uno de nosotros</h1>
            <div className="heart-container">
              {/* SVG del corazón */}
              <svg role="img" aria-labelledby="titleDesc" viewBox="0 0 240 220" xmlns="http://www.w3.org/2000/svg"
                style={{ width: "160px", height: "auto", display: "block", margin: "0 auto" }}>
                <title id="titleDesc">Marca el número 1</title>
                <defs>
                  <filter id="sombraCorazon" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.35" />
                  </filter>
                </defs>
                <path d="M120 195 C110 180, 40 130, 40 80..." fill="#ffffff" filter="url(#sombraCorazon)" />
                <text x="120" y="90" textAnchor="middle" fill="#0D4F8B" fontFamily="Montserrat, Arial, sans-serif"
                  fontWeight="700" fontSize="18" letterSpacing="0.6">MARCA EL #</text>
                <text x="120" y="150" textAnchor="middle" fill="#C41E3A" fontFamily="Montserrat, Arial Black, sans-serif"
                  fontWeight="900" fontSize="64" style={{ filter: "drop-shadow(2px 2px 4px rgba(196, 30, 58, 0.3))" }}>1</text>
              </svg>
            </div>

            <h2 style={{ fontSize: "2rem", marginBottom: "1rem", fontWeight: 600 }}>Juan Alberto Jara "Frejol"</h2>
            <p style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>2025 - 2027</p>
            <p>Nuestro Club Cultural Deportivo Lima merece una dirección visionaria, transparente y comprometida con el bienestar de todos sus socios.</p>
            <a href="#propuesta" className="cta-button" style={{ position: "relative" }}>Conoce nuestra Propuesta</a>
          </div>
        </section>

        {/* Contador */}
        <div className="countdown-section">
          <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⏰ Faltan para las Elecciones</h3>
          <div className="countdown-container" id="countdown">
            <div className="countdown-item"><span id="days" className="countdown-number">00</span><span className="countdown-label">Días</span></div>
            <div className="countdown-item"><span id="hours" className="countdown-number">00</span><span className="countdown-label">Horas</span></div>
            <div className="countdown-item"><span id="minutes" className="countdown-number">00</span><span className="countdown-label">Minutos</span></div>
            <div className="countdown-item"><span id="seconds" className="countdown-number">00</span><span className="countdown-label">Segundos</span></div>
          </div>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", marginTop: "10px" }}>Unete al cambio</h3>
        </div>

        {/* Aquí continúa tu HTML original (timeline, phases, etc.) */}
      </div>
    </>
  );
}
