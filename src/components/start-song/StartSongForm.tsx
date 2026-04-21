"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { OrderSuccessModal } from "@/components/order-success/OrderSuccessModal";
import { ORDER_SUCCESS_UX } from "@/lib/order-success-config";
import { saveOrderSuccessPayload, type OrderSuccessPayload } from "@/lib/order-success-storage";
import {
  ADDON_SOCIAL,
  ADDON_VIDEO,
  GENRES,
  LANGUAGES,
  OCCASIONS,
  PLANS,
  type PlanId,
} from "./constants";

const NOTE_PATH =
  "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3z";

const FLOATING_NOTES = [
  { left: "10%", delay: "0s", duration: "34s", scale: 0.72 },
  { left: "28%", delay: "2s", duration: "40s", scale: 0.58 },
  { left: "48%", delay: "1s", duration: "30s", scale: 0.8 },
  { left: "68%", delay: "5s", duration: "36s", scale: 0.62 },
  { left: "88%", delay: "2.5s", duration: "32s", scale: 0.55 },
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_LANGS: Record<string, boolean> = {
  Marathi: false,
  Hindi: false,
  English: false,
  "Mix (specify in story)": false,
};

const FORM_FIELD_ORDER = [
  "form",
  "firstName",
  "lastName",
  "email",
  "phone",
  "city",
  "planId",
  "occasion",
  "occasionOther",
  "languages",
  "genre",
  "story",
  "referenceLinks",
  "specialInstructions",
  "addonSocial",
  "addonVideo",
  "agreeTerms",
] as const;

function mapApiFieldToFormKey(field: string | undefined): string | null {
  if (!field) return null;
  if (field === "agreedToTerms") return "agreeTerms";
  if (field.startsWith("languages")) return "languages";
  if ((FORM_FIELD_ORDER as readonly string[]).includes(field)) return field;
  return null;
}

function scrollToFirstFormError(fieldKeys: string[]) {
  const unique = [...new Set(fieldKeys)];
  const ordered = FORM_FIELD_ORDER.filter((k) => unique.includes(k));
  const first = ordered[0] ?? unique[0];
  if (!first) return;
  window.requestAnimationFrame(() => {
    document
      .querySelector<HTMLElement>(`[data-form-field="${first}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function parsePlanParam(v: string | null): PlanId {
  if (v === "quick" || v === "full" || v === "signature") return v;
  return "full";
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function SectionDivider({ children }: { children: ReactNode }) {
  return (
    <div className="start-form-section-divider my-10 flex items-center gap-3 md:my-12">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary/50 to-secondary/25" aria-hidden />
      <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-secondary/90">
        {children}
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-secondary/50 to-secondary/25" aria-hidden />
    </div>
  );
}

export function StartSongForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlan = useMemo(
    () => parsePlanParam(searchParams.get("plan")),
    [searchParams]
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [city, setCity] = useState("");

  const [planId, setPlanId] = useState<PlanId>(initialPlan);
  const [occasion, setOccasion] = useState<string>(OCCASIONS[0]);
  const [occasionOther, setOccasionOther] = useState("");
  const [langs, setLangs] = useState<Record<string, boolean>>(() => ({ ...INITIAL_LANGS }));
  const [genre, setGenre] = useState("");
  const [story, setStory] = useState("");
  const [referenceLinks, setReferenceLinks] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const [addonSocial, setAddonSocial] = useState(false);
  const [addonVideo, setAddonVideo] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [whatsappUpdates, setWhatsappUpdates] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorSource, setErrorSource] = useState<Record<string, "client" | "server">>({});
  const [shakeKeys, setShakeKeys] = useState<Set<string>>(new Set());
  const [duplicateSubmission, setDuplicateSubmission] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successModalPayload, setSuccessModalPayload] = useState<OrderSuccessPayload | null>(null);

  const isSignature = planId === "signature";
  const plan = PLANS.find((p) => p.id === planId)!;

  useEffect(() => {
    setPlanId(initialPlan);
  }, [initialPlan]);

  useEffect(() => {
    if (isSignature) {
      setAddonSocial(true);
    } else {
      setAddonSocial(false);
    }
  }, [isSignature]);

  const socialLine = useMemo(() => {
    if (isSignature) return 0;
    return addonSocial ? ADDON_SOCIAL : 0;
  }, [isSignature, addonSocial]);

  const videoLine = addonVideo ? ADDON_VIDEO : 0;
  const estimatedTotal = plan.price + socialLine + videoLine;

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

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 6500);
    return () => window.clearTimeout(t);
  }, [toast]);

  const clearForm = useCallback(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneDigits("");
    setCity("");
    setPlanId(parsePlanParam(searchParams.get("plan")));
    setOccasion(OCCASIONS[0]);
    setOccasionOther("");
    setLangs({ ...INITIAL_LANGS });
    setGenre("");
    setStory("");
    setReferenceLinks("");
    setSpecialInstructions("");
    setAddonSocial(false);
    setAddonVideo(false);
    setAgreeTerms(false);
    setWhatsappUpdates(false);
    setErrors({});
    setErrorSource({});
    setDuplicateSubmission(false);
  }, [searchParams]);

  const validate = (): boolean => {
    const e: Record<string, string> = {};

    if (!firstName.trim()) e.firstName = "First name is required.";
    if (!lastName.trim()) e.lastName = "Last name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!EMAIL_RE.test(email.trim())) e.email = "Enter a valid email address.";
    if (!phoneDigits.trim()) e.phone = "Mobile number is required.";
    else if (!/^\d{10}$/.test(phoneDigits.replace(/\D/g, "")))
      e.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!Object.values(langs).some(Boolean)) e.languages = "Select at least one language.";
    if (occasion === "Other" && !occasionOther.trim())
      e.occasionOther = "Please describe your occasion.";
    const s = story.trim();
    if (s.length < 50) e.story = "Please share at least 50 characters about your story.";
    if (s.length > 2000) e.story = "Story must be at most 2000 characters.";
    if (!agreeTerms) e.agreeTerms = "You must agree to the Terms and Privacy Policy.";

    const clientSrc: Record<string, "client"> = {};
    Object.keys(e).forEach((k) => {
      clientSrc[k] = "client";
    });
    setErrors(e);
    setErrorSource(clientSrc);
    setDuplicateSubmission(false);
    Object.keys(e).forEach((k) => triggerShake(k));
    return Object.keys(e).length === 0;
  };

  const fieldShell = (key: string, children: React.ReactNode) => (
    <div
      data-form-field={key}
      className={[
        shakeKeys.has(key) && errorSource[key] === "client" ? "field-error-shake" : "",
        errors[key]
          ? errorSource[key] === "server"
            ? "field-invalid-server"
            : "field-invalid-client"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );

  const errMsgClass = (key: string) =>
    errorSource[key] === "server" ? "text-amber-200/90" : "text-rose-300";

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setErrors({});
    setErrorSource({});
    setDuplicateSubmission(false);
    try {
      const phone = `+91${phoneDigits.replace(/\D/g, "").slice(0, 10)}`;
      const selectedLangs = LANGUAGES.filter((l) => langs[l]);
      const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
      const ordersUrl = apiBase ? `${apiBase}/api/orders` : "/api/orders";
      const res = await fetch(ordersUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone,
          city: city.trim() || undefined,
          planId,
          occasion,
          occasionOther: occasion === "Other" ? occasionOther.trim() : undefined,
          languages: selectedLangs,
          genre: genre || undefined,
          story: story.trim(),
          referenceLinks: referenceLinks.trim() || undefined,
          specialInstructions: specialInstructions.trim() || undefined,
          addonSocial: isSignature ? true : addonSocial,
          addonVideo,
          whatsappUpdates,
          agreedToTerms: true,
        }),
      });

      const raw = await res.text();
      let data: {
        success?: boolean;
        orderId?: string;
        estimatedTotal?: number;
        errors?: { field?: string; message?: string }[];
      } = {};
      try {
        data = raw ? (JSON.parse(raw) as typeof data) : {};
      } catch {
        setToast("Something went wrong. Please try again or contact us on WhatsApp.");
        return;
      }

      if (res.status === 409) {
        const msg =
          data.errors?.[0]?.message ||
          "It looks like you've already submitted a request recently. Our team will contact you soon!";
        setErrors({ form: msg });
        setDuplicateSubmission(true);
        return;
      }

      if (res.status === 400 && data.success === false) {
        const next: Record<string, string> = {};
        const src: Record<string, "server"> = {};
        const keysForScroll: string[] = [];
        for (const err of data.errors ?? []) {
          const fk = mapApiFieldToFormKey(err.field);
          if (fk) {
            next[fk] = err.message || "Invalid value";
            src[fk] = "server";
            keysForScroll.push(fk);
          } else if (err.field === "_form" || err.field === "duplicate") {
            next.form = err.message || "Please check your details.";
          }
        }
        if (!Object.keys(next).length && data.errors?.length) {
          next.form = data.errors.map((e) => e.message).filter(Boolean).join(" ") || "Please check your details.";
        }
        setErrors(next);
        setErrorSource(src);
        setDuplicateSubmission(false);
        const scrollKeys =
          keysForScroll.length > 0
            ? keysForScroll
            : next.form
              ? ["form"]
              : Object.keys(next).filter((k) => k !== "form");
        scrollToFirstFormError(scrollKeys);
        return;
      }

      if (res.status >= 500) {
        setToast("Something went wrong. Please try again or contact us on WhatsApp.");
        return;
      }

      const ok = res.status === 200 || res.status === 201;
      if (ok && data.success && data.orderId) {
        const total =
          typeof data.estimatedTotal === "number" && Number.isFinite(data.estimatedTotal)
            ? data.estimatedTotal
            : estimatedTotal;
        try {
          localStorage.setItem("rr-last-order-id", data.orderId);
        } catch {
          /* private mode */
        }
        const successPayload: OrderSuccessPayload = {
          firstName: firstName.trim(),
          planLabel: plan.display,
          orderId: data.orderId,
          estimatedTotal: total,
          whatsappUpdates,
        };
        clearForm();
        if (ORDER_SUCCESS_UX === "modal") {
          setSuccessModalPayload(successPayload);
          setSuccessModalOpen(true);
        } else {
          saveOrderSuccessPayload(successPayload);
          router.push("/order/success");
        }
        return;
      }

      setToast("Something went wrong. Please try again or contact us on WhatsApp.");
    } catch {
      setToast("Please check your internet connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <div className="start-page-grid mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col gap-0 lg:flex-row lg:gap-0">
      {/* Left panel — desktop */}
      <aside
        className="start-form-hero relative hidden min-h-[22rem] flex-[0_0_42%] flex-col justify-center overflow-hidden px-10 py-14 lg:flex xl:px-14"
        aria-hidden
      >
        <div className="start-form-hero-bg pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {FLOATING_NOTES.map((note, i) => (
            <svg
              key={i}
              className="hero-floating-note absolute text-secondary"
              style={{
                left: note.left,
                bottom: "-6%",
                width: `${1.2 * note.scale}rem`,
                height: `${1.9 * note.scale}rem`,
                opacity: 0.2,
                animationDuration: note.duration,
                animationDelay: note.delay,
              }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d={NOTE_PATH} />
            </svg>
          ))}
        </div>
        <div className="relative z-10 mx-auto max-w-md text-center">
          <p className="font-heading text-balance text-3xl leading-snug tracking-tight text-cream/[0.96] drop-shadow-[0_0_40px_rgba(212,168,67,0.15)] xl:text-[2.15rem] xl:leading-[1.28]">
            Tell Us Your Story,
            <br />
            <span className="text-secondary/95">We&apos;ll Give It a Melody</span>
          </p>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex flex-1 flex-col px-4 py-10 sm:px-6 md:py-14 lg:px-10 lg:py-16 xl:px-14">
        {/* Mobile / small header */}
        <header className="mb-8 text-center lg:hidden">
          <p className="font-heading text-balance text-xl leading-snug tracking-tight text-cream sm:text-2xl">
            Tell Us Your Story,{" "}
            <span className="text-secondary/95">We&apos;ll Give It a Melody</span>
          </p>
        </header>

        <div
          className={`start-form-glass relative rounded-3xl border border-secondary/20 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(212,168,67,0.07),0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8 md:p-10 ${
            submitting ? "start-form-submitting-wrap" : ""
          }`}
        >
          {submitting ? <div className="start-form-progress-bar" aria-hidden /> : null}
          <h1 className="font-heading text-center text-2xl text-cream sm:text-3xl">
            🎵 Start Your Musical Journey
          </h1>
          <p className="font-sans mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-cream/78 sm:text-base">
            Fill in your details and share your story — we&apos;ll craft it into a song.
          </p>

          <form onSubmit={onSubmit} className="mt-10" noValidate>
            {errors.form ? (
              <p
                data-form-field="form"
                className={
                  duplicateSubmission
                    ? "mb-6 rounded-xl border border-amber-400/35 bg-amber-950/30 px-4 py-3 text-center text-sm text-amber-100"
                    : "mb-6 rounded-xl border border-rose-400/30 bg-rose-950/25 px-4 py-3 text-center text-sm text-rose-100"
                }
                role="alert"
              >
                {errors.form}
              </p>
            ) : null}

            <SectionDivider>Personal Details</SectionDivider>

            <div className="grid gap-6 sm:grid-cols-2">
              {fieldShell(
                "firstName",
                <div>
                  <label htmlFor="firstName" className="start-form-label">
                    First Name <span className="text-secondary">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="start-form-input mt-1.5 w-full"
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? "err-firstName" : undefined}
                  />
                  {errors.firstName ? (
                    <p
                      id="err-firstName"
                      className={`mt-1.5 text-sm ${errMsgClass("firstName")}`}
                      role="alert"
                    >
                      {errors.firstName}
                    </p>
                  ) : null}
                </div>
              )}
              {fieldShell(
                "lastName",
                <div>
                  <label htmlFor="lastName" className="start-form-label">
                    Last Name <span className="text-secondary">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="start-form-input mt-1.5 w-full"
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? "err-lastName" : undefined}
                  />
                  {errors.lastName ? (
                    <p
                      id="err-lastName"
                      className={`mt-1.5 text-sm ${errMsgClass("lastName")}`}
                      role="alert"
                    >
                      {errors.lastName}
                    </p>
                  ) : null}
                </div>
              )}
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {fieldShell(
                "email",
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="start-form-label">
                    Email Address <span className="text-secondary">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="start-form-input mt-1.5 w-full"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "err-email" : undefined}
                  />
                  {errors.email ? (
                    <p id="err-email" className={`mt-1.5 text-sm ${errMsgClass("email")}`} role="alert">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              )}
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {fieldShell(
                "phone",
                <div>
                  <label htmlFor="phone" className="start-form-label">
                    Mobile Number <span className="text-secondary">*</span>
                  </label>
                  <div className="start-form-phone-wrap mt-1.5 flex rounded-xl border border-white/12 bg-black/25 focus-within:border-secondary/55 focus-within:shadow-[0_0_0_3px_rgba(212,168,67,0.2)]">
                    <span className="flex shrink-0 items-center rounded-l-xl border-r border-white/10 bg-white/[0.04] px-3 font-sans text-sm text-cream/75">
                      +91
                    </span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="9876543210"
                      value={phoneDigits}
                      onChange={(e) =>
                        setPhoneDigits(e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      className="min-h-[48px] flex-1 rounded-r-xl bg-transparent px-3 font-sans text-cream outline-none placeholder:text-cream/35"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "err-phone" : undefined}
                    />
                  </div>
                  {errors.phone ? (
                    <p id="err-phone" className={`mt-1.5 text-sm ${errMsgClass("phone")}`} role="alert">
                      {errors.phone}
                    </p>
                  ) : null}
                </div>
              )}
              {fieldShell(
                "city",
                <div>
                  <label htmlFor="city" className="start-form-label">
                    City <span className="text-cream/45">(optional)</span>
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="start-form-input mt-1.5 w-full"
                    aria-invalid={!!errors.city}
                    aria-describedby={errors.city ? "err-city" : undefined}
                  />
                  {errors.city ? (
                    <p id="err-city" className={`mt-1.5 text-sm ${errMsgClass("city")}`} role="alert">
                      {errors.city}
                    </p>
                  ) : null}
                </div>
              )}
            </div>

            <SectionDivider>Song Details</SectionDivider>

            {fieldShell(
              "planId",
              <fieldset className="min-w-0">
                <legend className="start-form-label mb-3">
                  Select Plan <span className="text-secondary">*</span>
                </legend>
                {errors.planId ? (
                  <p className={`mb-2 text-sm ${errMsgClass("planId")}`} role="alert">
                    {errors.planId}
                  </p>
                ) : null}
                <div className="flex flex-col gap-3">
                  {PLANS.map((p) => (
                    <label
                      key={p.id}
                      className={`start-form-plan-option flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-colors ${
                        planId === p.id
                          ? "border-secondary/50 bg-secondary/[0.08] shadow-[0_0_24px_rgba(212,168,67,0.12)]"
                          : "border-white/10 bg-black/20 hover:border-white/18"
                      }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={p.id}
                        checked={planId === p.id}
                        onChange={() => setPlanId(p.id)}
                        className="mt-1 h-4 w-4 shrink-0 border-secondary/60 text-secondary focus:ring-secondary"
                      />
                      <span className="font-sans text-sm leading-relaxed text-cream/90 sm:text-[0.95rem]">
                        {p.display}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {fieldShell(
              "occasion",
              <div className="mt-8">
                <label htmlFor="occasion" className="start-form-label">
                  Occasion / Purpose <span className="text-secondary">*</span>
                </label>
                <select
                  id="occasion"
                  name="occasion"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="start-form-input start-form-select mt-1.5 w-full"
                  aria-invalid={!!errors.occasion}
                  aria-describedby={errors.occasion ? "err-occasion" : undefined}
                >
                  {OCCASIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {errors.occasion ? (
                  <p id="err-occasion" className={`mt-1.5 text-sm ${errMsgClass("occasion")}`} role="alert">
                    {errors.occasion}
                  </p>
                ) : null}
                {occasion === "Other" ? (
                  fieldShell(
                    "occasionOther",
                    <div className="mt-4">
                      <label htmlFor="occasionOther" className="start-form-label">
                        Please describe <span className="text-secondary">*</span>
                      </label>
                      <input
                        id="occasionOther"
                        name="occasionOther"
                        type="text"
                        value={occasionOther}
                        onChange={(e) => setOccasionOther(e.target.value)}
                        className="start-form-input mt-1.5 w-full"
                        aria-invalid={!!errors.occasionOther}
                        aria-describedby={errors.occasionOther ? "err-occasionOther" : undefined}
                      />
                      {errors.occasionOther ? (
                        <p
                          id="err-occasionOther"
                          className={`mt-1.5 text-sm ${errMsgClass("occasionOther")}`}
                          role="alert"
                        >
                          {errors.occasionOther}
                        </p>
                      ) : null}
                    </div>
                  )
                ) : null}
              </div>
            )}

            {fieldShell(
              "languages",
              <fieldset className="mt-8 min-w-0">
                <legend className="start-form-label mb-3">
                  Preferred Language <span className="text-secondary">*</span>
                </legend>
                {errors.languages ? (
                  <p className={`mb-2 text-sm ${errMsgClass("languages")}`} role="alert">
                    {errors.languages}
                  </p>
                ) : null}
                <div className="grid gap-3 sm:grid-cols-2">
                  {LANGUAGES.map((lang) => (
                    <label
                      key={lang}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 hover:border-white/16"
                    >
                      <input
                        type="checkbox"
                        checked={langs[lang] ?? false}
                        onChange={(e) =>
                          setLangs((prev) => ({ ...prev, [lang]: e.target.checked }))
                        }
                        className="h-4 w-4 rounded border-secondary/50 text-secondary focus:ring-secondary"
                      />
                      <span className="font-sans text-sm text-cream/88">{lang}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {fieldShell(
              "genre",
              <div className="mt-8">
                <label htmlFor="genre" className="start-form-label">
                  Preferred Genre / Mood{" "}
                  <span className="text-cream/45">(optional)</span>
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="start-form-input start-form-select mt-1.5 w-full"
                  aria-invalid={!!errors.genre}
                  aria-describedby={errors.genre ? "err-genre" : undefined}
                >
                  <option value="">— Select —</option>
                  {GENRES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                {errors.genre ? (
                  <p id="err-genre" className={`mt-1.5 text-sm ${errMsgClass("genre")}`} role="alert">
                    {errors.genre}
                  </p>
                ) : null}
              </div>
            )}

            {fieldShell(
              "story",
              <div className="mt-8">
                <label htmlFor="story" className="start-form-label">
                  Your Story / Song Content <span className="text-secondary">*</span>
                </label>
                <textarea
                  id="story"
                  name="story"
                  rows={7}
                  value={story}
                  onChange={(e) => setStory(e.target.value.slice(0, 2000))}
                  placeholder='Share your story, feelings, key moments, names, or any lyrics you have in mind. The more you share, the more personal your song will be...'
                  className="start-form-input mt-1.5 min-h-[10rem] w-full resize-y"
                  aria-invalid={!!errors.story}
                  aria-describedby={
                    errors.story ? "err-story" : "story-counter"
                  }
                />
                {errors.story ? (
                  <p id="err-story" className={`mt-1.5 text-sm ${errMsgClass("story")}`} role="alert">
                    {errors.story}
                  </p>
                ) : null}
                <p id="story-counter" className="mt-1.5 text-right text-xs text-cream/50" aria-live="polite">
                  {story.length} / 2000
                  {story.length > 0 && story.length < 50 ? (
                    <span className="text-cream/45"> — minimum 50 characters</span>
                  ) : null}
                </p>
              </div>
            )}

            {fieldShell(
              "referenceLinks",
              <div className="mt-8">
                <label htmlFor="referenceLinks" className="start-form-label">
                  Reference Song Links{" "}
                  <span className="text-cream/45">(optional)</span>
                </label>
                <input
                  id="referenceLinks"
                  name="referenceLinks"
                  type="text"
                  value={referenceLinks}
                  onChange={(e) => setReferenceLinks(e.target.value)}
                  placeholder="Paste any Spotify/YouTube links of songs whose vibe you like"
                  className="start-form-input mt-1.5 w-full"
                  aria-invalid={!!errors.referenceLinks}
                  aria-describedby={errors.referenceLinks ? "err-referenceLinks" : undefined}
                />
                {errors.referenceLinks ? (
                  <p
                    id="err-referenceLinks"
                    className={`mt-1.5 text-sm ${errMsgClass("referenceLinks")}`}
                    role="alert"
                  >
                    {errors.referenceLinks}
                  </p>
                ) : null}
              </div>
            )}

            {fieldShell(
              "specialInstructions",
              <div className="mt-8">
                <label htmlFor="specialInstructions" className="start-form-label">
                  Special Instructions <span className="text-cream/45">(optional)</span>
                </label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  rows={3}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any specific words to include, things to avoid, dedications, etc."
                  className="start-form-input mt-1.5 w-full resize-y"
                  aria-invalid={!!errors.specialInstructions}
                  aria-describedby={errors.specialInstructions ? "err-specialInstructions" : undefined}
                />
                {errors.specialInstructions ? (
                  <p
                    id="err-specialInstructions"
                    className={`mt-1.5 text-sm ${errMsgClass("specialInstructions")}`}
                    role="alert"
                  >
                    {errors.specialInstructions}
                  </p>
                ) : null}
              </div>
            )}

            <SectionDivider>Add-Ons</SectionDivider>

            <div className="space-y-4">
              {fieldShell(
                "addonSocial",
                <div>
                  <label
                    className={`start-form-addon-label flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 ${
                      isSignature
                        ? "border-secondary/30 bg-secondary/[0.06]"
                        : "border-white/10 bg-black/20 hover:border-white/16"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSignature ? true : addonSocial}
                      disabled={isSignature}
                      onChange={(e) => !isSignature && setAddonSocial(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-secondary/50 text-secondary focus:ring-secondary disabled:opacity-70"
                      aria-invalid={!!errors.addonSocial}
                      aria-describedby={errors.addonSocial ? "err-addonSocial" : undefined}
                    />
                    <span className="font-sans text-sm leading-relaxed text-cream/88">
                      Add Social Media Release (Spotify, YouTube, Instagram) — ₹499
                      {isSignature ? (
                        <span className="mt-1 block text-xs italic text-secondary/90">
                          Included in your plan
                        </span>
                      ) : null}
                    </span>
                  </label>
                  {errors.addonSocial ? (
                    <p
                      id="err-addonSocial"
                      className={`mt-2 text-sm ${errMsgClass("addonSocial")}`}
                      role="alert"
                    >
                      {errors.addonSocial}
                    </p>
                  ) : null}
                </div>
              )}

              {fieldShell(
                "addonVideo",
                <div>
                  <label className="start-form-addon-label flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 hover:border-white/16">
                    <input
                      type="checkbox"
                      checked={addonVideo}
                      onChange={(e) => setAddonVideo(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-secondary/50 text-secondary focus:ring-secondary"
                      aria-invalid={!!errors.addonVideo}
                      aria-describedby={errors.addonVideo ? "err-addonVideo" : undefined}
                    />
                    <span className="font-sans text-sm leading-relaxed text-cream/88">
                      Add Video/Reel Version — ₹999
                    </span>
                  </label>
                  {errors.addonVideo ? (
                    <p
                      id="err-addonVideo"
                      className={`mt-2 text-sm ${errMsgClass("addonVideo")}`}
                      role="alert"
                    >
                      {errors.addonVideo}
                    </p>
                  ) : null}
                </div>
              )}
            </div>

            <SectionDivider>Summary</SectionDivider>

            <div
              className="rounded-2xl border border-secondary/20 bg-black/30 px-5 py-5"
              aria-live="polite"
              aria-atomic="true"
            >
              <dl className="space-y-2 font-sans text-sm text-cream/85">
                <div className="flex justify-between gap-4">
                  <dt>Selected Plan</dt>
                  <dd className="text-right font-medium text-secondary">
                    ₹{plan.price.toLocaleString("en-IN")}
                    {planId === "signature" ? "+" : ""}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Add-Ons</dt>
                  <dd className="text-right font-medium text-secondary">
                    ₹{(socialLine + videoLine).toLocaleString("en-IN")}
                  </dd>
                </div>
                <div className="border-t border-white/10 pt-2 mt-2 flex justify-between gap-4 text-base">
                  <dt className="font-heading text-cream">Estimated Total</dt>
                  <dd className="font-heading text-lg text-secondary">
                    ₹{estimatedTotal.toLocaleString("en-IN")}
                    {planId === "signature" ? "+" : ""}
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-xs italic text-cream/55">
                Final pricing confirmed after consultation
              </p>
            </div>

            <SectionDivider>Agreement</SectionDivider>

            {fieldShell(
              "agreeTerms",
              <div>
                <div className="start-form-agree-ring px-1 py-1">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-secondary/50 text-secondary focus:ring-secondary"
                      aria-invalid={!!errors.agreeTerms}
                      aria-describedby={errors.agreeTerms ? "err-agreeTerms" : undefined}
                    />
                    <span className="font-sans text-sm leading-relaxed text-cream/85">
                      I agree to the{" "}
                      <Link href="/terms" className="text-secondary underline-offset-2 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-secondary underline-offset-2 hover:underline"
                      >
                        Privacy Policy
                      </Link>{" "}
                      <span className="text-secondary">*</span>
                    </span>
                  </label>
                </div>
                {errors.agreeTerms ? (
                  <p
                    id="err-agreeTerms"
                    className={`mt-2 text-sm ${errMsgClass("agreeTerms")}`}
                    role="alert"
                  >
                    {errors.agreeTerms}
                  </p>
                ) : null}
              </div>
            )}

            <label className="mt-6 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={whatsappUpdates}
                onChange={(e) => setWhatsappUpdates(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-secondary/50 text-secondary focus:ring-secondary"
              />
              <span className="font-sans text-sm leading-relaxed text-cream/80">
                I&apos;d like to receive updates about my order via WhatsApp
              </span>
            </label>

            <div className="mt-10 flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className="cta-start-form-submit no-btn-glow inline-flex min-h-[52px] min-w-[min(100%,20rem)] items-center justify-center gap-2 rounded-full px-10 py-3.5 text-base font-semibold text-[#0d0a1a] transition-[transform,box-shadow] hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Spinner className="h-5 w-5" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Submit My Song Request 🎶"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <OrderSuccessModal
      open={successModalOpen}
      payload={successModalPayload}
      onClose={() => {
        setSuccessModalOpen(false);
        setSuccessModalPayload(null);
      }}
    />

    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`pointer-events-none fixed bottom-6 left-1/2 z-[200] max-w-[min(100%-2rem,24rem)] -translate-x-1/2 transition-opacity duration-300 ${
        toast ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {toast ? (
        <div className="pointer-events-auto rounded-2xl border border-rose-400/35 bg-[#1a1428]/95 px-5 py-4 text-center text-sm leading-relaxed text-cream shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
          {toast}
        </div>
      ) : null}
    </div>
    </>
  );
}
