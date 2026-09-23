import React from "react";
import Link from "next/link";
import { pokemonDetails } from "@/types/pokemon";
import { typeStyles } from "@/lib/typestyle";
const defaultStyle = {
  bg: "bg-slate-500/10",
  text: "text-slate-600 dark:text-slate-300",
  border: "border-slate-500/20",
  glow: "from-purple-500/10 to-transparent",
};

function PokemonCard({ pokemon }: { pokemon: pokemonDetails }) {
  const primaryType = pokemon.types?.[0]?.type?.name?.toLowerCase() || "normal";
  const style = typeStyles[primaryType] || defaultStyle;

  const image = pokemon.sprites?.other?.["official-artwork"]?.front_default;

  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;

  const getStat = (name: string) =>
    pokemon.stats?.find((s) => s.stat.name === name)?.base_stat ?? null;

  const hp = getStat("hp");
  const attack = getStat("attack");
  const defense = getStat("defense");

  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/10 dark:border-slate-800/80 dark:bg-slate-900/90 dark:hover:border-purple-500/50"
    >
      <div
        className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${style.glow} blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
      />
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500">
            {formattedId}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {pokemon.types?.map((t) => {
              const typeName = t.type.name.toLowerCase();
              const badgeStyle = typeStyles[typeName] || defaultStyle;
              return (
                <span
                  key={t.type.name}
                  className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize backdrop-blur-sm ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
                >
                  {t.type.name}
                </span>
              );
            })}
          </div>
        </div>
        <div className="relative my-3 flex h-36 w-full items-center justify-center">
          <div className="absolute h-28 w-28 rounded-full bg-slate-100/80 dark:bg-slate-800/50 transition-transform duration-300 group-hover:scale-105" />
          <img
            src={image}
            alt={pokemon.name}
            className="relative h-32 w-32 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
          />
        </div>
        <h3 className="text-center text-lg font-extrabold capitalize tracking-tight text-slate-800 transition-colors duration-200 group-hover:text-purple-600 dark:text-slate-100 dark:group-hover:text-purple-400">
          {pokemon.name}
        </h3>
      </div>

      {(hp !== null || attack !== null || defense !== null) && (
        <div className="mt-4 grid grid-cols-3 gap-1.5 rounded-xl bg-slate-50/80 p-2 text-center text-xs dark:bg-slate-800/50">
          {hp !== null && (
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                HP
              </span>
              <span className="font-bold text-slate-700 dark:text-slate-200">
                {hp}
              </span>
              <div className="mt-1 h-1 w-full max-w-[36px] overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width: `${Math.min(100, Math.round((hp / 160) * 100))}%`,
                  }}
                />
              </div>
            </div>
          )}

          {attack !== null && (
            <div className="flex flex-col items-center border-x border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                ATK
              </span>
              <span className="font-bold text-slate-700 dark:text-slate-200">
                {attack}
              </span>
              <div className="mt-1 h-1 w-full max-w-[36px] overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-amber-500"
                  style={{
                    width: `${Math.min(100, Math.round((attack / 160) * 100))}%`,
                  }}
                />
              </div>
            </div>
          )}

          {defense !== null && (
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                DEF
              </span>
              <span className="font-bold text-slate-700 dark:text-slate-200">
                {defense}
              </span>
              <div className="mt-1 h-1 w-full max-w-[36px] overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-sky-500"
                  style={{
                    width: `${Math.min(100, Math.round((defense / 160) * 100))}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Link>
  );
}

export default PokemonCard;
