# Feature Landscape: B2B SaaS Marketing Website (Manufacturing/Scheduling Domain)

**Domain:** B2B SaaS marketing site for production scheduling / APS software
**Researched:** 2026-02-06
**Overall confidence:** MEDIUM (based on training data through early 2025; web verification tools unavailable -- competitor sites may have changed since then)

---

## Research Methodology and Limitations

This research draws on training knowledge of:
- **Direct competitors:** PlanetTogether, Siemens Opcenter APS, SAP scheduling modules, Delmia Ortems (Dassault Systemes), Asprova, Preactor (now Siemens), JobBOSS, IQMS/DELMIAworks, Plex (Rockwell), MRPeasy
- **Modern SaaS disruptors in adjacent spaces:** Katana MRP, Fictiv, Tulip, Sight Machine, Nulogy
- **Best-in-class B2B SaaS marketing sites:** Linear, Notion, Vercel, Stripe, Retool, Figma, Loom, Posthog
- **B2B manufacturing marketing conventions** observed across 20+ sites in the space

**Key caveat:** Web search and fetch were unavailable. All findings are from training data (cutoff early 2025). Competitor sites may have evolved. Confidence is MEDIUM for current state, HIGH for established patterns.

---

## Table Stakes

Features users expect on any credible B2B manufacturing software marketing site. Missing these and visitors bounce or lose trust.

### Page-Level Table Stakes

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Hero section with clear value proposition** | First 5 seconds decide stay/leave. Manufacturing buyers are time-pressed. | Low | Every competitor has this. Must be specific: "production scheduling" not "business optimization". |
| **Features/Capabilities page** | Buyers create shortlists by comparing features. No features page = no shortlist. | Medium | PlanetTogether, Asprova, Opcenter all have detailed feature breakdowns. Organize by capability domain (scheduling, resources, optimization). |
| **Industry/Use case pages** | Manufacturing has sub-verticals (discrete, process, job shop). Buyers need to see their world reflected. | Medium | PlanetTogether has pages per industry. Critical for SEO too ("production scheduling for job shops"). |
| **Contact/Demo request form** | Primary conversion mechanism for enterprise B2B. | Low | Every single competitor has this. Must be frictionless (5-7 fields max). |
| **About/Company page** | B2B buyers evaluate vendor stability. Especially critical for SME vendors competing against Siemens/SAP. | Low | Include team, founding story, mission. For Prefactor: leverage "built by people who ran production floors" if applicable. |
| **Responsive mobile design** | Even though desktop dominates B2B, Google indexes mobile-first. Also: executives browse on phones. | Medium | Many legacy APS vendor sites are NOT mobile-friendly. This is a differentiator by default. |
| **Professional visual design** | Manufacturing software sites are notoriously ugly. But modern buyers (younger plant managers) expect quality. | Medium | This IS your first competitive advantage. Legacy vendors look like 2010. |
| **Clear navigation** | Buyers scan nav to assess scope. Unclear nav = confusion = bounce. | Low | Mega-menus common in legacy (Siemens). Keep it simple: Features, Use Cases, Pricing, Resources, Contact. |
| **Footer with legal/compliance links** | GDPR compliance mandatory for EU market. Privacy policy, cookie consent required by law. | Low | Non-negotiable for EU-facing site. Bulgaria + EU target = must have GDPR-compliant cookie banner. |

### Content Table Stakes

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Product screenshots or visuals** | Buyers want to see the product before committing to a demo. "Show, don't tell." | Low-Med | Every competitor shows Gantt charts, dashboards. Prefactor should show real UI or high-fidelity mockups. |
| **Customer logos or social proof** | B2B buyers are risk-averse. Logos reduce perceived risk. | Low | Even "Trusted by 50+ manufacturers" with no logos is better than nothing. Add logos as they come. |
| **Clear CTA hierarchy** | Visitors need to know what to do. Primary: "Request Demo". Secondary: "Learn More" / "Watch Video". | Low | Every page should have a CTA. Sticky header CTA is standard. |
| **SEO-optimized meta/content** | B2B discovery happens via Google. "production scheduling software" is a real search query. | Medium | Blog + landing pages targeting scheduling keywords. Critical for competing with SAP/Siemens organic presence. |
| **Multi-language (EN + BG minimum)** | Stated requirement. Bulgarian market is primary, EU expansion requires English. | Medium | i18n from day one. Next.js App Router has built-in i18n routing support. |
| **Performance / fast loading** | Slow site = lost leads. Google Core Web Vitals affect ranking. B2B buyers on factory-floor internet may have slower connections. | Medium | Next.js SSG/SSR handles this well. Optimize images, lazy-load below fold. |
| **Cookie consent / privacy banner** | EU law (GDPR/ePrivacy). Not optional. | Low | Use a lightweight consent manager. Plausible Analytics is cookieless (bonus). |

### Trust Table Stakes

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Testimonials or case studies** | Manufacturing buyers trust peer validation above all. | Low-Med | Even 1-2 quotes from beta users. Aim for named person + company + result ("reduced scheduling time by 40%"). |
| **Security/compliance mentions** | Data security matters for manufacturing (IP, production data). | Low | Brief section or footer badge. "Your data stays in the EU" is powerful for GDPR-conscious buyers. |
| **Integration mentions** | Buyers need to know it works with their ERP/MES. | Low | Even "Integrates with your existing systems" with logos (SAP, Excel, API). |

---

## Differentiators

Features that set Prefactor apart from legacy competitors. These are NOT expected by default in manufacturing software marketing but create competitive advantage.

### Visual/UX Differentiators (HIGH IMPACT -- Exploits Legacy Weakness)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Interactive/animated Gantt demo on landing page** | Legacy vendors show static screenshots. An animated or interactive Gantt immediately communicates "modern, capable, approachable." Buyers can experience the product before committing to a sales call. | High | This is the single highest-impact differentiator. PlanetTogether shows static images. Siemens hides product behind demo walls. Framer Motion + custom SVG/Canvas animation. Does NOT need to be a real product -- a choreographed animation of scheduling in action is sufficient and easier. |
| **Before/After comparison** | Viscerally communicates value. "Manual scheduling: chaos. Prefactor: clarity." | Medium | Slider-based comparison (drag to reveal) or side-by-side animation. Show a messy spreadsheet vs clean Gantt. No competitor does this well. |
| **Dark mode / modern aesthetic** | Manufacturing software sites look dated. A Linear/Vercel-quality design signals "we are the modern alternative." | Medium | Not just dark-for-dark-sake. Clean typography, generous whitespace, subtle animations. This is how Linear and Notion differentiate from legacy PM tools. |
| **Smooth scroll animations** | Page sections animate in on scroll. Feels premium. | Medium | Framer Motion intersection observer patterns. Every section fades/slides in. Linear and Vercel do this masterfully. |
| **Video product walkthrough** | Short (60-90 sec) product video embedded on landing page. Buyers prefer video over reading. | Medium | More effective than screenshots. Can be a polished screen recording with voiceover. Loom/Notion-style. |

### Content Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **ROI Calculator** | Lets prospects self-qualify and quantify value. "Enter your number of orders/week, see how much time you save." | Medium-High | Almost no manufacturing APS vendor has this. Some ERP vendors do (SAP TCO calculators) but they are buried. An upfront, interactive ROI tool is extremely compelling. Captures lead data too. |
| **Transparent pricing or pricing tiers** | Legacy vendors hide pricing behind "Contact Sales." Modern buyers hate this. Even a "Starting at..." or tier structure builds trust. | Low | PlanetTogether, Opcenter, Asprova -- NONE show pricing. Showing any pricing info is instantly differentiating. If true pricing is complex, at least show tiers with "Contact for quote" on enterprise. |
| **Blog / SEO content hub** | Thought leadership + organic traffic. "What is APS?", "Finite vs Infinite Capacity Scheduling", "How to reduce changeover time." | Medium | Long-term differentiator. Most APS vendor blogs are dead or corporate-speak. Genuinely helpful content (like HubSpot model) builds authority. |
| **Comparison pages** | "Prefactor vs PlanetTogether", "Prefactor vs Excel scheduling." Direct comparison captures high-intent search traffic. | Medium | Aggressive but effective. Linear does "Linear vs Jira." These pages rank well for "[competitor] alternative" searches. |
| **Resource library / guides** | Downloadable guides, templates, checklists for production scheduling. | Medium | Lead generation via gated content. "Free production scheduling template" captures emails. |

### Interaction Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Instant demo booking (Calendly-style)** | Remove friction from "Request Demo" -> actual scheduled call. | Low | Embed Calendly or Cal.com directly. Most legacy vendors have "submit form, wait for email" flow. Instant booking is dramatically better. |
| **Live chat / chatbot** | Immediate engagement for visitors with questions. | Low-Med | Intercom, Crisp, or similar. Not critical for launch but high-value for conversion. Can be AI-powered to answer common questions. |
| **Product-led signup (free trial / sandbox)** | Let users try before buying. The ultimate differentiator in a space where every competitor requires a sales call. | Very High | Only if the product supports it. Even a limited sandbox (pre-loaded demo data, read-only) would be unprecedented in APS space. Katana MRP does this. |
| **Notification/waitlist for new features** | Builds email list and engagement pre-launch. | Low | Simple email capture. "Be the first to know when [feature] launches." |

### Trust Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Named case studies with metrics** | "Company X reduced scheduling time from 8 hours to 45 minutes." Specific, named, quantified results. | Medium | Most APS vendors have vague testimonials. Specific metrics are rare and powerful. Even 2-3 detailed case studies outweigh a wall of logos. |
| **Open source / transparent roadmap** | Show what you are building and when. Builds trust with technical buyers. | Low | Public roadmap page (like Linear's). Not common in manufacturing software. Signals confidence and modernity. |
| **Community or user forum** | Peer-to-peer support and engagement. | High | Long-term play. Not for launch. But a "Community" nav item signals maturity even before it is populated. |

---

## Anti-Features

Features to explicitly NOT build. Common mistakes in manufacturing B2B marketing sites.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Mega-menu navigation with 50+ links** | Legacy vendors (Siemens, SAP) have overwhelming navigation because they sell 100 products. Prefactor is ONE product. Complex nav confuses and overwhelms. | Simple top nav: Features, Use Cases, Pricing, Resources, Company, CTA button. 6-7 items max. |
| **Gated content for everything** | Requiring email for every whitepaper, video, or guide creates friction and annoys modern buyers. Especially toxic for SEO content. | Gate only high-value content (ROI calculator results, full case studies). Blog posts, feature pages, videos should be ungated. |
| **Auto-playing video with sound** | Jarring, unprofessional. Factory floor visitors may be in meetings. | Video with play button, muted autoplay at most (background ambient only). |
| **Chatbot that blocks content** | Aggressive chat popups that cover the page on arrival. Visitors want to read first, ask questions second. | Chat widget in corner, no popup for at least 30 seconds. Better: only trigger on exit intent or after 2+ page views. |
| **Jargon-heavy hero copy** | "Leverage our AI-driven APS solution to optimize your MRP-II-integrated finite capacity scheduling paradigm." Means nothing to a plant manager. | Plain language: "Schedule your production floor in minutes, not hours." Then explain the technical depth on the features page. |
| **Stock photos of factories/hard hats** | Every manufacturing software site uses the same Getty Images of smiling workers in hard hats. It signals "generic." | Show YOUR product. Use illustrations, custom graphics, or real product screenshots. If you must show people, make them real (team photos, customer photos). |
| **PDF-only resources** | Some vendors still offer resources only as downloadable PDFs. Bad for SEO, bad for mobile, bad for accessibility. | Web-native content (HTML pages) with optional PDF download. |
| **Feature matrix comparison tables with 200 rows** | Legacy vendors love exhaustive feature checklists. Buyers' eyes glaze over. | Highlight 5-8 key differentiating features with visual depth. Link to detailed specs for those who want them. |
| **"Request a Quote" as only CTA** | Single, high-commitment CTA excludes early-stage browsers. | Tiered CTAs: "Watch Demo Video" (low commitment), "Try Free" (medium), "Request Demo Call" (high). Match CTA to buyer stage. |
| **Carousel/slider for testimonials** | Carousels have terrible engagement -- users rarely click through. Important testimonials get hidden. | Static grid of 3-4 testimonials visible at once. Or a scrolling marquee (continuous, not paginated). |
| **Pop-up newsletter signup on first visit** | Interrupts the buyer journey before they have any reason to subscribe. | Inline newsletter signup at bottom of blog posts (after they have consumed value). Or exit-intent only. |
| **Building a custom CMS** | Scope creep. MDX or a headless CMS handles blog content. Do not build content management from scratch. | Use MDX for blog posts (already in tech stack). Content lives in the repo. Simple and sufficient. |

---

## Feature Dependencies

```
                    FOUNDATION LAYER
                    ================
          Responsive Layout + Design System
          Next.js App Router + i18n Routing
          Tailwind + shadcn/ui Component Library
                         |
                         v
                   CORE PAGES LAYER
                   ================
    Landing Page --- Features Page --- Contact/Demo Form
         |                |                    |
         v                v                    v
    Hero Section    Feature Cards      Form + Resend Email
    Nav + Footer    Product Visuals    Calendly Embed
    CTA Buttons     (screenshots)      GDPR Consent
         |
         v
                  CONTENT LAYER
                  =============
    Use Cases/Industries --- Blog/MDX --- About Page
         |                      |
         v                      v
    Industry-specific      SEO Content
    landing pages          RSS Feed
                           Categories/Tags
         |
         v
               INTERACTIVE LAYER
               =================
    Animated Gantt Demo --- ROI Calculator --- Before/After Slider
         |                       |
         v                       v
    Framer Motion          Lead Capture
    Canvas/SVG             (email gate results)
    Animation Data
         |
         v
              GROWTH LAYER
              ============
    Comparison Pages --- Pricing Page --- Resource Library
    (vs competitors)     (tiers)          (gated guides)
         |                                     |
         v                                     v
    SEO competitor       Analytics         Email Nurture
    keyword capture      A/B Testing       CRM Integration
         |
         v
              ADVANCED LAYER
              ==============
    Live Chat --- Product Sandbox --- Community/Forum
                  (very high effort)
```

### Key Dependency Notes

1. **Design System must come first.** Every page depends on consistent components (buttons, cards, forms, typography). Build the Tailwind + shadcn/ui foundation before any pages.

2. **Landing Page depends on Hero + Nav + Footer.** These are shared components used across all pages. Build them as the landing page and extract.

3. **Blog depends on MDX pipeline.** Set up the MDX content pipeline (with frontmatter, routing, syntax highlighting) before writing blog posts.

4. **ROI Calculator depends on Contact Form.** The calculator captures leads -- it needs the form infrastructure (Resend integration) to deliver results via email or gate them.

5. **Animated Gantt depends on nothing BUT is high complexity.** It can be built in parallel but should not block other pages. Start with a static screenshot, iterate to animation.

6. **Comparison pages depend on Features page.** You need to articulate your own features before comparing against competitors.

7. **i18n must be in the foundation.** Adding multi-language after the fact means rewriting every page. Use Next.js i18n routing from the start and externalize all strings.

---

## Competitor Feature Matrix

How the competitive landscape maps to these features (based on training data, MEDIUM confidence).

| Feature | PlanetTogether | Siemens Opcenter | Asprova | SAP Scheduling | Katana MRP | **Prefactor (Planned)** |
|---------|---------------|-----------------|---------|---------------|------------|----------------------|
| Modern design | No | No | No | No | Yes | **Yes** |
| Interactive demo on site | No | No | No | No | Limited | **Yes (animated Gantt)** |
| Transparent pricing | No | No | No | No | Yes | **Yes (tiers)** |
| ROI calculator | No | No | No | Buried | No | **Yes** |
| Blog/content hub | Basic | Corporate | Minimal | Enterprise | Active | **Yes** |
| Case studies with metrics | Yes (some) | Yes (vague) | Yes (some) | Yes | Yes | **Planned** |
| Video walkthrough | Yes | Yes | Yes | Yes | Yes | **Planned** |
| Free trial / sandbox | No | No | No | No | Yes | **TBD (high effort)** |
| Mobile responsive | Partial | Partial | No | No | Yes | **Yes** |
| Multi-language | Limited | Yes (many) | Yes (JP focus) | Yes (many) | Limited | **Yes (EN+BG+)** |
| Comparison pages | No | No | No | No | No | **Yes** |
| Before/after visuals | No | No | No | No | No | **Yes** |
| Instant demo booking | No | No | No | No | No | **Yes** |
| Cookie consent / GDPR | Varies | Yes | Varies | Yes | Yes | **Yes** |

**Key Insight:** The manufacturing APS space has a massive design and UX gap. Legacy vendors (Siemens, SAP, PlanetTogether) have functional but dated sites focused on enterprise sales motions. Modern manufacturing SaaS (Katana) has proven that a consumer-grade marketing site works in this space. Prefactor has an opportunity to be the "Linear of production scheduling" -- dramatically better marketing site UX while targeting an underserved SME segment.

---

## MVP Feature Recommendation

For initial launch, prioritize in this order:

### Phase 1: Foundation + Core Pages (Must Ship)
1. Design system (Tailwind + shadcn/ui components)
2. i18n infrastructure (EN + BG from day one)
3. Landing page with hero, value prop, CTA, product visuals
4. Navigation + footer (shared layout)
5. Contact / Demo Request form (Resend integration)
6. Cookie consent banner (GDPR)
7. Basic SEO setup (meta tags, sitemap, robots.txt)

### Phase 2: Content + Trust Pages
8. Features page with detailed capability breakdown
9. About page (team, story, mission)
10. 2-3 Use Case / Industry pages
11. Customer logos or testimonial section on landing page
12. Product screenshots throughout

### Phase 3: Interactive + Growth
13. Animated Gantt demo (landing page hero)
14. Before/After comparison component
15. ROI Calculator with lead capture
16. Blog / MDX content pipeline
17. Calendly embed for instant demo booking

### Phase 4: SEO + Expansion
18. 5-10 blog posts targeting scheduling keywords
19. Pricing page (tiers or "Contact for quote")
20. 2-3 competitor comparison pages
21. Resource library (downloadable guides)
22. Analytics setup (Plausible or PostHog)

### Defer to Post-MVP
- Product sandbox / free trial (requires product work, very high complexity)
- Live chat / chatbot (nice-to-have, not critical at launch)
- Community / forum (needs user base first)
- Full resource library with gated content (needs content to gate)
- Advanced A/B testing (needs traffic first)

---

## UX Patterns from Best-in-Class B2B SaaS Sites

Patterns observed from Linear, Notion, Vercel, Stripe, Retool, Figma that apply to Prefactor.

### Linear-Style Patterns (MEDIUM confidence -- from training data)
- **Dark hero with gradient accents:** Dark background, subtle purple/blue gradient, white text. Feels premium and technical.
- **Keyboard shortcut hints in UI screenshots:** Signals power-user capability.
- **Changelog as marketing:** Public changelog page shows momentum and builds trust.
- **Feature pages with full-bleed screenshots:** Each feature gets a dedicated section with a large product visual, not a cramped grid.

### Vercel-Style Patterns
- **Terminal/code as hero visual:** For technical products, showing the developer experience (CLI, code snippets) in the hero.
- **Performance metrics as social proof:** "100ms TTFB" style metrics in badges.
- **Framework-agnostic messaging:** Not applicable to Prefactor directly, but the pattern of "works with what you have" is powerful for integration messaging.

### Stripe-Style Patterns
- **Interactive code samples:** Stripe's hero has live code that updates. For Prefactor, this could be an interactive scheduling scenario.
- **Gradient mesh backgrounds:** Subtle, animated gradient backgrounds that feel alive.
- **Documentation as marketing:** Best docs in the industry serve as marketing. Prefactor could have stellar API docs if there is an API.

### Applicable Patterns for Prefactor
1. **Dark, modern aesthetic** -- Immediately signals "not your father's ERP"
2. **Large product visuals** -- Show the Gantt chart BIG, not thumbnailed
3. **Animation on scroll** -- Framer Motion for section entrances
4. **Stats/metrics as proof points** -- "Schedule 500 orders in 30 seconds"
5. **Tiered CTAs** -- Primary (Demo), Secondary (Video), Tertiary (Learn More)
6. **Speed as value prop** -- Show loading animations, performance metrics
7. **Before/After as narrative** -- "This is scheduling today. This is scheduling with Prefactor."

---

## Sources and Confidence Assessment

| Finding | Source | Confidence |
|---------|--------|------------|
| Competitor site structures (PlanetTogether, Opcenter, etc.) | Training data (visited/analyzed pre-2025) | MEDIUM -- sites may have updated |
| Legacy APS vendor design quality gap | Training data + direct observation pattern | HIGH -- this is a well-established pattern unlikely to change |
| Modern B2B SaaS patterns (Linear, Vercel, Stripe) | Training data | MEDIUM-HIGH -- patterns are established but evolving |
| Feature categorization (table stakes vs differentiators) | Synthesized from competitor analysis + B2B marketing best practices | MEDIUM |
| ROI calculator rarity in APS space | Training data | MEDIUM -- someone may have added one |
| Pricing transparency gap in APS space | Training data | HIGH -- enterprise APS pricing is notoriously opaque |
| GDPR/cookie consent requirements for EU | Training data | HIGH -- legal requirements do not change often |
| Next.js i18n capabilities | Training data | MEDIUM -- verify current App Router i18n patterns |
| MDX for blog content | Training data | MEDIUM -- verify Contentlayer status (was in beta) |
| shadcn/ui component availability | Training data | MEDIUM -- verify current component library |

### Verification Recommendations
- **Verify Contentlayer status:** It was in beta during training. Check if it is stable or if an alternative (e.g., next-mdx-remote, Velite) is now preferred.
- **Verify competitor sites:** Fetch PlanetTogether, Asprova, Katana MRP to confirm current state of their marketing.
- **Verify shadcn/ui components:** Check Context7 for current component list and patterns.
- **Verify Next.js App Router i18n:** Check Context7 for current recommended i18n approach (it evolved significantly through 2024-2025).
