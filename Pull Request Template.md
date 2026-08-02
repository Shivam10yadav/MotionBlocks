## What does this PR add?

<!-- e.g. "Adds a new Testimonials card component to the buttons category" -->

## Type of change

- [ ] New component (following the 3-step workflow in `Contributing.md`)
- [ ] New category added to `categories.js`
- [ ] Bug fix / update to an existing component
- [ ] Docs / other (explain below)

## Contribution checklist

Confirms this follows the [Contributing Guide](../Contributing.md):

- [ ] Component is a plain `.jsx` file inside the correct `src/ui/` folder
- [ ] Uses plain Tailwind utility classes with **real hex colors only** — no CSS variables (`--ember`, `--teal`)
- [ ] No shadcn/ui or other external UI kits — dependencies kept minimal (`framer-motion`, `lucide-react`, etc.)
- [ ] Registered in `src/data/components.js` with a unique `id` and `slug`
- [ ] `category` matches an existing id in `src/data/categories.js` exactly — only added a new category if it truly didn't exist
- [ ] code field references the imported ?raw file, not an inline string
- [ ] Preview renders correctly with no console errors
- [ ] Did **not** modify `Sidebar.jsx`, `ComponentGrid.jsx`, or `ComponentDetails.jsx` (if you did, explain why below)

## Files touched outside the normal workflow

<!-- List any files beyond your component + components.js/categories.js, and why -->

## Screenshots (if visual)

<!-- Drag a screenshot or short clip here -->