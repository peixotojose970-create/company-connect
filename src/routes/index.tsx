import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Instagram,
  Laptop,
  Layers,
  MessageCircle,
  Menu,
  Palette,
  Phone,
  Send,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";

const navigationItems = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Posicionamento", href: "#por-que-nexora" },
  { label: "Método", href: "#como-funciona" },
  { label: "Contato", href: "#contato" },
] as const;

const nexoraWhatsappNumber = "";

const nexoraCompanyDetails = {
  cnpj: "",
  address: "",
  email: "",
  socialLinks: [] as Array<{ label: string; href: string }>,
};

const serviceOptions = [
  "Criação de Site",
  "Landing Page de Alta Conversão",
  "Cardápio Digital",
  "Imagens e Conteúdo Visual",
  "Materiais de Divulgação",
  "Projeto Customizado",
] as const;

function buildWhatsappUrl(message: string) {
  const phoneNumber = nexoraWhatsappNumber.replace(/\D/g, "");
  const recipientPath = phoneNumber ? `/${phoneNumber}` : "";
  return `https://wa.me${recipientPath}?text=${encodeURIComponent(message)}`;
}

const whatsappContactUrl = buildWhatsappUrl(
  "Olá, NEXORA! Quero conversar sobre soluções digitais para a minha empresa.",
);

function useSectionReveal<T extends HTMLElement>() {
  const sectionRef = useRef<T | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      section.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return sectionRef;
}

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
    <header
      className={`nx-header${isScrolled ? " nx-header--scrolled" : ""}${
        isMenuOpen ? " nx-header--open" : ""
      }`}
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
          <a className="nx-btn nx-btn--pill-accent" href="#contato">
            <span>Falar com a NEXORA</span>
            <ArrowUpRight size={16} aria-hidden="true" />
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
            {navigationItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="nx-drawer__link"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nx-drawer__link-num">0{index + 1}</span>
                <span className="nx-drawer__link-title">{item.label}</span>
                <ChevronRight size={18} aria-hidden="true" />
              </a>
            ))}
          </nav>
          <div className="nx-drawer__footer">
            <a
              className="nx-btn nx-btn--primary nx-btn--full"
              href="#contato"
              onClick={() => setIsMenuOpen(false)}
            >
              Falar com a NEXORA
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroCinematicCanvas() {
  return (
    <div className="hero-artwork" role="img" aria-label="Composição visual cinematográfica NEXORA">
      <div className="hero-artwork__glow-back" aria-hidden="true" />
      <div className="hero-artwork__ambient" aria-hidden="true" />
      
      {/* Editorial floating layered composition */}
      <div className="hero-artwork__stage">
        {/* Main Showcase Device / Canvas */}
        <div className="hero-artwork__screen">
          <div className="hero-artwork__screen-header">
            <div className="hero-artwork__screen-dots">
              <span />
              <span />
              <span />
            </div>
            <div className="hero-artwork__screen-url">nexora.digital/experience</div>
          </div>
          <div className="hero-artwork__screen-body">
            <div className="hero-artwork__screen-hero">
              <span className="hero-artwork__screen-badge">Digital Flagship</span>
              <p className="hero-artwork__screen-heading">Presença de alto impacto.</p>
              <div className="hero-artwork__screen-bars">
                <span className="hero-artwork__bar hero-artwork__bar--w80" />
                <span className="hero-artwork__bar hero-artwork__bar--w50" />
              </div>
            </div>
            <div className="hero-artwork__screen-tiles">
              <div className="hero-artwork__tile hero-artwork__tile--highlight">
                <div className="hero-artwork__tile-metric">+240%</div>
                <div className="hero-artwork__tile-label">Conversão Comercial</div>
              </div>
              <div className="hero-artwork__tile">
                <div className="hero-artwork__tile-stat">99.8%</div>
                <div className="hero-artwork__tile-label">Retenção de Marca</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Mobile Specimen */}
        <div className="hero-artwork__mobile-float">
          <div className="hero-artwork__mobile-notch" />
          <div className="hero-artwork__mobile-content">
            <div className="hero-artwork__mobile-top">
              <span className="hero-artwork__mobile-avatar" />
              <div>
                <span className="hero-artwork__mobile-line1" />
                <span className="hero-artwork__mobile-line2" />
              </div>
            </div>
            <div className="hero-artwork__mobile-hero">
              <p>Experiência Mobile First</p>
              <span>Design fluido para vendas instantâneas</span>
            </div>
            <div className="hero-artwork__mobile-action">
              <span>Iniciar Pedido</span>
              <ArrowUpRight size={13} />
            </div>
          </div>
        </div>

        {/* Floating Accent Capsule */}
        <div className="hero-artwork__badge-float">
          <div className="hero-artwork__badge-icon">
            <Sparkles size={16} />
          </div>
          <div>
            <strong className="hero-artwork__badge-title">Tecnologia &amp; Design</strong>
            <span className="hero-artwork__badge-sub">Padrão de excelência internacional</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="inicio" aria-labelledby="hero-title">
      <div className="hero-section__shell">
        <div className="hero-section__grid">
          <div className="hero-copy">
            <div className="hero-copy__eyebrow">
              <span className="hero-copy__eyebrow-pip" aria-hidden="true" />
              INTELIGÊNCIA QUE FAZ EMPRESAS CRESCEREM
            </div>

            <h1 id="hero-title" className="hero-copy__title">
              Inteligência que faz
              <span className="hero-copy__title-highlight">
                empresas <em>crescerem.</em>
              </span>
            </h1>

            <p className="hero-copy__lead">
              Criamos soluções digitais para empresas que querem melhorar sua
              presença, sua comunicação e sua forma de vender.
            </p>

            <div className="hero-copy__actions">
              <a className="nx-btn nx-btn--hero-primary" href="#contato">
                <span>Falar com a NEXORA</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="nx-btn nx-btn--hero-secondary" href="#servicos">
                <span>Conhecer serviços</span>
              </a>
            </div>

            <div className="hero-copy__metrics">
              <div className="hero-metric">
                <span className="hero-metric__num">100%</span>
                <span className="hero-metric__label">Projetos sob medida</span>
              </div>
              <div className="hero-metric__divider" aria-hidden="true" />
              <div className="hero-metric">
                <span className="hero-metric__num">Design + IA</span>
                <span className="hero-metric__label">Engenharia contemporânea</span>
              </div>
              <div className="hero-metric__divider" aria-hidden="true" />
              <div className="hero-metric">
                <span className="hero-metric__num">Foco Total</span>
                <span className="hero-metric__label">Resultados comerciais</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-column">
            <HeroCinematicCanvas />
          </div>
        </div>

        <div className="hero-section__bar">
          <span className="hero-section__bar-label">SOLUÇÕES PRINCIPAIS</span>
          <div className="hero-section__tags">
            <span>SITES INSTITUCIONAIS</span>
            <span className="hero-section__dot" />
            <span>LANDING PAGES</span>
            <span className="hero-section__dot" />
            <span>CARDÁPIOS DIGITAIS</span>
            <span className="hero-section__dot" />
            <span>IMAGENS E CONTEÚDO VISUAL</span>
            <span className="hero-section__dot" />
            <span>MATERIAIS DE DIVULGAÇÃO</span>
          </div>
          <a className="hero-section__scroll" href="#servicos" aria-label="Rolar para os serviços">
            <span>EXPLORAR</span>
            <ArrowDown size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section
      className="editorial-services reveal-block"
      id="servicos"
      ref={sectionRef}
      aria-labelledby="services-headline"
    >
      <div className="editorial-services__shell">
        <header className="editorial-header">
          <div className="editorial-header__tag">
            <span className="editorial-header__line" />
            PORTFÓLIO &amp; SOLUÇÕES
          </div>
          <div className="editorial-header__split">
            <h2 id="services-headline" className="editorial-header__title">
              Construímos a presença <em>digital</em> da sua empresa.
            </h2>
            <p className="editorial-header__desc">
              Cada ponto de contato digital deve comunicar solidez, autoridade e sofisticação.
              Apresentamos soluções desenhadas em formatos editoriais dedicados para cada necessidade comercial.
            </p>
          </div>
        </header>

        <div className="editorial-showcase">
          {/* Serviço 1: Criação de Sites - Grande Bloco Principal */}
          <article className="editorial-block editorial-block--flagship">
            <div className="editorial-block__meta">
              <span className="editorial-block__category">ESTÚDIO WEB / 01</span>
              <h3 className="editorial-block__heading">Criação de Sites</h3>
              <p className="editorial-block__text">
                Sites modernos, rápidos e responsivos para apresentar sua empresa e transformar visitantes em clientes com credibilidade de grande player.
              </p>
              <ul className="editorial-block__points">
                <li><CheckCircle2 size={16} /> Arquitetura de informação intuitiva</li>
                <li><CheckCircle2 size={16} /> Performance ultra veloz e SEO estratégico</li>
                <li><CheckCircle2 size={16} /> Identidade exclusiva sem templates genéricos</li>
              </ul>
              <a className="editorial-block__cta" href="#contato">
                <span>Solicitar orçamento de site</span>
                <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="editorial-block__visual editorial-block__visual--desktop">
              <div className="mockup-browser">
                <div className="mockup-browser__bar">
                  <div className="mockup-browser__dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="mockup-browser__address">empresa.com.br — Flagship Experience</div>
                </div>
                <div className="mockup-browser__content">
                  <div className="mockup-browser__hero-preview">
                    <span className="mockup-browser__tag">Nova Coleção / Institucional</span>
                    <h4>Apresentação corporativa de alto padrão</h4>
                    <div className="mockup-browser__row">
                      <div className="mockup-browser__card">
                        <div className="mockup-browser__photo mockup-browser__photo--1" />
                        <span>Soluções Corporativas</span>
                      </div>
                      <div className="mockup-browser__card">
                        <div className="mockup-browser__photo mockup-browser__photo--2" />
                        <span>Consultoria &amp; Escala</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Grid Assimétrico: Landing Page e Cardápio Digital */}
          <div className="editorial-split-duo">
            {/* Serviço 2: Landing Pages */}
            <article className="editorial-block editorial-block--landing">
              <div className="editorial-block__meta">
                <span className="editorial-block__category">CONVERSÃO / 02</span>
                <h3 className="editorial-block__heading">Landing Pages</h3>
                <p className="editorial-block__text">
                  Páginas focadas em uma oferta, produto ou campanha específica, pensadas minuciosamente para maximizar cadastros e gerar vendas qualificadas.
                </p>
                <div className="editorial-badge-row">
                  <span className="editorial-pill">Campanhas Ads</span>
                  <span className="editorial-pill">Lançamentos</span>
                  <span className="editorial-pill">Captação B2B</span>
                </div>
              </div>

              <div className="editorial-block__visual editorial-block__visual--campaign">
                <div className="mockup-campaign">
                  <div className="mockup-campaign__header">
                    <span className="mockup-campaign__tag">Oferta Especial</span>
                    <span className="mockup-campaign__live">TEMPO LIMITADO</span>
                  </div>
                  <p className="mockup-campaign__headline">Acelere as vendas da sua empresa com precisão.</p>
                  <div className="mockup-campaign__form-preview">
                    <div className="mockup-campaign__input-dummy">seuemail@empresa.com</div>
                    <div className="mockup-campaign__btn-dummy">Garantir Demonstração</div>
                  </div>
                  <div className="mockup-campaign__stats">
                    <div>
                      <strong>3.8x</strong>
                      <small>Mais Leads</small>
                    </div>
                    <div>
                      <strong>&lt; 1.2s</strong>
                      <small>Carregamento</small>
                    </div>
                  </div>
                </div>
              </div>

              <a className="editorial-link" href="#contato">
                <span>Construir Landing Page</span>
                <ArrowUpRight size={16} />
              </a>
            </article>

            {/* Serviço 3: Cardápio Digital */}
            <article className="editorial-block editorial-block--menu">
              <div className="editorial-block__meta">
                <span className="editorial-block__category">EXPERIÊNCIA MOBILE / 03</span>
                <h3 className="editorial-block__heading">Cardápios Digitais</h3>
                <p className="editorial-block__text">
                  Interfaces pensadas para restaurantes e estabelecimentos que precisam de pedidos rápidos, fotos de dar água na boca e facilidade na palma da mão.
                </p>
              </div>

              <div className="editorial-block__visual editorial-block__visual--phone">
                <div className="mockup-phone">
                  <div className="mockup-phone__screen">
                    <div className="mockup-phone__speaker" />
                    <div className="mockup-phone__app-bar">
                      <strong>Bistrô &amp; Cucina</strong>
                      <span className="mockup-phone__badge">Mesa 08</span>
                    </div>
                    <div className="mockup-phone__item">
                      <div className="mockup-phone__thumb mockup-phone__thumb--dish1" />
                      <div className="mockup-phone__details">
                        <span className="mockup-phone__name">Prato Principal Especial</span>
                        <span className="mockup-phone__price">R$ 68,00</span>
                      </div>
                      <div className="mockup-phone__add">+</div>
                    </div>
                    <div className="mockup-phone__item">
                      <div className="mockup-phone__thumb mockup-phone__thumb--dish2" />
                      <div className="mockup-phone__details">
                        <span className="mockup-phone__name">Bebida Artesanal Gelada</span>
                        <span className="mockup-phone__price">R$ 22,00</span>
                      </div>
                      <div className="mockup-phone__add">+</div>
                    </div>
                    <div className="mockup-phone__cart-bar">
                      <span>Ver Sacola (2 itens)</span>
                      <span>R$ 90,00</span>
                    </div>
                  </div>
                </div>
              </div>

              <a className="editorial-link" href="#contato">
                <span>Criar Cardápio Digital</span>
                <ArrowUpRight size={16} />
              </a>
            </article>
          </div>

          {/* Grid Duplo Inferior: Imagens e Conteúdo Visual + Materiais de Divulgação */}
          <div className="editorial-split-duo editorial-split-duo--bottom">
            {/* Serviço 4: Imagens e Conteúdo Visual */}
            <article className="editorial-block editorial-block--visuals">
              <div className="editorial-block__meta">
                <span className="editorial-block__category">DIREÇÃO DE ARTE / 04</span>
                <h3 className="editorial-block__heading">Imagens e Conteúdo Visual</h3>
                <p className="editorial-block__text">
                  Artes e composições visuais de alta definição para valorizar produtos, campanhas, catálogo institucional e elevar a percepção de valor da sua marca.
                </p>
              </div>

              <div className="editorial-block__visual editorial-block__visual--gallery">
                <div className="mockup-gallery">
                  <div className="mockup-gallery__tile mockup-gallery__tile--main">
                    <span className="mockup-gallery__tag">Composição 3D / Premium</span>
                  </div>
                  <div className="mockup-gallery__tile mockup-gallery__tile--side1">
                    <Palette size={20} />
                  </div>
                  <div className="mockup-gallery__tile mockup-gallery__tile--side2">
                    <Layers size={20} />
                  </div>
                </div>
              </div>

              <a className="editorial-link" href="#contato">
                <span>Elevar Percepção Visual</span>
                <ArrowUpRight size={16} />
              </a>
            </article>

            {/* Serviço 5: Materiais de Divulgação */}
            <article className="editorial-block editorial-block--social">
              <div className="editorial-block__meta">
                <span className="editorial-block__category">COMUNICAÇÃO / 05</span>
                <h3 className="editorial-block__heading">Materiais de Divulgação</h3>
                <p className="editorial-block__text">
                  Peças digitais estratégicas para WhatsApp, Instagram e campanhas de anúncios, pensadas para reter atenção imediata no feed e no direct.
                </p>
              </div>

              <div className="editorial-block__visual editorial-block__visual--social-feed">
                <div className="mockup-feed">
                  <div className="mockup-feed__post">
                    <div className="mockup-feed__post-header">
                      <span className="mockup-feed__avatar" />
                      <span>@nexora.digital</span>
                    </div>
                    <div className="mockup-feed__post-image">
                      <p>Design de Impacto para Vender Mais</p>
                    </div>
                    <div className="mockup-feed__post-actions">
                      <Share2 size={15} />
                      <span>Comunicação pronta para conversão</span>
                    </div>
                  </div>
                </div>
              </div>

              <a className="editorial-link" href="#contato">
                <span>Criar Materiais de Divulgação</span>
                <ArrowUpRight size={16} />
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyNexoraSection() {
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section
      className="positioning-section reveal-block"
      id="por-que-nexora"
      ref={sectionRef}
      aria-labelledby="positioning-title"
    >
      <div className="positioning-section__shell">
        <div className="positioning-editorial">
          {/* Coluna Esquerda: Declaração Principal */}
          <div className="positioning-statement">
            <span className="positioning-tag">POSICIONAMENTO NEXORA</span>
            <h2 id="positioning-title" className="positioning-headline">
              Seu negócio não precisa de mais complexidade.
              <span className="positioning-headline__accent">
                Precisa da solução certa.
              </span>
            </h2>
            <p className="positioning-lead">
              A maioria das empresas se perde entre ferramentas confusas e promessas vazias. 
              Na NEXORA, aliamos rigor estético, tecnologia sólida e visão comercial prática para entregar aquilo que realmente gera tração.
            </p>

            <div className="positioning-cta-wrap">
              <a className="nx-btn nx-btn--primary" href="#contato">
                <span>Iniciar conversa estratégica</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          {/* Coluna Direita: 3 Pilares Fundamentais */}
          <div className="positioning-pillars">
            <article className="pillar-item">
              <div className="pillar-item__number">01</div>
              <div className="pillar-item__content">
                <h3 className="pillar-item__title">Entendimento antes da execução</h3>
                <p className="pillar-item__desc">
                  Entendemos o objetivo da sua empresa antes de criar a solução. Não vendemos pacotes prontos; desenhamos o que faz sentido para o seu momento.
                </p>
              </div>
            </article>

            <article className="pillar-item">
              <div className="pillar-item__number">02</div>
              <div className="pillar-item__content">
                <h3 className="pillar-item__title">Tecnologia, IA e Criatividade</h3>
                <p className="pillar-item__desc">
                  Unimos tecnologia de ponta, inteligência artificial e criatividade contemporânea para conceber produtos digitais rápidos, escaláveis e esteticamente impecáveis.
                </p>
              </div>
            </article>

            <article className="pillar-item">
              <div className="pillar-item__number">03</div>
              <div className="pillar-item__content">
                <h3 className="pillar-item__title">Experiências simples e funcionais</h3>
                <p className="pillar-item__desc">
                  Projetamos experiências digitais simples, profissionais e funcionais. Seu cliente navega sem atrito e toma a decisão de compra com clareza.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

const methodSteps = [
  {
    step: "01",
    name: "CONVERSA",
    subtitle: "Diagnóstico inicial",
    text: "Você nos conta o que sua empresa precisa, seus desafios atuais e onde deseja chegar.",
  },
  {
    step: "02",
    name: "ESTRATÉGIA",
    subtitle: "Arquitetura & Direção",
    text: "Analisamos o objetivo comercial e definimos o formato ideal com cronograma objetivo.",
  },
  {
    step: "03",
    name: "CRIAÇÃO",
    subtitle: "Design & Desenvolvimento",
    text: "Nossa equipe desenvolve o projeto visual e técnico com revisões refinadas lado a lado.",
  },
  {
    step: "04",
    name: "ENTREGA",
    subtitle: "Lançamento em produção",
    text: "Você recebe uma solução pronta para utilizar, testada, rápida e orientada a conversão.",
  },
] as const;

function ProcessSection() {
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section
      className="method-section reveal-block"
      id="como-funciona"
      ref={sectionRef}
      aria-labelledby="method-headline"
    >
      <div className="method-section__shell">
        <header className="method-header">
          <div className="method-header__tag">MÉTODO CLARO &amp; TRANSPARENTE</div>
          <div className="method-header__split">
            <h2 id="method-headline" className="method-header__title">
              Do diagnóstico à entrega <em>definitiva.</em>
            </h2>
            <p className="method-header__desc">
              Um fluxo horizontal limpo, sem reuniões desnecessárias ou processos lentos. Direto ao ponto, com precisão técnica e atenção aos detalhes.
            </p>
          </div>
        </header>

        {/* Linha Horizontal Desktop / Vertical Mobile */}
        <div className="method-timeline" role="list">
          <div className="method-timeline__axis" aria-hidden="true" />
          {methodSteps.map(({ step, name, subtitle, text }, index) => (
            <div className="method-step" role="listitem" key={step}>
              <div className="method-step__marker">
                <span className="method-step__digit">{step}</span>
                <span className="method-step__dot" />
              </div>
              <div className="method-step__body">
                <span className="method-step__label">{subtitle}</span>
                <h3 className="method-step__name">{name}</h3>
                <p className="method-step__text">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="method-banner">
          <div className="method-banner__content">
            <h3>Cada empresa tem uma necessidade diferente.</h3>
            <p>
              Por isso não aplicamos soluções engessadas. Conversamos abertamente para desenhar exatamente a solução que trará retorno.
            </p>
          </div>
          <a
            className="nx-btn nx-btn--pill-accent"
            href={whatsappContactUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>Conversar via WhatsApp</span>
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const sectionRef = useSectionReveal<HTMLElement>();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const message = [
      "Olá, NEXORA! Gostaria de conversar sobre uma solução digital para a minha empresa.",
      "",
      `Nome: ${formData.get("name")}`,
      `Empresa: ${formData.get("company")}`,
      `WhatsApp: ${formData.get("whatsapp")}`,
      `Serviço de interesse: ${formData.get("service")}`,
      `Mensagem: ${formData.get("message")}`,
    ].join("\n");

    window.open(buildWhatsappUrl(message), "_blank", "noopener,noreferrer");
    event.currentTarget.reset();
  };

  return (
    <section
      className="final-cta-section reveal-block"
      id="contato"
      ref={sectionRef}
      aria-labelledby="cta-headline"
    >
      <div className="final-cta-section__shell">
        <div className="final-cta-card">
          <div className="final-cta-card__glow" aria-hidden="true" />

          <div className="final-cta-grid">
            {/* Esquerda: Chamada Marcante e Impactante */}
            <div className="final-cta-copy">
              <span className="final-cta-tag">INICIAR PARCERIA</span>
              <h2 id="cta-headline" className="final-cta-title">
                Vamos construir isso <em>juntos.</em>
              </h2>
              <p className="final-cta-desc">
                Conte o que sua empresa precisa hoje. Vamos entender seu objetivo de negócio e apresentar a solução visual e tecnológica definitiva.
              </p>

              <div className="final-cta-direct">
                <a
                  className="nx-btn nx-btn--big-cta"
                  href={whatsappContactUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={22} />
                  <span>Falar com a NEXORA</span>
                  <ArrowUpRight size={20} />
                </a>

                <div className="final-cta-guarantees">
                  <div className="cta-guarantee-pill">
                    <CheckCircle2 size={15} />
                    <span>Atendimento rápido e direto</span>
                  </div>
                  <div className="cta-guarantee-pill">
                    <CheckCircle2 size={15} />
                    <span>Sem custos para orçamento</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direita: Formulário Limpo e Elegante */}
            <div className="final-cta-form-wrap">
              <form className="nx-form" onSubmit={handleFormSubmit}>
                <div className="nx-form__head">
                  <h3>Envie uma mensagem direta</h3>
                  <p>Preencha os campos para receber contato prioritário.</p>
                </div>

                <div className="nx-form__fields">
                  <div className="nx-form__row">
                    <label className="nx-form__field">
                      <span>Nome</span>
                      <input
                        type="text"
                        name="name"
                        placeholder="Como prefere ser chamado"
                        required
                      />
                    </label>
                    <label className="nx-form__field">
                      <span>Empresa</span>
                      <input
                        type="text"
                        name="company"
                        placeholder="Nome da sua marca"
                        required
                      />
                    </label>
                  </div>

                  <div className="nx-form__row">
                    <label className="nx-form__field">
                      <span>WhatsApp / Telefone</span>
                      <input
                        type="tel"
                        name="whatsapp"
                        placeholder="(DDD) 99999-9999"
                        required
                      />
                    </label>
                    <label className="nx-form__field">
                      <span>Serviço desejado</span>
                      <select name="service" defaultValue="" required>
                        <option value="" disabled>
                          Selecione um serviço
                        </option>
                        {serviceOptions.map((service) => (
                          <option value={service} key={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="nx-form__field nx-form__field--full">
                    <span>Detalhes do projeto</span>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Conte resumidamente o que você deseja desenvolver ou melhorar na presença digital da sua empresa..."
                      required
                    />
                  </label>
                </div>

                <button type="submit" className="nx-btn nx-btn--form-submit">
                  <span>Enviar para a equipe NEXORA</span>
                  <Send size={17} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="nx-footer">
      <div className="nx-footer__shell">
        <div className="nx-footer__top">
          <div className="nx-footer__brand">
            <a href="#inicio" aria-label="NEXORA Início">
              <NexoraLogo />
            </a>
            <p className="nx-footer__tagline">
              Inteligência que faz empresas crescerem. Design contemporâneo, engenharia e estratégia digital de alto padrão.
            </p>
          </div>

          <div className="nx-footer__nav-group">
            <span className="nx-footer__heading">Navegação</span>
            <a href="#inicio">Início</a>
            <a href="#servicos">Serviços</a>
            <a href="#por-que-nexora">Posicionamento</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#contato">Contato</a>
          </div>

          <div className="nx-footer__nav-group">
            <span className="nx-footer__heading">Serviços</span>
            <a href="#servicos">Criação de Sites</a>
            <a href="#servicos">Landing Pages</a>
            <a href="#servicos">Cardápios Digitais</a>
            <a href="#servicos">Imagens e Conteúdo</a>
            <a href="#servicos">Materiais de Divulgação</a>
          </div>

          <div className="nx-footer__nav-group">
            <span className="nx-footer__heading">Contato Rápido</span>
            <a href={whatsappContactUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={15} />
              WhatsApp Oficial
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram size={15} />
              Instagram
            </a>
          </div>
        </div>

        <div className="nx-footer__bottom">
          <p>© {new Date().getFullYear()} NEXORA Soluções Digitais. Todos os direitos reservados.</p>
          <a href="#inicio" className="nx-footer__top-link">
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
        <ContactSection />
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
          "Soluções digitais de alto nível: websites corporativos, landing pages de alta conversão, cardápios digitais e direção de arte contemporânea.",
      },
      {
        property: "og:title",
        content: "NEXORA — Inteligência que faz empresas crescerem.",
      },
      {
        property: "og:description",
        content:
          "Presença digital moderna, confiável e comercialmente impactante para sua empresa.",
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
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});
