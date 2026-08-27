# Tagpuan Admin — Design Direction

## Reference Ground Truth

The provided Tagpuan admin overview, events list, and create-event screens are the authoritative visual reference for this implementation. Fidelity to the reference takes priority over generic dashboard patterns. The experience should retain the warm cream canvas, hand-made scrapbook sensibility, deep brown ink, terracotta-orange actions, grouped left navigation, taped-photo treatments, generous card spacing, and editorial display typography.

## Chosen Direction: Warm Scrapbook Operations

### Design Movement
Contemporary editorial scrapbook design rooted in Filipino community spaces: tactile paper surfaces, hand-drawn linework, washi tape, warm documentary photography, and a disciplined operations dashboard underneath.

### Core Principles
1. **Keep the space warm.** Cream surfaces, subtle paper grain, and brown ink make administration feel human rather than clinical.
2. **Make activity tangible.** Photos, sticky-note chips, taped thumbnails, badges, and microcopy should feel like artifacts from a real community noticeboard.
3. **Use editorial hierarchy.** Strong display headlines and compact sans-serif metadata create the same contrast as the reference screens.
4. **Prioritize calm utility.** Actions are obvious, states are legible, and interactions feel responsive without distracting animation.

### Color Philosophy
The palette is intentionally sun-warmed rather than saturated. A quiet parchment background (#F8F0E4) creates a calm field for dense admin work; near-white cards (#FFFDF8) create separation without stark contrast; deep brown ink (#241C15) keeps text softer than pure black; terracotta orange (#E66A1C) signals momentum and community energy in buttons, labels, and icons. Muted greens, yellows, blush, and blue are reserved for statuses and activity artifacts so meaning stays attached to color.

### Layout Paradigm
Use a fixed, tactile sidebar paired with an asymmetric content canvas. Content pages should feel composed like an editorial spread: a clear left edge, wide header breathing room, a responsive column rhythm, and mixed-size cards that create a visual cadence rather than a perfectly uniform grid. On small screens, the sidebar becomes a compact top rail and cards collapse into a single readable column.

### Signature Elements
- **Taped-photo treatment:** a slightly rotated photo with translucent washi tape and a soft shadow, used for key event imagery.
- **Paper artifact accents:** faint woven-paper texture, lightly tinted note chips, and imperfect line borders.
- **Ink-and-orange action language:** dark brown active navigation pills and rounded terracotta CTAs with small directional icons.

### Interaction Philosophy
Interactions should feel like moving a real community board forward. Hovering lifts cards slightly and deepens the paper shadow; active navigation becomes a dark ink pill; filters are pill-shaped and immediate; buttons compress subtly on press. Form interactions are direct, with visible focus rings in terracotta and honest helper copy. Placeholder destinations use a toast explaining that the feature is coming soon instead of dead-ending.

### Animation
Use restrained motion: 180–240ms ease-out transitions for buttons, tabs, cards, and dropdowns; use opacity plus translateY for page sections entering; stagger dense dashboard cards by 40ms when appropriate. Avoid decorative looping motion. Respect prefers-reduced-motion by removing non-essential transforms and entrance animation.

### Typography System
Use **Fraunces** for display headlines and brand-facing titles, with rounded, editorial forms that echo the reference. Use **DM Sans** for navigation, metadata, form labels, and body copy. Headlines use 700–800 weight with tight tracking; eyebrow labels use 700 weight, uppercase, 0.14em tracking; body copy uses 400–500 weight and relaxed line height; buttons and labels use 600 weight.

### Brand Essence
**Tagpuan is the calm command center for community hosts who keep gatherings, people, and shared stories moving—warmly, visibly, and together.** Personality: **warm, capable, neighborly**.

### Brand Voice
Headlines are conversational and human. CTAs are active, specific, and lightly optimistic. Microcopy explains what happens next without sounding corporate or robotic.

Example headline: “What’s going on?”

Example CTA: “Make room for the next gathering”

### Wordmark & Logo
Use a hand-drawn nipa-hut mark with a centered doorway and small sun/meeting-point motif. The symbol is used beside the TAGPUAN wordmark in the sidebar and as a visible favicon/brand mark. The wordmark should be rendered in the chosen display font with uppercase letter spacing, but the mark carries the distinctive brand recognition.

### Signature Brand Color
**Terracotta Orange — #E66A1C.** It is warm enough to feel handmade, bright enough to guide action, and distinct from generic SaaS blue or purple.

## File-Level Style Reminder
Every authored CSS, component, page, or route file should begin with a short comment reminding future edits: “Tagpuan style: warm scrapbook operations — cream paper, brown ink, terracotta actions, editorial type, tactile artifacts.”

## Scope Notes

This first frontend build uses honest, local sample content to demonstrate the approved concepts and interaction states without fabricating testimonials or customer reviews. Event filters, search, tabs, pagination, navigation, create-event form validation, image-drop state, activity selections, publishing status, save-draft feedback, and preview actions are implemented as client-side interactions in the static project.
