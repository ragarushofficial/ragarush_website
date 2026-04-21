import Image from "next/image";
import { SITE_LOGO_MARK_48 } from "@/lib/site";

type RagaRushMarkImgProps = {
  className?: string;
  loading?: "lazy" | "eager";
};

/** 48×48 raster mark for success cards (PNG). */
export function RagaRushMarkImg({ className, loading = "lazy" }: RagaRushMarkImgProps) {
  return (
    <Image
      src={SITE_LOGO_MARK_48.src}
      alt={SITE_LOGO_MARK_48.alt}
      width={SITE_LOGO_MARK_48.width}
      height={SITE_LOGO_MARK_48.height}
      className={className}
      loading={loading}
    />
  );
}
