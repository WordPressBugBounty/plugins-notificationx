import { __ } from "@wordpress/i18n";

// Dimension / border control-name constants (must be unique from one another).
export const BOX_PADDING = "nxCdBoxPadding";
export const BOX_BORDER = "nxCdBoxBorder";
export const DIGITS_PADDING = "nxCdDigitsPadding";
export const DIGITS_BORDER = "nxCdDigitsBorder";

// The four time units, used to generate per-unit attributes / styles / markup.
export const UNITS = ["days", "hours", "minutes", "seconds"];

export const COUNTDOWN_TYPES = [
  { label: __("Default (Due Date)", "notificationx"), value: "due_date" },
  { label: __("Evergreen Timer", "notificationx"), value: "evergreen" },
];

export const LAYOUT_OPTIONS = [
  { label: __("Grid View", "notificationx"), value: "grid" },
  { label: __("List View", "notificationx"), value: "list" },
];

export const LABEL_VIEW_OPTIONS = [
  { label: __("Block", "notificationx"), value: "nx-countdown-label-block" },
  { label: __("Inline", "notificationx"), value: "nx-countdown-label-inline" },
];

export const SEPARATOR_OPTIONS = [
  { label: __("Solid ( : )", "notificationx"), value: "solid" },
  { label: __("Dotted ( · )", "notificationx"), value: "dotted" },
];

export const ALIGN_OPTIONS = [
  { label: __("Left", "notificationx"), value: "left" },
  { label: __("Center", "notificationx"), value: "center" },
  { label: __("Right", "notificationx"), value: "right" },
];

export const EXPIRE_TYPES = [
  { label: __("None", "notificationx"), value: "none" },
  { label: __("Show Message", "notificationx"), value: "text" },
  { label: __("Redirect to URL", "notificationx"), value: "url" },
];
