/**
 * Generates favicons, PWA icons, apple-touch-icon, email banner, and og-image.png from SVGs.
 * Run: node scripts/generate-brand-assets.mjs
 * Requires: sharp, to-ico
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const pub = join(root, "public");
const imagesDir = join(pub, "images");
mkdirSync(imagesDir, { recursive: true });

const BRAND = "#0D0A1A";
const parseRgb = (hex) => ({
  r: parseInt(hex.slice(1, 3), 16),
  g: parseInt(hex.slice(3, 5), 16),
  b: parseInt(hex.slice(5, 7), 16),
});
const bg = parseRgb(BRAND);

async function main() {
  const iconSvg = readFileSync(join(pub, "raga-rush-icon-gold.svg"));
  const profileSvg = readFileSync(join(pub, "raga-rush-icon-profile.svg"));
  const fullGoldSvg = readFileSync(join(pub, "raga-rush-full-gold.svg"));
  const ogSvg = readFileSync(join(pub, "og-image-source.svg"));

  const p16 = await sharp(iconSvg).resize(16, 16).png({ compressionLevel: 9 }).toBuffer();
  const p32 = await sharp(iconSvg).resize(32, 32).png({ compressionLevel: 9 }).toBuffer();
  writeFileSync(join(pub, "favicon-16x16.png"), p16);
  writeFileSync(join(pub, "favicon-32x32.png"), p32);
  writeFileSync(join(pub, "favicon.ico"), await toIco([p16, p32]));

  const icon192 = await sharp(iconSvg).resize(192, 192).png({ compressionLevel: 9 }).toBuffer();
  const icon512 = await sharp(iconSvg).resize(512, 512).png({ compressionLevel: 9 }).toBuffer();
  writeFileSync(join(pub, "icon-192x192.png"), icon192);
  writeFileSync(join(pub, "icon-512x512.png"), icon512);

  const inner = await sharp(profileSvg).resize(120, 120).png().toBuffer();
  const apple = await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { ...bg, alpha: 1 },
    },
  })
    .composite([{ input: inner, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
  writeFileSync(join(pub, "apple-touch-icon.png"), apple);

  const emailPng = await sharp(fullGoldSvg).resize(800, 200).png({ compressionLevel: 9 }).toBuffer();
  writeFileSync(join(imagesDir, "raga-rush-email-800x200.png"), emailPng);

  const ogPng = await sharp(ogSvg).resize(1200, 630).png({ compressionLevel: 9, quality: 85 }).toBuffer();
  writeFileSync(join(pub, "og-image.png"), ogPng);

  console.log("Brand assets written to public/ and public/images/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
