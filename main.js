import "https://cdn.jsdelivr.net/npm/zone.js@0.14.7/dist/zone.min.js";
import { Component, signal } from "https://cdn.jsdelivr.net/npm/@angular/core@17.3.5/+esm";
import { bootstrapApplication } from "https://cdn.jsdelivr.net/npm/@angular/platform-browser@17.3.5/+esm";

const heroBackground =
  "https://images.unsplash.com/photo-1528747008803-1c1c1c9c19b4?auto=format&fit=crop&w=1600&q=80";

const calendlyUrl =
  "https://calendly.com/sample-landing-consulta/consulta-estrategica";

@Component({
  selector: "app-root",
  standalone: true,
  template: `
    <div class="page" [style.backgroundImage]="bgImage()">
      <header class="hero" role="banner">
        <div class="overlay"></div>
        <div class="hero__content">
          <div>
            <p class="eyebrow">Despacho especializado en Chile</p>
            <h1>Contacto Jurídico</h1>
            <p class="tagline">
              Tu aliado en asuntos inmobiliarios, tributarios y contables.
            </p>
            <p class="value">
              Diagnóstico claro, vías rápidas para regularizar propiedades y
              estrategias fiscales diseñadas para inversionistas y empresas.
            </p>
            <div class="hero__actions">
              <a class="btn primary" href="#agenda">Reserva tu consulta jurídica gratis</a>
              <a class="btn ghost" href="#bio">Ver credenciales de Luis Vera</a>
            </div>
            <div class="hero__chips" aria-label="Servicios clave">
              <span>Defensa y saneamiento registral</span>
              <span>Estrategia tributaria y contable</span>
              <span>Due diligence y remates</span>
            </div>
          </div>
          <div class="card glass" id="agenda">
            <h2>Agenda inmediata</h2>
            <p>Elige tu horario sin salir del sitio.</p>
            <div
              class="calendly-inline-widget"
              data-url="${calendlyUrl}"
              style="min-width: 320px; height: 520px"
              aria-label="Widget de agenda Calendly"
            ></div>
            <p class="small muted">
              Sin presión: solo pedimos nombre, correo y fecha preferida. Recibirás
              confirmación automática.
            </p>
          </div>
        </div>
      </header>

      <main>
        <section class="section bio" id="bio">
          <div class="section__title">Sobre el abogado</div>
          <div class="bio__grid">
            <div>
              <h3>Luis Rafael Alberto Vera Vidal</h3>
              <p>
                Abogado chileno experto en derecho inmobiliario, registral,
                tributario y urbanístico. Magíster en Derecho Registral e
                Inmobiliario y en Gestión Tributaria. Ha liderado litigios, remates
                judiciales, creación de sociedades y estrategias de flipping
                inmobiliario, integrando visión legal, contable y de negocio.
              </p>
              <ul class="bullet-grid">
                <li>Ha dirigido casos en SII, Cortes y Tribunales con enfoque táctico.</li>
                <li>Diseña estructuras societarias en ecosistema Sosercom / InvertChile.</li>
                <li>Experto en regularización registral y recuperación de plusvalía.</li>
                <li>Magíster doble: Derecho Registral e Inmobiliario · Gestión Tributaria.</li>
              </ul>
            </div>
            <div class="card accent">
              <h4>Oferta única</h4>
              <p class="muted">Una sola acción: agenda tu consulta gratuita.</p>
              <div class="mini-metrics">
                <div>
                  <strong>48h</strong>
                  <span>Diagnóstico inicial</span>
                </div>
                <div>
                  <strong>+15 años</strong>
                  <span>Experiencia litigando y estructurando inversión</span>
                </div>
                <div>
                  <strong>Mandatos vigentes</strong>
                  <span>Propiedades listas para flipping</span>
                </div>
              </div>
              <a class="btn primary full" href="#agenda">Agendar ahora</a>
            </div>
          </div>
        </section>

        <section class="section services" aria-labelledby="servicios">
          <div class="section__title" id="servicios">Servicios legales y contables</div>
          <div class="cards">
            <article class="card">
              <h4>Inmobiliario y registral</h4>
              <p>Debida diligencia, saneamiento de títulos, subdivisiones y regularización.</p>
              <ul>
                <li>Remates judiciales y toma de posesión segura.</li>
                <li>Gestión de propiedades para flipping con viabilidad previa.</li>
                <li>Defensa en juicios posesorios y registrales.</li>
              </ul>
            </article>
            <article class="card">
              <h4>Tributario y contable</h4>
              <p>Planificación fiscal y cumplimiento para inversionistas y empresas.</p>
              <ul>
                <li>Revisiones SII, devoluciones y mitigación de contingencias.</li>
                <li>Diseño contable para proyectos inmobiliarios y sociedades.</li>
                <li>Estrategias de ahorro tributario aplicadas a flipping.</li>
              </ul>
            </article>
            <article class="card">
              <h4>Corporativo y societario</h4>
              <p>Estructuración de vehículos de inversión y acompañamiento continuo.</p>
              <ul>
                <li>Creación y gobierno de sociedades con pactos robustos.</li>
                <li>Contratos de promesa, leasing y alianzas con constructoras.</li>
                <li>Resolución de conflictos societarios con salida negociada.</li>
              </ul>
            </article>
          </div>
        </section>

        <section class="section properties" aria-labelledby="propiedades">
          <div class="section__title" id="propiedades">Propiedades en mandato para flipping</div>
          <p class="muted">
            Mandato de venta activo y estudio de viabilidad completado. Oportunidades
            listas para ejecución inmediata.
          </p>
          <div class="cards properties__grid">
            <article class="card property">
              <div class="property__badge">Mandato vigente</div>
              <h5>Casa urbana 3D/2B</h5>
              <p>Sector consolidado. Lista para renovación completa de cocina, baños y fachada.</p>
              <span class="tag">Plusvalía inmediata</span>
            </article>
            <article class="card property">
              <div class="property__badge">Mandato vigente</div>
              <h5>Parcela rural 5.000 m²</h5>
              <p>Alto potencial de subdivisión y regularización de accesos.</p>
              <span class="tag">Proyecto parcelación</span>
            </article>
            <article class="card property">
              <div class="property__badge">Mandato vigente</div>
              <h5>Departamento céntrico</h5>
              <p>Optimizable para arriendo corporativo. Mejora de layout y home staging.</p>
              <span class="tag">Cashflow rápido</span>
            </article>
            <article class="card property">
              <div class="property__badge">Mandato vigente</div>
              <h5>Terreno urbano esquinero</h5>
              <p>Viabilidad para local comercial + vivienda. Licencias en proceso.</p>
              <span class="tag">Uso mixto</span>
            </article>
          </div>
        </section>

        <section class="section payment" id="pagos" aria-label="Medios de pago">
          <div class="section__title">Pagos fáciles en Chile</div>
          <p>
            Si tu consulta requiere pago anticipado, podemos enviarte un enlace rápido
            vía Flow (tarjetas, ServiPag, Khipu) o Mercado Pago Chile. Sin integración
            técnica: recibes un link seguro listo para pagar.
          </p>
          <div class="chips">
            <span>Flow.cl</span>
            <span>Mercado Pago Chile</span>
            <span>Links listos en minutos</span>
          </div>
        </section>
      </main>

      <button class="cta-floating" aria-label="Reserva tu consulta" (click)="scrollToAgenda()">
        Reserva tu consulta jurídica gratis
      </button>
    </div>
  `,
  styles: [],
})
class AppComponent {
  bgImage = signal(`linear-gradient(rgba(3,8,20,0.8), rgba(3,8,20,0.8)), url(${heroBackground})`);

  scrollToAgenda() {
    const target = document.getElementById("agenda");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }
}

bootstrapApplication(AppComponent).catch((err) => console.error(err));
