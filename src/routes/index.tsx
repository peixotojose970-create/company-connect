import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Instagram,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HeroNMonolith } from "../components/canvas/HeroNMonolith";

/**
 * CONFIGURAÇÃO CENTRAL DE IMAGENS DOS SERVIÇOS
 * Aceita: PNG, JPG, WEBP, SVG.
 * Preparadas para ocupar de 40% a 60% da área visual dos blocos editoriais.
 */
export const serviceMediaAssets = {
  siteImage: "/assets/brand/service-sites.svg" as string,
  landingPageImage: "/assets/brand/service-landing.svg" as string,
  menuImage: "/assets/brand/service-menu.svg" as string,
  visualContentImage: "/assets/brand/service-visual.svg" as string,
  marketingMaterialImage: "/assets/brand/service-marketing.svg" as string,
};

const navigationItems = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Por que a NEXORA?", href: "#por-que-nexora" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Sobre nós", href: "#sobre-nos" },
  { label: "Contato", href: "#contato" },
] as const;

const nexoraWhatsappNumber = "";

function buildWhatsappUrl(message: string) {
  const phoneNumber = nexoraWhatsappNumber.replace(/\D/g, "");
  const recipientPath = phoneNumber ? `/${phoneNumber}` : "";
  return `https://wa.me${recipientPath}?text=${encodeURIComponent(message)}`;
}

const defaultWhatsappUrl = buildWhatsappUrl(
  "Olá, NEXORA! Quero conversar sobre soluções digitais para a minha empresa.",
);

function NexoraLogo() {
  return (
    <span className="nexora-brand" aria-label="NEXORA">
      <svg
        className="nexora-brand__symbol"
        viewBox="0 0 44 44"
        aria-hidden="true"
      >
        <path
          d="M10 34V10l24 24V10"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path d="M34 10h-7" fill="none" stroke="var(--cyan)" strokeWidth="3.5" />
      </svg>
      <span className="nexora-brand__name">NEXORA</span>
    </span>
  );
}

function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={`nx-header${isScrolled ? " nx-header--scrolled" : ""}`}>
      <div className="nx-header__container">
        <a
          className="nx-header__logo-link"
          href="#inicio"
          onClick={() => setIsMenuOpen(false)}
          aria-label="NEXORA Início"
        >
          <NexoraLogo />
        </a>

        <nav className="nx-nav" aria-label="Navegação principal">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href} className="nx-nav__link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nx-header__right">
          <a
            className="nx-btn nx-btn--pill-accent"
            href={defaultWhatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>Falar com a NEXORA</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>

          <button
            className="nx-header__menu-btn"
            type="button"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`nx-drawer${isMenuOpen ? " nx-drawer--open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="nx-drawer__content">
          <nav className="nx-drawer__nav" aria-label="Navegação mobile">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nx-drawer__link"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{item.label}</span>
                <ChevronRight size={18} aria-hidden="true" />
              </a>
            ))}
          </nav>
          <div className="nx-drawer__footer">
            <a
              className="nx-btn nx-btn--hero-primary"
              style={{ width: "100%" }}
              href={defaultWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Falar com a NEXORA</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="inicio" aria-labelledby="hero-title">
      <div className="nx-container">
        <div className="hero-layout">
          <div className="hero-copy">
            <div className="hero-copy__badge">
              <span className="hero-copy__badge-dot" />
              SOLUÇÕES DIGITAIS PARA EMPRESAS
            </div>

            <h1 id="hero-title" className="hero-copy__title">
              Inteligência que faz<br />
              empresas <span className="hero-copy__title-highlight">crescerem.</span>
            </h1>

            <p className="hero-copy__lead">
              Criamos soluções digitais para empresas que querem melhorar sua presença,
              sua comunicação e sua forma de vender.
            </p>

            <div className="hero-copy__actions">
              <a
                className="nx-btn nx-btn--hero-primary"
                href={defaultWhatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span>Falar com a NEXORA</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a className="nx-btn nx-btn--hero-secondary" href="#servicos">
                <span>Ver soluções</span>
              </a>
            </div>
          </div>

          <div className="hero-visual-frame" aria-hidden="true">
            <div className="hero-visual-canvas">
              <img
                src="/assets/brand/hero-editorial.svg"
                alt="Composição Editorial NEXORA"
                className="hero-visual-img"
              />
              <div className="hero-visual-monolith-layer">
                <HeroNMonolith />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="solutions-section" id="servicos" aria-labelledby="solutions-title">
      <div className="nx-container">
        <header className="section-header">
          <span className="section-header__tag">Serviços</span>
          <h2 id="solutions-title" className="section-header__title">
            Soluções digitais para empresas que querem se apresentar melhor.
          </h2>
          <p className="section-header__desc">
            Da primeira impressão à comunicação diária com seus clientes, criamos
            soluções pensadas para cada necessidade.
          </p>
        </header>

        {/* Grade Editorial Assimétrica de Projetos */}
        <div className="services-editorial-grid">
          {/* SERVIÇO 01: PROJETO GRANDE (CRIAÇÃO DE SITES) */}
          <article className="service-card service-card--large">
            <div className="service-card__body">
              <div className="service-card__meta">
                <span className="service-card__tag">Serviço 01</span>
                <h3 className="service-card__title">Criação de Sites</h3>
                <p className="service-card__desc">
                  Websites completos, modernos e preparados para transmitir autoridade e confiança.
                </p>
              </div>
              <a
                className="service-card__cta"
                href={buildWhatsappUrl("Olá! Gostaria de conversar sobre a criação de um site para a minha empresa.")}
                target="_blank"
                rel="noreferrer"
              >
                <span>Solicitar criação de site</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="service-card__visual">
              <img
                src={serviceMediaAssets.siteImage}
                alt="Criação de Sites NEXORA"
                className="service-card__img"
                loading="lazy"
              />
            </div>
          </article>

          {/* SERVIÇO 02: PROJETO COMPACTO (LANDING PAGES) */}
          <article className="service-card service-card--medium">
            <div className="service-card__body">
              <div className="service-card__meta">
                <span className="service-card__tag">Serviço 02</span>
                <h3 className="service-card__title">Landing Pages</h3>
                <p className="service-card__desc">
                  Páginas objetivas e focadas em conversão para campanhas e captação de clientes.
                </p>
              </div>
              <a
                className="service-card__cta"
                href={buildWhatsappUrl("Olá! Gostaria de criar uma landing page com foco em captação de clientes.")}
                target="_blank"
                rel="noreferrer"
              >
                <span>Criar landing page</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="service-card__visual">
              <img
                src={serviceMediaAssets.landingPageImage}
                alt="Landing Pages de Conversão NEXORA"
                className="service-card__img"
                loading="lazy"
              />
            </div>
          </article>

          {/* SERVIÇO 03: PROJETO VISUAL / VERTICAL (CARDÁPIOS DIGITAIS) */}
          <article className="service-card service-card--portrait">
            <div className="service-card__body">
              <div className="service-card__meta">
                <span className="service-card__tag">Serviço 03</span>
                <h3 className="service-card__title">Cardápios Digitais</h3>
                <p className="service-card__desc">
                  Cardápios interativos, ágeis e organizados, com ótima usabilidade no celular.
                </p>
              </div>
              <a
                className="service-card__cta"
                href={buildWhatsappUrl("Olá! Quero modernizar o cardápio digital do meu negócio.")}
                target="_blank"
                rel="noreferrer"
              >
                <span>Desenvolver cardápio</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="service-card__visual">
              <img
                src={serviceMediaAssets.menuImage}
                alt="Cardápios Digitais no Celular NEXORA"
                className="service-card__img"
                loading="lazy"
              />
            </div>
          </article>

          {/* SERVIÇO 04: PROJETO VISUAL / DIREÇÃO DE ARTE (IMAGENS E CONTEÚDO VISUAL) */}
          <article className="service-card service-card--visual">
            <div className="service-card__body">
              <div className="service-card__meta">
                <span className="service-card__tag">Serviço 04</span>
                <h3 className="service-card__title">Imagens e Conteúdo Visual</h3>
                <p className="service-card__desc">
                  Produção e refinamento de imagens profissionais para apresentar produtos e serviços.
                </p>
              </div>
              <a
                className="service-card__cta"
                href={buildWhatsappUrl("Olá! Quero desenvolver imagens e conteúdo visual de alto nível para a minha marca.")}
                target="_blank"
                rel="noreferrer"
              >
                <span>Criar conteúdo visual</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="service-card__visual">
              <img
                src={serviceMediaAssets.visualContentImage}
                alt="Imagens e Conteúdo Visual de Alto Padrão NEXORA"
                className="service-card__img"
                loading="lazy"
              />
            </div>
          </article>

          {/* SERVIÇO 05: PROJETO PANORÂMICO (MATERIAIS DE DIVULGAÇÃO) */}
          <article className="service-card service-card--wide">
            <div className="service-card__body">
              <div className="service-card__meta">
                <span className="service-card__tag">Serviço 05</span>
                <h3 className="service-card__title">Materiais de Divulgação</h3>
                <p className="service-card__desc">
                  Banners, materiais institucionais e peças digitais que reforçam a identidade do negócio.
                </p>
              </div>
              <a
                className="service-card__cta"
                href={buildWhatsappUrl("Olá! Quero criar materiais de divulgação e apresentações digitais para a minha empresa.")}
                target="_blank"
                rel="noreferrer"
              >
                <span>Solicitar materiais</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="service-card__visual">
              <img
                src={serviceMediaAssets.marketingMaterialImage}
                alt="Materiais de Divulgação Institucionais NEXORA"
                className="service-card__img"
                loading="lazy"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function WhyNexoraSection() {
  const pillars = [
    {
      title: "Pensado para o seu negócio",
      desc: "Entendemos o objetivo antes de definir a solução, garantindo adequação real ao seu mercado.",
    },
    {
      title: "Tecnologia + criatividade",
      desc: "Unimos tecnologia, inteligência artificial, estratégia e design para resultados consistentes.",
    },
    {
      title: "Simples e direto",
      desc: "Processos sem termos vazios ou complicações desnecessárias. Entendimento, criação e entrega com clareza.",
    },
    {
      title: "Foco no resultado",
      desc: "Cada projeto possui uma finalidade clara: apresentar sua empresa com solidez e gerar impacto comercial.",
    },
  ];

  return (
    <section className="why-section" id="por-que-nexora" aria-labelledby="why-title">
      <div className="nx-container">
        <div className="why-editorial">
          <div className="why-editorial__left">
            <span className="section-header__tag">Diferenciais</span>
            <h2 id="why-title" className="why-editorial__headline">
              Por que a NEXORA?
            </h2>
            <p className="why-editorial__lead">
              Não queremos apenas criar algo bonito.<br />
              Queremos criar algo que faça sentido para o seu negócio.
            </p>
          </div>

          <div className="why-editorial__right">
            <div className="why-editorial__list">
              {pillars.map((item, index) => (
                <div key={item.title} className="why-editorial__item">
                  <span className="why-editorial__number">0{index + 1}</span>
                  <div className="why-editorial__content">
                    <h3 className="why-editorial__title">{item.title}</h3>
                    <p className="why-editorial__desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      step: "01",
      name: "Conversa",
      desc: "Entendimento do objetivo da sua empresa e do contexto do seu negócio.",
    },
    {
      step: "02",
      name: "Estratégia",
      desc: "Definição do formato ideal, arquitetura e planejamento da entrega.",
    },
    {
      step: "03",
      name: "Criação",
      desc: "Desenvolvimento visual, tecnológico e refinamento estético de alto padrão.",
    },
    {
      step: "04",
      name: "Entrega",
      desc: "Publicação da solução pronta, com orientação clara para seu uso no dia a dia.",
    },
  ];

  return (
    <section className="process-section" id="como-funciona" aria-labelledby="process-title">
      <div className="nx-container">
        <header className="section-header">
          <span className="section-header__tag">Processo</span>
          <h2 id="process-title" className="section-header__title">
            Do problema à solução.
          </h2>
          <p className="section-header__desc">
            Um fluxo de trabalho organizado para transformar necessidades em presenças digitais funcionais.
          </p>
        </header>

        <div className="process-track">
          {steps.map((item) => (
            <div key={item.step} className="process-node">
              <span className="process-node__step">{item.step}</span>
              <h3 className="process-node__name">{item.name}</h3>
              <p className="process-node__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about-section" id="sobre-nos" aria-labelledby="about-title">
      <div className="nx-container">
        <div className="about-grid">
          <div className="about-manifesto">
            <span className="section-header__tag">Sobre a NEXORA</span>
            <h2 id="about-title" className="about-manifesto__title">
              Construindo soluções digitais que fazem sentido.
            </h2>
            <div className="about-manifesto__paragraphs">
              <p>
                A NEXORA nasceu com uma ideia simples: ajudar empresas a se apresentarem melhor no mundo digital.
              </p>
              <p>
                Unimos tecnologia, inteligência artificial, estratégia e criatividade para transformar necessidades reais em soluções digitais.
              </p>
              <p>
                Estamos construindo a NEXORA com foco em uma coisa: criar trabalhos que façam sentido para cada negócio.
              </p>
            </div>
          </div>

          <div className="about-visual-plate">
            <img
              src="/assets/brand/about-corporate.svg"
              alt="Apresentação Institucional NEXORA"
              className="about-visual-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TransformationSection() {
  return (
    <section className="transformation-section" aria-labelledby="transformation-title">
      <div className="nx-container">
        <header className="section-header">
          <span className="section-header__tag">Demonstração Visual</span>
          <h2 id="transformation-title" className="section-header__title">
            Uma boa presença muda a forma como uma empresa é percebida.
          </h2>
          <p className="section-header__desc">
            A reorganização digital eleva o posicionamento, a clareza da oferta e a credibilidade diante do cliente.
          </p>
        </header>

        <div className="transformation-comparison">
          {/* Lado Esquerdo: ANTES */}
          <div className="comparison-card comparison-card--before">
            <div className="comparison-card__header">
              <span className="comparison-card__label">Antes</span>
              <span className="comparison-card__status-dot" />
            </div>

            <p className="comparison-card__summary">
              Presença sem direcionamento estratégico e com baixa percepção de valor.
            </p>

            <ul className="comparison-card__list">
              <li className="comparison-card__item">
                <span className="comparison-card__item-icon">✕</span>
                <span>Presença desorganizada</span>
              </li>
              <li className="comparison-card__item">
                <span className="comparison-card__item-icon">✕</span>
                <span>Identidade visual inconsistente</span>
              </li>
              <li className="comparison-card__item">
                <span className="comparison-card__item-icon">✕</span>
                <span>Site ruim ou inexistente</span>
              </li>
              <li className="comparison-card__item">
                <span className="comparison-card__item-icon">✕</span>
                <span>Comunicação confusa</span>
              </li>
            </ul>
          </div>

          {/* Lado Direito: DEPOIS */}
          <div className="comparison-card comparison-card--after">
            <div className="comparison-card__header">
              <span className="comparison-card__label">Depois</span>
              <span className="comparison-card__status-dot" />
            </div>

            <p className="comparison-card__summary">
              Posicionamento digital profissional, alinhado à qualidade real da empresa.
            </p>

            <ul className="comparison-card__list">
              <li className="comparison-card__item">
                <span className="comparison-card__item-icon">✓</span>
                <span>Identidade organizada</span>
              </li>
              <li className="comparison-card__item">
                <span className="comparison-card__item-icon">✓</span>
                <span>Website profissional</span>
              </li>
              <li className="comparison-card__item">
                <span className="comparison-card__item-icon">✓</span>
                <span>Comunicação clara</span>
              </li>
              <li className="comparison-card__item">
                <span className="comparison-card__item-icon">✓</span>
                <span>Experiência mobile melhor</span>
              </li>
              <li className="comparison-card__item">
                <span className="comparison-card__item-icon">✓</span>
                <span>Materiais consistentes</span>
              </li>
            </ul>

            <div className="comparison-card__pills">
              <span className="comparison-pill">Mais clareza</span>
              <span className="comparison-pill">Mais organização</span>
              <span className="comparison-pill">Melhor experiência</span>
              <span className="comparison-pill">Comunicação profissional</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="final-cta-section" id="contato" aria-labelledby="final-cta-title">
      <div className="nx-container">
        <div className="final-cta-box">
          <h2 id="final-cta-title" className="final-cta-box__title">
            Tem uma ideia para sua empresa?
          </h2>
          <p className="final-cta-box__text">
            Vamos entender o que você precisa e conversar sobre a melhor solução.
          </p>

          <a
            className="nx-btn nx-btn--big-cta"
            href={defaultWhatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            <span>Falar com a NEXORA</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="nx-footer">
      <div className="nx-container">
        <div className="nx-footer__main">
          <div className="nx-footer__brand">
            <a href="#inicio" aria-label="NEXORA Início">
              <NexoraLogo />
            </a>
            <p className="nx-footer__tagline">
              Inteligência que faz empresas crescerem.
            </p>
          </div>

          <div className="nx-footer__nav">
            <div className="nx-footer__col">
              <span className="nx-footer__col-title">Navegação</span>
              <a href="#inicio" className="nx-footer__link">Início</a>
              <a href="#servicos" className="nx-footer__link">Serviços</a>
              <a href="#por-que-nexora" className="nx-footer__link">Por que a NEXORA?</a>
              <a href="#como-funciona" className="nx-footer__link">Como funciona</a>
              <a href="#sobre-nos" className="nx-footer__link">Sobre nós</a>
              <a href="#contato" className="nx-footer__link">Contato</a>
            </div>

            <div className="nx-footer__col">
              <span className="nx-footer__col-title">Contato</span>
              <a
                href={defaultWhatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="nx-footer__link"
              >
                WhatsApp
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="nx-footer__link"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="nx-footer__bottom">
          <p>© {new Date().getFullYear()} NEXORA. Todos os direitos reservados.</p>
          <a href="#inicio" className="nx-btn--primary-link">
            <span>Voltar ao topo</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="nx-app">
      <SiteHeader />
      <main>
        <Hero />
        <ServicesSection />
        <WhyNexoraSection />
        <AboutSection />
        <TransformationSection />
        <ProcessSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXORA — Inteligência que faz empresas crescerem." },
      {
        name: "description",
        content:
          "Criamos soluções digitais para empresas que querem melhorar sua presença, sua comunicação e sua forma de vender.",
      },
      {
        property: "og:title",
        content: "NEXORA — Inteligência que faz empresas crescerem.",
      },
      {
        property: "og:description",
        content:
          "Criamos soluções digitais para empresas que querem melhorar sua presença, sua comunicação e sua forma de vender.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});
