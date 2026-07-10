import Image from "next/image";

export type TestimonialCardProps = {
  name: string;
  quote: string;
  /** Optional photo URL — falls back to initials avatar when omitted */
  photoUrl?: string;
  role?: string;
};

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function Avatar({ name, photoUrl }: { name: string; photoUrl?: string }) {
  if (photoUrl) {
    return (
      <Image
        src={photoUrl}
        alt=""
        width={48}
        height={48}
        className="h-12 w-12 shrink-0 rounded-full border border-secondary/35 object-cover shadow-[0_0_16px_rgba(212,168,67,0.15)]"
      />
    );
  }

  return (
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-secondary/35 bg-secondary/15 font-heading text-sm text-secondary shadow-[0_0_16px_rgba(212,168,67,0.15)]"
      aria-hidden
    >
      {getInitials(name)}
    </span>
  );
}

export function TestimonialCard({ name, quote, photoUrl, role }: TestimonialCardProps) {
  return (
    <article className="testimonial-card group relative flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md md:p-7">
      <svg
        className="mb-4 h-6 w-6 text-secondary/50"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.29l.806 1.548C6.726 7.23 5.5 9.5 5.5 11.5c0 1.25.417 2.25 1.25 3 .833.75 1.833 1.25 3 1.5v2.5H4.583zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.29l.806 1.548C16.726 7.23 15.5 9.5 15.5 11.5c0 1.25.417 2.25 1.25 3 .833.75 1.833 1.25 3 1.5v2.5h-5.167z" />
      </svg>

      <blockquote className="flex-1">
        <p className="font-sans text-[0.95rem] leading-relaxed text-cream/88 md:text-base md:leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>

      <footer className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
        <Avatar name={name} photoUrl={photoUrl} />
        <div className="min-w-0">
          <cite className="font-heading not-italic text-base text-cream">{name}</cite>
          {role ? (
            <p className="mt-0.5 font-sans text-sm text-cream/60">{role}</p>
          ) : null}
        </div>
      </footer>
    </article>
  );
}
