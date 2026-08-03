import GlowButton from "../ui/buttons/GlowButton";
import GlowButtonCode from "../ui/buttons/GlowButton.jsx?raw";
import GradientButton from "../ui/buttons/GradientButton";
import GradientButtonCode from "../ui/buttons/GradientButton.jsx?raw";
import CtaSection from "../ui/cta/CTA-1";
import CtaSectionCode from "../ui/cta/CTA-1.jsx?raw";
import AuroraTextEffect from "../ui/text-effect/AuroraTextEffect";
import AuroraTextEffectCode from "../ui/text-effect/AuroraTextEffect.jsx?raw";
import NotFound from "../ui/404/NotFound";
import NotFoundCode from "../ui/404/NotFound.jsx?raw";
import Testimonial from "../ui/testimonials/Testimonials-1";
import TestimonialCode from "../ui/testimonials/Testimonials-1.jsx?raw";
import HoverGallery from "../ui/gallery/HoverGallery";
import HoverGalleryCode from "../ui/gallery/HoverGallery.jsx?raw";
import MinimalFaq from "../ui/faq/MinimalFaq";
import MinimalFaqCode from "../ui/faq/MinimalFaq.jsx?raw";
import TabbedFaq from "../ui/faq/TabbedFaq";
import TabbedFaqCode from "../ui/faq/TabbedFaq.jsx?raw";
import LightPricing from "../ui/pricing/LightPricing";
import LightPricingCode from "../ui/pricing/LightPricing.jsx?raw";
import DarkBrownPricing from "../ui/pricing/DarkBrownPricing";
import DarkBrownPricingCode from "../ui/pricing/DarkBrownPricing.jsx?raw";
import LightAbout from "../ui/about/LightAbout";
import LightAboutCode from "../ui/about/LightAbout.jsx?raw";
import DarkAbout from "../ui/about/DarkAbout";
import DarkAboutCode from "../ui/about/DarkAbout.jsx?raw";
import LightAuth from "../ui/auth/LightAuth";
import LightAuthCode from "../ui/auth/LightAuth.jsx?raw";
import DarkAuth from "../ui/auth/DarkAuth";
import DarkAuthCode from "../ui/auth/DarkAuth.jsx?raw";
import Funky404 from "../ui/404/Funky404";
import Funky404Code from "../ui/404/Funky404.jsx?raw";
import { AppleHello } from "../ui/text-effect/AppleHelloTextEffect";
import AppleHelloCode from "../ui/text-effect/AppleHelloTextEffect.jsx?raw";
import MinimalLoader from "../ui/loader/MinimalLoader";
import MinimalLoaderCode from "../ui/loader/MinimalLoader.jsx?raw";
import FlashyLoader from "../ui/loader/FlashyLoader";
import FlashyLoaderCode from "../ui/loader/FlashyLoader.jsx?raw";
import LuxuryLoader from "../ui/loader/LuxuryLoader";
import LuxuryLoaderCode from "../ui/loader/LuxuryLoader.jsx?raw";
import LightCard from "../ui/ecommerce/LightCard";
import LightCardCode from "../ui/ecommerce/LightCard.jsx?raw";
import DarkCard from "../ui/ecommerce/DarkCard";
import DarkCardCode from "../ui/ecommerce/DarkCard.jsx?raw";
import DarkPagination from "../ui/pagination/DarkPagination";
import DarkPaginationCode from "../ui/pagination/DarkPagination.jsx?raw";
import LightPagination from "../ui/pagination/LightPagination";
import LightPaginationCode from "../ui/pagination/LightPagination.jsx?raw";
import DarkHero from "../ui/hero/DarkHero";
import DarkHeroCode from "../ui/hero/DarkHero.jsx?raw";
import LightHero from "../ui/hero/LightHero";
import LightHeroCode from "../ui/hero/LightHero.jsx?raw";
import animatedNotFound from "../ui/404/AnimatedNoteFound";
import animatedNotFoundCode from "../ui/404/AnimatedNoteFound.jsx?raw";
import DockComp from "../ui/dock/DockComp";
import DockCompCode from "../ui/dock/DockComp.jsx?raw";
import DockItem from "../ui/dock/DockItem";
import DockItemCode from "../ui/dock/DockItem.jsx?raw";


export const components = [

  
  {
    id: 1,
    slug: "glow-button",
    name: "Glow Button",
    category: "buttons",
    description: "A glowing button with a smooth hover animation.",
    preview: GlowButton,
    install: "npm install framer-motion",
    usage: `<GlowButton />`,
    code: GlowButtonCode
  },
  {
    id: 2,
    slug: "cta-section",
    name: "CTA Section",
    category: "cta-sections",
    description: "A conversion-focused call-to-action block with a glow backdrop, badge, dual buttons, and a social proof row.",
    preview: CtaSection,
    install: "npm install lucide-react",
    usage: `<CtaSection
  badge="New · v2.0 out now"
  title="Build faster. Ship sooner."
  description="Everything you need to launch your next product — clean components, zero setup, fully customizable to fit your stack."
  primaryLabel="Get Started Free"
  primaryHref="#"
  secondaryLabel="Watch Demo"
  secondaryHref="#"
  rating={4.9}
  usersLabel="3,200+ developers"
  avatarCount={4}
/>`,
    code: CtaSectionCode
  },
  {
    id: 3,
    slug: "animated-gradient-button",
    name: "Animated Gradient Button",
    category: "buttons",
    description: "A modern button featuring animated gradient borders, an ambient glow backdrop, and a light shimmer pass effect.",
    preview: GradientButton,
    install: "npm install framer-motion",
    usage: `<GradientButton>Get Started Now</GradientButton>`,
    code: GradientButtonCode
  },
  {
    id: 4,
    slug: "aurora-text-effect",
    name: "Aurora Text Effect",
    category: "text-effects",
    description: "A liquid metallic typography component featuring animated color shifts, staggered letter entrances, and interactive 3D magnetic tilt.",
    preview: AuroraTextEffect,
    install: "npm install framer-motion",
    usage: `<AuroraTextEffect text="QUANTUM FLUX" subtitle="Advanced motion components. Premium visual experiences." />`,
    code: AuroraTextEffectCode
  },
  {
    id: 5,
    slug: "minimal-light-404",
    name: "Minimal Light 404",
    category: "404-pages",
    description: "A beautifully minimal, light-themed 404 error page with smooth floating physics, soft ambient backdrop gradients, and interactive navigation controls.",
    preview: NotFound,
    install: "npm install framer-motion lucide-react",
    usage: `<NotFound />`,
    code: NotFoundCode
  },
  {
    id: 6,
    slug: "light-testimonial-slider",
    name: "Light Testimonial Slider",
    category: "testimonials",
    description: "A light-themed testimonial carousel featuring smooth AnimatePresence transition effects, star rating displays, profile metadata, and interactive controls.",
    preview: Testimonial,
    install: "npm install framer-motion lucide-react",
    usage: `<Testimonial />`,
    code: TestimonialCode
  },
  {
    id: 7,
    slug: "hover-accordion-gallery",
    name: "Hover Accordion Gallery",
    category: "galleries",
    description: "An interactive visual gallery with fluid flex-accordion sliding hover transitions, smooth image scaling, and contextual meta details.",
    preview: HoverGallery,
    install: "npm install framer-motion lucide-react",
    usage: `<HoverGallery />`,
    code: HoverGalleryCode
  },
  {
    id: 8,
    slug: "minimal-faq",
    name: "Minimalist Accordion FAQ",
    category: "faq",
    description: "A clean, dark accordion-style FAQ section with smooth height expansion.",
    preview: MinimalFaq,
    install: "npm install framer-motion lucide-react",
    usage: `<MinimalFaq />`,
    code: MinimalFaqCode
  },
  {
    id: 9,
    slug: "tabbed-faq",
    name: "Categorized Tabbed FAQ",
    category: "faq",
    description: "Advanced FAQ component with search capability, active tab highlights, and dynamic 2-column layout.",
    preview: TabbedFaq,
    install: "npm install framer-motion lucide-react",
    usage: `<TabbedFaq />`,
    code: TabbedFaqCode
  },
  {
    id: 10,
    slug: "light-pricing",
    name: "Light Theme 3-Tier Pricing",
    category: "pricing",
    description: "A sleek, high-contrast light 3-tier pricing section with animated monthly/yearly toggle.",
    preview: LightPricing,
    install: "npm install framer-motion lucide-react",
    usage: `<LightPricing />`,
    code: LightPricingCode
  },
  {
    id: 11,
    slug: "dark-brown-pricing",
    name: "Luxury Dark Brown Pricing",
    category: "pricing",
    description: "A luxury dark espresso & bronze themed 3-tier pricing table with subtle glow effects and interactive pricing toggles.",
    preview: DarkBrownPricing,
    install: "npm install framer-motion lucide-react",
    usage: `<DarkBrownPricing />`,
    code: DarkBrownPricingCode
  },
  {
    id: 12,
    slug: "light-about",
    name: "Light Theme About Section",
    category: "about",
    description: "A clean, modern about section featuring highlights, team mission, and animated stat counters.",
    preview: LightAbout,
    install: "npm install framer-motion lucide-react",
    usage: `<LightAbout />`,
    code: LightAboutCode
  },
  {
    id: 13,
    slug: "dark-about",
    name: "Luxury Dark Themed About Section",
    category: "about",
    description: "A luxury dark espresso & amber about section featuring scroll animations and custom value cards.",
    preview: DarkAbout,
    install: "npm install framer-motion lucide-react",
    usage: `<DarkAbout />`,
    code: DarkAboutCode
  },
  {
    id: 14,
    slug: "light-auth",
    name: "Light Auth Card",
    category: "auth",
    description: "A clean, minimal light theme login card with interactive tab switching, ring-focus animations, and OAuth integrations.",
    preview: LightAuth,
    install: "npm install react-icons framer-motion",
    usage: `<LightAuth />`,
    code: LightAuthCode
  },
  {
    id: 15,
    slug: "dark-auth",
    name: "Dark Split Auth",
    category: "auth",
    description: "A modern split-screen dark theme login layout featuring cyan glow branding panel and OAuth support.",
    preview: DarkAuth,
    install: "npm install react-icons framer-motion",
    usage: `<DarkAuth />`,
    code: DarkAuthCode
  },
  {
    id: 16,
    slug: "funky-404",
    name: "Funky Playful 404 Page",
    category: "404-pages",
    description: "A playful, space-themed 404 error page with glowing neon gradients, floating animated elements, and responsive action controls.",
    preview: Funky404,
    install: "npm install react-icons framer-motion",
    usage: `<Funky404 />`,
    code: Funky404Code
  },
  {
    id: 17,
    slug: "apple-hello",
    name: "Apple Hello Text Effect",
    category: "text-effects",
    description: "A stroke-draw text animation recreating Apple's iconic 'hello' reveal, built with SVG path animation and a replay control.",
    preview: AppleHello,
    install: "npm install framer-motion",
    usage: `<AppleHello />`,
    code: AppleHelloCode
  },
  {
    id: 18,
    slug: "minimal-loader",
    name: "MinimalLoader",
    category: "loaders",
    description: "A clean tech loader featuring dual counter-rotating arcs and a pulsing warm amber core.",
    preview: MinimalLoader,
    install: "npm install framer-motion",
    usage: `<MinimalLoader />`,
    code: MinimalLoaderCode
  },
  {
    id: 19,
    slug: "cyber-loader",
    name: "Cyber Lime Matrix Loader",
    category: "loaders",
    description: "Futuristic neon emerald and cyber lime orbital spinner with animated status indicators.",
    preview: FlashyLoader,
    install: "npm install framer-motion",
    usage: `<FlashyLoader />`,
    code: FlashyLoaderCode
  },
  {
    id: 20,
    slug: "horizon-loader",
    name: "Horizon Wave Loader",
    category: "loaders",
    description: "An elegant, rich crimson and gold bar-wave loader designed for premium dark-mode web interfaces.",
    preview: LuxuryLoader,
    install: "npm install framer-motion",
    usage: `<LuxuryLoader />`,
    code: LuxuryLoaderCode
  },
  {
    id: 21,
    slug: "light-product-card",
    name: "Minimal Light Product Card",
    category: "ecommerce",
    description: "Clean light-theme e-commerce card with interactive color swatches, instant add-to-cart state animations, and subtle elevation on hover.",
    preview: LightCard,
    install: "npm install react-icons framer-motion",
    usage: `<LightCard />`,
    code: LightCardCode
  },
  {
    id: 22,
    slug: "dark-product-card",
    name: "Luxury Dark Product Card",
    category: "ecommerce",
    description: "Sleek dark luxury e-commerce card with dynamic glow backdrop, hover preview trigger, and buy-now animation states.",
    preview: DarkCard,
    install: "npm install react-icons framer-motion",
    usage: `<DarkCard />`,
    code: DarkCardCode
  },
  {
    id: 23,
    slug: "light-pagination",
    name: "Minimal Light Pagination",
    category: "pagination",
    description: "Clean light-theme pagination control component with animated sliding active indicator and auto-collapsing page dots.",
    preview: LightPagination,
    install: "npm install react-icons framer-motion",
    usage: `<LightPagination totalPages={10} initialPage={1} onPageChange={(page) => console.log(page)} />`,
    code: LightPaginationCode
  },
  {
    id: 24,
    slug: "dark-pagination",
    name: "Cyber Dark Segmented Pagination",
    category: "pagination",
    description: "Futuristic dark mode pagination control featuring an animated live page counter badge, directional spring transitions, and cyan track glow indicators.",
    preview: DarkPagination,
    install: "npm install react-icons framer-motion",
    usage: `<DarkPagination totalPages={10} initialPage={1} onPageChange={(page) => console.log(page)} />`,
    code: DarkPaginationCode
  },
  {
    id: 25,
    slug: "light-organic-hero",
    name: "Light Minimal Organic Hero",
    category: "hero",
    description: "Refined light-theme hero section featuring interactive cursor-following movement, subtle card hover tilt, and warm organic tone accents.",
    preview: LightHero,
    install: "npm install framer-motion",
    usage: `<LightHero />`,
    code: LightHeroCode
  },
  {
    id: 26,
    slug: "dark-amber-hero",
    name: "Dark Amber Warm Hero",
    category: "hero",
    description: "Bespoke dark hero component built with deep obsidian canvas, warm amber and crimson lighting, diagonal light sweeps, and glassmorphism feature bar.",
    preview: DarkHero,
    install: "npm install framer-motion",
    usage: `<DarkHero />`,
    code: DarkHeroCode
  },
  {
    id: 27,
    slug: "animated-404",
    name: "Animated 404 Page",
    category: "404-pages",
    description: "A full-page GSAP-animated 404 with staggered digit reveal, ambient glow pulse, and idle floating motion. Exact Component used in our Website",
    preview: animatedNotFound,
    install: "npm install gsap",
    usage: `\`<AnimatedNotFound />\``,
    code: animatedNotFoundCode
  },

  {
    id: 28,
    slug: "dock-01",
    name: "Dock compoenent",
    category: "dock",
    description: "A full-page GSAP-animated 404 with staggered digit reveal, ambient glow pulse, and idle floating motion. Exact Component used in our Website",
    preview: DockComp,
    install: "npm install gsap framer react-icons",
    usage: `\`<DockComp />\``,
    code: DockCompCode
  },

    {
    id: 29,
    slug: "dock-02",
    name: "Dock component",
    category: "dock",
    description: "A full-page GSAP-animated 404 with staggered digit reveal, ambient glow pulse, and idle floating motion. Exact Component used in our Website",
    preview: DockItem,
    install: "npm install gsap framer react-icons",
    usage: `\`<DockItem />\``,
    code: DockItemCode
  },
];
