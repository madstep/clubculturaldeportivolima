"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Animación de latido del corazón
    const heart = document.querySelector(".heart");
    if (heart) {
      heart.style.animation = "pulse 2s infinite";
    }
  }, []);

  return (
    <main>
    <div className="site-bg" aria-hidden="true"></div>

  <!-- envuelve todo tu contenido en este wrapper -->
  <div className="page-content">
    <div className="scroll-progress" id="scroll-progress"></div>
        <!-- Botón flotante de WhatsApp -->
        <a href="https://chat.whatsapp.com/HhDKe19pgl8EeggcRZjwxX" 
           className="whatsapp-float" 
           target="_blank" 
           aria-label="Únete al grupo de WhatsApp"
           title="¡Únete a nuestro grupo!">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30" height="30">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
        </a>

    <section className="hero">
        <div className="hero-content">
            
            <div className="club-logo">
              <img src="logo_cultural_lima.png" alt="Logo CCDL" className="logo">
            </div>
            <h1>El corazón del CCDL late en cada uno de nosotros</h1>
<div className="heart-container">
  <svg role="img" aria-labelledby="titleDesc" viewBox="0 0 240 220"
       xmlns="http://www.w3.org/2000/svg"
       style="width:160px; height:auto; display:block; margin:0 auto;">
    <title id="titleDesc">Marca el número 1</title>

    <!-- Definición de sombra -->
    <defs>
      <filter id="sombraCorazon" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.35"/>
      </filter>
    </defs>

    <!-- Corazón redondeado sin colita -->
    <path d="M120 195
             C110 180, 40 130, 40 80
             C40 45, 70 30, 95 40
             C110 45, 120 60, 120 60
             C120 60, 130 45, 145 40
             C170 30, 200 45, 200 80
             C200 130, 130 180, 120 195Z"
          fill="#ffffff"
          filter="url(#sombraCorazon)" />

    <!-- Texto: MARCA EL # (más arriba) -->
    <text x="120" y="90" text-anchor="middle"
          fill="#0D4F8B" font-family="Montserrat, Arial, sans-serif"
          font-weight="700" font-size="18" letter-spacing="0.6">
      MARCA EL #
    </text>

    <!-- Texto: 1 (rojo con sombra) -->
    <text x="120" y="150" text-anchor="middle"
          fill="#C41E3A" font-family="Montserrat, Arial Black, sans-serif"
          font-weight="900" font-size="64"
          style="filter: drop-shadow(2px 2px 4px rgba(196, 30, 58, 0.3));">
      1
    </text>
  </svg>
</div>

            </div>
            <h2 style="font-size: 2rem; margin-bottom: 1rem; font-weight: 600;">Juan Alberto Jara "Frejol"</h2>
            <p style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">2025 - 2027</p>
            <p>Nuestro Club Cultural Deportivo Lima merece una dirección visionaria, transparente y comprometida con el bienestar de todos sus socios.</p>
            <a href="#propuesta" className="cta-button" style="position: relative;">Conoce nuestra Propuesta</a>
        </div>
    </section>
 <!-- Contador regresivo -->
        <div className="countdown-section">
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">⏰ Faltan para las Elecciones</h3>
            <div className="countdown-container" id="countdown">
                <div className="countdown-item">
                    <span className="countdown-number" id="days">00</span>
                    <span className="countdown-label">Días</span>
                </div>
                <div className="countdown-item">
                    <span className="countdown-number" id="hours">00</span>
                    <span className="countdown-label">Horas</span>
                </div>
                <div className="countdown-item">
                    <span className="countdown-number" id="minutes">00</span>
                    <span className="countdown-label">Minutos</span>
                </div>
                <div className="countdown-item">
                    <span className="countdown-number" id="seconds">00</span>
                    <span className="countdown-label">Segundos</span>
                </div>
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;margin-top: 10px;"> Unete al cambio </h3>
        </div>
    <div className="section-divider"></div>

    <section id="propuesta" className="timeline">
        <div className="container">
            <h2>📋 Plan de Trabajo Integral - Lista 1</h2>
            
            <div className="phase-card" onclick="togglePhase(1)">
                <div className="phase-header">
                    <div className="phase-number">1</div>
                    <div className="phase-title">
                        <h3>Saneamiento Inicial</h3>
                        <p>Poner la casa en orden</p>
                    </div>
                    <div className="phase-duration">Primeros 4-6 meses</div>
                    <div className="expand-icon" id="icon-1">▼</div>
                </div>
                <div className="phase-content" id="content-1">
                    <ul>
                        <li><strong>Auditoría completa:</strong> Financiera y legal para total transparencia</li>
                        <li><strong>Cierre de procesos:</strong> Resolver pendientes legales</li>
                        <li><strong>Reparaciones urgentes:</strong> Baños, duchas, piscina y seguridad</li>
                        <li><strong>Limpieza permanente:</strong> Empresa especializada y mantenimiento preventivo</li>
                    </ul>
                    <p><strong>Resultado:</strong> Club operativo, seguro y con cuentas claras desde el primer semestre.</p>
                </div>
            </div>

            <div className="phase-card" onclick="togglePhase(2)">
                <div className="phase-header">
                    <div className="phase-number">2</div>
                    <div className="phase-title">
                        <h3>Modernización Deportiva</h3>
                        <p>Elevando el nivel deportivo</p>
                    </div>
                    <div className="phase-duration">Meses 7-18</div>
                    <div className="expand-icon" id="icon-2">▼</div>
                </div>
                <div className="phase-content" id="content-2">
                    <ul>
                        <li><strong>Gimnasio renovado:</strong> Maquinaria moderna y entrenadores certificados</li>
                        <li><strong>Piscina temperada:</strong> Optimización de sistemas existentes</li>
                        <li><strong>Canchas renovadas:</strong> LED, drenaje y graderías accesibles</li>
                        <li><strong>Nueva Pista de atletismo:</strong> Disciplinas como: Carreras, Saltos, Lanzamientos</li>
                        <li><strong>Nuevos espacios:</strong> Salón multiuso y coworking</li>
                        <li><strong>Ingresos adicionales:</strong> Membresías para no socios y alianzas</li>
                    </ul>
                    <p><strong>Resultado:</strong> Instalaciones deportivas de primer nivel que generen ingresos propios.</p>
                </div>
            </div>

            <div className="phase-card" onclick="togglePhase(3)">
                <div className="phase-header">
                    <div className="phase-number">3</div>
                    <div className="phase-title">
                        <h3>Inclusión y Servicios Sociales</h3>
                        <p>Un club para toda la familia</p>
                    </div>
                    <div className="phase-duration">Meses 19-30</div>
                    <div className="expand-icon" id="icon-3">▼</div>
                </div>
                <div className="phase-content" id="content-3">
                    <ul>
                        <li><strong>Centro para adultos mayores:</strong> Atención médica y actividades</li>
                        <li><strong>Accesibilidad universal:</strong> Rampas, braille, vestuarios adaptados</li>
                        <li><strong>Servicios de salud:</strong> Terapia física y campañas preventivas</li>
                        <li><strong>Espacios familiares:</strong> Área infantil y salón de eventos</li>
                        <li><strong>Nuevos espacios de parrilla:</strong> Nuevas Áreas de parrillas y Camping</li>
                        <li><strong>Convenios:</strong> Con aseguradoras y municipalidades</li>
                    </ul>
                    <p><strong>Resultado:</strong> Club inclusivo con servicios de salud y programas sociales.</p>
                </div>
            </div>

            <div className="phase-card" onclick="togglePhase(4)">
                <div className="phase-header">
                    <div className="phase-number">4</div>
                    <div className="phase-title">
                        <h3>Modernización y Expansión</h3>
                        <p>Tecnología y sostenibilidad</p>
                    </div>
                    <div className="phase-duration">Meses 31-36</div>
                    <div className="expand-icon" id="icon-4">▼</div>
                </div>
                <div className="phase-content" id="content-4">
                    <ul>
                        <li><strong>Tecnología:</strong> Acceso biométrico y cajeros automáticos</li>
                        <li><strong>Nuevos ingresos:</strong> Coworking, bar exclusivo, biohuertos</li>
                        <li><strong>Zona de mascotas:</strong> Espacios mejorados para recreación</li>
                        <li><strong>Energía renovable:</strong> Paneles solares y bombas eficientes</li>
                        <li><strong>Autosostenibilidad:</strong> Reducción de costos energéticos</li>
                    </ul>
                    <p><strong>Resultado:</strong> Club moderno, tecnológico y ambientalmente responsable.</p>
                </div>
            </div>

            <div className="phase-card" onclick="togglePhase(5)">
                <div className="phase-header">
                    <div className="phase-number">5</div>
                    <div className="phase-title">
                        <h3>Proyectos de Largo Plazo</h3>
                        <p>Cultura y deporte de élite</p>
                    </div>
                    <div className="phase-duration">Desarrollo continuo</div>
                    <div className="expand-icon" id="icon-5">▼</div>
                </div>
                <div className="phase-content" id="content-5">
                    <ul>
                        <li><strong>Infraestructura cultural:</strong> Salones y capilla renovados</li>
                        <li><strong>Deporte de alto nivel:</strong> Canchas de pádel y gimnasio de élite</li>
                        <li><strong>Transporte inteligente:</strong> Alquiler vs. compra de vehículos</li>
                        <li><strong>Eventos corporativos:</strong> Franquicias autorizadas</li>
                        <li><strong>Capacitación:</strong> Personal profesional y actualizado</li>
                    </ul>
                    <p><strong>Resultado:</strong> Club integral con servicios premium y diversificación de ingresos.</p>
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
                    <p>Instalaciones limpias, servicios básicos funcionando, tranquilidad legal y financiera desde el primer día.</p>
                </div>
                <div className="benefit-card">
                    <div className="benefit-icon">🏋️</div>
                    <h3>Mediano Plazo</h3>
                    <p>Gimnasio moderno, actividades deportivas renovadas, piscina temperada y espacios de calidad.</p>
                </div>
                <div className="benefit-card">
                    <div className="benefit-icon">🏆</div>
                    <h3>Largo Plazo</h3>
                    <p>Club integral familiar, servicios de salud preventiva, tecnología moderna y entretenimiento diversificado.</p>
                </div>
            </div>
        </div>
    </section>

    <div className="section-divider"></div>

    <section className="transparency-section">
        <div className="container">
            <h2>👥 Nuestro Equipo de Trabajo</h2>
            <p style="text-align: center; max-width: 800px; margin: 0 auto 2rem; font-size: 1.1rem; color: #666;">
                Contamos con un equipo de profesionales comprometidos y expertos en sus áreas para llevar adelante esta transformación
            </p>

           <div id="team-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 4rem;">
                <!-- Los miembros del equipo se agregarán aquí mediante JavaScript -->
            <div className="team-member-card" style="opacity: 0.9; transform: translateY(0px); transition: 0.6s; grid-column: 1 / -1; max-width: 800px; margin: 0px auto;">
                <div className="team-photo" style="height: 200px; font-size: 6rem;">
                    <img src="cabecera.png" alt="Profesionales Comprometidos con el Cambio">
                </div>
                <div className="team-info">
                    <div className="team-name">Profesionales Comprometidos con el Cambio</div>
                    <div className="team-role">Lista 1 - Consejo Directivo 2025 - 2027</div>
                    <div className="team-description" style="text-align: center; font-size: 1rem; line-height: 1.8;">Un equipo sólido de 17 profesionales comprometidos con la transformación del Club Cultural Deportivo Lima. Cada miembro aporta experiencia, dedicación y pasión para trabajar juntos en beneficio de todos los socios, garantizando transparencia, modernización e inclusión en cada decisión.</div>
                    <!-- Imagen de la lista de candidatos -->
                    <div className="image-container" style="text-align: center; margin-bottom: 3rem;">
                        <img src="Lista_1.jpg" 
                            alt="Lista 1 - Consejo Directivo 2025-2027" 
                            className="team-list-image" 
                            id="teamListImage" 
                            onclick="openModal()">
                        <p style="color: #666; font-size: 0.9rem; margin-top: 1rem;">
                            👆 Haz clic en la imagen para ampliarla
                        </p>
                    </div>
                </div>
            </div></div>
            
        </div>
    </section>

    <!-- Modal para imagen ampliada -->
    <div id="imageModal" style="
    display: none; 
    position: fixed; 
    z-index: 1000; 
    left: 0; top: 0; 
    width: 100%; height: 100%;
    background-color: rgba(0,0,0,0.8); 
    justify-content: center; 
    align-items: center;
    padding: 1rem;
    animation: fadeIn 0.3s ease;
">
    <span style="
        position: absolute; 
        top: 15px; 
        right: 25px; 
        color: #fff; 
        font-size: 40px; 
        font-weight: bold; 
        cursor: pointer;
        user-select: none;
    " onclick="closeModal()">&times;</span>

    <img id="modalImage" src="Lista_1.jpg" style="
        width: 100%;
        max-width: 800px;
        height: auto;
        border-radius: 10px; 
        box-shadow: 0 0 20px rgba(255,255,255,0.3);
        animation: zoomIn 0.3s ease;
    ">
</div>

    <div className="section-divider"></div>

    <section className="transparency-section" style="background: white;">
        <div className="container">
            <h2>🔍 Compromiso con la Transparencia</h2>
            <div className="commitment-grid">
                <div className="commitment-card">
                    <div className="commitment-icon">📊</div>
                    <h3>Reportes Mensuales</h3>
                    <p>Informes financieros detallados y auditorías externas regulares</p>
                </div>
                <div className="commitment-card">
                    <div className="commitment-icon">🗳️</div>
                    <h3>Participación Democrática</h3>
                    <p>Asambleas trimestrales y comités de socios por áreas de interés</p>
                </div>
                <div className="commitment-card">
                    <div className="commitment-icon">💻</div>
                    <h3>Plataforma Digital</h3>
                    <p>Sistema online para votaciones, sugerencias y seguimiento de proyectos</p>
                </div>
                <div className="commitment-card">
                    <div className="commitment-icon">🌱</div>
                    <h3>Sostenibilidad</h3>
                    <p>Energías renovables, eficiencia energética y autosostenibilidad económica</p>
                </div>
            </div>
        </div>
    </section>

    <footer className="footer">
        <div className="container">
            <h3>🤝 Juntos Construiremos el Futuro de Nuestro Club</h3>
            <p>Nuestro compromiso es trabajar con transparencia, eficiencia y dedicación para hacer realidad esta visión de progreso para nuestro querido Club Cultural Deportivo Lima.</p>
            <div className="contact-info">
                <div>
                    <h4>📱 Juan Alberto Jara "Frejol" te escucha</h4>
                    <p>Escanea el código QR para unirte a nuestro grupo de WhatsApp</p>
                    <a href="https://chat.whatsapp.com/HhDKe19pgl8EeggcRZjwxX" target="_blank" style="text-decoration: none;">
                        <div style="background: white; padding: 1.5rem; border-radius: 15px; display: inline-block; margin-top: 1rem; cursor: pointer; transition: all 0.3s ease; border: 3px solid transparent;" onmouseover="this.style.borderColor='#25D366'; this.style.transform='scale(1.05)'" onmouseout="this.style.borderColor='transparent'; this.style.transform='scale(1)'">
                            <img src="qr-code-whatsapp.png" alt="Logo CCDL" style="width: auto; height: 150px;">
							<p style="color: #0D4F8B; font-weight: bold; margin-top: 0.5rem;">👆 Únete al grupo</p>
                        </div>
                    </a>
                </div>
                <div>
                    <h4>🗓️ Cronograma</h4>
                    <p>Implementación por fases con transparencia total</p>
                </div>
                <div>
                    <h4>💡 Propuestas</h4>
                    <p>Siempre abierto a nuevas ideas de nuestros socios</p>
                </div>
            </div>
            <p style="margin-top: 2rem; opacity: 0.8;">© 2025 - <x style="font-weight:bolder;">Juan Alberto Jara "Frejol" - Lista 1</x><br>Club Cultural Deportivo Lima</p>
        </div>
    </footer>
    </main>
  );
}