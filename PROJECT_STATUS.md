# Tedwen Remakes LLC — Website Project Status

**Last Updated:** May 2026  
**Live URL:** https://tedwen-remakes-site.vercel.app  
**Repository:** https://github.com/13dmh33/Tedwen-Remakes-Site  

---

## Project Summary

A modern, dark-themed marketing website for Tedwen Remakes LLC, a home repair and renovation company based in Canonsburg, PA. The site is designed to generate leads through an AI-powered chat widget that guides potential customers through a natural conversation — collecting project details, contact info, and scheduling availability in one smooth flow.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| AI Chat | Anthropic Claude (claude-haiku-4-5) |
| Email Delivery | Resend |
| Deployment | Vercel |
| Source Control | GitHub |

---

## Site Sections

### Pages
| Route | Description | Status |
|---|---|---|
| `/` | Main one-page site | ✅ Live |
| `/privacy-policy` | Privacy policy page | ✅ Live |
| `/terms-and-conditions` | Terms page | ✅ Live |

### Components (top to bottom)
| Component | Description | Status |
|---|---|---|
| `Nav` | Fixed top navigation — About, Services, Gallery, Contact | ✅ Done |
| `Hero` | Full-screen background image, logo, tagline, CTA buttons | ✅ Done |
| `About` | Company intro copy | ✅ Done |
| `Services` | List of 5 core services | ✅ Done |
| `Gallery` | 3-column photo grid with hover labels | ✅ Done |
| `SocialFollow` | Instagram, Facebook, Yelp links | ✅ Done |
| `Contact` | Contact info sidebar (email, phone, location) | ✅ Done |
| `Footer` | Site footer | ✅ Done |
| `ChatBubble` | Floating AI chat widget, fixed bottom-right | ✅ Done |

---

## AI Chat Widget

The chat widget is the primary lead capture mechanism. It replaces the old static contact form.

**How it works:**
1. Visitor clicks the white chat bubble in the bottom-right corner
2. Bot greets them and opens a natural conversation
3. Through texting-style messages, it learns about their project, collects their name and contact info, and asks about their timeline — all as one continuous flow
4. When enough info is collected, it silently calls the capture_lead tool
5. Ted receives an email notification with the lead details
6. Bot wraps up warmly and confirms Ted will be in touch

**Files:**
- `components/ChatBubble.tsx` — UI component (floating bubble + popup)
- `app/api/chat/route.ts` — API endpoint (Claude integration + Resend notification)

**Model:** claude-haiku-4-5-20251001 (fast, cost-efficient)

---

## Gallery Photos

Real job photos committed to /public/gallery/:

| File | Subject | Used In |
|---|---|---|
| `job1.jpg` | Home bar build-out | Hero background + Gallery card 1 |
| `job2.jpg` | Kitchen backsplash & fixtures | Gallery card 2 |
| `job3.jpg` | Wine cellar shelving | Gallery card 3 |

---

## Social / Contact Info

| Channel | Value | Status |
|---|---|---|
| Instagram | @TEDWENRemakesLLC | ✅ Live link |
| Facebook | Tedwen Remakes LLC | ✅ Live link |
| Yelp | tedwen-remakes-canonsburg-4 | ✅ Live link |
| Email | 13dmh33@gmail.com | ⚠️ Placeholder — needs Ted's real email |
| Phone | (555) 555-5555 | ⚠️ Placeholder — needs Ted's real number |

---

## Deployment

- **Platform:** Vercel (Hobby plan)
- **Production branch:** main
- **Auto-deploy:** Yes — any commit pushed to main triggers a redeploy
- **Build time:** ~60 seconds

---

## Environment Variables

These must be set in Vercel → Project → Settings → Environment Variables:

| Variable | Purpose | Status |
|---|---|---|
| `ANTHROPIC_API_KEY` | Powers the AI chat bot | ⚠️ Not yet set |
| `RESEND_API_KEY` | Sends lead emails to Ted | ⚠️ Not yet set |
| `TED_EMAIL` | Ted's email for lead notifications | ⚠️ Not yet set |
| `RESEND_FROM_EMAIL` | Verified sender address in Resend | ⚠️ Not yet set |

---

## Known Issues

| Issue | Fix |
|---|---|
| Hero + Gallery images broken (400 error) | Add `images: { unoptimized: true }` to `next.config.ts` |
| tedwen-widget.js 404 in console | Remove the Script tag from `app/page.tsx` |
| Chat bot doesn't respond | Set ANTHROPIC_API_KEY in Vercel env vars |

---

## Open Action Items

### High Priority
- [ ] Set all 4 env vars in Vercel
- [ ] Fix broken images in next.config.ts
- [ ] Replace placeholder phone and email in Contact.tsx

### Low Priority
- [ ] Remove dead Script tag from app/page.tsx
- [ ] Set up custom domain in Vercel
- [ ] Verify Resend sender domain
- [ ] Add more gallery photos over time

---

## Brand Guide

**Colors:**
| Name | Hex |
|---|---|
| Charcoal (background) | #1C1C1C |
| Warm Dark (cards/surfaces) | #2B2B2B |
| Warm Gray (muted text) | #8A8680 |
| Border Gray | #3D3A36 |
| Off White | #F5F5F3 |
| Gold (accent) | #B8962E |

**Typography:** Playfair Display (headings), Inter (body)  
**Style:** Dark, minimal, high-end craft aesthetic.

---

## File Structure
