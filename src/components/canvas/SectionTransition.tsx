interface SectionTransitionProps {
  variant?: "ambient-glow" | "subtle-beam" | "fine-divider";
}

export function SectionTransition({ variant = "ambient-glow" }: SectionTransitionProps) {
  return (
    <div className={`nx-section-transition nx-section-transition--${variant}`} aria-hidden="true">
      <div className="nx-section-transition__line" />
      <div className="nx-section-transition__glow" />
    </div>
  );
}
