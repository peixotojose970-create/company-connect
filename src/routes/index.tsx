import {
  ArrowDown,
  ArrowUpRight,
  Instagram,
  Image,
  MessageCircle,
  Megaphone,
  Menu,
  Monitor,
  PanelsTopLeft,
  Send,
  Smartphone,
  X,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";

const navigationItems = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Por que a NEXORA?", href: "#por-que-nexora" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Contato", href: "#contato" },
] as const;

const services = [
  {
    number: "01",
    icon: Monitor,
    title: "CRIAÇÃO DE SITES",
    description:
      "Sites modernos, rápidos e responsivos para apresentar sua empresa e transformar visitantes em clientes.",
    signal: "PRESENÇA / EXPERIÊNCIA",
  },
  {
    number: "02",
    icon: PanelsTopLeft,
    title: "LANDING PAGES",
    description:
      "Páginas focadas em uma oferta, produto ou serviço, pensadas para gerar contatos e conversões.",
    signal: "FOCO / CONVERSÃO",
  },
  {
    number: "03",
    icon: Smartphone,
    title: "CARDÁPIOS DIGITAIS",
    description:
      "Cardápios digitais modernos, organizados e fáceis de acessar pelo celular.",
    signal: "ACESSO / MOBILE",
  },
  {
    number: "04",
    icon: Image,
    title: "IMAGENS E CONTEÚDO VISUAL",
    description:
      "Artes e imagens profissionais para divulgar produtos, serviços, promoções e sua marca.",
    signal: "IMAGEM / IDENTIDADE",
  },
  {
    number: "05",
    icon: Megaphone,
    title: "MATERIAIS DE DIVULGAÇÃO",
    description:
      "Materiais digitais para Instagram, WhatsApp e outros canais de comunicação.",
    signal: "COMUNICAÇÃO / ALCANCE",
  },
] as const;

const processSteps = [
  {
    number: "01",
    title: "CONVERSA",
    description: "Você nos conta o que sua empresa precisa.",
  },
  {
    number: "02",
    title: "ESTRATÉGIA",
    description: "Analisamos o objetivo e definimos a melhor solução.",
  },
  {
    number: "03",
    title: "CRIAÇÃO",
    description: "Nossa equipe desenvolve o projeto e ajusta os detalhes.",
  },
  {
    number: "04",
    title: "ENTREGA",
    description: "Você recebe uma solução pronta para utilizar.",
  },
] as const;

const whyNexoraBlocks = [
  {
    number: "01",
    title: "PENSADO PARA O SEU NEGÓCIO",
    description:
      "Cada empresa possui uma necessidade diferente. Entendemos o seu objetivo antes de definir a solução.",
  },
  {
    number: "02",
    title: "TECNOLOGIA + CRIATIVIDADE",
    description:
      "Unimos tecnologia, inteligência artificial e criatividade para desenvolver soluções modernas e funcionais.",
  },
  {
    number: "03",
    title: "SIMPLES E DIRETO",
    description:
      "Sem processos complicados. Nossa proposta é entender o problema, criar a solução e entregar de forma clara.",
  },
  {
    number: "04",
    title: "FOCO NO RESULTADO",
    description:
      "Cada projeto é desenvolvido com um objetivo definido, buscando melhorar a presença digital e a comunicação da empresa.",
  },
] as const;

const nexoraWhatsappNumber = "";

const nexoraCompanyDetails = {
  cnpj: "",
  address: "",
  email: "",
  socialLinks: [] as Array<{ label: string; href: string }>,
};

const serviceOptions = [
  "Site",
  "Landing Page",
  "Cardápio Digital",
  "Imagens",
  "Materiais de Divulgação",
  "Outro",
] as const;

const whatsappContactUrl = buildWhatsappUrl(
  "Olá, NEXORA! Quero conversar sobre a minha empresa.",
);

function buildWhatsappUrl(message: string) {
  const phoneNumber = nexoraWhatsappNumber.replace(/\D/g, "");
  const recipientPath = phoneNumber ? `/${phoneNumber}` : "";

  return `https://wa.me${recipientPath}?text=${encodeURIComponent(message)}`;
}

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
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return sectionRef;
}

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

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="section-label">
      <span aria-hidden="true" />
      <span>{children}</span>
      <i aria-hidden="true" />
    </p>
  );
}

function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 32);
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
    <header
      className={`site-header${isScrolled ? " site-header--scrolled" : ""}${
        isMenuOpen ? " site-header--menu-open" : ""
      }`}
    >
      <div className="site-header__inner">
        <a
          className="site-header__brand"
          href="#inicio"
          onClick={() => setIsMenuOpen(false)}
        >
          <NexoraLogo />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href}>
              <span aria-hidden="true" />
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#contato">
          <span>Falar com a NEXORA</span>
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`mobile-menu${isMenuOpen ? " mobile-menu--open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-menu__grid" aria-hidden="true" />
        <p className="mobile-menu__meta">NEXORA / NAVEGAÇÃO</p>
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
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}

function HeroVisual() {
  return (
    <div
      className="hero-visual"
      role="img"
      aria-label="Composição tecnológica abstrata representando presença, inteligência e crescimento"
    >
      <div className="hero-visual__grid" aria-hidden="true" />
      <div className="hero-visual__halo" aria-hidden="true" />

      <svg className="hero-visual__svg" viewBox="0 0 680 680" aria-hidden="true">
        <defs>
          <linearGradient id="signalGradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#0875ff" />
            <stop offset="100%" stopColor="#25e6ff" />
          </linearGradient>
          <radialGradient id="coreGradient">
            <stop offset="0%" stopColor="#25e6ff" stopOpacity="0.9" />
            <stop offset="44%" stopColor="#0875ff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#05070c" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx="344"
          cy="334"
          r="246"
          fill="url(#coreGradient)"
          opacity="0.32"
        />
        <g className="hero-visual__orbits">
          <circle cx="344" cy="334" r="210" />
          <circle cx="344" cy="334" r="156" />
          <circle cx="344" cy="334" r="96" />
          <ellipse
            cx="344"
            cy="334"
            rx="276"
            ry="118"
            transform="rotate(-28 344 334)"
          />
          <ellipse
            cx="344"
            cy="334"
            rx="258"
            ry="94"
            transform="rotate(54 344 334)"
          />
        </g>
        <g className="hero-visual__pathways">
          <path d="M52 512C144 472 176 414 244 376" />
          <path d="M244 376L334 290L428 246L596 166" />
          <path d="M244 376L320 464L454 494L608 444" />
          <path d="M334 290L406 356L428 246" />
          <path d="M320 464L406 356" />
        </g>
        <path
          className="hero-visual__signal"
          d="M44 544C132 512 170 456 236 410C324 348 354 314 410 270C476 218 534 186 632 114"
        />
        <g className="hero-visual__nodes">
          <circle cx="52" cy="512" r="6" />
          <circle cx="244" cy="376" r="11" />
          <circle cx="334" cy="290" r="8" />
          <circle cx="406" cy="356" r="7" />
          <circle cx="428" cy="246" r="10" />
          <circle cx="608" cy="444" r="7" />
          <circle cx="632" cy="114" r="13" filter="url(#softGlow)" />
        </g>
        <g className="hero-visual__crosshairs">
          <path d="M44 544h36M62 526v36" />
          <path d="M614 114h36M632 96v36" />
          <path d="M398 356h16M406 348v16" />
        </g>
      </svg>

      <div className="hero-visual__core" aria-hidden="true">
        <span>N</span>
        <small>INTELIGÊNCIA</small>
      </div>
      <div className="hero-visual__tag hero-visual__tag--one">
        <span>01</span>
        PRESENÇA DIGITAL
      </div>
      <div className="hero-visual__tag hero-visual__tag--two">
        <span>02</span>
        INTELIGÊNCIA
      </div>
      <div className="hero-visual__tag hero-visual__tag--three">
        <span>03</span>
        CRESCIMENTO
      </div>
      <div className="hero-visual__coordinate hero-visual__coordinate--left">
        SIGNAL / NX-01
      </div>
      <div className="hero-visual__coordinate hero-visual__coordinate--right">
        SYSTEM / ACTIVE
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__glow hero__glow--one" aria-hidden="true" />
      <div className="hero__glow hero__glow--two" aria-hidden="true" />
      <div className="hero__technical hero__technical--left" aria-hidden="true">
        NX / 001
      </div>
      <div className="hero__technical hero__technical--right" aria-hidden="true">
        DIGITAL SYSTEM
      </div>

      <div className="hero__inner">
        <div className="hero__eyebrow">
          <span aria-hidden="true" />
          SERVIÇOS DIGITAIS PARA EMPRESAS
          <i aria-hidden="true" />
        </div>

        <div className="hero__composition">
          <div className="hero__visual-wrap">
            <HeroVisual />
          </div>

          <div className="hero__copy">
            <h1 id="hero-title">
              Inteligência que faz
              <span>
                empresas <em>crescerem.</em>
              </span>
            </h1>

            <div className="hero__support">
              <p>
                Criamos soluções digitais para empresas que querem melhorar sua
                presença, sua comunicação e sua forma de vender.
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="#servicos">
                  Conhecer nossos serviços
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <a className="button button--secondary" href="#contato">
                  Falar com a NEXORA
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__footer">
          <div className="hero__services">
            <span>SITES</span>
            <i aria-hidden="true">/</i>
            <span>LANDING PAGES</span>
            <i aria-hidden="true">/</i>
            <span>CARDÁPIOS DIGITAIS</span>
            <i aria-hidden="true">/</i>
            <span>CONTEÚDO VISUAL</span>
          </div>

          <a className="scroll-cue" href="#servicos">
            <span>CONTINUAR</span>
            <i aria-hidden="true">
              <ArrowDown size={15} />
            </i>
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
      className="services-section reveal-section"
      id="servicos"
      ref={sectionRef}
      aria-labelledby="services-title"
    >
      <div className="section-shell">
        <div className="section-heading section-heading--split">
          <div>
            <SectionLabel>SERVIÇOS / 01</SectionLabel>
            <h2 id="services-title">
              Serviços que colocam sua empresa no <em>digital.</em>
            </h2>
          </div>
          <p>
            Do primeiro contato com seu cliente até a apresentação da sua marca,
            criamos soluções digitais pensadas para tornar sua empresa mais
            profissional e mais fácil de encontrar.
          </p>
        </div>

        <div className="services-system">
          {services.map(({ number, icon: Icon, title, description, signal }) => (
            <article className="service-module" key={title}>
              <div className="service-module__rail">
                <span>{number}</span>
                <i aria-hidden="true" />
              </div>
              <div className="service-module__visual" aria-hidden="true">
                <span>
                  <Icon size={34} strokeWidth={1.25} />
                </span>
                <svg viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="62" />
                  <circle cx="80" cy="80" r="38" />
                  <path d="M18 80h124M80 18v124" />
                </svg>
              </div>
              <div className="service-module__content">
                <p className="service-module__signal">{signal}</p>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <a
                className="service-module__action"
                href="#contato"
                aria-label={`Conversar sobre ${title}`}
              >
                <span>EXPLORAR</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        <div className="services-outro">
          <p>
            Tem uma ideia ou precisa melhorar a presença digital da sua empresa?
          </p>
          <a className="text-link" href="#contato">
            Falar com a NEXORA
            <span aria-hidden="true">
              <ArrowUpRight size={18} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function WhyNexoraSection() {
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section
      className="why-section reveal-section"
      id="por-que-nexora"
      ref={sectionRef}
      aria-labelledby="why-nexora-title"
    >
      <div className="why-section__grid" aria-hidden="true" />
      <div className="section-shell">
        <div className="why-intro">
          <div>
            <SectionLabel>POR QUE A NEXORA? / 02</SectionLabel>
            <h2 id="why-nexora-title">Por que a NEXORA?</h2>
          </div>
          <p>
            Não queremos apenas criar algo bonito. Queremos criar soluções
            digitais que façam sentido para o seu negócio.
          </p>
        </div>

        <div className="why-manifest">
          {whyNexoraBlocks.map(({ number, title, description }, index) => (
            <article
              className="manifest-item"
              key={number}
              style={
                { "--item-delay": `${index * 90}ms` } as React.CSSProperties
              }
            >
              <div className="manifest-item__index" aria-hidden="true">
                {number}
              </div>
              <div className="manifest-item__body">
                <span className="manifest-item__signal" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="why-statement">
          <div className="why-statement__code" aria-hidden="true">
            <span>NX</span>
            <i />
            <span>04</span>
          </div>
          <strong>
            Seu negócio não precisa de mais complexidade.
            <span>Precisa da solução certa.</span>
          </strong>
          <a className="button button--primary" href="#servicos">
            Conhecer nossos serviços
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section
      className="process-section reveal-section"
      id="como-funciona"
      ref={sectionRef}
      aria-labelledby="process-title"
    >
      <div className="section-shell">
        <div className="section-heading section-heading--split process-heading">
          <div>
            <SectionLabel>COMO FUNCIONA / 03</SectionLabel>
            <h2 id="process-title">
              Do problema à <em>solução.</em>
            </h2>
          </div>
          <p>
            Entendemos o que sua empresa precisa, planejamos a solução e
            colocamos tudo para funcionar.
          </p>
        </div>

        <div className="process-flow" aria-label="Etapas do processo">
          <div className="process-flow__track" aria-hidden="true">
            <span />
          </div>
          {processSteps.map(({ number, title, description }, index) => (
            <article
              className="process-node"
              key={number}
              style={
                { "--node-delay": `${index * 120}ms` } as React.CSSProperties
              }
            >
              <div className="process-node__marker" aria-hidden="true">
                <span>{number}</span>
                <i />
              </div>
              <div className="process-node__content">
                <p>ETAPA {number}</p>
                <h3>{title}</h3>
                <span>{description}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="process-aside">
          <div className="process-aside__copy">
            <SectionLabel>SOBRE SUA EMPRESA</SectionLabel>
            <h2>Cada empresa tem uma necessidade diferente.</h2>
            <p>
              Por isso, não trabalhamos com uma solução única para todos.
              Primeiro entendemos o cenário da sua empresa. Depois definimos o
              que realmente faz sentido.
            </p>
          </div>
          <a
            className="button button--primary"
            href={whatsappContactUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Conversar com a NEXORA pelo WhatsApp"
          >
            Vamos conversar sobre sua empresa
            <ArrowUpRight size={18} aria-hidden="true" />
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
      "Olá, NEXORA! Gostaria de conversar sobre uma solução para a minha empresa.",
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
      className="contact-section reveal-section"
      id="contato"
      ref={sectionRef}
      aria-labelledby="contact-title"
    >
      <div className="contact-section__grid" aria-hidden="true" />
      <div className="contact-section__orbit" aria-hidden="true" />
      <div className="contact-section__beam" aria-hidden="true" />

      <div className="section-shell contact-shell">
        <div className="contact-copy">
          <SectionLabel>CONTATO / 04</SectionLabel>
          <div className="contact-copy__meta" aria-hidden="true">
            <span>INICIAR PROJETO</span>
            <i />
            <span>NEXORA</span>
          </div>
          <h2 id="contact-title">
            Vamos transformar sua próxima ideia em <em>realidade?</em>
          </h2>
          <p>
            Conte o que sua empresa precisa. Vamos entender seu objetivo e
            conversar sobre a melhor solução.
          </p>
          <a
            className="contact-primary"
            href={whatsappContactUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Falar com a NEXORA pelo WhatsApp"
          >
            <span>
              <MessageCircle size={20} aria-hidden="true" />
              Falar com a NEXORA
            </span>
            <i aria-hidden="true">
              <ArrowUpRight size={24} />
            </i>
          </a>
        </div>

        <form className="contact-form" onSubmit={handleFormSubmit}>
          <div className="contact-form__header">
            <div>
              <p>NOVA MENSAGEM</p>
              <h3>Conte sobre o seu projeto.</h3>
            </div>
            <span aria-hidden="true">
              <Send size={21} strokeWidth={1.5} />
            </span>
          </div>

          <div className="contact-form__grid">
            <label>
              <span>01 / Nome</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Seu nome"
                required
              />
            </label>
            <label>
              <span>02 / Empresa</span>
              <input
                type="text"
                name="company"
                autoComplete="organization"
                placeholder="Nome da empresa"
                required
              />
            </label>
            <label>
              <span>03 / WhatsApp</span>
              <input
                type="tel"
                name="whatsapp"
                autoComplete="tel"
                placeholder="Seu número"
                required
              />
            </label>
            <label>
              <span>04 / Serviço de interesse</span>
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
            <label className="contact-form__message">
              <span>05 / Mensagem</span>
              <textarea
                name="message"
                rows={5}
                placeholder="Conte um pouco sobre o que sua empresa precisa"
                required
              />
            </label>
          </div>

          <button className="contact-form__submit" type="submit">
            <span>Enviar mensagem</span>
            <i aria-hidden="true">
              <Send size={18} />
            </i>
          </button>
        </form>
      </div>
    </section>
  );
}

function SiteFooter() {
  const footerRef = useSectionReveal<HTMLElement>();
  const companyDetails = [
    nexoraCompanyDetails.cnpj && {
      label: "CNPJ",
      value: nexoraCompanyDetails.cnpj,
    },
    nexoraCompanyDetails.address && {
      label: "Endereço",
      value: nexoraCompanyDetails.address,
    },
    nexoraCompanyDetails.email && {
      label: "E-mail",
      value: nexoraCompanyDetails.email,
      href: `mailto:${nexoraCompanyDetails.email}`,
    },
  ].filter(Boolean) as Array<{ label: string; value: string; href?: string }>;

  return (
    <footer className="site-footer reveal-section" ref={footerRef}>
      <div className="site-footer__signal" aria-hidden="true">
        NEXORA
      </div>
      <div className="section-shell site-footer__inner">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <a href="#inicio" aria-label="Voltar ao início">
              <NexoraLogo />
            </a>
            <p>Inteligência que faz empresas crescerem.</p>
          </div>

          <nav className="site-footer__nav" aria-label="Links do rodapé">
            <p>NAVEGAÇÃO</p>
            <a href="#inicio">Início</a>
            <a href="#servicos">Serviços</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#por-que-nexora">Sobre nós</a>
            <a href="#contato">Contato</a>
          </nav>

          <div className="site-footer__social">
            <p>CONECTE-SE</p>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <Instagram size={17} aria-hidden="true" />
              Instagram
            </a>
            <a
              href={whatsappContactUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Falar com a NEXORA pelo WhatsApp"
            >
              <MessageCircle size={17} aria-hidden="true" />
              WhatsApp
            </a>
            {nexoraCompanyDetails.socialLinks.map((socialLink) => (
              <a
                href={socialLink.href}
                target="_blank"
                rel="noreferrer"
                key={`${socialLink.label}-${socialLink.href}`}
              >
                {socialLink.label}
              </a>
            ))}
          </div>

          {companyDetails.length > 0 && (
            <div className="site-footer__details">
              <p>INFORMAÇÕES</p>
              {companyDetails.map((detail) => (
                <div key={detail.label}>
                  <span>{detail.label}</span>
                  {detail.href ? (
                    <a href={detail.href}>{detail.value}</a>
                  ) : (
                    <span>{detail.value}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} NEXORA. Todos os direitos reservados.</p>
          <span>INTELIGÊNCIA / CRIATIVIDADE / RESULTADO</span>
          <a href="#inicio">
            VOLTAR AO TOPO
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="nexora-page">
      <SiteHeader />
      <Hero />
      <ServicesSection />
      <WhyNexoraSection />
      <ProcessSection />
      <ContactSection />
      <SiteFooter />
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
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Manrope:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});
