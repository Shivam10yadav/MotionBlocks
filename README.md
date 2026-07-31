# 🎨 MotionBlocks

**MotionBlocks** is a modern React UI component library featuring beautifully crafted, reusable, and animated components built with **React**, **Tailwind CSS**, and **Framer Motion**.

Browse production-ready components, preview them live, and copy the source code directly into your projects—**no npm package required**.

---

## ✨ Preview

<!-- Add a screenshot or GIF here -->
<!-- ![MotionBlocks Preview](./public/preview.png) -->

---

## ✨ Features

- 🎭 **Beautiful Animated UI** – Smooth micro-interactions powered by Framer Motion.
- 📋 **Copy & Paste Ready** – Simply copy the component code into your project.
- 🎨 **Tailwind CSS Powered** – Easy to customize with utility-first styling.
- ⚡ **No Package Required** – No installation or wrapper library needed.
- 📱 **Responsive Design** – Optimized for mobile, tablet, and desktop.
- ♿ **Accessible Components** – Built with accessibility in mind.
- 🔍 **Live Component Preview** – See every component before using it.
- 📖 **Usage Examples** – Includes dependencies, usage snippets, and source code.
- 🗂️ **Organized Categories** – Quickly browse components by category.

---

## 🛠 Tech Stack

| Technology | Usage |
|------------|-------|
| React | UI Library |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Router | Routing |
| Lucide React | Icons |

---

## 📂 Available Categories

- 🔘 Buttons
- 🃏 Cards
- 🦸 Hero Sections
- 🌄 Backgrounds
- ⏳ Loaders
- 📝 Forms
- 🧭 Navigation
- ✨ Text Effects
- 📣 CTA Sections
- 💬 Testimonials
- 🖼️ Galleries
- 🚫 404 Pages

More categories coming soon.

---

# 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/your-username/motionblocks.git
```

Navigate into the project:

```bash
cd motionblocks
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Visit:

```
http://localhost:5173
```

---

# 📁 Project Structure

```
src
│
├── data
│   ├── components.js
│   └── categories.js
│
├── pages
│
├── ui
│   ├── buttons
│   ├── cards
│   ├── loaders
│   ├── forms
│   ├── navigation
│   └── ...
│
└── components
```

---

# 🤝 Contributing

Contributions are welcome!

Adding a new component takes only **three simple steps**.

---

## 1️⃣ Create Your Component

Create a new component inside the correct folder.

Example:

```
src/ui/buttons/YourButton.jsx
```

```jsx
const YourButton = () => {
  return (
    <button className="rounded-xl bg-[#FF7A45] px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105">
      Click Me
    </button>
  );
};

export default YourButton;
```

### Component Rules

- ✅ Use Tailwind CSS
- ✅ Use plain hex colors (`#FF7A45`)
- ✅ Keep dependencies minimal
- ✅ Prefer Framer Motion when animation is needed

Avoid:

- ❌ CSS variables (`--primary`)
- ❌ shadcn/ui
- ❌ Large UI libraries

---

## 2️⃣ Register It

Open:

```
src/data/components.js
```

Import your component.

```jsx
import YourButton from "../ui/buttons/YourButton";
```

Then add a new object to the `components` array.

```jsx
{
  id: 8,
  slug: "your-button",
  name: "Your Button",
  category: "buttons",
  description: "A short one-line description.",
  preview: YourButton,
  install: "npm install framer-motion",
  usage: `<YourButton />`,
  code: `const YourButton = () => {
  return (
    <button className="rounded-xl bg-[#FF7A45] px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105">
      Click Me
    </button>
  );
};

export default YourButton;`,
}
```

This automatically makes the component available in:

- Component Grid
- Search
- Category Pages
- Documentation Page
- Live Preview

No additional routing is required.

---

## 3️⃣ Add a New Category (Optional)

Only edit:

```
src/data/categories.js
```

if you're introducing a brand-new category.

Example:

```jsx
{
  id: "modals",
  name: "Modals",
  description: "Dialogs and overlays."
}
```

If your component belongs to an existing category, skip this step.

---

# 📌 Files You Shouldn't Modify

Unless you're fixing a framework-level issue, avoid editing:

```
❌ Sidebar.jsx

❌ ComponentGrid.jsx

❌ ComponentDetails.jsx
```

These pages automatically render data from `components.js`.

If your PR changes any of these files, please explain why.

---

# ✅ Pull Request Checklist

Before opening a PR, make sure:

- [ ] Uses Tailwind utility classes only.
- [ ] Uses plain hex colors.
- [ ] No CSS variables.
- [ ] No shadcn/ui.
- [ ] `id` is unique.
- [ ] `slug` is unique.
- [ ] `category` exists.
- [ ] `code` exactly matches the component source.
- [ ] Component renders without warnings.
- [ ] Live preview works correctly.

---

# 📌 Roadmap

## Completed

- ✅ Component Gallery
- ✅ Live Preview
- ✅ Copy Code
- ✅ Component Documentation

## Planned

- 🔍 Search & Filters
- 📦 Component Collections
- 🌙 Dark / Light Theme
- ❤️ Favorites
- 👤 Admin Dashboard
- 🏷️ Tags
- 📱 Better Mobile Experience
- 🔄 Component Versioning

---

# 💡 Philosophy

MotionBlocks is designed around one simple idea:

> **Copy the component. Paste it into your project. Customize it freely.**

No package lock-in.

No wrappers.

No hidden abstractions.

Just clean, reusable React components.

---

# 📜 License

This project is licensed under the **MIT License**.

Feel free to use MotionBlocks in personal and commercial projects.

---

# ⭐ Support

If you find MotionBlocks useful:

- ⭐ Star the repository
- 🍴 Fork it
- 🛠️ Contribute new components
- 📢 Share it with other developers


<!-- forced comment to commit  -->

Happy building! 🚀