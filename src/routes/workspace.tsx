import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace")({
  beforeLoad: () => { throw redirect({ to: "/project/$projectId", params: { projectId: "websitetoapk" } }); },
});
