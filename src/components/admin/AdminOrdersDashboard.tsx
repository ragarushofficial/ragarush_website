"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

const STATUS_ORDER = [
  "Received",
  "In Consultation",
  "In Progress",
  "In Revision",
  "Completed",
  "Delivered",
] as const;

const STATUS_BADGE: Record<string, string> = {
  Received: "border-amber-400/50 bg-amber-500/15 text-amber-100",
  "In Consultation": "border-violet-400/50 bg-violet-500/15 text-violet-100",
  "In Progress": "border-sky-400/50 bg-sky-500/15 text-sky-100",
  "In Revision": "border-orange-400/50 bg-orange-500/15 text-orange-100",
  Completed: "border-emerald-400/50 bg-emerald-500/15 text-emerald-100",
  Delivered: "border-teal-400/50 bg-teal-500/15 text-teal-100",
};

type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  city?: string;
  whatsappOptIn?: boolean;
};

type SongDetails = {
  plan: string;
  occasion: string;
  occasionOther?: string;
  languages: string[];
  genre?: string;
  story: string;
  referenceSongs?: string;
  specialInstructions?: string;
};

export type AdminOrder = {
  _id: string;
  orderId: string;
  customer: Customer;
  songDetails: SongDetails;
  addOns: { socialMediaRelease: boolean; videoReelVersion: boolean };
  pricing: { planPrice: number; addOnsTotal: number; estimatedTotal: number };
  status: string;
  createdAt: string;
  updatedAt: string;
};

type Stats = {
  total: number;
  thisMonthCount: number;
  revenueThisMonth: number;
  byStatus: Record<string, number>;
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function badgeClass(status: string) {
  return STATUS_BADGE[status] ?? "border-white/20 bg-white/5 text-cream/90";
}

export function AdminOrdersDashboard() {
  const [sessionReady, setSessionReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortNewestFirst, setSortNewestFirst] = useState(true);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [updating, setUpdating] = useState<string | null>(null);

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/session", { credentials: "include" });
      const data = (await res.json()) as { authenticated?: boolean };
      setAuthenticated(Boolean(data.authenticated));
    } catch {
      setAuthenticated(false);
    } finally {
      setSessionReady(true);
    }
  }, []);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch("/api/admin/orders", { credentials: "include" });
      const data = (await res.json()) as {
        success?: boolean;
        orders?: AdminOrder[];
        stats?: Stats;
      };
      if (!res.ok || !data.success || !data.orders) {
        setLoadError("Could not load orders. Check the API and your session.");
        return;
      }
      setOrders(data.orders);
      setStats(data.stats ?? null);
    } catch {
      setLoadError("Network error loading orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (sessionReady && authenticated) {
      void loadOrders();
    }
  }, [sessionReady, authenticated, loadOrders]);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setLoginError("Invalid password.");
        return;
      }
      setPassword("");
      setAuthenticated(true);
    } catch {
      setLoginError("Could not sign in.");
    } finally {
      setLoggingIn(false);
    }
  };

  const onLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    setAuthenticated(false);
    setOrders([]);
    setStats(null);
    setExpanded(new Set());
  };

  const toggleExpand = (orderId: string) => {
    setExpanded((prev) => {
      const n = new Set(prev);
      if (n.has(orderId)) n.delete(orderId);
      else n.add(orderId);
      return n;
    });
  };

  const updateStatus = async (orderId: string, status: string) => {
    setUpdating(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${encodeURIComponent(orderId)}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        await loadOrders();
      }
    } finally {
      setUpdating(null);
    }
  };

  const filtered = useMemo(() => {
    let list = orders;
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((o) => {
        const name = `${o.customer.firstName} ${o.customer.lastName}`.toLowerCase();
        const email = o.customer.email.toLowerCase();
        return (
          o.orderId.toLowerCase().includes(q) ||
          name.includes(q) ||
          email.includes(q)
        );
      });
    }
    if (statusFilter !== "all") {
      list = list.filter((o) => o.status === statusFilter);
    }
    const sorted = [...list].sort((a, b) => {
      const ta = new Date(a.createdAt).getTime();
      const tb = new Date(b.createdAt).getTime();
      return sortNewestFirst ? tb - ta : ta - tb;
    });
    return sorted;
  }, [orders, search, statusFilter, sortNewestFirst]);

  const maxStatusCount = useMemo(() => {
    if (!stats?.byStatus) return 1;
    return Math.max(1, ...Object.values(stats.byStatus));
  }, [stats]);

  if (!sessionReady) {
    return (
      <main className="min-h-screen bg-background px-4 py-16 text-cream">
        <p className="text-center text-cream/60">Loading…</p>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16 text-cream">
        <div className="w-full max-w-sm rounded-2xl border border-secondary/25 bg-[#141020] p-8 shadow-[inset_0_1px_0_rgba(212,168,67,0.08)]">
          <h1 className="font-heading text-center text-2xl text-cream">Raga Rush Admin</h1>
          <p className="mt-2 text-center text-sm text-cream/65">Orders dashboard — sign in</p>
          <form onSubmit={onLogin} className="mt-8 space-y-4">
            <div>
              <label htmlFor="admin-pass" className="text-xs font-medium uppercase tracking-wider text-secondary/90">
                Password
              </label>
              <input
                id="admin-pass"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/12 bg-black/40 px-4 py-3 text-cream outline-none ring-secondary/30 focus:border-secondary/50 focus:ring-2"
              />
            </div>
            {loginError ? (
              <p className="text-sm text-rose-300" role="alert">
                {loginError}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={loggingIn || !password}
              className="w-full rounded-xl bg-gradient-to-r from-secondary to-[#a67c28] py-3 font-semibold text-[#0d0a1a] transition-opacity disabled:opacity-50"
            >
              {loggingIn ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-cream">
      <header className="border-b border-white/10 bg-[#0b0810]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-xl text-cream sm:text-2xl">Orders</h1>
            <p className="text-sm text-cream/60">Raga Rush — submitted song requests</p>
          </div>
          <button
            type="button"
            onClick={() => void onLogout()}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm text-cream/85 hover:bg-white/5"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
        {stats ? (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-secondary/20 bg-[#141020] p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-cream/50">Total orders</p>
              <p className="mt-2 font-heading text-3xl text-secondary">{stats.total}</p>
            </div>
            <div className="rounded-xl border border-secondary/20 bg-[#141020] p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-cream/50">This month</p>
              <p className="mt-2 font-heading text-3xl text-secondary">{stats.thisMonthCount}</p>
            </div>
            <div className="rounded-xl border border-secondary/20 bg-[#141020] p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-cream/50">Revenue (est.) this month</p>
              <p className="mt-2 font-heading text-3xl text-secondary">
                ₹{stats.revenueThisMonth.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-xl border border-secondary/20 bg-[#141020] p-5 sm:col-span-2 lg:col-span-1">
              <p className="text-xs font-medium uppercase tracking-wider text-cream/50">By status</p>
              <div className="mt-3 space-y-2">
                {STATUS_ORDER.map((s) => {
                  const c = stats.byStatus[s] ?? 0;
                  const pct = (c / maxStatusCount) * 100;
                  return (
                    <div key={s} className="flex items-center gap-2 text-xs">
                      <span className="w-[7.5rem] shrink-0 truncate text-cream/70" title={s}>
                        {s}
                      </span>
                      <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-secondary/75"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-6 shrink-0 text-right text-cream/90">{c}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        <section className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
          <div className="min-w-[min(100%,16rem)] flex-1">
            <label htmlFor="order-search" className="text-xs font-medium text-cream/60">
              Search
            </label>
            <input
              id="order-search"
              type="search"
              placeholder="Order ID, name, or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-white/12 bg-black/35 px-3 py-2 text-sm text-cream outline-none focus:border-secondary/45"
            />
          </div>
          <div>
            <label htmlFor="status-filter" className="text-xs font-medium text-cream/60">
              Status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-1.5 w-full min-w-[12rem] rounded-lg border border-white/12 bg-black/35 px-3 py-2 text-sm text-cream outline-none focus:border-secondary/45 sm:w-auto"
            >
              <option value="all">All statuses</option>
              {STATUS_ORDER.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span className="text-xs font-medium text-cream/60">Sort by date</span>
            <div className="mt-1.5 flex rounded-lg border border-white/12 p-0.5">
              <button
                type="button"
                onClick={() => setSortNewestFirst(true)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                  sortNewestFirst ? "bg-secondary/25 text-cream" : "text-cream/55 hover:text-cream"
                }`}
              >
                Newest first
              </button>
              <button
                type="button"
                onClick={() => setSortNewestFirst(false)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                  !sortNewestFirst ? "bg-secondary/25 text-cream" : "text-cream/55 hover:text-cream"
                }`}
              >
                Oldest first
              </button>
            </div>
          </div>
        </section>

        {loadError ? (
          <p className="rounded-lg border border-rose-500/30 bg-rose-950/30 px-4 py-3 text-sm text-rose-200">
            {loadError}
          </p>
        ) : null}

        {loading ? (
          <p className="text-center text-cream/55">Loading orders…</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#141020]/80 shadow-inner">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-cream/55">
                  <th className="px-4 py-3 font-medium">Order ID</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Plan</th>
                  <th className="px-4 py-3 font-medium">Occasion</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-cream/50">
                      No orders match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((o) => (
                    <Fragment key={o.orderId}>
                      <tr className="border-b border-white/5 hover:bg-white/[0.03]">
                        <td className="px-4 py-3 font-mono text-xs text-secondary">{o.orderId}</td>
                        <td className="px-4 py-3 text-cream/90">
                          {o.customer.firstName} {o.customer.lastName}
                        </td>
                        <td className="max-w-[10rem] truncate px-4 py-3 text-cream/85" title={o.songDetails.plan}>
                          {o.songDetails.plan}
                        </td>
                        <td className="max-w-[8rem] truncate px-4 py-3 text-cream/80" title={o.songDetails.occasion}>
                          {o.songDetails.occasion}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs ${badgeClass(o.status)}`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-cream/70">{formatDate(o.createdAt)}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <select
                              value={o.status}
                              disabled={updating === o.orderId}
                              onChange={(e) => void updateStatus(o.orderId, e.target.value)}
                              className="max-w-[11rem] rounded-lg border border-white/15 bg-black/50 px-2 py-1.5 text-xs text-cream outline-none focus:border-secondary/50"
                            >
                              {STATUS_ORDER.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                            <button
                              type="button"
                              onClick={() => toggleExpand(o.orderId)}
                              className="rounded-lg border border-secondary/35 px-2 py-1.5 text-xs text-secondary hover:bg-secondary/10"
                            >
                              {expanded.has(o.orderId) ? "Hide" : "Details"}
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expanded.has(o.orderId) ? (
                        <tr className="border-b border-white/10 bg-black/25">
                          <td colSpan={7} className="px-4 py-6">
                            <div className="grid gap-6 text-sm md:grid-cols-2">
                              <div>
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary/90">
                                  Contact
                                </h3>
                                <dl className="mt-2 space-y-1 text-cream/85">
                                  <div>
                                    <dt className="inline text-cream/50">Email: </dt>
                                    <dd className="inline">{o.customer.email}</dd>
                                  </div>
                                  <div>
                                    <dt className="inline text-cream/50">Mobile: </dt>
                                    <dd className="inline">{o.customer.mobile}</dd>
                                  </div>
                                  {o.customer.city ? (
                                    <div>
                                      <dt className="inline text-cream/50">City: </dt>
                                      <dd className="inline">{o.customer.city}</dd>
                                    </div>
                                  ) : null}
                                  <div>
                                    <dt className="inline text-cream/50">WhatsApp updates: </dt>
                                    <dd className="inline">{o.customer.whatsappOptIn ? "Yes" : "No"}</dd>
                                  </div>
                                </dl>
                              </div>
                              <div>
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary/90">
                                  Pricing
                                </h3>
                                <dl className="mt-2 space-y-1 text-cream/85">
                                  <div className="flex justify-between gap-4">
                                    <dt className="text-cream/50">Plan</dt>
                                    <dd>₹{o.pricing.planPrice.toLocaleString("en-IN")}</dd>
                                  </div>
                                  <div className="flex justify-between gap-4">
                                    <dt className="text-cream/50">Add-ons</dt>
                                    <dd>₹{o.pricing.addOnsTotal.toLocaleString("en-IN")}</dd>
                                  </div>
                                  <div className="flex justify-between gap-4 border-t border-white/10 pt-2 font-medium text-secondary">
                                    <dt>Estimated total</dt>
                                    <dd>₹{o.pricing.estimatedTotal.toLocaleString("en-IN")}</dd>
                                  </div>
                                </dl>
                              </div>
                              <div className="md:col-span-2">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary/90">
                                  Story
                                </h3>
                                <p className="mt-2 whitespace-pre-wrap text-cream/88">{o.songDetails.story}</p>
                              </div>
                              <div>
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary/90">
                                  Languages
                                </h3>
                                <p className="mt-2 text-cream/85">{o.songDetails.languages.join(", ")}</p>
                                {o.songDetails.genre ? (
                                  <p className="mt-1 text-cream/70">
                                    <span className="text-cream/50">Genre: </span>
                                    {o.songDetails.genre}
                                  </p>
                                ) : null}
                                {o.songDetails.occasionOther ? (
                                  <p className="mt-1 text-cream/70">
                                    <span className="text-cream/50">Occasion detail: </span>
                                    {o.songDetails.occasionOther}
                                  </p>
                                ) : null}
                              </div>
                              <div>
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary/90">
                                  Add-ons
                                </h3>
                                <ul className="mt-2 list-inside list-disc text-cream/85">
                                  <li>Social media release: {o.addOns.socialMediaRelease ? "Yes" : "No"}</li>
                                  <li>Video / reel: {o.addOns.videoReelVersion ? "Yes" : "No"}</li>
                                </ul>
                              </div>
                              {o.songDetails.referenceSongs ? (
                                <div className="md:col-span-2">
                                  <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary/90">
                                    Reference links
                                  </h3>
                                  <p className="mt-2 whitespace-pre-wrap text-cream/80">{o.songDetails.referenceSongs}</p>
                                </div>
                              ) : null}
                              {o.songDetails.specialInstructions ? (
                                <div className="md:col-span-2">
                                  <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary/90">
                                    Special instructions
                                  </h3>
                                  <p className="mt-2 whitespace-pre-wrap text-cream/80">
                                    {o.songDetails.specialInstructions}
                                  </p>
                                </div>
                              ) : null}
                              <div className="text-xs text-cream/45 md:col-span-2">
                                Updated {formatDate(o.updatedAt)}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
