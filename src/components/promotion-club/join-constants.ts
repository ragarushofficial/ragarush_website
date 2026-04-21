export const MEMBER_CATEGORIES = [
  "Student",
  "Content Creator",
  "Event Planner",
  "Freelancer",
  "Working Professional",
  "Other",
] as const;

export const HEAR_ABOUT_OPTIONS = [
  "Social Media (Instagram/YouTube)",
  "Friend/Family Referral",
  "Event/Workshop",
  "Google Search",
  "Other",
] as const;

export const NETWORK_SIZE_OPTIONS = [
  "Less than 100 people",
  "100–500 people",
  "500–1,000 people",
  "1,000–5,000 people",
  "5,000+ people",
] as const;

export const PAYMENT_METHODS = ["upi", "bank", "paylater"] as const;

export const INCENTIVE_GLANCE = [
  { range: "Up to ₹50K", rate: "5%" },
  { range: "₹50K–1L", rate: "10%" },
  { range: "₹1L–1.5L", rate: "15%" },
  { range: "₹1.5L+", rate: "20%" },
] as const;

export const WHY_JOIN = [
  "No experience required",
  "Work from anywhere",
  "Transparent tracking system",
  "Consistent payouts",
  "Unlimited earning potential",
] as const;
