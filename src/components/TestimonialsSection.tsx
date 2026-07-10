import { TestimonialCard } from "@/components/TestimonialCard";

// TODO: replace placeholder testimonials with real client quotes and photos
const TESTIMONIALS = [
  {
    name: "Priya M.",
    role: "Wedding song client",
    quote:
      "They turned our love story into a song that made everyone at the sangeet cry. It felt personal, not like something an app spat out.",
  },
  {
    name: "Rohan K.",
    role: "Brand jingle — startup founder",
    quote:
      "We needed a jingle that sounded premium but didn't cost studio rates. Raga Rush nailed the vibe on the second revision.",
  },
  {
    name: "Anjali D.",
    role: "Poem-to-song — family tribute",
    quote:
      "My grandmother's Marathi poem became a song my whole family still plays. The producer really understood what the words meant.",
  },
] as const;

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="testimonials-section scroll-mt-28 relative overflow-hidden rounded-3xl border border-white/10 px-5 py-14 shadow-[inset_0_1px_0_rgba(212,168,67,0.06)] sm:px-8 md:px-10 md:py-16 lg:px-12"
      aria-labelledby="testimonials-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1a1028] via-[#140d20] to-[#1e1230]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <header className="mb-10 text-center md:mb-12">
          <h2
            id="testimonials-heading"
            className="font-heading text-2xl tracking-tight text-cream sm:text-3xl md:text-4xl"
          >
            What Clients Say
          </h2>
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

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
              name={testimonial.name}
              quote={testimonial.quote}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
