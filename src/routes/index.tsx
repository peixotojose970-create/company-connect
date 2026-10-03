import { createFileRoute } from "@tanstack/react-router";
import { type CSSProperties } from "react";

const movingOiButtons = [
  { duration: "3.1s", delay: "-0.8s", tilt: "-5deg", x: "-10px", y: "-12px" },
  { duration: "3.7s", delay: "-2.1s", tilt: "4deg", x: "12px", y: "-8px" },
  { duration: "3.4s", delay: "-1.4s", tilt: "-3deg", x: "-7px", y: "13px" },
  { duration: "4.1s", delay: "-2.8s", tilt: "6deg", x: "11px", y: "9px" },
  { duration: "3.6s", delay: "-1.9s", tilt: "3deg", x: "8px", y: "-14px" },
  { duration: "4.3s", delay: "-0.4s", tilt: "-6deg", x: "-12px", y: "7px" },
  { duration: "3.2s", delay: "-2.5s", tilt: "5deg", x: "9px", y: "12px" },
  { duration: "3.9s", delay: "-1.1s", tilt: "-4deg", x: "-9px", y: "-10px" },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oi em movimento" },
      { name: "description", content: "Uma página com botões oi animados." },
      { property: "og:title", content: "Oi em movimento" },
      { property: "og:description", content: "Uma página com botões oi animados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="hello-stage relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <div className="hello-glow" aria-hidden="true" />
      <div
        className="hello-buttons relative z-[1]"
        role="group"
        aria-label="Botões de oi em movimento"
      >
        {movingOiButtons.map((button, index) => (
          <button
            key={`${button.duration}-${button.delay}`}
            type="button"
            className={`hello-button hello-button--${(index % 4) + 1}`}
            style={
              {
                "--button-duration": button.duration,
                "--button-delay": button.delay,
                "--button-tilt": button.tilt,
                "--button-x": button.x,
                "--button-y": button.y,
              } as CSSProperties
            }
          >
            oi
          </button>
        ))}
      </div>
    </main>
  );
}
