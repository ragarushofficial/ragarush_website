"use client";

import { useId, useState } from "react";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/site";

type Service = {
  icon: string;
  title: string;
  description: string;
};

const SERVICE_GROUPS = {
  story: {
    label: "For your story",
    services: [
      {
        icon: "💒",
        title: "Your Story Song™",
        description:
          "Weddings, birthdays, anniversaries, lullabies — bespoke songs that honour your milestones.",
      },
      {
        icon: "✍️",
        title: "Poem-to-Song (Kavita-to-Kriti)",
        description: "Poetry to song in Marathi, Hindi, or English — your words, arranged with care.",
      },
      {
        icon: "💌",
        title: "Musical Invites & Tributes",
        description:
          "Audio invitations and tribute songs crafted to move hearts before the first note fades.",
      },
    ] satisfies Service[],
  },
  brand: {
    label: "For your brand",
    services: [
      {
        icon: "📣",
        title: "Brand & Business Audio",
        description: "Jingles, ads, corporate anthems, and podcast branding that sounds unmistakably you.",
      },
      {
        icon: "🎸",
        title: "Creator & Theme Music",
        description: "Intros, outros, and themes across Sufi, Pop, Rock, Lo-fi, and beyond.",
      },
      {
        icon: "🎭",
        title: "Media & Performance Scoring",
        description: "Theatre, short films, and dance — scores and stems, BPM-matched to movement.",
      },
      {
        icon: "🧘",
        title: "Wellness & Lifestyle Soundscapes",
        description: "Gym, yoga, meditation, and focus music — immersive beds for body and mind.",
      },
    ] satisfies Service[],
  },
} as const;

type ServiceGroupId = keyof typeof SERVICE_GROUPS;

function ServiceCard({ item, centerOnLarge }: { item: Service; centerOnLarge: boolean }) {
  return (
    <article
      className={`service-card group relative flex flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md md:p-7 ${
        centerOnLarge ? "lg:col-start-2" : ""
      }`}
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-secondary/35 bg-secondary/10 text-2xl shadow-[0_0_20px_rgba(212,168,67,0.18)]"
        aria-hidden
      >
        <span className="drop-shadow-[0_0_8px_rgba(212,168,67,0.45)]">{item.icon}</span>
      </div>
      <h3 className="font-heading text-xl leading-snug text-cream md:text-[1.35rem]">{item.title}</h3>
      <p className="font-sans mt-3 text-[0.95rem] leading-relaxed text-cream/84 md:text-base md:leading-relaxed">
        {item.description}
      </p>
    </article>
  );
}

export function ServicesTabbedGrid() {
  const [activeGroup, setActiveGroup] = useState<ServiceGroupId>("story");
  const tablistId = useId();
  const panelId = useId();
  const { services } = SERVICE_GROUPS[activeGroup];
  const orphanLastOnLarge = services.length % 3 === 1;

  return (
    <>
      <div
        role="tablist"
        aria-label="Service categories"
        id={tablistId}
        className="mx-auto mb-10 flex w-full max-w-xl flex-col gap-2 rounded-2xl border border-white/12 bg-white/[0.04] p-1.5 shadow-[inset_0_1px_0_rgba(212,168,67,0.08)] backdrop-blur-sm sm:mb-12 sm:max-w-2xl sm:flex-row sm:gap-1.5"
      >
        {(Object.entries(SERVICE_GROUPS) as [ServiceGroupId, (typeof SERVICE_GROUPS)[ServiceGroupId]][]).map(
          ([id, group]) => {
            const isActive = activeGroup === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`${tablistId}-${id}`}
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveGroup(id)}
                className={`min-h-[44px] flex-1 rounded-xl px-4 py-3 text-center font-sans text-sm font-medium transition-colors sm:text-[0.9375rem] ${
                  isActive
                    ? "bg-secondary text-[#0d0a1a] shadow-[0_0_24px_rgba(212,168,67,0.28)]"
                    : "text-cream/78 hover:bg-white/[0.06] hover:text-cream"
                }`}
              >
                {group.label}
              </button>
            );
          }
        )}
      </div>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={`${tablistId}-${activeGroup}`}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8"
      >
        {services.map((item, idx) => (
          <ServiceCard
            key={item.title}
            item={item}
            centerOnLarge={orphanLastOnLarge && idx === services.length - 1}
          />
        ))}
      </div>

      {activeGroup === "brand" ? (
        <div className="mt-10 flex justify-center md:mt-12">
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.businessAudio)}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-start-song inline-flex min-h-[44px] w-full max-w-md items-center justify-center rounded-full px-8 py-3 text-center font-medium text-[#0d0a1a] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
          >
            Discuss My Project
          </a>
        </div>
      ) : null}
    </>
  );
}
