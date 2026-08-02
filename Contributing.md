# Contributing Guide

Three quick steps to get your component live in the library. No routing changes, no page rebuilds — just a new component file and one registry entry.

**Status:** Open for PRs

---

## Step-by-Step Workflow (03 Steps Total)

### 01 · Create your component

Build your component as a normal `.jsx` file inside the right folder under `src/ui/` (e.g. `src/ui/buttons/YourButton.jsx`). Use plain Tailwind utility classes with real hex colors only — no CSS variables like `--ember`, no shadcn, no external UI kits. If it needs a package, keep it minimal (`framer-motion`, `lucide-react`, etc).

```jsx
// src/ui/buttons/YourButton.jsx

const YourButton = () => {
  return (
    <button className="rounded-xl bg-[#FF7A45] px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105">
      Click Me
    </button>
  );
};

export default YourButton;
```

### 02 · Register it in components.js

Open `src/data/components.js`. Import your component at the top, then add ONE new object to the `components` array. This is the only file that connects your component to the grid, search, and docs page.

```js
// at the top of the file
import YourButton from "../ui/buttons/YourButton";

// inside the components array, add:
{
  id: 4, // next available id
  slug: "your-button",         // unique, lowercase, dash-separated
  name: "Your Button",
  category: "buttons",         // must match an existing category id
  description: "A short one-line description of what it does.",

  preview: YourButton,          // the imported component (live preview)

  install: "npm install framer-motion", // or omit if no deps

  usage: `<YourButton />`,

  code: `const YourButton = () => {
  return (
    <button className="rounded-xl bg-[#FF7A45] px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105">
      Click Me
    </button>
  );
};

export default YourButton;`,
},
```

### 03 · Only touch categories.js if it's a new category

If your component fits an existing category (buttons, cards, loaders, etc), skip this step entirely. Only edit `src/data/categories.js` if you're introducing a category that doesn't exist yet.

```js
// src/data/categories.js
// only add this if the category truly doesn't exist:
{
  id: "modals",
  name: "Modals",
  description: "Dialogs and overlays.",
},
```

---

## Files you should never need to edit

- `Sidebar.jsx`
- `ComponentGrid.jsx`
- `ComponentDetails.jsx` (docs page)

These pages are generic and read entirely from `components.js` and `categories.js`. If your PR modifies any of them, explain why in the PR description.

---

## Before opening a PR

- [ ] Component uses plain hex colors, not CSS variables (`--ember`, `--teal`)
- [ ] No shadcn/ui or other external UI kit dependencies
- [ ] `id`, `slug`, and `category` are correct and unique in `components.js`
- [ ] `code` string in `components.js` matches the actual file exactly
- [ ] Preview renders correctly with no console errors

---

## Ready to submit?

Fork the repo, add your component, and open a pull request.

→ [Browse Component Library](/components)