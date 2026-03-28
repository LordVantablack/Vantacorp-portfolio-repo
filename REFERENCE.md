# references.md — Design Inspiration & Notes

## Primary References

### WorldQuant Foundry — https://www.worldquantfoundry.com/
**What to take from this site:**
- Dark background (#050505-range), near-white text — monochromatic palette
- Large, confident typography with generous letter-spacing on labels
- Numbered items pattern: "01 / 04" style counters for sections and features
- Team section: hover-reveal portrait cards with role + bio expansion
- Scroll-triggered fade-up reveals on every section
- Minimal accent color usage — richness comes from type and space, not color
- Clean grid-based footer with column sections
- "Site by [Studio]" credit pattern

**What NOT to copy:**
- Their specific content structure (VC/startup focused)
- The contact form modal pattern (we use a dedicated page)

### ICOMAT — https://www.icomat.co.uk/
**Built by**: Rejouice (https://www.rejouice.com/)
**What to take from this site:**
- Video/image hero with text overlay — cinematic first impression
- Tabbed horizontal content sections (their "At scale / Zero defects / 10x faster" tabs)
- Generous section spacing — each section breathes
- Testimonial carousel with company logos and long-form quotes
- Comparison pattern: "Others vs The ICOMAT Way" — could adapt for a services differentiation section
- Timeline / process visualization (their end-to-end production steps O1-O7)
- Dual-column layout for feature sections (image + text side by side)
- Footer with full navigation + clean legal bar

**What NOT to copy:**
- Their heavy use of video (we're prioritizing fast LCP)
- Manufacturing/industrial imagery (not relevant to our industry)
- The specific tab interaction UX (too complex for our content volume)

## Secondary References (Browse for Inspiration)

### Studio/Agency Portfolios
- **Rejouice** — https://www.rejouice.com/ — The studio that built ICOMAT. Study their own portfolio for how they present work.
- **Locomotive** — https://locomotive.ca/ — Smooth scroll pioneers. Study their scroll pacing and section transitions.
- **Basement Studio** — https://basement.studio/ — Experimental but disciplined. Good reference for 3D accents and bold typography.

### Awwwards Collections
- https://www.awwwards.com/websites/portfolio/ — Award-winning portfolios
- https://godly.website — Curated design inspiration (filter by "Agency" and "Dark")

## Notes for Claude Code Prompts

When building a specific section, reference these sites like this:
> "Build the services section following the numbered-item accordion pattern from WorldQuant Foundry (see references.md). Each service row has a number, title, and expandable description."

> "Style the testimonials section like ICOMAT's customer testimonials — large quote text, centered, with attribution below. Reference THEME.md for typography."
