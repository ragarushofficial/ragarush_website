import { SITE_LOGO } from "@/lib/site";

const ALT = "Raga Rush logo";

type RagaRushLogoSvgProps = {
  className?: string;
  /** When true, hide from assistive tech (parent provides label). */
  decorative?: boolean;
};

/**
 * Inline SVG wrapping the canonical PNG for crisp scaling without a separate SVG asset file.
 * Use in navbar and footer per brand guidelines.
 */
export function RagaRushLogoSvg({ className, decorative }: RagaRushLogoSvgProps) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${SITE_LOGO.width} ${SITE_LOGO.height}`}
      xmlns="http://www.w3.org/2000/svg"
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : ALT}
    >
      {!decorative ? <title>{ALT}</title> : null}
      <image
        href={SITE_LOGO.src}
        x={0}
        y={0}
        width={SITE_LOGO.width}
        height={SITE_LOGO.height}
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}
