import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import attributes from "./components/attributes";
import Edit from "./components/edit";

registerBlockType("notificationx/countdown", {
  title: __("NotificationX Countdown Timer", "notificationx"),
  description: __(
    "A due-date or evergreen countdown timer with full styling controls.",
    "notificationx"
  ),
  category: "widgets",
  keywords: ["countdown", "timer", "notificationx", "nx", "sale", "offer"],
  icon: "clock",
  apiVersion: 2,
  attributes,
  supports: {
    html: false,
  },
  edit: Edit,
  // Dynamic block — rendered server-side via render_callback in Blocks.php.
  save: () => null,
});
