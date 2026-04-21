const nodemailer = require("nodemailer");
const { htmlEscape } = require("./htmlEscape");

const GOLD = "#d4a843";
const BG = "#1a0f2e";
const CREAM = "#f5ede0";
const MUTED = "rgba(245, 237, 224, 0.75)";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    return null;
  }
  const port = Number(process.env.SMTP_PORT) || 587;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function siteUrl() {
  return (process.env.SITE_URL || "https://ragarush.studio").replace(/\/$/, "");
}

function whatsappE164() {
  return process.env.WHATSAPP_E164 || "919876543210";
}

function whatsappDisplay() {
  return process.env.WHATSAPP_DISPLAY || "+91 98765 43210";
}

function supportEmail() {
  return process.env.SUPPORT_EMAIL || "hello@ragarush.studio";
}

function socialLinksHtml() {
  const ig = process.env.SOCIAL_INSTAGRAM_URL || "https://www.instagram.com/ragarush_official/";
  const yt = process.env.SOCIAL_YOUTUBE_URL || "https://youtube.com/";
  const sp = process.env.SOCIAL_SPOTIFY_URL || "https://open.spotify.com/";
  return `
    <p style="margin:16px 0 0;font-size:13px;color:${MUTED};">
      <a href="${htmlEscape(ig)}" style="color:${GOLD};text-decoration:none;">Instagram</a>
      &nbsp;·&nbsp;
      <a href="${htmlEscape(yt)}" style="color:${GOLD};text-decoration:none;">YouTube</a>
      &nbsp;·&nbsp;
      <a href="${htmlEscape(sp)}" style="color:${GOLD};text-decoration:none;">Spotify</a>
    </p>`;
}

function buildCustomerHtml({ firstName, orderId, plan, occasion, estimatedTotal }) {
  const fn = htmlEscape(firstName);
  const oid = htmlEscape(orderId);
  const pl = htmlEscape(plan);
  const oc = htmlEscape(occasion);
  const total = typeof estimatedTotal === "number" ? estimatedTotal.toLocaleString("en-IN") : htmlEscape(String(estimatedTotal));
  const wa = `https://wa.me/${whatsappE164()}?text=${encodeURIComponent(`Hi Raga Rush — I have a question about order ${orderId}.`)}`;
  const mailto = `mailto:${supportEmail()}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0d0a1a;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0d0a1a;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background:${BG};border-radius:16px;overflow:hidden;border:1px solid rgba(212,168,67,0.25);">
          <tr>
            <td style="padding:24px 24px 16px;text-align:center;background:linear-gradient(180deg, #2d1b4e 0%, ${BG} 100%);">
              <img src="${htmlEscape(`${siteUrl()}/images/raga-rush-email-400x100.png`)}" width="400" height="100" alt="Raga Rush — Bespoke Music Studio" style="display:block;margin:0 auto;max-width:100%;height:auto;padding:24px 0;" />
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px 8px;color:${CREAM};font-size:17px;line-height:1.5;">
              Thank you, <strong style="color:${GOLD};">${fn}</strong>!
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 20px;color:${MUTED};font-size:15px;line-height:1.55;">
              We&apos;ve received your song request and we&apos;re excited to bring your story to life.
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 24px;">
              <table role="presentation" width="100%" style="background:rgba(0,0,0,0.35);border-radius:12px;border:1px solid rgba(212,168,67,0.2);">
                <tr><td colspan="2" style="padding:14px 16px 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:${GOLD};">Order summary</td></tr>
                <tr>
                  <td style="padding:6px 16px;color:${MUTED};font-size:14px;">Order ID</td>
                  <td style="padding:6px 16px;text-align:right;color:${CREAM};font-size:14px;font-weight:600;">#${oid}</td>
                </tr>
                <tr>
                  <td style="padding:6px 16px;color:${MUTED};font-size:14px;">Plan</td>
                  <td style="padding:6px 16px;text-align:right;color:${CREAM};font-size:14px;">${pl}</td>
                </tr>
                <tr>
                  <td style="padding:6px 16px;color:${MUTED};font-size:14px;">Occasion</td>
                  <td style="padding:6px 16px;text-align:right;color:${CREAM};font-size:14px;">${oc}</td>
                </tr>
                <tr>
                  <td style="padding:6px 16px 16px;color:${MUTED};font-size:14px;">Estimated total</td>
                  <td style="padding:6px 16px 16px;text-align:right;color:${GOLD};font-size:16px;font-weight:700;">₹${total}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 16px;">
              <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:20px;">
                <div style="font-size:13px;font-weight:700;color:${GOLD};text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">What&apos;s next?</div>
                <p style="margin:0;color:${CREAM};font-size:15px;line-height:1.55;">
                  Our team will review your story and reach out within <strong style="color:${GOLD};">24 hours</strong>.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 24px;color:${MUTED};font-size:14px;line-height:1.6;">
              <strong style="color:${CREAM};">Contact us</strong><br>
              Email: <a href="${mailto}" style="color:${GOLD};">${htmlEscape(supportEmail())}</a><br>
              WhatsApp: <a href="${htmlEscape(wa)}" style="color:${GOLD};">${htmlEscape(whatsappDisplay())}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 24px;text-align:center;border-top:1px solid rgba(255,255,255,0.08);">
              <div style="font-size:12px;color:${MUTED};">Follow Raga Rush</div>
              ${socialLinksHtml()}
              <p style="margin:20px 0 0;font-size:11px;color:rgba(245,237,224,0.45);">
                © ${new Date().getFullYear()} Raga Rush · <a href="${htmlEscape(siteUrl())}" style="color:${MUTED};">${htmlEscape(siteUrl().replace(/^https?:\/\//, ""))}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildTeamHtml(order, raw) {
  const o = order;
  const c = o.customer || {};
  const s = o.songDetails || {};
  const p = o.pricing || {};
  const a = o.addOns || {};
  const adminBase = `${siteUrl()}/admin/orders`;
  const displayName = [raw.firstName || c.firstName, raw.lastName || c.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const story = raw.story != null ? String(raw.story) : s.story || "";
  const ref = raw.referenceLinks != null ? String(raw.referenceLinks) : s.referenceSongs || "";
  const spec = raw.specialInstructions != null ? String(raw.specialInstructions) : s.specialInstructions || "";

  const block = (label, value) => `
    <tr>
      <td style="padding:4px 0;vertical-align:top;color:${MUTED};width:140px;font-size:13px;">${htmlEscape(label)}</td>
      <td style="padding:4px 0;color:${CREAM};font-size:13px;line-height:1.45;">${htmlEscape(value)}</td>
    </tr>`;

  const storyForEmail = story.length ? story : "(No story text provided)";
  const storyBlock = `<pre style="white-space:pre-wrap;font-family:inherit;font-size:13px;color:${CREAM};margin:12px 0 0;padding:12px;background:rgba(0,0,0,0.35);border-radius:8px;border:1px solid rgba(212,168,67,0.15);">${htmlEscape(storyForEmail.slice(0, 12000))}</pre>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:16px;background:#0d0a1a;font-family:ui-sans-serif,system-ui,Segoe UI,sans-serif;">
  <table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:${BG};border-radius:12px;border:1px solid rgba(212,168,67,0.25);overflow:hidden;">
    <tr>
      <td style="padding:20px 24px;background:#2d1b4e;color:${GOLD};font-size:18px;font-weight:700;">
        New order · ${htmlEscape(o.orderId)}
      </td>
    </tr>
    <tr>
      <td style="padding:20px 24px;color:${CREAM};font-size:14px;">
        <p style="margin:0 0 16px;"><a href="${htmlEscape(adminBase)}" style="color:${GOLD};font-weight:600;">Open admin dashboard →</a></p>
        <h3 style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:${GOLD};">Customer</h3>
        <table role="presentation" width="100%">
          ${block("Name", displayName || `${c.firstName || ""} ${c.lastName || ""}`.trim())}
          ${block("Email", c.email || "")}
          ${block("Mobile", c.mobile || "")}
          ${c.city ? block("City", c.city) : ""}
          ${block("WhatsApp opt-in", c.whatsappOptIn ? "Yes" : "No")}
        </table>
        <h3 style="margin:20px 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:${GOLD};">Song request</h3>
        <table role="presentation" width="100%">
          ${block("Plan", s.plan || "")}
          ${block("Occasion", s.occasion || "")}
          ${s.occasionOther ? block("Occasion (other)", s.occasionOther) : ""}
          ${block("Languages", Array.isArray(s.languages) ? s.languages.join(", ") : "")}
          ${s.genre ? block("Genre", s.genre) : ""}
        </table>
        <h3 style="margin:20px 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:${GOLD};">Story</h3>
        ${storyBlock}
        ${ref ? `<p style="margin:16px 0 0;font-size:12px;color:${MUTED};"><strong style="color:${CREAM};">References:</strong><br>${htmlEscape(ref)}</p>` : ""}
        ${spec ? `<p style="margin:12px 0 0;font-size:12px;color:${MUTED};"><strong style="color:${CREAM};">Special instructions:</strong><br>${htmlEscape(spec)}</p>` : ""}
        <h3 style="margin:20px 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:${GOLD};">Add-ons & pricing</h3>
        <table role="presentation" width="100%">
          ${block("Social release", a.socialMediaRelease ? "Yes" : "No")}
          ${block("Video / reel", a.videoReelVersion ? "Yes" : "No")}
          ${block("Plan price", `₹${Number(p.planPrice || 0).toLocaleString("en-IN")}`)}
          ${block("Add-ons total", `₹${Number(p.addOnsTotal || 0).toLocaleString("en-IN")}`)}
          ${block("Estimated total", `₹${Number(p.estimatedTotal || 0).toLocaleString("en-IN")}`)}
          ${block("Status", o.status || "")}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * @param {object} params
 * @param {import('mongoose').Document} params.order - saved order document
 * @param {object} params.raw - optional raw strings for readable email bodies
 */
async function sendNewOrderNotifications({ order, raw = {} }) {
  try {
    const transporter = getTransporter();
    if (!transporter) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[orderNotificationEmails] SMTP not configured (SMTP_HOST / SMTP_USER / SMTP_PASS); skipping emails."
        );
      }
      return;
    }

    const from = process.env.MAIL_FROM || process.env.SMTP_USER;
    const orderId = order.orderId;
    const plan = order.songDetails?.plan || "";
    const firstName = raw.firstName || order.customer?.firstName || "there";
    const toCustomer = order.customer?.email;
    const estimatedTotal = order.pricing?.estimatedTotal;

    const customerSubject = `🎵 Your Raga Rush Song Request — Order #${orderId}`;
    const teamSubject = `🎶 New Order Received — #${orderId} — ${plan}`;

    const customerHtml = buildCustomerHtml({
      firstName,
      orderId,
      plan,
      occasion: order.songDetails?.occasion || "",
      estimatedTotal,
    });

    const teamHtml = buildTeamHtml(order.toObject ? order.toObject() : order, {
      firstName: raw.firstName,
      lastName: raw.lastName,
      story: raw.story,
      referenceLinks: raw.referenceLinks,
      specialInstructions: raw.specialInstructions,
    });

    if (toCustomer) {
      try {
        await transporter.sendMail({
          from: `"Raga Rush" <${from}>`,
          to: toCustomer,
          subject: customerSubject,
          html: customerHtml,
        });
      } catch (err) {
        console.error("[orderNotificationEmails] Customer confirmation failed:", err.message || err);
      }
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      try {
        await transporter.sendMail({
          from: `"Raga Rush (Orders)" <${from}>`,
          to: adminEmail,
          subject: teamSubject,
          html: teamHtml,
        });
      } catch (err) {
        console.error("[orderNotificationEmails] Team notification failed:", err.message || err);
      }
    } else if (process.env.NODE_ENV === "development") {
      console.warn("[orderNotificationEmails] ADMIN_EMAIL not set; skipping team notification.");
    }
  } catch (err) {
    console.error("[orderNotificationEmails] Unexpected error:", err?.message || err);
  }
}

module.exports = {
  sendNewOrderNotifications,
};
