"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { RagaRushMarkImg } from "@/components/brand/RagaRushMarkImg";
import { INDIAN_STATES_UTS } from "@/data/indianStates";
import {
  HEAR_ABOUT_OPTIONS,
  INCENTIVE_GLANCE,
  MEMBER_CATEGORIES,
  NETWORK_SIZE_OPTIONS,
  PAYMENT_METHODS,
  WHY_JOIN,
} from "@/components/promotion-club/join-constants";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

const inputBase =
  "w-full rounded-xl border border-secondary/20 bg-white/[0.05] px-4 py-3 font-sans text-cream outline-none transition-[box-shadow,border-color] placeholder:text-cream/35 focus:border-secondary/70 focus:shadow-[0_0_0_3px_rgba(212,168,67,0.28)]";

function ClubJoinSidePanelBody() {
  return (
    <>
      <h3 className="font-heading border-b border-secondary/20 pb-3 text-lg text-secondary">Why Join?</h3>
      <ul className="font-sans mt-4 space-y-2.5 text-sm text-cream/88">
        {WHY_JOIN.map((line) => (
          <li key={line} className="flex gap-2">
            <span className="text-secondary" aria-hidden>
              ✔
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <h3 className="font-heading mt-8 border-t border-white/10 pt-6 text-lg text-secondary">
        Incentive structure at a glance
      </h3>
      <div className="font-sans mt-3 grid gap-2 text-xs text-cream/85 sm:text-sm">
        {INCENTIVE_GLANCE.map((row) => (
          <div
            key={row.range}
            className="flex justify-between gap-3 rounded-lg border border-white/8 bg-black/25 px-3 py-2"
          >
            <span>{row.range}</span>
            <span className="font-medium text-secondary">{row.rate}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export function PromotionClubJoinForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [whatsappDigits, setWhatsappDigits] = useState("");
  const [whatsappSameAsMobile, setWhatsappSameAsMobile] = useState(true);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [category, setCategory] = useState<string>("");
  const [categoryOther, setCategoryOther] = useState("");
  const [hearAbout, setHearAbout] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [networkSize, setNetworkSize] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<(typeof PAYMENT_METHODS)[number]>("paylater");
  const [upiId, setUpiId] = useState("");

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeIncentives, setAgreeIncentives] = useState(false);
  const [whatsappPromo, setWhatsappPromo] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shakeKeys, setShakeKeys] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [memberId, setMemberId] = useState("");

  const whatsappEffective = useMemo(() => {
    if (whatsappSameAsMobile) return phoneDigits.replace(/\D/g, "").slice(0, 10);
    return whatsappDigits.replace(/\D/g, "").slice(0, 10);
  }, [whatsappSameAsMobile, phoneDigits, whatsappDigits]);

  const triggerShake = useCallback((key: string) => {
    setShakeKeys((s) => new Set(s).add(key));
    window.setTimeout(() => {
      setShakeKeys((s) => {
        const n = new Set(s);
        n.delete(key);
        return n;
      });
    }, 500);
  }, []);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "First name is required.";
    if (!lastName.trim()) e.lastName = "Last name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!EMAIL_RE.test(email.trim())) e.email = "Enter a valid email address.";
    if (!phoneDigits.trim()) e.phone = "Mobile number is required.";
    else if (!/^\d{10}$/.test(phoneDigits.replace(/\D/g, "")))
      e.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!whatsappSameAsMobile) {
      if (!whatsappEffective || whatsappEffective.length !== 10)
        e.whatsapp = "Enter a valid 10-digit WhatsApp number or use “Same as mobile”.";
    }
    if (!city.trim()) e.city = "City is required.";
    if (!state) e.state = "State is required.";
    if (!category) e.category = "Please select a category.";
    if (category === "Other" && !categoryOther.trim()) e.categoryOther = "Please specify your category.";
    if (!hearAbout) e.hearAbout = "Please tell us how you heard about us.";
    if (!agreeTerms) e.agreeTerms = "You must agree to the Promotion Club Terms & Conditions.";
    if (!agreeIncentives) e.agreeIncentives = "Please confirm you understand the incentive structure.";
    if (paymentMethod === "upi" && !upiId.trim()) e.upiId = "Enter your UPI ID or choose another payment method.";

    setErrors(e);
    Object.keys(e).forEach((k) => triggerShake(k));
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setMemberId(`RR-PC-${Date.now().toString(36).toUpperCase().slice(-8)}`);
    setSuccess(true);
  };

  const fieldWrap = (key: string, children: React.ReactNode) => (
    <div className={shakeKeys.has(key) ? "field-error-shake" : undefined}>{children}</div>
  );

  const errClass = (key: string) => (errors[key] ? "text-accent" : "text-cream/90");

  if (success) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-secondary/25 bg-white/[0.04] px-8 py-12 text-center shadow-[inset_0_1px_0_rgba(212,168,67,0.08)] backdrop-blur-md">
        <p className="font-heading text-3xl text-secondary">🎶</p>
        <h2 className="font-heading mt-4 text-2xl text-cream">You&apos;re on the list!</h2>
        <p className="font-sans mt-3 text-cream/80">
          Thank you for registering for the Raga Rush Promotion Club. Our team will reach out with next steps
          shortly.
        </p>
        {memberId ? (
          <div className="mt-8 rounded-xl border border-secondary/20 bg-black/25 px-4 py-4 text-left">
            <div className="flex items-center gap-3">
              <RagaRushMarkImg className="h-12 w-12 shrink-0" loading="lazy" />
              <div className="min-w-0">
                <p className="font-sans text-xs uppercase tracking-wider text-cream/55">Member ID</p>
                <p className="font-mono text-sm font-medium tracking-wide text-secondary">{memberId}</p>
              </div>
            </div>
          </div>
        ) : null}
        <Link
          href="/"
          className="club-join-cta mt-10 inline-flex min-h-[48px] items-center justify-center rounded-full px-10 py-3 font-medium text-[#0d0a1a]"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
      {/* Side panel — accordion on mobile (above form), sticky column on desktop */}
      <aside className="order-1 lg:order-2 lg:col-span-4">
        <details className="group rounded-2xl border border-secondary/15 bg-white/[0.03] backdrop-blur-sm lg:hidden">
          <summary className="font-heading cursor-pointer list-none rounded-2xl border border-secondary/20 bg-black/20 px-5 py-4 text-lg text-secondary [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-2">
              Why join &amp; incentives
              <span className="text-cream/60 transition group-open:rotate-180">▼</span>
            </span>
          </summary>
          <div className="border-t border-white/10 px-5 pb-6 pt-4">
            <ClubJoinSidePanelBody />
          </div>
        </details>
        <div className="sticky top-28 hidden rounded-2xl border border-secondary/15 bg-white/[0.03] p-6 backdrop-blur-sm lg:block">
          <ClubJoinSidePanelBody />
        </div>
      </aside>

      {/* Form */}
      <div className="order-2 mx-auto w-full max-w-[700px] lg:order-1 lg:col-span-8">
        <form
          onSubmit={onSubmit}
          noValidate
          className="rounded-2xl border border-secondary/15 bg-white/[0.03] p-6 shadow-[inset_0_1px_0_rgba(212,168,67,0.06)] backdrop-blur-md sm:p-8 md:p-10"
        >
          {/* Section 1 */}
          <h3 className="font-heading border-b border-secondary/25 pb-2 text-lg text-secondary">
            Personal details
          </h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-x-6">
            {fieldWrap(
              "firstName",
              <div>
                <label htmlFor="pc-firstName" className={`font-sans text-sm ${errClass("firstName")}`}>
                  First name <span className="text-accent">*</span>
                </label>
                <input
                  id="pc-firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`${inputBase} mt-1.5`}
                  aria-required
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? "err-pc-firstName" : undefined}
                />
                {errors.firstName ? (
                  <p id="err-pc-firstName" className="mt-1.5 text-sm text-accent" role="alert">
                    {errors.firstName}
                  </p>
                ) : null}
              </div>
            )}
            {fieldWrap(
              "lastName",
              <div>
                <label htmlFor="pc-lastName" className={`font-sans text-sm ${errClass("lastName")}`}>
                  Last name <span className="text-accent">*</span>
                </label>
                <input
                  id="pc-lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`${inputBase} mt-1.5`}
                  aria-required
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? "err-pc-lastName" : undefined}
                />
                {errors.lastName ? (
                  <p id="err-pc-lastName" className="mt-1.5 text-sm text-accent" role="alert">
                    {errors.lastName}
                  </p>
                ) : null}
              </div>
            )}
            {fieldWrap(
              "email",
              <div className="sm:col-span-2">
                <label htmlFor="pc-email" className={`font-sans text-sm ${errClass("email")}`}>
                  Email address <span className="text-accent">*</span>
                </label>
                <input
                  id="pc-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputBase} mt-1.5`}
                  aria-required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "err-pc-email" : undefined}
                />
                {errors.email ? (
                  <p id="err-pc-email" className="mt-1.5 text-sm text-accent" role="alert">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            )}
            {fieldWrap(
              "phone",
              <div>
                <label htmlFor="pc-phone" className={`font-sans text-sm ${errClass("phone")}`}>
                  Mobile number <span className="text-accent">*</span>
                </label>
                <div className="mt-1.5 flex rounded-xl border border-secondary/20 bg-black/25 focus-within:border-secondary/55 focus-within:shadow-[0_0_0_3px_rgba(212,168,67,0.22)]">
                  <span className="flex shrink-0 items-center rounded-l-xl border-r border-white/10 bg-white/[0.04] px-3 font-sans text-sm text-cream/75">
                    +91
                  </span>
                  <input
                    id="pc-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="9876543210"
                    value={phoneDigits}
                    onChange={(e) => setPhoneDigits(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="min-h-[48px] flex-1 rounded-r-xl bg-transparent px-3 font-sans text-cream outline-none placeholder:text-cream/35"
                    aria-required
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "err-pc-phone" : undefined}
                  />
                </div>
                {errors.phone ? (
                  <p id="err-pc-phone" className="mt-1.5 text-sm text-accent" role="alert">
                    {errors.phone}
                  </p>
                ) : null}
              </div>
            )}
            <div>
              <label htmlFor="pc-whatsapp" className="font-sans text-sm text-cream/90">
                WhatsApp number <span className="text-cream/50">(optional)</span>
              </label>
              <div className="mt-1.5 flex rounded-xl border border-secondary/20 bg-black/25 opacity-100">
                <span className="flex shrink-0 items-center rounded-l-xl border-r border-white/10 bg-white/[0.04] px-3 font-sans text-sm text-cream/75">
                  +91
                </span>
                <input
                  id="pc-whatsapp"
                  name="whatsapp"
                  type="tel"
                  inputMode="numeric"
                  disabled={whatsappSameAsMobile}
                  value={whatsappSameAsMobile ? phoneDigits : whatsappDigits}
                  onChange={(e) => setWhatsappDigits(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="min-h-[48px] flex-1 rounded-r-xl bg-transparent px-3 font-sans text-cream outline-none placeholder:text-cream/35 disabled:cursor-not-allowed disabled:opacity-60"
                  aria-invalid={!!errors.whatsapp}
                  aria-describedby={errors.whatsapp ? "err-pc-whatsapp" : undefined}
                />
              </div>
              <label className="mt-2 flex cursor-pointer items-center gap-2 font-sans text-xs text-cream/75">
                <input
                  type="checkbox"
                  checked={whatsappSameAsMobile}
                  onChange={(e) => setWhatsappSameAsMobile(e.target.checked)}
                  className="h-4 w-4 rounded border-secondary/50 text-secondary focus:ring-secondary"
                />
                Same as mobile number
              </label>
              {errors.whatsapp ? (
                <p id="err-pc-whatsapp" className="mt-1.5 text-sm text-accent" role="alert">
                  {errors.whatsapp}
                </p>
              ) : null}
            </div>
            {fieldWrap(
              "city",
              <div>
                <label htmlFor="pc-city" className={`font-sans text-sm ${errClass("city")}`}>
                  City <span className="text-accent">*</span>
                </label>
                <input
                  id="pc-city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`${inputBase} mt-1.5`}
                  aria-required
                  aria-invalid={!!errors.city}
                  aria-describedby={errors.city ? "err-pc-city" : undefined}
                />
                {errors.city ? (
                  <p id="err-pc-city" className="mt-1.5 text-sm text-accent" role="alert">
                    {errors.city}
                  </p>
                ) : null}
              </div>
            )}
            {fieldWrap(
              "state",
              <div>
                <label htmlFor="pc-state" className={`font-sans text-sm ${errClass("state")}`}>
                  State / UT <span className="text-accent">*</span>
                </label>
                <select
                  id="pc-state"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={`${inputBase} mt-1.5 appearance-none bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d4a843'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                  }}
                  aria-required
                  aria-invalid={!!errors.state}
                  aria-describedby={errors.state ? "err-pc-state" : undefined}
                >
                  <option value="">— Select —</option>
                  {INDIAN_STATES_UTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.state ? (
                  <p id="err-pc-state" className="mt-1.5 text-sm text-accent" role="alert">
                    {errors.state}
                  </p>
                ) : null}
              </div>
            )}
          </div>

          {/* Section 2 */}
          <h3 className="font-heading mt-12 border-b border-secondary/25 pb-2 text-lg text-secondary">Profile</h3>
          <div className="mt-6 space-y-5">
            {fieldWrap(
              "category",
              <div>
                <p className={`font-sans text-sm ${errClass("category")}`} id="pc-category-label">
                  Category <span className="text-accent">*</span>
                </p>
                <div
                  className="mt-3 flex flex-wrap gap-2.5"
                  role="group"
                  aria-labelledby="pc-category-label"
                  aria-required
                >
                  {MEMBER_CATEGORIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      className={`font-sans rounded-full border px-4 py-2 text-[0.8125rem] transition-colors md:text-sm ${
                        category === c
                          ? "border-secondary/60 bg-secondary/[0.12] text-cream shadow-[inset_0_1px_0_rgba(212,168,67,0.15)]"
                          : "border-secondary/35 bg-white/[0.04] text-cream/90 hover:border-secondary/45"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                {errors.category ? (
                  <p className="mt-2 text-sm text-accent" role="alert">
                    {errors.category}
                  </p>
                ) : null}
                {category === "Other"
                  ? fieldWrap(
                      "categoryOther",
                      <div className="mt-4">
                        <label htmlFor="pc-category-other" className="font-sans text-sm text-cream/90">
                          Please specify
                        </label>
                        <input
                          id="pc-category-other"
                          name="categoryOther"
                          type="text"
                          value={categoryOther}
                          onChange={(e) => setCategoryOther(e.target.value)}
                          className={`${inputBase} mt-1.5`}
                          aria-invalid={!!errors.categoryOther}
                          aria-describedby={errors.categoryOther ? "err-pc-cat-other" : undefined}
                        />
                        {errors.categoryOther ? (
                          <p id="err-pc-cat-other" className="mt-1.5 text-sm text-accent" role="alert">
                            {errors.categoryOther}
                          </p>
                        ) : null}
                      </div>
                    )
                  : null}
              </div>
            )}
            {fieldWrap(
              "hearAbout",
              <div>
                <label htmlFor="pc-hear" className={`font-sans text-sm ${errClass("hearAbout")}`}>
                  How did you hear about Raga Rush? <span className="text-accent">*</span>
                </label>
                <select
                  id="pc-hear"
                  name="hearAbout"
                  value={hearAbout}
                  onChange={(e) => setHearAbout(e.target.value)}
                  className={`${inputBase} mt-1.5 appearance-none bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d4a843'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                  }}
                  aria-required
                  aria-invalid={!!errors.hearAbout}
                  aria-describedby={errors.hearAbout ? "err-pc-hear" : undefined}
                >
                  <option value="">— Select —</option>
                  {HEAR_ABOUT_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {errors.hearAbout ? (
                  <p id="err-pc-hear" className="mt-1.5 text-sm text-accent" role="alert">
                    {errors.hearAbout}
                  </p>
                ) : null}
              </div>
            )}
            <div>
              <label htmlFor="pc-referral" className="font-sans text-sm text-cream/90">
                Referred by (referral code)
              </label>
              <input
                id="pc-referral"
                name="referralCode"
                type="text"
                placeholder="Enter referral code if you have one"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className={`${inputBase} mt-1.5`}
              />
              <p className="mt-1.5 font-sans text-xs text-cream/55">
                Don&apos;t have one? No worries — leave blank.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <h3 className="font-heading mt-12 border-b border-secondary/25 pb-2 text-lg text-secondary">
            Social presence <span className="text-cream/50">(optional)</span>
          </h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="pc-insta" className="font-sans text-sm text-cream/90">
                Instagram handle
              </label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-sans text-cream/45">
                  @
                </span>
                <input
                  id="pc-insta"
                  name="instagram"
                  type="text"
                  placeholder="username"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value.replace(/^@+/, ""))}
                  className={`${inputBase} pl-8`}
                />
              </div>
            </div>
            <div>
              <label htmlFor="pc-yt" className="font-sans text-sm text-cream/90">
                YouTube channel
              </label>
              <input
                id="pc-yt"
                name="youtube"
                type="text"
                placeholder="Channel name or URL"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                className={`${inputBase} mt-1.5`}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="pc-network" className="font-sans text-sm text-cream/90">
                Estimated network size
              </label>
              <select
                id="pc-network"
                name="networkSize"
                value={networkSize}
                onChange={(e) => setNetworkSize(e.target.value)}
                className={`${inputBase} mt-1.5 appearance-none bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d4a843'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                }}
              >
                <option value="">— Select —</option>
                {NETWORK_SIZE_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 4 */}
          <h3 className="font-heading mt-12 border-b border-secondary/25 pb-2 text-lg text-secondary">
            Membership &amp; payment
          </h3>
          <div className="mt-6 rounded-2xl border border-secondary/25 bg-gradient-to-br from-secondary/[0.08] to-accent/[0.05] px-6 py-6 text-center">
            <h4 className="font-heading text-lg text-cream">Membership</h4>
            <p className="font-heading mt-2 text-4xl text-secondary md:text-5xl">₹99/year</p>
            <p className="font-sans mt-2 text-sm text-cream/82">Valid for: FY 2026–27</p>
            <p className="font-sans mt-3 text-sm leading-relaxed text-cream/78">
              Includes: Onboarding + Referral Code + Tracking Access
            </p>
            <div className="mt-5 border-t border-white/15 pt-4">
              <p className="font-heading text-xl text-cream">
                Total: <span className="text-secondary">₹99</span>
              </p>
            </div>
          </div>

          <fieldset className="mt-8">
            <legend className="font-sans text-sm text-cream/90">
              Payment method <span className="text-accent">*</span>
            </legend>
            <div className="mt-3 space-y-3">
              {PAYMENT_METHODS.map((m) => (
                <label
                  key={m}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 ${
                    paymentMethod === m
                      ? "border-secondary/45 bg-secondary/[0.08]"
                      : "border-white/10 bg-black/20 hover:border-white/18"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={m}
                    checked={paymentMethod === m}
                    onChange={() => setPaymentMethod(m)}
                    className="mt-1 h-4 w-4 border-secondary/60 text-secondary focus:ring-secondary"
                  />
                  <span className="font-sans text-sm text-cream/90">
                    {m === "upi" && "UPI"}
                    {m === "bank" && "Bank transfer"}
                    {m === "paylater" && "Pay later"}
                  </span>
                </label>
              ))}
            </div>
            {paymentMethod === "upi"
              ? fieldWrap(
                  "upiId",
                  <div className="mt-4">
                    <label htmlFor="pc-upi" className="font-sans text-sm text-cream/90">
                      UPI ID
                    </label>
                    <input
                      id="pc-upi"
                      name="upiId"
                      type="text"
                      placeholder="name@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className={`${inputBase} mt-1.5`}
                      aria-invalid={!!errors.upiId}
                      aria-describedby={errors.upiId ? "err-pc-upi" : undefined}
                    />
                    {errors.upiId ? (
                      <p id="err-pc-upi" className="mt-1.5 text-sm text-accent" role="alert">
                        {errors.upiId}
                      </p>
                    ) : null}
                  </div>
                )
              : null}
            {paymentMethod === "bank" ? (
              <div className="font-sans mt-4 rounded-xl border border-white/10 bg-black/30 p-4 text-left text-sm text-cream/80">
                <p className="font-medium text-secondary">Bank details</p>
                <p className="mt-2">Account name: Raga Rush Studio</p>
                <p>Bank: [Your bank name]</p>
                <p>Account / IFSC will appear here for transfers.</p>
                <p className="mt-2 text-xs text-cream/55">Use your registered name as the reference.</p>
              </div>
            ) : null}
            {paymentMethod === "paylater" ? (
              <p className="font-sans mt-4 rounded-xl border border-secondary/20 bg-black/25 px-4 py-3 text-sm text-cream/85">
                Our team will share payment details after registration.
              </p>
            ) : null}
          </fieldset>

          {/* Section 5 */}
          <h3 className="font-heading mt-12 border-b border-secondary/25 pb-2 text-lg text-secondary">Agreement</h3>
          <div className="mt-6 space-y-4">
            {fieldWrap(
              "agreeTerms",
              <div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-secondary/50 text-secondary focus:ring-secondary"
                    aria-required
                    aria-invalid={!!errors.agreeTerms}
                    aria-describedby={errors.agreeTerms ? "err-pc-terms" : undefined}
                  />
                  <span className="font-sans text-sm leading-relaxed text-cream/88">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary underline-offset-2 hover:underline"
                    >
                      Promotion Club Terms &amp; Conditions
                    </Link>{" "}
                    <span className="text-accent">*</span>
                  </span>
                </label>
                {errors.agreeTerms ? (
                  <p id="err-pc-terms" className="mt-2 text-sm text-accent" role="alert">
                    {errors.agreeTerms}
                  </p>
                ) : null}
              </div>
            )}
            {fieldWrap(
              "agreeIncentives",
              <div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreeIncentives}
                    onChange={(e) => setAgreeIncentives(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-secondary/50 text-secondary focus:ring-secondary"
                    aria-required
                    aria-invalid={!!errors.agreeIncentives}
                    aria-describedby={errors.agreeIncentives ? "err-pc-inc" : undefined}
                  />
                  <span className="font-sans text-sm leading-relaxed text-cream/88">
                    I understand that incentives are slab-based and paid as per the incentive structure{" "}
                    <span className="text-accent">*</span>
                  </span>
                </label>
                {errors.agreeIncentives ? (
                  <p id="err-pc-inc" className="mt-2 text-sm text-accent" role="alert">
                    {errors.agreeIncentives}
                  </p>
                ) : null}
              </div>
            )}
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={whatsappPromo}
                onChange={(e) => setWhatsappPromo(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-secondary/50 text-secondary focus:ring-secondary"
              />
              <span className="font-sans text-sm leading-relaxed text-cream/80">
                I&apos;d like to receive promotional materials and updates via WhatsApp
              </span>
            </label>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="club-join-cta club-join-submit disabled:!translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none group relative inline-flex min-h-[52px] w-full max-w-md items-center justify-center overflow-hidden rounded-full px-10 py-3.5 font-medium text-[#0d0a1a] transition-[transform,box-shadow,opacity] md:min-h-[3.25rem]"
            >
              {submitting ? (
                <>
                  <Spinner className="mr-2 h-5 w-5" />
                  Registering...
                </>
              ) : (
                <>
                  <span
                    className="pointer-events-none absolute left-3 text-base text-cream/95 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 md:left-4"
                    aria-hidden
                  >
                    ✦
                  </span>
                  <span className="relative z-10 px-6">Register &amp; Join the Club 🎶</span>
                  <span
                    className="pointer-events-none absolute right-3 text-base text-cream/95 opacity-0 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:opacity-100 md:right-4"
                    aria-hidden
                  >
                    ✦
                  </span>
                  <span
                    className="club-join-sparkle-layer pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  >
                    <span className="club-join-sparkle" />
                    <span className="club-join-sparkle club-join-sparkle--delay" />
                    <span className="club-join-sparkle club-join-sparkle--delay2" />
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
