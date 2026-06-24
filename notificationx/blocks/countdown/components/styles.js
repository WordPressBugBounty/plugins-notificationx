/**
 * Builds the per-instance, scoped CSS for a countdown block.
 *
 * Returns three raw CSS strings (no media-query wrapping):
 *   { desktop, tab, mobile }
 *
 * The editor wraps tab/mobile in media queries for the live preview and the
 * PHP render_callback does the same on the frontend, so this stays the single
 * source of truth for styling across both contexts.
 */

import {
  BOX_PADDING,
  BOX_BORDER,
  DIGITS_PADDING,
  DIGITS_BORDER,
  UNITS,
} from "./constants";
import {
  DIGITS_TYPO,
  LABEL_TYPO,
  EXPIRE_TITLE_TYPO,
  EXPIRE_TEXT_TYPO,
} from "./typographyConstants";

const {
  softMinifyCssStrings,
  generateTypographyStyles,
  generateDimensionsControlStyles,
  generateBorderShadowStyles,
} = window.EBControls;

export default function getCountdownStyles(blockId, attributes) {
  const W = `.${blockId}`;

  const {
    alignment,
    boxBgColor,
    boxBgGradient,
    boxSpacing,
    digitsColor,
    digitsBgColor,
    labelColor,
    separatorColor,
    expireAlignment,
    expireTitleColor,
    expireTextColor,
  } = attributes;

  // Typography (desktop/tab/mobile fragments).
  const digitsTypo = generateTypographyStyles({ attributes, prefixConstant: DIGITS_TYPO });
  const labelTypo = generateTypographyStyles({ attributes, prefixConstant: LABEL_TYPO });
  const expTitleTypo = generateTypographyStyles({ attributes, prefixConstant: EXPIRE_TITLE_TYPO });
  const expTextTypo = generateTypographyStyles({ attributes, prefixConstant: EXPIRE_TEXT_TYPO });

  // Paddings.
  const boxPad = generateDimensionsControlStyles({ controlName: BOX_PADDING, styleFor: "padding", attributes });
  const digitsPad = generateDimensionsControlStyles({ controlName: DIGITS_PADDING, styleFor: "padding", attributes });

  // Border + shadow.
  const boxBorder = generateBorderShadowStyles({ controlName: BOX_BORDER, attributes });
  const digitsBorder = generateBorderShadowStyles({ controlName: DIGITS_BORDER, attributes });

  const boxBg = boxBgGradient
    ? `background: ${boxBgGradient};`
    : boxBgColor
    ? `background-color: ${boxBgColor};`
    : "";

  const spacing = Number.isFinite(parseFloat(boxSpacing)) ? parseFloat(boxSpacing) : 15;

  // Per-unit color rules.
  const unitStyles = UNITS.map((unit) => {
    const bg = attributes[`${unit}BgColor`];
    const digit = attributes[`${unit}DigitColor`];
    const label = attributes[`${unit}LabelColor`];
    const border = attributes[`${unit}BorderColor`];
    let css = "";
    if (bg) css += `${W} .nx-countdown-item > div.nx-countdown-${unit} { background-color: ${bg}; }`;
    if (border) css += `${W} .nx-countdown-item > div.nx-countdown-${unit} { border-color: ${border}; }`;
    if (digit) css += `${W} .nx-countdown-item > div.nx-countdown-${unit} .nx-countdown-digits { color: ${digit}; }`;
    if (label) css += `${W} .nx-countdown-item > div.nx-countdown-${unit} .nx-countdown-label { color: ${label}; }`;
    return css;
  }).join("");

  const desktop = softMinifyCssStrings(`
    ${alignment ? `${W} .nx-countdown-item > div { text-align: ${alignment}; }` : ""}

    ${W} .nx-countdown-item > div {
      ${boxBg}
      margin-right: ${spacing}px;
      margin-left: ${spacing}px;
      ${boxPad.dimensionStylesDesktop}
      ${boxBorder.styesDesktop}
    }
    ${W} .nx-countdown-container {
      margin-right: -${spacing}px;
      margin-left: -${spacing}px;
      --nx-countdown-box-spacing: ${spacing}px;
    }

    ${W} .nx-countdown-digits {
      ${digitsColor ? `color: ${digitsColor};` : ""}
      ${digitsBgColor ? `background-color: ${digitsBgColor};` : ""}
      ${digitsTypo.typoStylesDesktop}
      ${digitsPad.dimensionStylesDesktop}
      ${digitsBorder.styesDesktop}
    }

    ${W} .nx-countdown-label {
      ${labelColor ? `color: ${labelColor};` : ""}
      ${labelTypo.typoStylesDesktop}
    }

    ${separatorColor ? `${W} .nx-countdown-digits::after { color: ${separatorColor}; }` : ""}

    ${unitStyles}

    ${expireAlignment ? `${W} .nx-countdown-finish-message { text-align: ${expireAlignment}; }` : ""}
    ${W} .nx-countdown-finish-message .nx-expiry-title {
      ${expireTitleColor ? `color: ${expireTitleColor};` : ""}
      ${expTitleTypo.typoStylesDesktop}
    }
    ${W} .nx-expiry-text {
      ${expireTextColor ? `color: ${expireTextColor};` : ""}
      ${expTextTypo.typoStylesDesktop}
    }
  `);

  const tab = softMinifyCssStrings(`
    ${W} .nx-countdown-item > div {
      ${boxPad.dimensionStylesTab}
      ${boxBorder.styesTab}
    }
    ${W} .nx-countdown-digits {
      ${digitsTypo.typoStylesTab}
      ${digitsPad.dimensionStylesTab}
      ${digitsBorder.styesTab}
    }
    ${W} .nx-countdown-label { ${labelTypo.typoStylesTab} }
    ${W} .nx-countdown-finish-message .nx-expiry-title { ${expTitleTypo.typoStylesTab} }
    ${W} .nx-expiry-text { ${expTextTypo.typoStylesTab} }
  `);

  const mobile = softMinifyCssStrings(`
    ${W} .nx-countdown-item > div {
      ${boxPad.dimensionStylesMobile}
      ${boxBorder.styesMobile}
    }
    ${W} .nx-countdown-digits {
      ${digitsTypo.typoStylesMobile}
      ${digitsPad.dimensionStylesMobile}
      ${digitsBorder.styesMobile}
    }
    ${W} .nx-countdown-label { ${labelTypo.typoStylesMobile} }
    ${W} .nx-countdown-finish-message .nx-expiry-title { ${expTitleTypo.typoStylesMobile} }
    ${W} .nx-expiry-text { ${expTextTypo.typoStylesMobile} }
  `);

  return { desktop, tab, mobile };
}
