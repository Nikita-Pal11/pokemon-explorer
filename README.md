# Pokémon Explorer

A modern, responsive Pokémon Explorer built with Next.js (App Router), TypeScript, Tailwind CSS, and the [PokéAPI](https://pokeapi.co/).

🔗 **Live Demo:** [pokemon-explorer-nine-eta.vercel.app](https://pokemon-explorer-nine-eta.vercel.app/)

![Pokémon Explorer Screenshot](./public/screenshots/home.png)

---

## Features

- **Search & Pagination**: Live search by name or Pokédex ID with fast server pagination.
- **Rich Details**: View base stats, moves, abilities, physical specs, and evolution chains.
- **Surprise Me!**: Jump to a random Pokémon with a single click.
- **SSG Performance**: Top 20 Pokémon pre-built statically (`generateStaticParams`) with 24h revalidation for all others.
- **Glassmorphic UI**: Ambient dark mode with translucent header & smooth responsive layout.

---

## Tech Stack

**Next.js (App Router)** · **React 19** · **TypeScript** · **Tailwind CSS** · **PokéAPI**

---

## Run Locally

```bash
git clone https://github.com/Nikita-Pal11/pokemon-explorer.git
cd pokemon-explorer
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📝 Key Highlights

- Uses App Router architecture (`app/pokemon/[id]/page.tsx`).
- Data fetched via React Server Components for optimal SEO & fast load times.
- Static generation (SSG) pre-renders initial Pokémon detail pages at build time.
