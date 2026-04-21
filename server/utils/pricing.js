const PLANS = {
  quick: { label: "Quick Song", price: 999 },
  full: { label: "Full Story Song", price: 2999 },
  signature: { label: "Signature Experience", price: 6999 },
};

const SOCIAL_ADDON = 499;
const VIDEO_ADDON = 999;

/**
 * @param {string} planId - quick | full | signature
 * @param {boolean} addonSocial - user wants social add-on (ignored for signature; included in plan)
 * @param {boolean} addonVideo
 */
function computePricing(planId, addonSocial, addonVideo) {
  const plan = PLANS[planId];
  if (!plan) {
    throw new Error("Invalid planId");
  }

  let socialCost = 0;
  if (planId === "signature") {
    socialCost = 0;
  } else if (addonSocial) {
    socialCost = SOCIAL_ADDON;
  }

  const videoCost = addonVideo ? VIDEO_ADDON : 0;
  const addOnsTotal = socialCost + videoCost;
  const estimatedTotal = plan.price + addOnsTotal;

  return {
    planLabel: plan.label,
    planPrice: plan.price,
    addOnsTotal,
    estimatedTotal,
  };
}

module.exports = {
  computePricing,
  PLANS,
  SOCIAL_ADDON,
  VIDEO_ADDON,
};
