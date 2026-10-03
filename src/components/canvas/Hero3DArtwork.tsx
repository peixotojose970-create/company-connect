import { ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HeroNMonolith } from "./HeroNMonolith";

export function Hero3DArtwork() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 0, my: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 1024
    ) {
      return;
    }

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setTilt({
          rx: -y * 6,
          ry: x * 8,
          mx: x * 12,
          my: y * 8,
        });
      });
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setTilt({ rx: 0, ry: 0, mx: 0, my: 0 });
      });
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-artwork"
      role="region"
      aria-label="Experiência 3D e Composição NEXORA"
    >
      <div className="hero-artwork__glow-back" aria-hidden="true" />
      <div className="hero-artwork__ambient" aria-hidden="true" />

      {/* 3D Main Hero Monolith Element */}
      <div
        className="hero-artwork__monolith-wrapper"
        style={{
          transform: `translate3d(${tilt.mx * 0.4}px, ${tilt.my * 0.4}px, 0)`,
        }}
      >
        <HeroNMonolith />
      </div>

      {/* Dimensional layered surrounding interfaces */}
      <div
        className="hero-artwork__stage"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        {/* Main Showcase Device Canvas */}
        <div
          className="hero-artwork__screen"
          style={{
            transform: `translate3d(${tilt.mx * -0.2}px, ${tilt.my * -0.2}px, 0)`,
          }}
        >
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
        <div
          className="hero-artwork__mobile-float"
          style={{
            transform: `translate3d(${tilt.mx * 0.6}px, ${tilt.my * 0.6}px, 20px)`,
          }}
        >
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
              <p>Mobile First</p>
              <span>Vendas instantâneas</span>
            </div>
            <div className="hero-artwork__mobile-action">
              <span>Ver Demonstração</span>
              <ArrowUpRight size={13} />
            </div>
          </div>
        </div>

        {/* Floating Accent Capsule */}
        <div
          className="hero-artwork__badge-float"
          style={{
            transform: `translate3d(${tilt.mx * -0.5}px, ${tilt.my * -0.5}px, 35px)`,
          }}
        >
          <div className="hero-artwork__badge-icon">
            <Sparkles size={16} />
          </div>
          <div>
            <strong className="hero-artwork__badge-title">Tecnologia &amp; Design</strong>
            <span className="hero-artwork__badge-sub">Excelência em cada detalhe</span>
          </div>
        </div>
      </div>
    </div>
  );
}
