import {
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
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";

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
  },
  {
    number: "02",
    icon: PanelsTopLeft,
    title: "LANDING PAGES",
    description:
      "Páginas focadas em uma oferta, produto ou serviço, pensadas para gerar contatos e conversões.",
  },
  {
    number: "03",
    icon: Smartphone,
    title: "CARDÁPIOS DIGITAIS",
    description:
      "Cardápios digitais modernos, organizados e fáceis de acessar pelo celular.",
  },
  {
    number: "04",
    icon: Image,
    title: "IMAGENS E CONTEÚDO VISUAL",
    description:
      "Artes e imagens profissionais para divulgar produtos, serviços, promoções e sua marca.",
  },
  {
    number: "05",
    icon: Megaphone,
    title: "MATERIAIS DE DIVULGAÇÃO",
    description:
      "Materiais digitais para Instagram, WhatsApp e outros canais de comunicação.",
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

function ServicesSection() {
  return (
    <section
      className="services-section"
      id="servicos"
      aria-labelledby="services-title"
    >
      <div className="services-section__inner">
        <div className="services-section__heading">
          <div>
            <p className="section-eyebrow">
              <span aria-hidden="true" />
              SERVIÇOS
            </p>
            <h2 id="services-title">
              Serviços que colocam sua empresa no <em>digital.</em>
            </h2>
          </div>

          <p className="services-section__intro">
            Do primeiro contato com seu cliente até a apresentação da sua marca,
            criamos soluções digitais pensadas para tornar sua empresa mais
            profissional e mais fácil de encontrar.
          </p>
        </div>

        <div className="services-grid">
          {services.map(({ number, icon: Icon, title, description }) => (
            <article className="service-item" key={title}>
              <div className="service-item__top">
                <span className="service-item__icon" aria-hidden="true">
                  <Icon size={27} strokeWidth={1.5} />
                </span>
                <span className="service-item__number">{number}</span>
              </div>
              <div className="service-item__content">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <span className="service-item__signal" aria-hidden="true" />
            </article>
          ))}
        </div>

        <div className="services-cta">
          <p>Tem uma ideia ou precisa melhorar a presença digital da sua empresa?</p>
          <a className="button button--primary" href="#contato">
            Falar com a NEXORA
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function WhyNexoraSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      section.classList.add("why-section--visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.classList.add("why-section--visible");
        observer.disconnect();
      },
      { threshold: 0.14 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="why-section"
      id="por-que-nexora"
      ref={sectionRef}
      aria-labelledby="why-nexora-title"
    >
      <div className="why-section__inner">
        <div className="why-section__heading why-section__reveal">
          <div>
            <p className="section-eyebrow">
              <span aria-hidden="true" />
              POR QUE A NEXORA?
            </p>
            <h2 id="why-nexora-title">Por que a NEXORA?</h2>
          </div>
          <p className="why-section__intro">
            Não queremos apenas criar algo bonito. Queremos criar soluções
            digitais que façam sentido para o seu negócio.
          </p>
        </div>

        <div className="why-grid">
          {whyNexoraBlocks.map(({ number, title, description }, index) => (
            <article
              className="why-card why-section__reveal"
              key={number}
              style={
                { "--why-delay": `${index * 90}ms` } as CSSProperties
              }
            >
              <div className="why-card__top">
                <span className="why-card__number">{number}</span>
                <span className="why-card__signal" aria-hidden="true" />
              </div>
              <div className="why-card__content">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="why-highlight why-section__reveal">
          <strong>
            Seu negócio não precisa de mais complexidade.
            <span>Precisa da solução certa.</span>
          </strong>
          <a className="button button--primary why-highlight__cta" href="#servicos">
            Conhecer nossos serviços
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section
      className="process-section"
      id="como-funciona"
      aria-labelledby="process-title"
    >
      <div className="process-section__inner">
        <div className="process-section__heading">
          <div>
            <p className="section-eyebrow">
              <span aria-hidden="true" />
              COMO FUNCIONA
            </p>
            <h2 id="process-title">
              Do problema à <em>solução.</em>
            </h2>
          </div>

          <p className="process-section__intro">
            Entendemos o que sua empresa precisa, planejamos a solução e
            colocamos tudo para funcionar.
          </p>
        </div>

        <div className="process-flow" aria-label="Etapas do processo">
          {processSteps.map(({ number, title, description }) => (
            <article className="process-step" key={number}>
              <div className="process-step__signal" aria-hidden="true">
                <span className="process-step__node">{number}</span>
                <span className="process-step__connector" />
              </div>
              <div className="process-step__content">
                <p className="process-step__label">
                  <span>{number}</span> — {title}
                </p>
                <p className="process-step__description">{description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="needs-highlight">
          <div className="needs-highlight__copy">
            <p className="section-eyebrow">
              <span aria-hidden="true" />
              SOBRE SUA EMPRESA
            </p>
            <h2>Cada empresa tem uma necessidade diferente.</h2>
            <p>
              Por isso, não trabalhamos com uma solução única para todos.
              Primeiro entendemos o cenário da sua empresa. Depois definimos o
              que realmente faz sentido.
            </p>
          </div>

          <a
            className="button button--primary needs-highlight__cta"
            href={whatsappContactUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Conversar com a NEXORA pelo WhatsApp"
          >
            Vamos conversar sobre sua empresa
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      section.classList.add("contact-section--visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.classList.add("contact-section--visible");
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

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
      className="contact-section"
      id="contato"
      ref={sectionRef}
      aria-labelledby="contact-title"
    >
      <div className="contact-section__inner">
        <div className="contact-section__copy contact-reveal">
          <p className="section-eyebrow">
            <span aria-hidden="true" />
            CONTATO
          </p>
          <h2 id="contact-title">
            Vamos transformar sua próxima ideia em <em>realidade?</em>
          </h2>
          <p className="contact-section__intro">
            Conte o que sua empresa precisa. Vamos entender seu objetivo e
            conversar sobre a melhor solução.
          </p>
          <a
            className="button button--primary contact-section__whatsapp"
            href={whatsappContactUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Falar com a NEXORA pelo WhatsApp"
          >
            Falar com a NEXORA
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <div className="contact-section__signal" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>

        <form
          className="contact-form contact-reveal"
          style={{ "--contact-delay": "120ms" } as CSSProperties}
          onSubmit={handleFormSubmit}
        >
          <div className="contact-form__heading">
            <div>
              <p>ENVIE UMA MENSAGEM</p>
              <h3>Conte sobre o seu projeto.</h3>
            </div>
            <span aria-hidden="true">
              <Send size={20} strokeWidth={1.7} />
            </span>
          </div>

          <div className="contact-form__grid">
            <label>
              <span>Nome</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Seu nome"
                required
              />
            </label>
            <label>
              <span>Empresa</span>
              <input
                type="text"
                name="company"
                autoComplete="organization"
                placeholder="Nome da empresa"
                required
              />
            </label>
            <label>
              <span>WhatsApp</span>
              <input
                type="tel"
                name="whatsapp"
                autoComplete="tel"
                placeholder="Seu número"
                required
              />
            </label>
            <label>
              <span>Serviço de interesse</span>
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
              <span>Mensagem</span>
              <textarea
                name="message"
                rows={5}
                placeholder="Conte um pouco sobre o que sua empresa precisa"
                required
              />
            </label>
          </div>

          <button className="button button--primary contact-form__submit" type="submit">
            Enviar mensagem
            <Send size={17} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}

function SiteFooter() {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    if (!("IntersectionObserver" in window)) {
      footer.classList.add("site-footer--visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        footer.classList.add("site-footer--visible");
        observer.disconnect();
      },
      { threshold: 0.08 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

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
    <footer className="site-footer" ref={footerRef}>
      <div className="site-footer__inner">
        <div
          className={`site-footer__main footer-reveal${
            companyDetails.length > 0 ? " site-footer__main--with-details" : ""
          }`}
        >
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
            <div className="site-footer__company-details">
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

        <div className="site-footer__bottom footer-reveal">
          <p>© {new Date().getFullYear()} NEXORA. Todos os direitos reservados.</p>
          <span>INTELIGÊNCIA / CRIATIVIDADE / RESULTADO</span>
        </div>
      </div>
    </footer>
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

            <p className="hero__subtitle">
              Criamos soluções digitais para empresas que querem melhorar sua
              presença, sua comunicação e sua forma de vender.
            </p>

            <div className="hero__actions">
              <a className="button button--primary" href="#servicos">
                Conhecer nossos serviços
              </a>
              <a className="button button--secondary" href="#contato">
                Falar com a NEXORA
              </a>
            </div>

            <p className="hero__services">
              <span>Sites</span>
              <i aria-hidden="true">•</i>
              <span>Landing Pages</span>
              <i aria-hidden="true">•</i>
              <span>Cardápios Digitais</span>
              <i aria-hidden="true">•</i>
              <span>Conteúdo Visual</span>
            </p>
          </div>

          <div className="hero__visual">
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
  }),
  component: Index,
});
