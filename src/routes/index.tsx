import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oi" },
      { name: "description", content: "Uma página só com um oi." },
      { property: "og:title", content: "Oi" },
      { property: "og:description", content: "Uma página só com um oi." },
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
      <h1 className="hello-word text-hello">oi</h1>
    </main>
  );
}
