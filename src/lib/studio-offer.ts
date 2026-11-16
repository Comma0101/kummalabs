// Commercial terms shown on the studio site. These are public commitments:
// change them only with the owner's explicit approval.

// Entry offer: one flow, small enough to approve without an internal review.
export const DIAGNOSTIC = {
  name: "Integration diagnostic",
  price: "$750",
  deliveryDays: 5,
};

// Fuller entry offer: the whole agent.
export const AUDIT = {
  name: "Agent audit",
  price: "$2,500",
  deliveryDays: 10,
  maxFlows: 5,
};

// Either fee is credited toward a build that starts within this many days.
export const CREDIT_DAYS = 60;

// Smallest build we take on.
export const BUILD_FROM = "$3,000";

// Promised time to a first reply on project briefs, in business days.
export const REPLY_DAYS = 2;
