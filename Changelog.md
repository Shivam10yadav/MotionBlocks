# Changelog

All notable changes to MotionBlocks are documented here.

## [Unreleased]

### Added
- Animated 404 page with GSAP staggered digit reveal and idle glow pulse
- Apple-style "hello" text stroke animation
- Device preview toggle (Mobile / Tablet / Desktop) on component detail pages
- Shiki syntax highlighting for code panels
- GSAP + Lenis powered parallax hero section
- Global smooth-scroll provider (`SmoothScrollProvider`)

### Changed
- Categories grid now reads live data from `components.js` instead of hardcoded counts
- Navbar links converted to React Router `Link` for proper SPA navigation
- Component grid now renders live previews instead of placeholder text

### Fixed
- Sidebar scroll-chaining into the main grid on desktop
- Copy button missing on Install/Usage tabs
- Category mismatches causing components to silently disappear from filters