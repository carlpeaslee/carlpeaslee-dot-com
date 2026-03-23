import { useState } from "react";

import { Button } from "@/components/ui/button";

const modes = [
  { label: "steady", multiplier: 1 },
  { label: "push", multiplier: 1.4 },
  { label: "sprint", multiplier: 1.8 },
];

export function SignalBench() {
  const [modeIndex, setModeIndex] = useState(0);
  const [effort, setEffort] = useState(56);

  const mode = modes[modeIndex];
  const bars = Array.from({ length: 8 }, (_, index) => {
    const raw = (effort / 100) * mode.multiplier * (0.55 + index * 0.08);
    return Math.min(100, Math.round(raw * 100));
  });

  return (
    <section className="not-prose rounded-[1.75rem] border border-border/70 bg-[linear-gradient(180deg,rgba(32,35,44,0.98),rgba(22,24,31,0.98))] p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.35)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/55">Interactive demo</p>
          <h3 className="mt-2 font-display text-3xl text-white">Signal bench</h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/70">
            MDX content can embed normal React components. This widget is rendered on the server,
            then hydrated on the client with live state.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {modes.map((mode, index) => (
            <Button
              key={mode.label}
              className={modeIndex === index ? "bg-white text-slate-950 hover:bg-white/90" : ""}
              onClick={() => setModeIndex(index)}
              type="button"
              variant={modeIndex === index ? "secondary" : "outline"}
            >
              {mode.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
          <label className="flex items-center justify-between gap-4 text-sm text-white/75" htmlFor="effort">
            Build intensity
            <span className="font-medium text-white">{effort}%</span>
          </label>
          <input
            className="mt-4 w-full accent-[#f6c177]"
            id="effort"
            max="100"
            min="20"
            onChange={(event) => setEffort(Number(event.currentTarget.value))}
            type="range"
            value={effort}
          />
          <p className="mt-4 text-sm leading-7 text-white/60">
            The exact numbers are arbitrary. The point is that client-side interaction works inside
            the markdown post body without carving the post into a separate app surface.
          </p>
        </div>

        <div className="grid grid-cols-8 items-end gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
          {bars.map((value, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              <div
                className="w-full rounded-full bg-[linear-gradient(180deg,#f6c177,#db6d52)] transition-[height] duration-300"
                style={{ height: `${value * 1.6}px` }}
              />
              <span className="text-xs text-white/45">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
