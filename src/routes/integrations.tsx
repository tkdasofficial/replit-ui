import { createFileRoute } from "@tanstack/react-router";
import { EmptyPage } from "@/components/EmptyPage";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — Evo Agent" },
      { name: "description", content: "Connect external services to your projects." },
      { property: "og:title", content: "Integrations — Evo Agent" },
      { property: "og:description", content: "Connect external services to your projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <EmptyPage title="Integrations" description="Connect external services to your projects." />,
});
