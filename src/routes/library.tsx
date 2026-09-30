import { createFileRoute } from "@tanstack/react-router";
import { EmptyPage } from "@/components/EmptyPage";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — Evo Agent" },
      { name: "description", content: "Reusable templates, components, and saved assets." },
      { property: "og:title", content: "Library — Evo Agent" },
      { property: "og:description", content: "Reusable templates, components, and saved assets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <EmptyPage title="Library" description="Reusable templates, components, and saved assets." />,
});
