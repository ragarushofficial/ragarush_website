export const PLANS = [
  { id: "quick", label: "Quick Song", price: 999, display: "Quick Song (₹999)" },
  { id: "full", label: "Full Story Song", price: 2999, display: "Full Story Song (₹2999)" },
  {
    id: "signature",
    label: "Signature Experience",
    price: 6999,
    display: "Signature Experience (₹6999+)",
  },
] as const;

export type PlanId = (typeof PLANS)[number]["id"];

export const OCCASIONS = [
  "Wedding",
  "Birthday",
  "Anniversary",
  "Brand/Business",
  "Creator Intro/Outro",
  "Film/Theatre/Performance",
  "Wellness/Meditation",
  "Tribute/Memorial",
  "Poem-to-Song",
  "Other",
] as const;

export const LANGUAGES = ["Marathi", "Hindi", "English", "Mix (specify in story)"] as const;

export const GENRES = [
  "Romantic / Soft",
  "Upbeat / Celebratory",
  "Sufi / Soulful",
  "Lo-fi / Chill",
  "Rock / Energetic",
  "Classical / Traditional",
  "Cinematic / Grand",
  "Let Raga Rush Decide",
] as const;

export const ADDON_SOCIAL = 499;
export const ADDON_VIDEO = 999;
