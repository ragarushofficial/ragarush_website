import Image from "next/image";
import { SITE_LOGO } from "@/lib/site";

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function SiteLogo({
  className = "h-9 w-auto md:h-10",
  priority,
  sizes = "(max-width: 768px) 160px, 220px",
}: SiteLogoProps) {
  return (
    <Image
      src={SITE_LOGO.src}
      alt={SITE_LOGO.alt}
      width={SITE_LOGO.width}
      height={SITE_LOGO.height}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
