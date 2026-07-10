import { AudioSampleCard } from "@/components/AudioSampleCard";

// TODO: replace placeholder audio files in /public/audio/samples/ with real production samples
const AUDIO_SAMPLES = [
  {
    title: "Wedding Song",
    subtitle: "A bespoke anniversary ballad — Marathi lyrics, studio-produced",
    src: "/audio/samples/wedding-song.wav",
  },
  {
    title: "Brand Jingle",
    subtitle: "15-second corporate intro for a Pune-based startup",
    src: "/audio/samples/brand-jingle.wav",
  },
  {
    title: "Poem-to-Song",
    subtitle: "Kavita-to-Kriti — a grandmother's Hindi poem set to melody",
    src: "/audio/samples/poem-to-song.wav",
  },
  {
    title: "Musical Tribute",
    subtitle: "A heartfelt audio invitation for a milestone birthday",
    src: "/audio/samples/tribute-song.wav",
  },
  {
    title: "Corporate Anthem",
    subtitle: "Team rally song for an annual company event",
    src: "/audio/samples/corporate-anthem.wav",
  },
] as const;

export function ListenFirstSection() {
  return (
    <section
      id="listen"
      className="listen-first-section scroll-mt-28 relative overflow-hidden rounded-3xl border border-white/10 px-5 py-14 shadow-[inset_0_1px_0_rgba(212,168,67,0.06)] sm:px-8 md:px-10 md:py-16 lg:px-12"
      aria-labelledby="listen-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1e1230] via-[#140d20] to-[#1a1028]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <header className="mb-10 text-center md:mb-12">
          <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.2em] text-secondary/90 sm:text-sm">
            Hear the difference
          </p>
          <h2
            id="listen-heading"
            className="font-heading text-2xl tracking-tight text-cream sm:text-3xl md:text-4xl"
          >
            Listen First
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-cream/78 sm:text-lg">
            Real songs delivered to real clients — AI-accelerated drafts, refined by a human producer.
          </p>
          <div
            className="mx-auto mt-5 flex max-w-md items-center justify-center gap-3 md:mt-6"
            aria-hidden
          >
            <span className="h-px flex-1 max-w-[4.5rem] bg-gradient-to-r from-transparent to-secondary/90" />
            <span className="h-1 w-1 shrink-0 rounded-full bg-secondary shadow-[0_0_12px_rgba(212,168,67,0.65)]" />
            <span className="h-px flex-1 bg-secondary/85" />
            <span className="h-1 w-1 shrink-0 rounded-full bg-secondary shadow-[0_0_12px_rgba(212,168,67,0.65)]" />
            <span className="h-px flex-1 max-w-[4.5rem] bg-gradient-to-l from-transparent to-secondary/90" />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
          {AUDIO_SAMPLES.map((sample) => (
            <AudioSampleCard
              key={sample.title}
              title={sample.title}
              subtitle={sample.subtitle}
              src={sample.src}
            />
          ))}
        </div>

        <p className="mt-8 text-center font-sans text-xs text-cream/45">
          {/* TODO: replace with real samples — placeholder audio files are silent placeholders */}
          Placeholder audio — replace with real production samples before launch.
        </p>
      </div>
    </section>
  );
}
