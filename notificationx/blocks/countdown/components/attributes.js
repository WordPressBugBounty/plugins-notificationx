import {
  BOX_PADDING,
  BOX_BORDER,
  DIGITS_PADDING,
  DIGITS_BORDER,
  UNITS,
} from "./constants";
import * as typographyObjs from "./typographyConstants";

const {
  generateDimensionsAttributes,
  generateTypographyAttributes,
  generateBorderShadowAttributes,
} = window.EBControls;

// Per-unit color attributes: days/hours/minutes/seconds × bg/digit/label/border.
const unitColorAttributes = UNITS.reduce((acc, unit) => {
  acc[`${unit}BgColor`] = { type: "string" };
  acc[`${unit}DigitColor`] = { type: "string" };
  acc[`${unit}LabelColor`] = { type: "string" };
  acc[`${unit}BorderColor`] = { type: "string" };
  return acc;
}, {});

const attributes = {
  // Housekeeping
  resOption: { type: "string", default: "Desktop" },
  blockId: { type: "string" },
  blockStyles: { type: "object" },

  // ── Timer Settings ──────────────────────────────────────────────
  countdownType: { type: "string", default: "due_date" },
  dueTime: { type: "string", default: "" },
  evergreenHours: { type: "number", default: 11 },
  evergreenMinutes: { type: "number", default: 59 },
  evergreenRecurring: { type: "boolean", default: false },
  recurringRestartAfter: { type: "number", default: 0 },
  recurringStopTime: { type: "string", default: "" },

  // ── Content Settings ────────────────────────────────────────────
  layout: { type: "string", default: "grid" },
  labelView: { type: "string", default: "nx-countdown-label-block" },
  alignment: { type: "string", default: "center" },

  showDays: { type: "boolean", default: true },
  daysLabel: { type: "string", default: "Days" },
  showHours: { type: "boolean", default: true },
  hoursLabel: { type: "string", default: "Hours" },
  showMinutes: { type: "boolean", default: true },
  minutesLabel: { type: "string", default: "Minutes" },
  showSeconds: { type: "boolean", default: true },
  secondsLabel: { type: "string", default: "Seconds" },

  showSeparator: { type: "boolean", default: false },
  separatorStyle: { type: "string", default: "dotted" },
  separatorColor: { type: "string" },

  // ── Expire Action ───────────────────────────────────────────────
  expireType: { type: "string", default: "none" },
  expiryTitle: { type: "string", default: "The countdown is finished!" },
  expiryText: {
    type: "string",
    default: "Thank you for being part of this event.",
  },
  redirectUrl: { type: "string", default: "#" },

  // ── Countdown Box styles ────────────────────────────────────────
  boxBgColor: { type: "string" },
  boxBgGradient: { type: "string", default: "" },
  boxSpacing: { type: "number", default: 15 },

  // ── Color & Typography ──────────────────────────────────────────
  digitsColor: { type: "string", default: "#fec503" },
  digitsBgColor: { type: "string" },
  labelColor: { type: "string", default: "#aaaaaa" },

  // ── Individual box styling (per unit) ───────────────────────────
  ...unitColorAttributes,

  // ── Expire message styles ───────────────────────────────────────
  expireAlignment: { type: "string", default: "" },
  expireTitleColor: { type: "string" },
  expireTextColor: { type: "string" },

  // ── Typography (digits, label, expire title, expire text) ───────
  ...generateTypographyAttributes(Object.values(typographyObjs)),

  // ── Dimensions (paddings) ───────────────────────────────────────
  ...generateDimensionsAttributes(BOX_PADDING, {
    top: 20,
    bottom: 20,
    right: 24,
    left: 24,
    isLinked: false,
  }),
  ...generateDimensionsAttributes(DIGITS_PADDING, {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    isLinked: true,
  }),

  // ── Border + shadow (box, digits) ───────────────────────────────
  ...generateBorderShadowAttributes(BOX_BORDER, {
    bdrDefaults: { top: 0, bottom: 0, right: 0, left: 0 },
    rdsDefaults: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
  ...generateBorderShadowAttributes(DIGITS_BORDER, {
    bdrDefaults: { top: 0, bottom: 0, right: 0, left: 0 },
    rdsDefaults: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};

export default attributes;
