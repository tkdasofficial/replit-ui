<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep Evo Agent UI-only until backend workflows are explicitly requested; this preserves the PRD's current implementation phase.
- Use a mobile-first, Replit-inspired workspace shell with semantic charcoal/amber tokens; this matches the approved product direction.
- Use Manrope throughout, with 400 for body copy, 500 for controls, 600 for headings, and 700–800 for labels and emphasis; this preserves hierarchy with one font family.
- Keep workspace-wide navigation and fixed controls in reusable global components, while page content remains view-specific; this prevents header duplication and overlap regressions.
- AppDrawer is the single sidebar implementation for dashboard and workspace, with a persistent desktop panel and mobile overlay; this keeps navigation behavior consistent.
- Projects open at /project/$projectId (slug of project name); dashboard contains no workspace UI; /workspace redirects to a default project.
