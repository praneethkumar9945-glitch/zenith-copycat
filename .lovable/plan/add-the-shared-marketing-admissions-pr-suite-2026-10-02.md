# Add the shared Marketing, Admissions & PR suite

## What will change
- Replace the current single Marketing dashboard with the complete workspace from the shared Drive package.
- Add five role workspaces: Marketing Head / PRO, Sales Team, Digital Marketing, Content / Brand, and Events & Outreach.
- Preserve all supplied screens, tables, charts, filters, detail panels, notifications, and role switching.
- Fit the imported workspace inside the existing Edusphere navigation and theme without changing the HR, Academic, or other modules.
- Add route-specific page metadata for the Marketing page.

## Technical details
- Move the supplied source into a namespaced Marketing feature folder so it does not conflict with existing shared components.
- Adapt imports and the entry component to TanStack Start while retaining the supplied local state and mock data.
- Reuse the existing `/marketing` route and application shell.
- Verify desktop and mobile rendering, role switching, page navigation, interactive panels, and a clean build.
