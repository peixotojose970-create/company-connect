import { Menu, X } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const navigationItems = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Contato", href: "#contato" },
] as const;

function NexoraLogo() {
  return (
    <span className="nexora-logo" aria-label="NEXORA">
      <svg className="nexora-logo__mark" viewBox="0 0 44 44" aria-hidden="true">
        <path
          d="M10 34V10l24 24V10"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path d="M34 10h-7" fill="none" stroke="var(--cyan)" strokeWidth="4" />
      </svg>
      <span className="nexora-logo__word">NEXORA</span>
    </span>
  );
}

function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={`site-header${isScrolled ? " site-header--scrolled" : ""}`}>
      <div className="site-header__inner">
        <a
          className="site-header__brand"
          href="#inicio"
          onClick={() => setIsMenuOpen(false)}
        >
          <NexoraLogo />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigationItems.map((item, index) => (
            <a
              key={item.href}
              className={index === 0 ? "is-active" : undefined}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#contato">
          Falar com a NEXORA
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      <div
        className={`mobile-menu${isMenuOpen ? " mobile-menu--open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <nav aria-label="Navegação móvel">
          {navigationItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="mobile-menu__cta"
          href="#contato"
          onClick={() => setIsMenuOpen(false)}
        >
          Falar com a NEXORA
        </a>
      </div>
    </header>
  );
}

function GrowthComposition() {
  return (
    <div
      className="growth-composition"
      role="img"
      aria-label="Composição abstrata ligando presença digital, inteligência e crescimento"
    >
      <div className="growth-composition__grid" aria-hidden="true" />

      <svg
        className="growth-composition__svg"
        viewBox="0 0 640 640"
        aria-hidden="true"
      >
        <g className="composition-rings">
          <circle cx="332" cy="316" r="182" />
          <circle cx="332" cy="316" r="116" />
          <circle cx="332" cy="316" r="54" />
        </g>

        <g className="composition-orbits">
          <ellipse cx="332" cy="316" rx="245" ry="104" />
          <ellipse
            cx="332"
            cy="316"
            rx="230"
            ry="92"
            transform="rotate(-54 332 316)"
          />
        </g>

        <g className="composition-connections">
          <path d="M96 468C176 450 207 394 257 367" />
          <path d="M257 367L364 278L468 214L551 152" />
          <path d="M257 367L318 441L438 475L538 447" />
          <path d="M364 278L414 347L468 214" />
          <path d="M318 441L414 347" />
        </g>

        <path
          className="composition-growth-line"
          d="M74 500C150 486 198 437 246 407C310 367 336 326 374 291C426 244 475 211 566 137"
        />

        <g className="composition-nodes">
          <circle cx="96" cy="468" r="7" />
          <circle cx="257" cy="367" r="10" />
          <circle cx="318" cy="441" r="7" />
          <circle cx="364" cy="278" r="8" />
          <circle cx="414" cy="347" r="7" />
          <circle cx="468" cy="214" r="10" />
          <circle cx="538" cy="447" r="7" />
          <circle cx="566" cy="137" r="12" />
        </g>

        <g className="composition-crosshairs">
          <path d="M74 500h34M91 483v34" />
          <path d="M549 137h34M566 120v34" />
          <path d="M309 441h18M318 432v18" />
        </g>
      </svg>

      <div className="composition-label composition-label--presence">
        <span>01</span>
        Presença digital
      </div>
      <div className="composition-label composition-label--intelligence">
        <span>02</span>
        Inteligência
      </div>
      <div className="composition-label composition-label--growth">
        <span>03</span>
        Crescimento
      </div>
      <div className="composition-core" aria-hidden="true">
        <span>N</span>
        <small>NEXORA</small>
      </div>
      <div className="composition-coordinate composition-coordinate--left">
        DIGITAL / SIGNAL
      </div>
      <div className="composition-coordinate composition-coordinate--right">
        NEXORA / SYSTEM
      </div>
    </div>
  );
}

function Index() {
  return (
    <main className="nexora-page">
      <SiteHeader />

      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero__inner">
          <div className="hero__copy">
            <p className="hero__eyebrow">
              <span aria-hidden="true" />
              Serviços digitais para empresas
            </p>

            <h1 id="hero-title">
              Inteligência que faz empresas <em>crescerem.</em>
            </h1>

            <p className="hero__subtitle" id="sobre">
              Criamos soluções digitais para empresas que querem melhorar sua
              presença, sua comunicação e sua forma de vender.
            </p>

            <div className="hero__actions" id="contato">
              <a className="button button--primary" href="#servicos">
                Conhecer nossos serviços
              </a>
              <a className="button button--secondary" href="#contato">
                Falar com a NEXORA
              </a>
            </div>

            <p className="hero__services" id="servicos">
              <span>Sites</span>
              <i aria-hidden="true">•</i>
              <span>Landing Pages</span>
              <i aria-hidden="true">•</i>
              <span>Cardápios Digitais</span>
              <i aria-hidden="true">•</i>
              <span>Conteúdo Visual</span>
            </p>
          </div>

          <div className="hero__visual" id="como-funciona">
            <GrowthComposition />
          </div>
        </div>

        <div className="hero__footer" aria-hidden="true">
          <span>Presença</span>
          <span>Comunicação</span>
          <span>Inteligência</span>
          <span>Crescimento</span>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXORA — Inteligência que faz empresas crescerem." },
      {
        name: "description",
        content:
          "Soluções digitais para melhorar a presença, a comunicação e a forma de vender de pequenas e médias empresas.",
      },
      {
        property: "og:title",
        content: "NEXORA — Inteligência que faz empresas crescerem.",
      },
      {
        property: "og:description",
        content:
          "Sites, landing pages, cardápios digitais e conteúdo visual para empresas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});
