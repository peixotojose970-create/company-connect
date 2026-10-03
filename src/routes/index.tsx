import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Instagram,
  Layers,
  Menu,
  MessageCircle,
  Palette,
  Send,
  Sparkles,
  X,
  XCircle,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { HeroNMonolith } from "../components/canvas/HeroNMonolith";

/**
 * CONFIGURAÇÃO CENTRAL DE IMAGENS DOS SERVIÇOS
 * Aceita: PNG, JPG, WEBP.
 * Quando fornecidas URLs válidas, substituem automaticamente as composições de mockup ricas.
 */
export const serviceMediaAssets = {
  siteImage: "" as string,
  landingPageImage: "" as string,
  menuImage: "" as string,
  visualContentImage: "" as string,
  marketingMaterialImage: "" as string,
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
          strokeWidth="4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path d="M34 10h-7" fill="none" stroke="var(--cyan)" strokeWidth="4" />
      </svg>
      <span className="nexora-brand__name">NEXORA</span>
    </span>
  );
}

function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
    <header
      className={`nx-header${isScrolled ? " nx-header--scrolled" : ""}`}
    >
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
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>

          <button
            className="nx-header__menu-btn"
            type="button"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
              <ArrowUpRight size={18} aria-hidden="true" />
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
        <div className="hero-section__grid">
          <div className="hero-copy">
            <div className="hero-copy__badge">
              <span className="hero-copy__badge-dot" />
              Soluções Digitais para Empresas
            </div>

            <h1 id="hero-title" className="hero-copy__title">
              Inteligência que faz
              <span className="hero-copy__title-highlight">
                empresas <em>crescerem.</em>
              </span>
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
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="nx-btn nx-btn--hero-secondary" href="#servicos">
                <span>Conhecer nossos serviços</span>
              </a>
            </div>
          </div>

          <div className="hero-visual-column">
            <div className="hero-artwork" aria-hidden="true">
              <div className="hero-artwork__ambient" />
              <div className="hero-artwork__canvas-frame">
                <div className="hero-artwork__monolith-wrapper">
                  <HeroNMonolith />
                </div>
              </div>

              <div className="hero-artwork__floating-card">
                <div className="hero-artwork__floating-card-icon">
                  <Sparkles size={18} />
                </div>
                <div>
                  <span className="hero-artwork__floating-card-label">Design &amp; Tecnologia</span>
                  <span className="hero-artwork__floating-card-sub">Experiência digital premium</span>
                </div>
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
          <span className="section-header__tag">Soluções Principais</span>
          <h2 id="solutions-title" className="section-header__title">
            Soluções que transformam sua presença digital.
          </h2>
          <p className="section-header__desc">
            Da primeira impressão à comunicação diária com seus clientes, criamos
            experiências digitais pensadas para apresentar melhor sua empresa.
          </p>
        </header>

        <div className="solutions-list">
          {/* SERVIÇO 01: CRIAÇÃO DE SITES */}
          <article className="solution-feature">
            <div className="solution-feature__meta">
              <span className="solution-feature__number">SERVIÇO 01</span>
              <h3 className="solution-feature__title">CRIAÇÃO DE SITES</h3>
              <p className="solution-feature__text">
                Sites profissionais para apresentar sua empresa, seus serviços e sua marca.
              </p>
              <a
                className="solution-feature__cta"
                href={buildWhatsappUrl("Olá! Gostaria de conversar sobre a criação de um site profissional para a minha empresa.")}
                target="_blank"
                rel="noreferrer"
              >
                <span>Solicitar proposta para site</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="solution-feature__visual">
              <div className="solution-canvas">
                {serviceMediaAssets.siteImage ? (
                  <img
                    src={serviceMediaAssets.siteImage}
                    alt="Criação de Sites Profissionais NEXORA"
                    className="solution-canvas__img"
                  />
                ) : (
                  <div className="mockup-desktop">
                    <div className="mockup-desktop__topbar">
                      <div className="mockup-desktop__dots">
                        <span />
                        <span />
                        <span />
                      </div>
                      <span className="mockup-desktop__url">empresa.com.br</span>
                    </div>
                    <div className="mockup-desktop__screen">
                      <div className="mockup-desktop__hero">
                        <span className="mockup-desktop__badge">Empresa em Destaque</span>
                        <div className="mockup-desktop__title">Solidez e Autoridade Digital</div>
                        <div className="mockup-desktop__card-line" />
                      </div>
                      <div className="mockup-desktop__grid">
                        <div className="mockup-desktop__card">
                          <div className="mockup-desktop__card-thumb" />
                          <div className="mockup-desktop__card-line" />
                        </div>
                        <div className="mockup-desktop__card">
                          <div className="mockup-desktop__card-thumb" />
                          <div className="mockup-desktop__card-line" />
                        </div>
                        <div className="mockup-desktop__card">
                          <div className="mockup-desktop__card-thumb" />
                          <div className="mockup-desktop__card-line" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* SERVIÇO 02: LANDING PAGES */}
          <article className="solution-feature solution-feature--reversed">
            <div className="solution-feature__meta">
              <span className="solution-feature__number">SERVIÇO 02</span>
              <h3 className="solution-feature__title">LANDING PAGES</h3>
              <p className="solution-feature__text">
                Páginas focadas em campanhas, ofertas e geração de contatos.
              </p>
              <a
                className="solution-feature__cta"
                href={buildWhatsappUrl("Olá! Quero criar uma landing page com foco em campanhas e captação de clientes.")}
                target="_blank"
                rel="noreferrer"
              >
                <span>Criar Landing Page</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="solution-feature__visual">
              <div className="solution-canvas">
                {serviceMediaAssets.landingPageImage ? (
                  <img
                    src={serviceMediaAssets.landingPageImage}
                    alt="Landing Pages de Alta Conversão NEXORA"
                    className="solution-canvas__img"
                  />
                ) : (
                  <div className="mockup-landing">
                    <div className="mockup-landing__layer-base">
                      <div className="mockup-landing__header">
                        <span className="mockup-landing__pill">Campanha Especial</span>
                        <span className="mockup-landing__conv">Alta Conversão</span>
                      </div>
                      <div className="mockup-landing__offer">
                        Apresente sua oferta com clareza e transforme visitas em oportunidades reais.
                      </div>
                      <div className="mockup-landing__form">
                        <div className="mockup-landing__input">contato@suaempresa.com.br</div>
                        <div className="mockup-landing__btn">Quero começar</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* SERVIÇO 03: CARDÁPIOS DIGITAIS */}
          <article className="solution-feature">
            <div className="solution-feature__meta">
              <span className="solution-feature__number">SERVIÇO 03</span>
              <h3 className="solution-feature__title">CARDÁPIOS DIGITAIS</h3>
              <p className="solution-feature__text">
                Experiências digitais rápidas, organizadas e fáceis de usar no celular.
              </p>
              <a
                className="solution-feature__cta"
                href={buildWhatsappUrl("Olá! Gostaria de desenvolver um cardápio digital moderno e ágil para celular.")}
                target="_blank"
                rel="noreferrer"
              >
                <span>Solicitar Cardápio Digital</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="solution-feature__visual">
              <div className="solution-canvas" style={{ background: "transparent", border: "none", boxShadow: "none" }}>
                {serviceMediaAssets.menuImage ? (
                  <img
                    src={serviceMediaAssets.menuImage}
                    alt="Cardápio Digital NEXORA"
                    className="solution-canvas__img"
                  />
                ) : (
                  <div className="mockup-menu-phone">
                    <div className="mockup-menu-phone__header">
                      <span className="mockup-menu-phone__brand">Bistrô &amp; Café</span>
                      <span className="mockup-menu-phone__status">Aberto agora</span>
                    </div>
                    <div className="mockup-menu-phone__categories">
                      <span className="mockup-menu-phone__cat mockup-menu-phone__cat--active">Destaques</span>
                      <span className="mockup-menu-phone__cat">Principais</span>
                      <span className="mockup-menu-phone__cat">Bebidas</span>
                    </div>
                    <div className="mockup-menu-phone__list">
                      <div className="mockup-menu-phone__item">
                        <div
                          className="mockup-menu-phone__thumb"
                          style={{
                            background: "linear-gradient(135deg, #1c2738 0%, #2e415e 100%)",
                          }}
                        />
                        <div className="mockup-menu-phone__info">
                          <span className="mockup-menu-phone__item-title">Prato do Chef</span>
                          <span className="mockup-menu-phone__item-price">R$ 54,00</span>
                        </div>
                      </div>
                      <div className="mockup-menu-phone__item">
                        <div
                          className="mockup-menu-phone__thumb"
                          style={{
                            background: "linear-gradient(135deg, #182333 0%, #253954 100%)",
                          }}
                        />
                        <div className="mockup-menu-phone__info">
                          <span className="mockup-menu-phone__item-title">Bebida Artesanal</span>
                          <span className="mockup-menu-phone__item-price">R$ 18,00</span>
                        </div>
                      </div>
                    </div>
                    <div className="mockup-menu-phone__cart-btn">
                      <span>Fazer Pedido</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* SERVIÇO 04: IMAGENS E CONTEÚDO VISUAL */}
          <article className="solution-feature solution-feature--reversed">
            <div className="solution-feature__meta">
              <span className="solution-feature__number">SERVIÇO 04</span>
              <h3 className="solution-feature__title">IMAGENS E CONTEÚDO VISUAL</h3>
              <p className="solution-feature__text">
                Conteúdo visual profissional para produtos, serviços, campanhas e redes sociais.
              </p>
              <a
                className="solution-feature__cta"
                href={buildWhatsappUrl("Olá! Gostaria de criar conteúdo visual e imagens profissionais para a minha marca.")}
                target="_blank"
                rel="noreferrer"
              >
                <span>Desenvolver Conteúdo Visual</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="solution-feature__visual">
              <div className="solution-canvas" style={{ background: "transparent", border: "none", boxShadow: "none" }}>
                {serviceMediaAssets.visualContentImage ? (
                  <img
                    src={serviceMediaAssets.visualContentImage}
                    alt="Imagens e Conteúdo Visual NEXORA"
                    className="solution-canvas__img"
                  />
                ) : (
                  <div className="mockup-studio">
                    <div className="mockup-studio__item mockup-studio__item--main">
                      <span className="mockup-studio__caption">Estúdio Visual</span>
                      <div className="mockup-studio__title">Direção de Arte &amp; Identidade de Produto</div>
                    </div>
                    <div className="mockup-studio__item mockup-studio__item--side1">
                      <Palette size={20} color="var(--cyan)" />
                      <div className="mockup-studio__title">Post Instagram</div>
                    </div>
                    <div className="mockup-studio__item mockup-studio__item--side2">
                      <Layers size={20} color="#ffffff" />
                      <div className="mockup-studio__title">Banner Promocional</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* SERVIÇO 05: MATERIAIS DE DIVULGAÇÃO */}
          <article className="solution-feature">
            <div className="solution-feature__meta">
              <span className="solution-feature__number">SERVIÇO 05</span>
              <h3 className="solution-feature__title">MATERIAIS DE DIVULGAÇÃO</h3>
              <p className="solution-feature__text">
                Materiais digitais para fortalecer a comunicação da sua empresa.
              </p>
              <a
                className="solution-feature__cta"
                href={buildWhatsappUrl("Olá! Quero produzir materiais de divulgação para WhatsApp, Instagram e anúncios.")}
                target="_blank"
                rel="noreferrer"
              >
                <span>Criar Materiais de Divulgação</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="solution-feature__visual">
              <div className="solution-canvas" style={{ background: "transparent", border: "none", boxShadow: "none" }}>
                {serviceMediaAssets.marketingMaterialImage ? (
                  <img
                    src={serviceMediaAssets.marketingMaterialImage}
                    alt="Materiais de Divulgação Digital NEXORA"
                    className="solution-canvas__img"
                  />
                ) : (
                  <div className="mockup-marketing">
                    <div className="mockup-marketing__post">
                      <div className="mockup-marketing__user">
                        <div className="mockup-marketing__avatar" />
                        <span>suaempresa.oficial</span>
                      </div>
                      <div className="mockup-marketing__banner">
                        Comunicação Clara que Gera Resultados
                      </div>
                      <div className="mockup-marketing__meta">
                        <span>Instagram &amp; Redes</span>
                        <span>Engajamento</span>
                      </div>
                    </div>

                    <div className="mockup-marketing__chat">
                      <div className="mockup-marketing__user">
                        <MessageCircle size={15} color="var(--cyan)" />
                        <span>WhatsApp Direto</span>
                      </div>
                      <div className="mockup-marketing__bubble">
                        Olá! Gostaria de receber mais informações sobre o seu serviço.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function WhyNexoraSection() {
  return (
    <section className="why-section" id="por-que-nexora" aria-labelledby="why-title">
      <div className="nx-container">
        <div className="why-editorial">
          <div className="why-editorial__left">
            <span className="why-editorial__tag">Por que a NEXORA?</span>
            <h2 id="why-title" className="why-editorial__headline">
              Por que a NEXORA?
            </h2>
            <p className="why-editorial__lead">
              Não queremos apenas criar algo bonito. Queremos criar soluções digitais que façam sentido para o seu negócio.
            </p>

            <div className="why-editorial__callout">
              <div className="why-editorial__callout-title">
                Seu negócio não precisa de mais complexidade. Precisa da solução certa.
              </div>
            </div>
          </div>

          <div className="why-editorial__right">
            <div className="why-pillar">
              <span className="why-pillar__tag">PENSADO PARA O SEU NEGÓCIO</span>
              <p className="why-pillar__text">
                Entendemos o objetivo antes de definir a solução.
              </p>
            </div>

            <div className="why-pillar">
              <span className="why-pillar__tag">TECNOLOGIA + CRIATIVIDADE</span>
              <p className="why-pillar__text">
                Unimos tecnologia, inteligência artificial e criatividade.
              </p>
            </div>

            <div className="why-pillar">
              <span className="why-pillar__tag">SIMPLES E DIRETO</span>
              <p className="why-pillar__text">
                Entendemos, criamos e entregamos de forma clara.
              </p>
            </div>

            <div className="why-pillar">
              <span className="why-pillar__tag">FOCO NO RESULTADO</span>
              <p className="why-pillar__text">
                Cada projeto possui um objetivo definido.
              </p>
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
      name: "CONVERSA",
      desc: "Entendimento inicial do objetivo da sua empresa e dos desafios a serem superados.",
    },
    {
      step: "02",
      name: "ESTRATÉGIA",
      desc: "Definição do formato ideal, da arquitetura e das diretrizes do projeto.",
    },
    {
      step: "03",
      name: "CRIAÇÃO",
      desc: "Desenvolvimento visual, tecnológico e refinamento estético de alto padrão.",
    },
    {
      step: "04",
      name: "ENTREGA",
      desc: "Lançamento da solução pronta para uso com clareza e suporte.",
    },
  ];

  return (
    <section className="process-section" id="como-funciona" aria-labelledby="process-title">
      <div className="nx-container">
        <header className="section-header">
          <span className="section-header__tag">Como funciona</span>
          <h2 id="process-title" className="section-header__title">
            Do problema à solução.
          </h2>
          <p className="section-header__desc">
            Entendemos o que sua empresa precisa, planejamos a solução e colocamos tudo para funcionar.
          </p>
        </header>

        <div className="process-track">
          <div className="process-track__line" aria-hidden="true" />
          {steps.map((item) => (
            <div key={item.step} className="process-node">
              <div className="process-node__step">{item.step}</div>
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
            <span className="about-manifesto__tag">SOBRE A NEXORA</span>
            <h2 id="about-title" className="about-manifesto__title">
              Construindo presenças digitais que fazem sentido.
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

          <div className="about-visual">
            <div className="about-visual__quote">
              "Não criamos por criar.<br />
              Criamos com um <em>propósito.</em>"
            </div>
            <p className="about-visual__sub">
              Nossa dedicação é criar soluções que entreguem clareza, credibilidade e solidez comercial para marcas contemporâneas.
            </p>
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
          <span className="section-header__tag">Demonstração de Transformação</span>
          <h2 id="transformation-title" className="section-header__title">
            Antes e depois.
          </h2>
          <p className="section-header__desc">
            Uma presença digital desorganizada pode esconder o valor de um negócio.
          </p>
        </header>

        <div className="transformation-comparison">
          {/* Lado Esquerdo: ANTES */}
          <div className="comparison-card comparison-card--before">
            <div className="comparison-card__header">
              <span className="comparison-card__label">ANTES</span>
              <span className="comparison-card__status-dot" />
            </div>

            <ul className="comparison-card__list">
              <li className="comparison-card__item">
                <span className="comparison-card__item-icon">✕</span>
                <span>Identidade desorganizada</span>
              </li>
              <li className="comparison-card__item">
                <span className="comparison-card__item-icon">✕</span>
                <span>Site ruim ou inexistente</span>
              </li>
              <li className="comparison-card__item">
                <span className="comparison-card__item-icon">✕</span>
                <span>Informações espalhadas</span>
              </li>
              <li className="comparison-card__item">
                <span className="comparison-card__item-icon">✕</span>
                <span>Comunicação confusa</span>
              </li>
              <li className="comparison-card__item">
                <span className="comparison-card__item-icon">✕</span>
                <span>Materiais inconsistentes</span>
              </li>
            </ul>
          </div>

          {/* Lado Direito: DEPOIS */}
          <div className="comparison-card comparison-card--after">
            <div className="comparison-card__header">
              <span className="comparison-card__label">DEPOIS</span>
              <span className="comparison-card__status-dot" />
            </div>

            <ul className="comparison-card__list">
              <li className="comparison-card__item">
                <span className="comparison-card__item-icon">✓</span>
                <span>Identidade organizada</span>
              </li>
              <li className="comparison-card__item">
                <span className="comparison-card__item-icon">✓</span>
                <span>Site profissional</span>
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
                <span>Materiais visualmente consistentes</span>
              </li>
              <li className="comparison-card__item">
                <span className="comparison-card__item-icon">✓</span>
                <span>Presença digital profissional</span>
              </li>
            </ul>

            <div className="comparison-card__pills">
              <span className="comparison-pill">Mais clareza</span>
              <span className="comparison-pill">Mais organização</span>
              <span className="comparison-pill">Melhor experiência</span>
              <span className="comparison-pill">Comunicação mais profissional</span>
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
            <MessageCircle size={20} />
            <span>Falar com a NEXORA</span>
            <ArrowUpRight size={18} />
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
        <ProcessSection />
        <AboutSection />
        <TransformationSection />
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
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});
