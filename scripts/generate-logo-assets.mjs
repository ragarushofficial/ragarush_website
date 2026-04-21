/**
 * Raster brand assets from public/images/raga-rush-logo.png
 * Run: node scripts/generate-logo-assets.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pub = path.join(root, "public");
const srcLogo = path.join(pub, "images/raga-rush-logo.png");

if (!fs.existsSync(srcLogo)) {
  console.error("Missing", srcLogo);
  process.exit(1);
}

const BG = { r: 13, g: 10, b: 26 }; // #0D0A1A

function squareMark(size) {
  return sharp(srcLogo)
    .resize(size, size, {
      fit: "contain",
      background: { ...BG, alpha: 0 },
    })
    .png({ compressionLevel: 9, effort: 10 });
}

async function main() {
  const mark512Buf = await squareMark(512).toBuffer();

  const fav32 = await sharp(mark512Buf).resize(32, 32).png({ compressionLevel: 9 }).toBuffer();
  const fav16 = await sharp(mark512Buf).resize(16, 16).png({ compressionLevel: 9 }).toBuffer();
  fs.writeFileSync(path.join(pub, "favicon-32x32.png"), fav32);
  fs.writeFileSync(path.join(pub, "favicon-16x16.png"), fav16);
  fs.writeFileSync(path.join(pub, "favicon.ico"), await toIco([fav16, fav32]));

  const onPurple = async (px) => {
    const icon = await sharp(mark512Buf)
      .resize(Math.round(px * 0.62), Math.round(px * 0.62), {
        fit: "contain",
        background: { ...BG, alpha: 0 },
      })
      .toBuffer();
    return sharp({
      create: {
        width: px,
        height: px,
        channels: 3,
        background: BG,
      },
    })
      .png()
      .composite([{ input: icon, gravity: "center" }])
      .toBuffer();
  };

  fs.writeFileSync(path.join(pub, "apple-touch-icon.png"), await onPurple(180));
  fs.writeFileSync(path.join(pub, "icon-192x192.png"), await onPurple(192));
  fs.writeFileSync(path.join(pub, "icon-512x512.png"), await onPurple(512));

  const mark48 = await sharp(mark512Buf).resize(48, 48).png({ compressionLevel: 9 }).toBuffer();
  const mark64 = await sharp(mark512Buf).resize(64, 64).png({ compressionLevel: 9 }).toBuffer();
  fs.writeFileSync(path.join(pub, "images/raga-rush-mark-48.png"), mark48);
  fs.writeFileSync(path.join(pub, "images/raga-rush-mark-64.png"), mark64);

  const email = await sharp(srcLogo)
    .resize(400, 100, { fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(path.join(pub, "images/raga-rush-email-400x100.png"), email);

  const invoice = await sharp(srcLogo)
    .resize(240, 60, { fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(path.join(pub, "images/raga-rush-invoice-240x60.png"), invoice);

  fs.mkdirSync(path.join(pub, "images", "social"), { recursive: true });
  fs.writeFileSync(
    path.join(pub, "images", "social", "instagram-profile-320.png"),
    await sharp(mark512Buf).resize(320, 320).png({ compressionLevel: 9 }).toBuffer()
  );
  fs.writeFileSync(
    path.join(pub, "images", "social", "spotify-artist-640.png"),
    await sharp(mark512Buf).resize(640, 640).png({ compressionLevel: 9 }).toBuffer()
  );
  fs.writeFileSync(
    path.join(pub, "images", "social", "youtube-profile-800.png"),
    await sharp(mark512Buf).resize(800, 800).png({ compressionLevel: 9 }).toBuffer()
  );

  const bannerW = 2560;
  const bannerH = 1440;
  const gradSvg = Buffer.from(
    `<svg width="${bannerW}" height="${bannerH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0D0A1A"/>
          <stop offset="100%" stop-color="#2D1B4E"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>`
  );
  const bannerBase = await sharp(gradSvg).png().toBuffer();
  const bannerLogo = await sharp(srcLogo)
    .resize(900, 225, { fit: "inside" })
    .toBuffer();
  const left = Math.round((bannerW - 900) / 2);
  const top = Math.round((423 - 225) / 2 + 200);
  fs.writeFileSync(
    path.join(pub, "images", "social", "youtube-banner-2560x1440.png"),
    await sharp(bannerBase)
      .composite([{ input: bannerLogo, left: Math.max(0, left), top: Math.max(0, top) }])
      .png({ compressionLevel: 9, quality: 80 })
      .toBuffer()
  );

  const ogW = 1200;
  const ogH = 630;
  const ogGrad = Buffer.from(
    `<svg width="${ogW}" height="${ogH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="og" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0D0A1A"/>
          <stop offset="100%" stop-color="#2D1B4E"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#og)"/>
    </svg>`
  );
  const ogBase = await sharp(ogGrad).png().toBuffer();
  const ogLogo = await sharp(srcLogo).resize(400, 100, { fit: "inside" }).toBuffer();
  const meta = await sharp(ogLogo).metadata();
  const lw = meta.width || 400;
  const lh = meta.height || 100;
  const tagSvg = Buffer.from(
    `<svg width="${ogW}" height="120">
      <text x="600" y="78" text-anchor="middle" font-family="Georgia,serif" font-size="36" fill="#D4A843">Har Kahani Ko Mile Apna Sur</text>
    </svg>`
  );
  const tagPng = await sharp(tagSvg).png().toBuffer();
  fs.writeFileSync(
    path.join(pub, "og-image.png"),
    await sharp(ogBase)
      .composite([
        { input: ogLogo, left: Math.round((ogW - lw) / 2), top: 200 },
        { input: tagPng, left: 0, top: 200 + lh + 24 },
      ])
      .png({ compressionLevel: 9, quality: 82 })
      .toBuffer()
  );

  const twW = 1200;
  const twH = 628;
  const twGrad = Buffer.from(
    `<svg width="${twW}" height="${twH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tw" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0D0A1A"/>
          <stop offset="100%" stop-color="#2D1B4E"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#tw)"/>
    </svg>`
  );
  const twBase = await sharp(twGrad).png().toBuffer();
  fs.writeFileSync(
    path.join(pub, "twitter-image.png"),
    await sharp(twBase)
      .composite([
        { input: ogLogo, left: Math.round((twW - lw) / 2), top: 190 },
        { input: tagPng, left: 0, top: 190 + lh + 20 },
      ])
      .png({ compressionLevel: 9, quality: 82 })
      .toBuffer()
  );

  const sizes = [
    ["favicon-32x32.png", fav32.length],
    ["favicon-16x16.png", fav16.length],
    ["og-image.png", fs.statSync(path.join(pub, "og-image.png")).size],
    ["twitter-image.png", fs.statSync(path.join(pub, "twitter-image.png")).size],
  ];
  console.log("Wrote brand assets. Sample sizes (bytes):", sizes);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
