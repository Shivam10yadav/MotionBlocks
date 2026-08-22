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

import animatedNotFound from "../ui/404/AnimatedNoteFound";
import animatedNotFoundCode from "../ui/404/AnimatedNoteFound.jsx?raw";
import  LightProgress  from "../ui/progressBar/LightProgress";
import LightProgressCode  from "../ui/progressBar/LightProgress.jsx?raw";
import  DarkProgressCode from "../ui/progressBar/DarkProgress.jsx?raw";
import DarkProgress from "../ui/progressBar/DarkProgress";
import LightDock from "../ui/dock/LightDock";
import LightDockCode from "../ui/dock/LightDock.jsx?raw";
import DarkDockCode from "../ui/dock/DarkDock.jsx?raw";
import DarkDock from "../ui/dock/DarkDock";
import WarHero from "../ui/hero/WarHero";
import WarHeroCode from "../ui/hero/WarHero.jsx?raw";
import HorizontalScrollText from "../ui/text-effect/HorizontalScrollText";
import LightFooter from "../ui/footer/LightFooter";
import LightFooterCode from "../ui/footer/LightFooter.jsx?raw";
import DarkFooter from "../ui/footer/DarkFooter";
import DarkFooterCode from "../ui/footer/DarkFooter.jsx?raw";
import DarkNavbar from "../ui/navbar/DarkNavbar";
import DarkNavbarCode from "../ui/navbar/DarkNavbar.jsx?raw";
import LightNavbar from "../ui/navbar/LightNavbar";
import LightNavbarCode from "../ui/navbar/LightNavbar.jsx?raw";
import LightMarquee from "../ui/marquee/LightMarquee";
import LightMarqueeCode from "../ui/marquee/LightMarquee.jsx?raw";
import OtpVerify from "../ui/input/VerifyOtp";
import OtpVerifyCode from "../ui/input/VerifyOtp.jsx?raw";
import DarkVerifyOtpCode from "../ui/input/DarkVerifyOtp.jsx?raw";
import DarkVerifyOtp from "../ui/input/DarkVerifyOtp";
import PromptInput from "../ui/input/PromptInput";
import PromptInputCode from "../ui/input/PromptInput.jsx?raw";
import WheelNavigation from "../ui/dock/WheelNavigation";
import WheelNavigationCode from "../ui/dock/WheelNavigation.jsx?raw";
import DeleteModal from "../ui/modals/DeleteModal";
import DeleteModalCode from "../ui/modals/DeleteModal.jsx?raw";
import FileUpload  from "../ui/input/FileUpload";
import FileUploadCode  from "../ui/input/FileUpload.jsx?raw";
import  SkeletonLoader  from "../ui/loader/SkeletonLoader";
import  SkeletonLoaderCode  from "../ui/loader/SkeletonLoader.jsx?raw";
import BentoGrid from "../ui/grids/BentoGrid";
import BentoGridCode from "../ui/grids/BentoGrid.jsx?raw";
import  PageTransitions  from "../ui/transitions/PageTransitions";
import  PageTransitionsCode  from "../ui/transitions/PageTransitions";
import StatsCard from "../ui/stats/StatsCard";
import StatsCardCode from "../ui/stats/StatsCard.jsx?raw";
import TeamSection from "../ui/teams/TeamSection";
import TeamSectionCode from "../ui/teams/TeamSection.jsx?raw";















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
    slug: "light-progress-bar",
    name: "Light Theme Animated Progress Bar",
    category: "progress-bars",
    description: "A soft, glassmorphic progress indicator featuring smooth Framer Motion spring fill, continuous shimmer animation, and dynamic percent pill.",
    preview: LightProgress,
    install: "npm install framer-motion react-icons",
    usage: `<LightProgress progress={75} title="Uploading Files" />`,
    code: LightProgressCode
  },
  {
    id: 29,
    slug: "dark-progress-bar",
    name: "Dark  Progress Bar",
    category: "progress-bars",
    description: "A neon cyan animated progress bar for dark themes featuring striped shimmer overlays, glowing leading edges, and high-tech typography.",
    preview: DarkProgress,
    install: "npm install framer-motion react-icons",
    usage: `<DarkProgress  title="loading" />`,
    code: DarkProgressCode
  },

  {
    id: 30,
    slug: "white-wave-dock",
    name: "Glassmorphic Wave Dock (Light)",
    category: "docks",
    description: "A floating light-themed navbar featuring proximity-based spring magnification wave motion on hover.",
    preview: LightDock,
    install: "npm install framer-motion react-icons",
    usage: `<LightDock />`,
    code: LightDockCode
  },
  {
    id: 31,
    slug: "dark-wave-dock",
    name: "Obsidian Teal Wave Dock (Dark)",
    category: "docks",
    description: "A floating dark-themed navbar using a rich Obsidian Teal palette with proximity-based wave magnification on hover.",
    preview: DarkDock,
    install: "npm install framer-motion react-icons",
    usage: `<DarkWaveDock />`,
    code: DarkDockCode
  },

  {
  id: 32,
  slug: "war-hero-section",
  name: "War Tactical Hero Section",
  category: "hero",
  description: "Aggressive war-themed hero section featuring ember gradients, tactical grid layout, entry stagger animations, and GSAP ScrollTrigger parallax depth.",
  preview: WarHero,
  install: "npm install gsap @gsap/react lucide-react",
  usage: `<WarHeroSection />`,
  code: WarHeroCode
},



{
    id: 33,
    slug: "light-footer",
    name: "Light Footer",
    category: "footers",
    description: "Warm cream-toned editorial footer featuring subtle background glow animations, interactive newsletter input, and staggered link reveals.",
    preview: LightFooter,
    install: "npm install framer-motion react-icons",
    usage: `<LightFooter />`,
    code: LightFooterCode
  },
  {
    id: 34,
    slug: "dark-footer",
    name: "Dark Footer",
    category: "footers",
    description: "Modern dark-themed footer featuring ambient glowing light orbs, frosted glass CTA card, and subtle hover micro-interactions.",
    preview: DarkFooter,
    install: "npm install framer-motion react-icons",
    usage: `<DarkFooter />`,
    code: DarkFooterCode
  },

  {
  id: 35,
  slug: "light-navbar",
  name: "Light Navbar",
  category: "navbars",
  description: "Editorial warm-cream sticky navbar with backdrop glassmorphism, responsive animated drawer, and smooth hover states.",
  preview: LightNavbar,
  install: "npm install framer-motion react-icons",
  usage: `<LightNavbar />`,
  code: LightNavbarCode
},

{
  id: 36,
  slug: "dark-navbar",
  name: "Dark Navbar",
  category: "navbars",
  description: "Sleek dark-themed sticky navbar featuring custom brand mark, blurred glass backdrop, and responsive mobile drawer.",
  preview: DarkNavbar,
  install: "npm install framer-motion react-icons",
  usage: `<DarkNavbar />`,
  code: DarkNavbarCode
},
{
id: 37,
  slug: "light-marquee",
  name: "Light Infinite Marquee",
  category: "marquees",
  description: "Warm cream infinite auto-scrolling brand logo marquee with edge fading and interactive hover states.",
  preview: LightMarquee,
  install: "npm install framer-motion",
  usage: `<LightMarquee />`,
  code: LightMarqueeCode
},



  {
  id: 38,
  slug: "animated-otp-input",
  name: "Animated OTP Verification",
  category: "inputs", // or "auth"
  description: "Light-themed 4-digit animated OTP verification field with auto-focus, paste support, and interactive success states.",
  preview: OtpVerify,
  install: "npm install framer-motion",
  usage: `<OtpVerify />`,
  code: OtpVerifyCode
},

{
  id: 39,
  slug: "animated-otp-card",
  name: "Dark OTP Card",
  category: "inputs",
  description: "Dark-mode cyber aesthetic OTP input card with slate and cyan styling, scanning beam indicators, grid overlay, and error feedback.",
  preview: DarkVerifyOtp,
  install: "npm install framer-motion",
  usage: `<CyberOtpCard />`,
  code: DarkVerifyOtpCode
},

{
  id: 40,
  slug: "AI prompt box",
  name: "Prompt",
  category: "inputs",
  description: "Modern light-theme AI prompt input card with file context attachments, search/think feature toggles, and responsive state animations.",
  preview: PromptInput,
  install: "npm install framer-motion",
  usage: `<PromptInput />`,
  code: PromptInputCode
},

{
    id: 41,
    slug: "circular-wheel-nav",
    name: "Circular Wheel Navigation",
    category: "navigation",
    description: "An interactive circular wheel navigation with smooth GSAP rotation, Framer Motion transitions, and counter-rotating labels.",
    preview: WheelNavigation,
    install: "npm install framer-motion gsap react-icons",
    usage: `<WheelNavigation />`,
    code:  WheelNavigationCode

},

{
  id: 42,
  slug: "animated-delete-modal",
  name: "Animated Delete Modal",
  category: "modals",
  description: "A pop-up delete box with smooth entrance animations, dark mode support, a backdrop blur, and a loading state for actions.",
  preview: DeleteModal,
  install: "npm install framer-motion react-icons",
  usage: `<DeleteModal isOpen={isOpen} onClose={() => setIsOpen(false)} onDelete={handleDelete} itemName="Project Alpha" />`,
  code: DeleteModalCode
},

{
  id: 43,
  slug: "file-upload",
  name: "File Upload Dropzone",
  category: "inputs",
  description:
    "A light-theme drag and drop file uploader with upload progress bars, file validation, and list removal animations.",

  preview: FileUpload,

  install: "npm install framer-motion react-icons",
  usage: `<FileUpload onFilesSelected={(files) => console.log(files)} maxSizeBytes={10485760} />`,

  code: FileUploadCode
},
{
id: 44,
  slug: "skeleton-card-loader",
  name: "Skeleton Card Loader",
  category: "loaders",
  description: "A light-theme skeleton loader matching avatar, grid, and banner layouts with shimmer animations.",
  preview: SkeletonLoader,
  install: "npm install framer-motion react-icons",
  usage: `<SkeletonLoader isLoading={isLoading} />`,
    code: SkeletonLoaderCode

},

{
  id: 45,
  slug: "bento-grid",
  name: "Bento Grid with Expandable Modal",
  category: "grids",
  description: "A warm light bento grid layout with shared-layout pop-up modal transitions powered by Framer Motion.",
  preview: BentoGrid,
  install: "npm install framer-motion react-icons",
  usage: `<BentoGrid />`,
  code: BentoGridCode

},

{
  id: 46,
  slug: "experience-curtains-transition",
  name: "Experience Curtains Transition",
  category: "transitions",
  description:
    "A portfolio curtain transition that wipes a black screen displaying Career, Projects, or Education section headers.",
  preview: PageTransitions,
  install: "npm install framer-motion react-icons",
  usage: `<PageTransitions />`,
  code: PageTransitionsCode

},

{
  id: 47,
  slug: "stats-section",
  name: "Stats Section",
  category: "stats",
  description:
    "A 4-card metric section featuring warm lighting ambient glow, skeleton shimmer loading states, and staggered entrance animations.",
  preview: StatsCard,
  install: "npm install framer-motion react-icons",
  usage: `<StatsCard />`,
   code: StatsCardCode

},

{
  id: 48,
  slug: "warm-team-section",
  name: "Warm Editorial Team Section",
  category: "team",
  description:
    "A light-themed, warm-toned team grid featuring interactive category filtering, Framer Motion transitions, and GSAP scroll-triggered entrance animations.",
  preview: TeamSection,
  install: "npm install framer-motion gsap react-icons",
  usage: `<TeamSection />`,
  code: TeamSectionCode
}





];





