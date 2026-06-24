import { __ } from "@wordpress/i18n";
import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
import {
  PanelBody,
  SelectControl,
  ToggleControl,
  TextControl,
  TextareaControl,
  RangeControl,
  BaseControl,
  ButtonGroup,
  Button,
  TabPanel,
} from "@wordpress/components";

import {
  BOX_PADDING,
  BOX_BORDER,
  DIGITS_PADDING,
  DIGITS_BORDER,
  UNITS,
  COUNTDOWN_TYPES,
  LAYOUT_OPTIONS,
  LABEL_VIEW_OPTIONS,
  SEPARATOR_OPTIONS,
  ALIGN_OPTIONS,
  EXPIRE_TYPES,
} from "./constants";
import {
  DIGITS_TYPO,
  LABEL_TYPO,
  EXPIRE_TITLE_TYPO,
  EXPIRE_TEXT_TYPO,
} from "./typographyConstants";
import objAttributes from "./attributes";

const { TypographyDropdown, ResponsiveDimensionsControl, BorderShadowControl } =
  window.EBControls;

const UNIT_LABELS = {
  days: __("Days", "notificationx"),
  hours: __("Hours", "notificationx"),
  minutes: __("Minutes", "notificationx"),
  seconds: __("Seconds", "notificationx"),
};

export default function Inspector({ attributes, setAttributes }) {
  const {
    resOption,
    countdownType,
    dueTime,
    evergreenHours,
    evergreenMinutes,
    evergreenRecurring,
    recurringRestartAfter,
    recurringStopTime,
    layout,
    labelView,
    alignment,
    showDays,
    daysLabel,
    showHours,
    hoursLabel,
    showMinutes,
    minutesLabel,
    showSeconds,
    secondsLabel,
    showSeparator,
    separatorStyle,
    separatorColor,
    expireType,
    expiryTitle,
    expiryText,
    redirectUrl,
    boxBgColor,
    boxBgGradient,
    boxSpacing,
    digitsColor,
    digitsBgColor,
    labelColor,
    expireAlignment,
    expireTitleColor,
    expireTextColor,
  } = attributes;

  const resRequiredProps = { setAttributes, resOption, attributes, objAttributes };

  const AlignButtons = ({ value, onChange }) => (
    <BaseControl>
      <ButtonGroup>
        {ALIGN_OPTIONS.map((item) => (
          <Button
            key={item.value}
            isPrimary={value === item.value}
            isSecondary={value !== item.value}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </ButtonGroup>
    </BaseControl>
  );

  return (
    <InspectorControls key="controls">
      <div className="eb-panel-control">
        <TabPanel
          className="eb-parent-tab-panel"
          activeClass="active-tab"
          tabs={[
            { name: "general", title: __("General", "notificationx"), className: "eb-tab general" },
            { name: "styles", title: __("Style", "notificationx"), className: "eb-tab styles" },
          ]}
        >
          {(tab) =>
            tab.name === "general" ? (
              <div className="eb-panel-control">
                {/* ── Timer Settings ── */}
                <PanelBody title={__("Timer Settings", "notificationx")} initialOpen={true}>
                  <SelectControl
                    label={__("Type", "notificationx")}
                    value={countdownType}
                    options={COUNTDOWN_TYPES}
                    onChange={(v) => setAttributes({ countdownType: v })}
                  />
                  {countdownType === "due_date" && (
                    <TextControl
                      label={__("Countdown Due Date", "notificationx")}
                      type="datetime-local"
                      value={dueTime}
                      onChange={(v) => setAttributes({ dueTime: v })}
                    />
                  )}
                  {countdownType === "evergreen" && (
                    <>
                      <TextControl
                        label={__("Hours", "notificationx")}
                        type="number"
                        value={evergreenHours}
                        onChange={(v) => setAttributes({ evergreenHours: parseInt(v || 0, 10) })}
                      />
                      <TextControl
                        label={__("Minutes", "notificationx")}
                        type="number"
                        value={evergreenMinutes}
                        onChange={(v) => setAttributes({ evergreenMinutes: parseInt(v || 0, 10) })}
                      />
                      <ToggleControl
                        label={__("Recurring Countdown", "notificationx")}
                        checked={!!evergreenRecurring}
                        onChange={(v) => setAttributes({ evergreenRecurring: v })}
                      />
                      {evergreenRecurring && (
                        <>
                          <TextControl
                            label={__("Restart After (Hours)", "notificationx")}
                            type="number"
                            help={__("0 = restart immediately.", "notificationx")}
                            value={recurringRestartAfter}
                            onChange={(v) => setAttributes({ recurringRestartAfter: parseInt(v || 0, 10) })}
                          />
                          <TextControl
                            label={__("Recurring End Date", "notificationx")}
                            type="datetime-local"
                            value={recurringStopTime}
                            onChange={(v) => setAttributes({ recurringStopTime: v })}
                          />
                        </>
                      )}
                    </>
                  )}
                </PanelBody>

                {/* ── Content Settings ── */}
                <PanelBody title={__("Content Settings", "notificationx")} initialOpen={false}>
                  <SelectControl
                    label={__("View", "notificationx")}
                    value={layout}
                    options={LAYOUT_OPTIONS}
                    onChange={(v) => setAttributes({ layout: v })}
                  />
                  <SelectControl
                    label={__("Label Position", "notificationx")}
                    value={labelView}
                    options={LABEL_VIEW_OPTIONS}
                    onChange={(v) => setAttributes({ labelView: v })}
                  />
                  <BaseControl label={__("Alignment", "notificationx")}>
                    <AlignButtons value={alignment} onChange={(v) => setAttributes({ alignment: v })} />
                  </BaseControl>

                  <ToggleControl
                    label={__("Display Days", "notificationx")}
                    checked={!!showDays}
                    onChange={(v) => setAttributes({ showDays: v })}
                  />
                  {showDays && (
                    <TextControl
                      label={__("Days Label", "notificationx")}
                      value={daysLabel}
                      onChange={(v) => setAttributes({ daysLabel: v })}
                    />
                  )}
                  <ToggleControl
                    label={__("Display Hours", "notificationx")}
                    checked={!!showHours}
                    onChange={(v) => setAttributes({ showHours: v })}
                  />
                  {showHours && (
                    <TextControl
                      label={__("Hours Label", "notificationx")}
                      value={hoursLabel}
                      onChange={(v) => setAttributes({ hoursLabel: v })}
                    />
                  )}
                  <ToggleControl
                    label={__("Display Minutes", "notificationx")}
                    checked={!!showMinutes}
                    onChange={(v) => setAttributes({ showMinutes: v })}
                  />
                  {showMinutes && (
                    <TextControl
                      label={__("Minutes Label", "notificationx")}
                      value={minutesLabel}
                      onChange={(v) => setAttributes({ minutesLabel: v })}
                    />
                  )}
                  <ToggleControl
                    label={__("Display Seconds", "notificationx")}
                    checked={!!showSeconds}
                    onChange={(v) => setAttributes({ showSeconds: v })}
                  />
                  {showSeconds && (
                    <TextControl
                      label={__("Seconds Label", "notificationx")}
                      value={secondsLabel}
                      onChange={(v) => setAttributes({ secondsLabel: v })}
                    />
                  )}

                  <ToggleControl
                    label={__("Display Separator", "notificationx")}
                    checked={!!showSeparator}
                    onChange={(v) => setAttributes({ showSeparator: v })}
                  />
                  {showSeparator && (
                    <SelectControl
                      label={__("Separator Style", "notificationx")}
                      value={separatorStyle}
                      options={SEPARATOR_OPTIONS}
                      onChange={(v) => setAttributes({ separatorStyle: v })}
                    />
                  )}
                </PanelBody>

                {/* ── Expire Action ── */}
                <PanelBody title={__("Expire Action", "notificationx")} initialOpen={false}>
                  <SelectControl
                    label={__("On Expire", "notificationx")}
                    value={expireType}
                    options={EXPIRE_TYPES}
                    onChange={(v) => setAttributes({ expireType: v })}
                  />
                  {expireType === "text" && (
                    <>
                      <TextareaControl
                        label={__("Expiry Title", "notificationx")}
                        value={expiryTitle}
                        onChange={(v) => setAttributes({ expiryTitle: v })}
                      />
                      <TextareaControl
                        label={__("Expiry Content", "notificationx")}
                        value={expiryText}
                        onChange={(v) => setAttributes({ expiryText: v })}
                      />
                    </>
                  )}
                  {expireType === "url" && (
                    <TextControl
                      label={__("Redirect URL", "notificationx")}
                      type="url"
                      value={redirectUrl}
                      onChange={(v) => setAttributes({ redirectUrl: v })}
                    />
                  )}
                </PanelBody>
              </div>
            ) : (
              <div className="eb-panel-control">
                {/* ── Countdown Box ── */}
                <PanelBody title={__("Countdown Box", "notificationx")} initialOpen={true}>
                  <PanelColorSettings
                    title={__("Background", "notificationx")}
                    className="nx-color-control"
                    initialOpen={false}
                    colorSettings={[
                      {
                        value: boxBgColor,
                        onChange: (v) => setAttributes({ boxBgColor: v }),
                        label: __("Box Background Color", "notificationx"),
                      },
                    ]}
                  />
                  <TextControl
                    label={__("Background Gradient (CSS)", "notificationx")}
                    help={__("Optional. e.g. linear-gradient(90deg, #f00, #00f). Overrides the background color.", "notificationx")}
                    value={boxBgGradient}
                    onChange={(v) => setAttributes({ boxBgGradient: v })}
                  />
                  <RangeControl
                    label={__("Space Between Boxes", "notificationx")}
                    value={boxSpacing}
                    onChange={(v) => setAttributes({ boxSpacing: v })}
                    min={0}
                    max={100}
                  />
                  <ResponsiveDimensionsControl
                    resRequiredProps={resRequiredProps}
                    controlName={BOX_PADDING}
                    baseLabel={__("Padding", "notificationx")}
                  />
                  <PanelBody title={__("Border & Shadow", "notificationx")} initialOpen={false} className="nx-color-control">
                    <BorderShadowControl
                      controlName={BOX_BORDER}
                      resRequiredProps={resRequiredProps}
                      noBdrHover
                      noShdowHover
                    />
                  </PanelBody>
                </PanelBody>

                {/* ── Color & Typography ── */}
                <PanelBody title={__("Color & Typography", "notificationx")} initialOpen={false}>
                  <PanelColorSettings
                    title={__("Digits", "notificationx")}
                    className="nx-color-control"
                    initialOpen={false}
                    colorSettings={[
                      { value: digitsColor, onChange: (v) => setAttributes({ digitsColor: v }), label: __("Digits Color", "notificationx") },
                      { value: digitsBgColor, onChange: (v) => setAttributes({ digitsBgColor: v }), label: __("Background Color", "notificationx") },
                    ]}
                  />
                  <TypographyDropdown
                    baseLabel={__("Digits Typography", "notificationx")}
                    typographyPrefixConstant={DIGITS_TYPO}
                    resRequiredProps={resRequiredProps}
                  />
                  <ResponsiveDimensionsControl
                    resRequiredProps={resRequiredProps}
                    controlName={DIGITS_PADDING}
                    baseLabel={__("Digits Padding", "notificationx")}
                  />
                  <PanelBody title={__("Digits Border & Shadow", "notificationx")} initialOpen={false} className="nx-color-control">
                    <BorderShadowControl
                      controlName={DIGITS_BORDER}
                      resRequiredProps={resRequiredProps}
                      noBdrHover
                      noShdowHover
                    />
                  </PanelBody>
                  <PanelColorSettings
                    title={__("Labels", "notificationx")}
                    className="nx-color-control"
                    initialOpen={false}
                    colorSettings={[
                      { value: labelColor, onChange: (v) => setAttributes({ labelColor: v }), label: __("Label Color", "notificationx") },
                    ]}
                  />
                  <TypographyDropdown
                    baseLabel={__("Label Typography", "notificationx")}
                    typographyPrefixConstant={LABEL_TYPO}
                    resRequiredProps={resRequiredProps}
                  />
                  {showSeparator && (
                    <PanelColorSettings
                      title={__("Separator", "notificationx")}
                      className="nx-color-control"
                      initialOpen={false}
                      colorSettings={[
                        { value: separatorColor, onChange: (v) => setAttributes({ separatorColor: v }), label: __("Separator Color", "notificationx") },
                      ]}
                    />
                  )}
                </PanelBody>

                {/* ── Individual Box Styling ── */}
                <PanelBody title={__("Individual Box Styling", "notificationx")} initialOpen={false}>
                  {UNITS.map((unit) => (
                    <PanelColorSettings
                      key={unit}
                      title={UNIT_LABELS[unit]}
                      className="nx-color-control"
                      initialOpen={false}
                      colorSettings={[
                        { value: attributes[`${unit}BgColor`], onChange: (v) => setAttributes({ [`${unit}BgColor`]: v }), label: __("Background Color", "notificationx") },
                        { value: attributes[`${unit}DigitColor`], onChange: (v) => setAttributes({ [`${unit}DigitColor`]: v }), label: __("Digit Color", "notificationx") },
                        { value: attributes[`${unit}LabelColor`], onChange: (v) => setAttributes({ [`${unit}LabelColor`]: v }), label: __("Label Color", "notificationx") },
                        { value: attributes[`${unit}BorderColor`], onChange: (v) => setAttributes({ [`${unit}BorderColor`]: v }), label: __("Border Color", "notificationx") },
                      ]}
                    />
                  ))}
                </PanelBody>

                {/* ── Expire Message ── */}
                {expireType === "text" && (
                  <PanelBody title={__("Expire Message", "notificationx")} initialOpen={false}>
                    <BaseControl label={__("Alignment", "notificationx")}>
                      <AlignButtons value={expireAlignment} onChange={(v) => setAttributes({ expireAlignment: v })} />
                    </BaseControl>
                    <PanelColorSettings
                      title={__("Colors", "notificationx")}
                      className="nx-color-control"
                      initialOpen={false}
                      colorSettings={[
                        { value: expireTitleColor, onChange: (v) => setAttributes({ expireTitleColor: v }), label: __("Title Color", "notificationx") },
                        { value: expireTextColor, onChange: (v) => setAttributes({ expireTextColor: v }), label: __("Text Color", "notificationx") },
                      ]}
                    />
                    <TypographyDropdown
                      baseLabel={__("Title Typography", "notificationx")}
                      typographyPrefixConstant={EXPIRE_TITLE_TYPO}
                      resRequiredProps={resRequiredProps}
                    />
                    <TypographyDropdown
                      baseLabel={__("Text Typography", "notificationx")}
                      typographyPrefixConstant={EXPIRE_TEXT_TYPO}
                      resRequiredProps={resRequiredProps}
                    />
                  </PanelBody>
                )}
              </div>
            )
          }
        </TabPanel>
      </div>
    </InspectorControls>
  );
}
