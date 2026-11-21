# Ananya & Aarav — Digital Wedding Invitation

Mobile-first wedding invitation recreated from the reference video flow:

**Preloader → Closed sage gate → Tap to open → Cream invitation reveal → Full scroll**

## Run

```bash
npm install
npm run dev
```

Open the local URL Vite prints (for example `http://localhost:5180`).

## Exact interaction flow

1. Full-screen sage preloader with progress
2. Closed green gate with gold spine + ornate **TAP TO OPEN** seal
3. Gate stays closed until the visitor taps/clicks
4. Panels slide open and reveal the cream invitation underneath
5. Scroll sections: welcome, scratch-to-reveal date, countdown, timeline, venue/map, dress code, transportation, gifts, RSVP, closing

## Dummy content

Edit `src/data/weddingData.js`

- Bride: Ananya Sharma
- Groom: Aarav Mehta
- Date: 15 February 2027
- Venue: The Royal Palace, Jaipur

## Stack

React · Vite · Tailwind CSS · Framer Motion · GSAP · React Hook Form · Lucide
