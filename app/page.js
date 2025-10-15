"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  onSnapshot,
  collection,
  addDoc,
} from "firebase/firestore";
import votosData from "../votosDni.json"; // Ajusta la ruta según tu estructura

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [visitas, setVisitas] = useState(0);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDni, setLoadingDni] = useState(null);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);
  const [countVisits, setCountVisits] = useState(0);
  const [countLikes, setCountLikes] = useState(0);

  const handleOpen = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const importarVotos = async () => {
      setLoading(true);
      try {
        const votosRef = collection(db, "votos");

        for (const persona of votosData) {
          // Limpiar DNI para usarlo como ID
          const docId = persona.dni
            ? String(persona.dni).replace(/[^a-zA-Z0-9_-]/g, "")
            : null;

          const cleanPersona = {
            item: Number(persona.item) || 0,
            nombre: String(persona.nombre || ""),
            cargo: String(persona.cargo || ""),
            dni: String(persona.dni || ""),
            codigo: String(persona.codigo || ""),
            votos: Number(persona.votos) || 0,
          };

          if (docId && docId.length > 0) {
            await setDoc(doc(votosRef, docId), cleanPersona);
          } else {
            await addDoc(votosRef, cleanPersona);
          }
        }

        setMensaje("🎉 Importación completada!");
      } catch (err) {
        console.error("Error importando votos:", err.message);
        setMensaje("❌ Error al importar votos");
      } finally {
        setLoading(false);
      }
    };

    //importarVotos();
  }, []);

  useEffect(() => {
    // --- Script de Vercel Analytics ---
    window.va =
      window.va ||
      function () {
        (window.vaq = window.vaq || []).push(arguments);
      };
    const script = document.createElement("script");
    script.defer = true;
    script.src = "/_vercel/insights/script.js";
    document.head.appendChild(script);

    // --- Scroll progress ---
    const progress = document.getElementById("scroll-progress");
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progressWidth = (scrollTop / docHeight) * 100;
      if (progress) progress.style.width = progressWidth + "%";
    };
    window.addEventListener("scroll", handleScroll);

    // ---- CONFIG ----
    const YEAR = 2025,
      MONTH_INDEX = 10,
      DAY = 2,
      HR = 0,
      MIN = 8,
      SEC = 0; // 2 Nov 2025 00:08
    const ISO_WITH_OFFSET = "2025-11-02T00:08:00-05:00"; // explícito -05:00 (Lima)

    // ---- helper para escribir debug overlay ----
    /* let debugEl = document.getElementById("__countdown_debug");
    if (!debugEl) {
      debugEl = document.createElement("div");
      debugEl.id = "__countdown_debug";
      debugEl.style.position = "fixed";
      debugEl.style.right = "8px";
      debugEl.style.bottom = "8px";
      debugEl.style.zIndex = "99999";
      debugEl.style.background = "rgba(0,0,0,0.7)";
      debugEl.style.color = "white";
      debugEl.style.padding = "8px 10px";
      debugEl.style.fontSize = "12px";
      debugEl.style.borderRadius = "8px";
      debugEl.style.maxWidth = "320px";
      debugEl.style.lineHeight = "1.2";
      document.body.appendChild(debugEl);
    }

    const logDebug = (txt) => {
      console.log(txt);
      debugEl.innerText = txt; // último mensaje (puedes mejorar mostrando varios)
    }; */

    // ---- crear targets con 3 métodos ----
    const target_local_ctor = new Date(YEAR, MONTH_INDEX, DAY, HR, MIN, SEC); // local constructor
    const target_iso_offset = new Date(ISO_WITH_OFFSET); // ISO with explicit -05:00
    const target_utc = new Date(Date.UTC(YEAR, MONTH_INDEX, DAY, HR, MIN, SEC)); // interpretable como UTC for that Y/M/D/H

    console.group("COUNTDOWN DEBUG");
    console.log(
      "Now (client local):",
      new Date().toString(),
      "timestamp:",
      Date.now()
    );
    console.log("Timezone offset (min):", new Date().getTimezoneOffset());
    console.log(
      "target_local_ctor:",
      target_local_ctor.toString(),
      "ts:",
      target_local_ctor.getTime()
    );
    console.log(
      "target_iso_offset:",
      target_iso_offset.toString(),
      "ts:",
      target_iso_offset.getTime()
    );
    console.log(
      "target_utc (Date.UTC):",
      target_utc.toString(),
      "ts:",
      target_utc.getTime()
    );
    console.groupEnd();

    // show a condensed debug summary in the overlay
    /*   const summary = [
    `Now: ${new Date().toLocaleString()}`,
    `TZ offset (min): ${new Date().getTimezoneOffset()}`,
    `Local ctor ts: ${target_local_ctor.getTime()} (${target_local_ctor.toLocaleString()})`,
    `ISO -05 ts: ${target_iso_offset.getTime()} (${target_iso_offset.toLocaleString()})`,
    `UTC ts: ${target_utc.getTime()} (${target_utc.toUTCString()})`,
  ].join("\n");
  logDebug(summary); */

    // ---- pick which target to use for the visible countdown ----
    // Recommendation: usa ISO con offset si quieres hora en Lima: ISO_WITH_OFFSET
    const targetTs = target_iso_offset.getTime();

    // ---- countdown implementation (updates DOM ids you already have) ----
    const updateCountdown = () => {
      const now = Date.now();
      const distance = targetTs - now;

      // debug: print days difference (not too often, but once per second is ok)
      const daysCalc = Math.floor(distance / (1000 * 60 * 60 * 24));
      // update the overlay too (helpful while debugging)
      /* debugEl.innerText = summary + `\n\ndistance(ms): ${distance}\nDias: ${daysCalc}`; */

      const secInMs = 1000;
      if (distance <= 0) {
        const section = document.querySelector(".countdown-section");
        if (section)
          section.innerHTML = `<h3 style="font-size:2rem;">¡Es día de elecciones! 🗳️</h3>`;
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const setText = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = String(val).padStart(2, "0");
      };

      setText("days", days);
      setText("hours", hours);
      setText("minutes", minutes);
      setText("seconds", seconds);
      // opcional: actualizar aria-label o título para accesibilidad
    };

    // run once immediately and then every second
    updateCountdown();
    const id = setInterval(updateCountdown, 1000);

    // ---- check local system clock drift once ----
    /* setTimeout(() => {
      const clientNow = Date.now();
      const clientDate = new Date();
      // optional: compare with an authoritative time? Not available offline; but we can warn if client's TZ is weird:
      const tzOffset = clientDate.getTimezoneOffset(); // minutes
      if (Math.abs(tzOffset) > 12 * 60) {
        console.warn("Timezone offset inesperado:", tzOffset);
        logDebug("ATENCIÓN: offset de zona horaria inusual: " + tzOffset);
      }
    }, 1500); */

    // --- Toggle fases ---
    window.togglePhase = (num) => {
      const content = document.getElementById(`content-${num}`);
      const icon = document.getElementById(`icon-${num}`);
      if (!content || !icon) return;

      const active = content.classList.contains("active");
      document
        .querySelectorAll(".phase-content")
        .forEach((el) => el.classList.remove("active"));
      document
        .querySelectorAll(".expand-icon")
        .forEach((el) => el.classList.remove("rotated"));

      if (!active) {
        content.classList.add("active");
        icon.classList.add("rotated");
      }
    };

    // --- Smooth scroll ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    });

    // --- Observer para animaciones ---
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    document.querySelectorAll(".phase-card, .benefit-card").forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(40px)";
      card.style.transition = "all 0.6s ease";
      observer.observe(card);
    });

    // --- Cleanup ---
    return () => {
      clearInterval(id);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  // 👥 Registrar y escuchar visitas en tiempo real
  useEffect(() => {
    const ref = doc(db, "contador", "visitas");

    const registrarYEscucharVisitas = async () => {
      const snap = await getDoc(ref);

      // Si el doc no existe, créalo
      if (!snap.exists()) {
        await setDoc(ref, { total: 1 });
        setVisitas(1);
      } else {
        // Incrementa en 1 al ingresar
        await updateDoc(ref, { total: increment(1) });
      }

      // 🔁 Escucha en tiempo real
      const unsub = onSnapshot(ref, (snapshot) => {
        if (snapshot.exists()) {
          setVisitas(snapshot.data().total);
        }
      });

      // Limpieza del listener al desmontar el componente
      return () => unsub();
    };

    registrarYEscucharVisitas();
  }, []);

  useEffect(() => {
    const ref = doc(db, "interacciones", "likes");

    // Crear doc si no existe
    getDoc(ref).then((snap) => {
      if (!snap.exists()) {
        setDoc(ref, { total: 0 });
      }
    });

    // Escuchar en tiempo real
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setLikes(snap.data().total);
      }
    });

    // Revisar si ya dio like
    if (localStorage.getItem("liked") === "true") {
      setLiked(true);
    }

    return () => unsub();
  }, []);

  const handleLike = async () => {
    if (liked) return alert("Ya diste me gusta ❤️");

    const ref = doc(db, "interacciones", "likes");

    try {
      await updateDoc(ref, { total: increment(1) });
    } catch (err) {
      // Si el doc no existe aún
      await setDoc(ref, { total: 1 });
    }

    localStorage.setItem("liked", "true");
    setLiked(true);
    showConfetti();
  };

  const showConfetti = () => {
    const colors = ["#C41E3A", "#FFD700", "#ffffff", "#25d366"];
    const confettiCount = 35;

    const button = document.getElementById("likeButton");
    if (!button) return;

    const buttonRect = button.getBoundingClientRect();
    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.position = "fixed";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.borderRadius = "50%";
      confetti.style.pointerEvents = "none";
      confetti.style.zIndex = "9999";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = centerX + "px";
      confetti.style.top = centerY + "px";

      document.body.appendChild(confetti);

      const angle = (Math.PI * 2 * i) / confettiCount;
      const velocity = 80 + Math.random() * 120;
      const rotation = Math.random() * 360;

      confetti.animate(
        [
          { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
          {
            transform: `translate(${Math.cos(angle) * velocity}px, ${
              Math.sin(angle) * velocity
            }px) rotate(${rotation}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: 1000 + Math.random() * 400,
          easing: "cubic-bezier(0, .9, .57, 1)",
        }
      ).onfinish = () => confetti.remove();
    }
  };

  const handleCVClickc = async (dni, nombre) => {
    setLoadingDni(dni);

    // 1️⃣ Abrir PDF en popup (ajusta la ruta de tus PDFs)
    const pdfUrl = `/pdfs/${nombre.replace(/\s/g, "_")}.pdf`;
    window.open(pdfUrl, "_blank", "width=800,height=600");

    try {
      // 2️⃣ Incrementar contador de votos en Firebase
      const ref = doc(db, "votos", dni);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        await updateDoc(ref, { votos: increment(1) });
      } else {
        await setDoc(ref, { votos: 1 }); // Si no existe, crear
      }
    } catch (err) {
      console.error("Error al actualizar votos:", err.message);
    }

    setLoadingDni(null);
  };

  const handleCVClick = (dni, nombre) => {
    const pdfUrl = `/${nombre.replace(/\s/g, "_")}.pdf`;
    setSelectedCV({ dni, nombre, pdfUrl });
    setOpen(true);
  };

  const handleCloseCV = () => {
    setOpen(false);
    setSelectedCV(null);
  };

  // animar contador de visitas
  useEffect(() => {
    if (visitas == null) return; // Asegura que no sea undefined o null

    let current = 0;
    const target = visitas;
    const increment = Math.ceil(target / 50); // velocidad del conteo

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCountVisits(current);
    }, 20);

    return () => clearInterval(timer);
  }, [visitas]);

  useEffect(() => {
    if (likes == null) return; // Asegura que no sea undefined o null

    let current = 0;
    const target = likes;
    const increment = Math.ceil(target / 50); // velocidad del conteo

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCountLikes(current);
    }, 20);

    return () => clearInterval(timer);
  }, [likes]);
  return (
    <>
      <Analytics />
      {/*  <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Juan Alberto Jara "Frejol" - Marca x la Lista 1 - Propuesta 2025-2027 | CCDL</title>
        <meta name="description" content="Conoce la propuesta de Juan Alberto Jara 'Frejol' para el Club Cultural Deportivo Lima. Plan integral de trabajo 2025-2027: transparencia, modernización e inclusión." />
        <meta name="keywords" content="ACCCDL,CCDL, Club Cultural Deportivo Lima, Juan Alberto Jara Arias, Frejol, elecciones 2025, lista 1, propuesta electoral" />
        <meta name="author" content="Carlos Alberto Obregón Guerra" />*/}

      {/* Open Graph 
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jjclubcultural.vercel.app/" />
        <meta property="og:title" content="Juan Alberto Jara 'Frejol' - Marca x la Lista 1 - Unete al Cambio" />
        <meta property="og:description" content="Propuesta integral de la Lista 1 para transformar el Club Cultural Deportivo Lima. Transparencia, modernización e inclusión para todos los socios." />
        <meta property="og:image" content="https://jjclubcultural.vercel.app/logo_cultural_lima.png" />*/}

      {/* Twitter
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://jjclubcultural.vercel.app/" />
        <meta property="twitter:title" content="Juan Alberto Jara 'Frejol' - Marca x la Lista 1 - Unete al Cambio" />
        <meta property="twitter:description" content="Propuesta integral de la Lista 1 para transformar el Club Cultural Deportivo Lima." />
  <meta property="twitter:image" content="https://jjclubcultural.vercel.app/logo_cultural_lima.png"/>
        <link rel="icon" href="/logo.png" />
      </Head>  */}

      <style>{`/* Pega aquí todo el CSS original tal cual */`}</style>

      <div
        className={`site-bg ${showPopup ? "hidden" : ""}`}
        aria-hidden="true"
      ></div>

      <div className="page-content">
        <div className="scroll-progress" id="scroll-progress"></div>

        {/* Botón WhatsApp */}
        <a
          href="https://chat.whatsapp.com/HhDKe19pgl8EeggcRZjwxX"
          className="whatsapp-wrapper"
          target="_blank"
          aria-label="Únete al grupo de WhatsApp"
          title="¡Únete a nuestro grupo!"
        >
          <div className="whatsapp-float">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="30"
              height="30"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>

          <div className="whatsapp-text">Únete al cambio</div>
        </a>

        {/* --- Contenido principal (todoe tu HTML dentro de JSX) --- */}
        <section className="hero">
          <div className="hero-content">
            <div className="club-logo">
              <img
                src="/logo_cultural_lima.png"
                alt="Logo CCDL"
                className="logo"
              />
            </div>
            <h1>El corazón del CCDL late en cada uno de nosotros</h1>
            <div className="heart-container">
              {/* SVG del corazón */}
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
                  <filter
                    id="sombraCorazon"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
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
                  d="M120 195
             C110 180, 40 130, 40 80
             C40 45, 70 30, 95 40
             C110 45, 120 60, 120 60
             C120 60, 130 45, 145 40
             C170 30, 200 45, 200 80
             C200 130, 130 180, 120 195Z"
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
            {/* Botón para abrir el modal */}

            <h2
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                fontWeight: 600,
              }}
              className="btn-show-image"
              onClick={handleOpen}
            >
              Juan Alberto Jara "Frejol"
            </h2>
            <div className="candidate-row">
              <div>
                <div className="periodo-info">📅 Período de Gestión</div>
                <div
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 900,
                    color: "#FFD700",
                    marginTop: "0.5rem",
                  }}
                >
                  2025 - 2027
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="lista-badge">🏆 LISTA 1</div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "0.9rem",
                    marginTop: "0.8rem",
                  }}
                >
                  Candidato a Presidente
                </p>
              </div>
            </div>
            <div
              style={{
                borderTop: "2px solid rgba(255,255,255,0.2)",
                paddingTop: "1.5rem",
                marginTop: "1.5rem",
              }}
            ></div>
            <p>
              Nuestro Club Cultural Deportivo Lima merece una dirección
              visionaria, transparente y comprometida con el bienestar de todos
              sus socios.
            </p>
            <a
              href="#propuesta"
              className="cta-button"
              style={{ position: "relative" }}
            >
              Conoce nuestra Propuesta
            </a>
          </div>
        </section>

        {/* Contador */}
        <div className="countdown-section">
          <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            <span
              className="animation-element"
              style={{
                animation: "tilt-shaking 0.25s linear infinite",
                display: "inline-block",
              }}
            >
              ⏰
            </span>
            Faltan para las Elecciones
          </h3>
          <div className="countdown-container" id="countdown">
            <div className="countdown-item">
              <span id="days" className="countdown-number">
                00
              </span>
              <span className="countdown-label">Días</span>
            </div>
            <div className="countdown-item">
              <span id="hours" className="countdown-number">
                00
              </span>
              <span className="countdown-label">Horas</span>
            </div>
            <div className="countdown-item">
              <span id="minutes" className="countdown-number">
                00
              </span>
              <span className="countdown-label">Minutos</span>
            </div>
            <div className="countdown-item">
              <span id="seconds" className="countdown-number">
                00
              </span>
              <span className="countdown-label">Segundos</span>
            </div>
          </div>
          <h3
            style={{
              fontSize: "1.5rem",
              marginBottom: "0.5rem",
              marginTop: "10px",
              padding: "0.4rem 1rem",
              animation: "pulse 2s infinite",
            }}
          >
            Unete al cambio
          </h3>
        </div>
        <div className="section-divider"></div>
        <section id="propuesta" className="timeline">
          <div className="container">
            <h2>📋 Plan de Trabajo Integral - Lista 1</h2>

            <div className="phase-card" onClick={() => togglePhase(1)}>
              <div className="phase-header">
                <div className="phase-number">1</div>
                <div className="phase-title">
                  <h3>Saneamiento Inicial</h3>
                  <p>Poner la casa en orden</p>
                </div>
                <div className="phase-duration">Primeros 4-6 meses</div>
                <div className="expand-icon" id="icon-1">
                  ▼
                </div>
              </div>
              <div className="phase-content" id="content-1">
                <ul>
                  <li>
                    <strong>Auditoría completa:</strong> Financiera y legal para
                    total transparencia
                  </li>
                  <li>
                    <strong>Cierre de procesos:</strong> Resolver pendientes
                    legales
                  </li>
                  <li>
                    <strong>Reparaciones urgentes:</strong> Baños, duchas,
                    piscina y seguridad
                  </li>
                  <li>
                    <strong>Limpieza permanente:</strong> Empresa especializada
                    y mantenimiento preventivo
                  </li>
                </ul>
                <p>
                  <strong>Resultado:</strong> Club operativo, seguro y con
                  cuentas claras desde el primer semestre.
                </p>
              </div>
            </div>

            <div className="phase-card" onClick={() => togglePhase(2)}>
              <div className="phase-header">
                <div className="phase-number">2</div>
                <div className="phase-title">
                  <h3>Modernización Deportiva</h3>
                  <p>Elevando el nivel deportivo</p>
                </div>
                <div className="phase-duration">Meses 7-18</div>
                <div className="expand-icon" id="icon-2">
                  ▼
                </div>
              </div>
              <div className="phase-content" id="content-2">
                <ul>
                  <li>
                    <strong>Gimnasio renovado:</strong> Maquinaria moderna y
                    entrenadores certificados
                  </li>
                  <li>
                    <strong>Piscina temperada:</strong> Optimización de sistemas
                    existentes
                  </li>
                  <li>
                    <strong>Canchas renovadas:</strong> LED, drenaje y graderías
                    accesibles
                  </li>
                  <li>
                    <strong>Nueva Pista de atletismo:</strong> Disciplinas como:
                    Carreras, Saltos, Lanzamientos
                  </li>
                  <li>
                    <strong>Nuevos espacios:</strong> Salón multiuso y coworking
                  </li>
                  <li>
                    <strong>Ingresos adicionales:</strong> Membresías para no
                    socios y alianzas
                  </li>
                </ul>
                <p>
                  <strong>Resultado:</strong> Instalaciones deportivas de primer
                  nivel que generen ingresos propios.
                </p>
              </div>
            </div>

            <div className="phase-card" onClick={() => togglePhase(3)}>
              <div className="phase-header">
                <div className="phase-number">3</div>
                <div className="phase-title">
                  <h3>Inclusión y Servicios Sociales</h3>
                  <p>Un club para toda la familia</p>
                </div>
                <div className="phase-duration">Meses 19-30</div>
                <div className="expand-icon" id="icon-3">
                  ▼
                </div>
              </div>
              <div className="phase-content" id="content-3">
                <ul>
                  <li>
                    <strong>Centro para adultos mayores:</strong> Atención
                    médica y actividades
                  </li>
                  <li>
                    <strong>Accesibilidad universal:</strong> Rampas, braille,
                    vestuarios adaptados
                  </li>
                  <li>
                    <strong>Servicios de salud:</strong> Terapia física y
                    campañas preventivas
                  </li>
                  <li>
                    <strong>Espacios familiares:</strong> Área infantil y salón
                    de eventos
                  </li>
                  <li>
                    <strong>Nuevos espacios de parrilla:</strong> Nuevas Áreas
                    de parrillas y Camping
                  </li>
                  <li>
                    <strong>Convenios:</strong> Con aseguradoras y
                    municipalidades
                  </li>
                </ul>
                <p>
                  <strong>Resultado:</strong> Club inclusivo con servicios de
                  salud y programas sociales.
                </p>
              </div>
            </div>

            <div className="phase-card" onClick={() => togglePhase(4)}>
              <div className="phase-header">
                <div className="phase-number">4</div>
                <div className="phase-title">
                  <h3>Modernización y Expansión</h3>
                  <p>Tecnología y sostenibilidad</p>
                </div>
                <div className="phase-duration">Meses 31-36</div>
                <div className="expand-icon" id="icon-4">
                  ▼
                </div>
              </div>
              <div className="phase-content" id="content-4">
                <ul>
                  <li>
                    <strong>Tecnología:</strong> Acceso biométrico y cajeros
                    automáticos
                  </li>
                  <li>
                    <strong>Nuevos ingresos:</strong> Coworking, bar exclusivo,
                    biohuertos
                  </li>
                  <li>
                    <strong>Zona de mascotas:</strong> Espacios mejorados para
                    recreación
                  </li>
                  <li>
                    <strong>Energía renovable:</strong> Paneles solares y bombas
                    eficientes
                  </li>
                  <li>
                    <strong>Autosostenibilidad:</strong> Reducción de costos
                    energéticos
                  </li>
                </ul>
                <p>
                  <strong>Resultado:</strong> Club moderno, tecnológico y
                  ambientalmente responsable.
                </p>
              </div>
            </div>

            <div className="phase-card" onClick={() => togglePhase(5)}>
              <div className="phase-header">
                <div className="phase-number">5</div>
                <div className="phase-title">
                  <h3>Proyectos de Largo Plazo</h3>
                  <p>Cultura y deporte de élite</p>
                </div>
                <div className="phase-duration">Desarrollo continuo</div>
                <div className="expand-icon" id="icon-5">
                  ▼
                </div>
              </div>
              <div className="phase-content" id="content-5">
                <ul>
                  <li>
                    <strong>Infraestructura cultural:</strong> Salones y capilla
                    renovados
                  </li>
                  <li>
                    <strong>Deporte de alto nivel:</strong> Canchas de pádel y
                    gimnasio de élite
                  </li>
                  <li>
                    <strong>Transporte inteligente:</strong> Alquiler vs. compra
                    de vehículos
                  </li>
                  <li>
                    <strong>Eventos corporativos:</strong> Franquicias
                    autorizadas
                  </li>
                  <li>
                    <strong>Capacitación:</strong> Personal profesional y
                    actualizado
                  </li>
                </ul>
                <p>
                  <strong>Resultado:</strong> Club integral con servicios
                  premium y diversificación de ingresos.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="section-divider"></div>
        <section className="benefits-section">
          <div className="container">
            <h2>🎯 Beneficios para Nuestros Socios</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Beneficios Inmediatos</h3>
                <p>
                  Instalaciones limpias, servicios básicos funcionando,
                  tranquilidad legal y financiera desde el primer día.
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🏋️</div>
                <h3>Mediano Plazo</h3>
                <p>
                  Gimnasio moderno, actividades deportivas renovadas, piscina
                  temperada y espacios de calidad.
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🏆</div>
                <h3>Largo Plazo</h3>
                <p>
                  Club integral familiar, servicios de salud preventiva,
                  tecnología moderna y entretenimiento diversificado.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="section-divider"></div>

        <section className="transparency-section">
          <div className="container">
            <h2>👥 Nuestro Equipo de Trabajo</h2>

            <p
              style={{
                textAlign: "center",
                maxWidth: "800px",
                margin: "0 auto 2rem",
                fontSize: "1.1rem",
                color: "#666",
              }}
            >
              Contamos con un equipo de profesionales comprometidos y expertos
              en sus áreas para llevar adelante esta transformación.
            </p>

            <div
              id="team-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
                marginBottom: "4rem",
              }}
            >
              {/* Los miembros del equipo se agregarán aquí mediante JavaScript */}
              <div
                className="team-member-card"
                style={{
                  opacity: 0.9,
                  transform: "translateY(0px)",
                  transition: "0.6s",
                  gridColumn: "1 / -1",
                  maxWidth: "800px",
                  margin: "0px auto",
                }}
              >
                <div
                  className="team-photo"
                  style={{ height: "200px", fontSize: "6rem" }}
                >
                  <img
                    src="cabecera.png"
                    alt="Profesionales Comprometidos con el Cambio"
                  />
                </div>
                <div className="team-info">
                  <div className="team-name">
                    Profesionales Comprometidos con el Cambio
                  </div>
                  <div className="team-role">
                    Lista 1 - Consejo Directivo 2025 - 2027
                  </div>
                  <div
                    className="team-description"
                    style={{
                      textAlign: "center",
                      fontSize: "1rem",
                      lineHeight: "1.8",
                    }}
                  >
                    Un equipo sólido de 17 profesionales comprometidos con la
                    transformación del Club Cultural Deportivo Lima. Cada
                    miembro aporta experiencia, dedicación y pasión para
                    trabajar juntos en beneficio de todos los socios,
                    garantizando transparencia, modernización e inclusión en
                    cada decisión.
                  </div>
                  {/* Imagen de la lista de candidatos */}
                  <div
                    className="image-container"
                    style={{ textAlign: "center", margin: "2rem" }}
                  >
                    <img
                      src="/Lista_1.jpg"
                      alt="Lista 1 - Consejo Directivo 2025-2027"
                      className="team-list-image"
                      id="teamListImage"
                      onClick={() => setIsModalOpen(true)}
                      style={{
                        cursor: "pointer",
                        transition: "0.3s",
                        borderRadius: "10px",
                      }}
                    />
                    <p
                      style={{
                        color: "#666",
                        fontSize: "0.9rem",
                        marginTop: "1rem",
                      }}
                    >
                      👆 Haz clic en la imagen para ampliarla
                    </p>
                  </div>

                  <div>
                    <h3
                      style={{
                        textAlign: "center",
                        color: "#0D4F8B",
                        fontSize: "1.5rem",
                        margin: "2rem 0 1rem",
                      }}
                    >
                      📋 Integrantes de la Lista 1
                    </h3>
                    <table
                      className="candidatos-table"
                      style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                      <thead>
                        <tr>
                          <th className="col-item">Ítem</th>
                          <th>Apellidos y Nombres</th>
                          <th>Cargo</th>
                          <th className="col-dni">DNI</th>
                          <th className="col-codigo">Código</th>
                          <th>CV</th>
                        </tr>
                      </thead>
                      <tbody id="candidatosBody">
                        {votosData.map((candidato) => (
                          <tr key={candidato.dni}>
                            <td
                              className="col-item"
                              style={{ fontWeight: 600 }}
                            >
                              {candidato.item}
                            </td>
                            <td style={{ fontWeight: 500 }}>
                              {candidato.nombre}
                            </td>
                            <td>
                              <span className="cargo-badge">
                                {candidato.cargo}
                              </span>
                            </td>
                            <td className="col-dni">{candidato.dni}</td>
                            <td
                              className="col-codigo"
                              style={{ color: "#C41E3A", fontWeight: 600 }}
                            >
                              {candidato.codigo}
                            </td>
                            <td>
                              <button
                                className="cv-button"
                                onClick={() =>
                                  handleCVClick(candidato.dni, candidato.nombre)
                                }
                                disabled={loadingDni === candidato.dni}
                              >
                                {loadingDni === candidato.dni
                                  ? "Contando..."
                                  : "Ver CV"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Modal para imagen ampliada */}
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              zIndex: 1000,
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
              animation: "fadeIn 0.3s ease",
            }}
            onClick={() => setIsModalOpen(false)} // cierra si se hace clic fuera de la imagen
          >
            <span
              style={{
                position: "absolute",
                top: "15px",
                right: "25px",
                color: "#fff",
                fontSize: "40px",
                fontWeight: "bold",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <img
              src="/Lista_1.jpg"
              alt="Imagen ampliada"
              style={{
                width: "100%",
                maxWidth: "800px",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 0 20px rgba(255,255,255,0.3)",
                animation: "zoomIn 0.3s ease",
              }}
              onClick={(e) => e.stopPropagation()} // evita cerrar al hacer clic en la imagen
            />
          </div>
        )}
        {/* Aquí continúa tu HTML original (timeline, phases, etc.) */}
        <div className="section-divider"></div>

        <section
          className="transparency-section"
          style={{ background: "white" }}
        >
          <div className="container">
            <h2>🔍 Compromiso con la Transparencia</h2>

            <div className="commitment-grid">
              <div className="commitment-card">
                <div className="commitment-icon">📊</div>
                <h3>Reportes Mensuales</h3>
                <p>
                  Informes financieros detallados y auditorías externas
                  regulares.
                </p>
              </div>

              <div className="commitment-card">
                <div className="commitment-icon">🗳️</div>
                <h3>Participación Democrática</h3>
                <p>
                  Asambleas trimestrales y comités de socios por áreas de
                  interés.
                </p>
              </div>

              <div className="commitment-card">
                <div className="commitment-icon">💻</div>
                <h3>Plataforma Digital</h3>
                <p>
                  Sistema online para votaciones, sugerencias y seguimiento de
                  proyectos.
                </p>
              </div>

              <div className="commitment-card">
                <div className="commitment-icon">🌱</div>
                <h3>Sostenibilidad</h3>
                <p>
                  Energías renovables, eficiencia energética y
                  autosostenibilidad económica.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <h3>🤝 Juntos Construiremos el Futuro de Nuestro Club</h3>
            <p>
              Nuestro compromiso es trabajar con transparencia, eficiencia y
              dedicación para hacer realidad esta visión de progreso para
              nuestro querido Club Cultural Deportivo Lima.
            </p>

            <div className="contact-info">
              <div>
                <h4>📱 Juan Alberto Jara "Frejol" te escucha</h4>
                <p className="likes-note">
                  Escanea el código QR para unirte a nuestro grupo de WhatsApp
                </p>

                <a
                  href="https://chat.whatsapp.com/HhDKe19pgl8EeggcRZjwxX"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      background: "white",
                      padding: "1.5rem",
                      borderRadius: "15px",
                      display: "inline-block",
                      marginTop: "1rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      border: "3px solid transparent",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "#25D366";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <img
                      src="qr-code-whatsapp.png"
                      alt="QR de WhatsApp - Frejol"
                      style={{ width: "100%", height: "100%" }}
                    />
                    <p
                      style={{
                        color: "#0D4F8B",
                        fontWeight: "bold",
                        marginTop: "0.5rem",
                        animation: "pulse 2s infinite",
                        lineHeight: 1,
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      👆 Únete al cambio
                    </p>
                  </div>
                </a>
              </div>
              <div className="container">
                <h4>👍 ¿Te gusta nuestra propuesta?</h4>
                <p className="likes-note">
                  Tu apoyo nos motiva a seguir trabajando por el cambio que
                  nuestro club merece.
                </p>
                <button
                  id="likeButton"
                  className={`like-button ${liked ? "liked" : ""}`}
                  onClick={handleLike}
                  disabled={liked}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="red"
                    style={{ marginRight: "8px" }}
                  >
                    <path d="M7.5 4.5C9.25 4.5 10.75 5.75 12 7.5C13.25 5.75 14.75 4.5 16.5 4.5C19.54 4.5 22 6.96 22 10C22 15 16.5 19 12 21.5C7.5 19 2 15 2 10C2 6.96 4.46 4.5 7.5 4.5Z" />
                  </svg>
                  <span id="buttonText">
                    {" "}
                    {liked ? "¡Gracias por tu apoyo!" : "Me gusta la propuesta"}
                  </span>
                </button>

                <p className="likes-note">
                  💡 Cada voto cuenta para hacer realidad esta transformación
                </p>
              </div>
              <div>
                <h4>🌐 Síguenos en Redes Sociales</h4>
                <p className="likes-note">
                  Mantente informado sobre nuestra propuesta y comparte el
                  cambio.
                </p>

                <div className="social-buttons">
                  <a
                    href="https://www.facebook.com/profile.php?id=JJclubcultural"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-button facebook"
                    aria-label="Síguenos en Facebook"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                    </svg>
                    <span>Facebook</span>
                  </a>

                  <a
                    href="https://www.instagram.com/JJclubcultural"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-button instagram"
                    aria-label="Síguenos en Instagram"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                    </svg>
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
              <div>
                <h4>📊 Estadísticas en Tiempo Real</h4>
                <p className="likes-note">🤝 Construyendo Juntos el Cambio</p>
                <div className="likes-counter">
                  <div className="counter-box">
                    <span className="counter-number" id="likesCount">
                      {countLikes.toLocaleString()}
                    </span>
                    <span className="counter-label">
                      socios apoyan el cambio.
                    </span>
                  </div>
                </div>
                <div className="likes-counter">
                  <div className="counter-box">
                    <span className="counter-number" id="likesCountx">
                      {countVisits.toLocaleString()}
                    </span>
                    <span className="counter-label">visitas registradas.</span>
                  </div>
                </div>
                <p className="likes-note">
                  💡 Gracias por tomarte el tiempo de conocer nuestra propuesta
                </p>
              </div>
            </div>

            <p style={{ marginTop: "2rem", opacity: 0.8 }}>
              © 2025 -{" "}
              <span style={{ fontWeight: "bolder" }}>
                Juan Alberto Jara "Frejol" - Lista 1
              </span>
              <br />
              Club Cultural Deportivo Lima
            </p>
          </div>
        </footer>

        {/* Modal */}
        {showPopup && (
          <div className="popup-overlay" onClick={() => setShowPopup(false)}>
            <span
              style={{
                position: "absolute",
                top: "15px",
                right: "25px",
                color: "#fff",
                fontSize: "40px",
                fontWeight: "bold",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => setShowPopup(false)}
            >
              &times;
            </span>
            <div
              className="popup-image"
              onClick={(e) => e.stopPropagation()} // evita cerrar al click dentro de la imagen
            >
              <img
                src="/IMG_20251010_171914-Photoroom.png"
                alt="Campaña"
                onClick={(e) => e.stopPropagation()} // evita cerrar al hacer clic en la imagen
              />
            </div>
          </div>
        )}

        {/* Modal para mostrar PDF */}
        {open && selectedCV && (
          <div className="modal-overlay">
            <div className="modal-container">
              {/* Encabezado */}
              <div className="modal-header">
                <h3 className="text-lg font-semibold">
                  CV - {selectedCV.nombre}
                </h3>
                <button onClick={handleCloseCV} className="modal-close">
                  ×
                </button>
              </div>

              {/* PDF */}
              <iframe
                src={`https://docs.google.com/gview?embedded=true&url=${window.location.origin}/pdfs/${selectedCV.pdfUrl}`}
                className="modal-iframe"
                title={`CV - ${selectedCV.nombre}`}
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
