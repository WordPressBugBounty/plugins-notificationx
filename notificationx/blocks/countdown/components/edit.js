import { useEffect, useRef } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import { select, subscribe } from "@wordpress/data";

import Inspector from "./inspector";
import CountdownPreview from "./preview";
import getCountdownStyles from "./styles";

const { duplicateBlockIdFix } = window.EBControls;

const pad = (n) => String(n).padStart(2, "0");

export default function Edit(props) {
  const { attributes, setAttributes, clientId } = props;
  const { blockId, blockStyles, dueTime, resOption } = attributes;

  // Keep resOption in sync with the editor's preview device — without relying
  // on the press-bar-only `nx_style_handler` global.
  const deviceRef = useRef(resOption);
  useEffect(() => {
    const sel = select("core/edit-post");
    const read = () =>
      sel && sel.__experimentalGetPreviewDeviceType
        ? sel.__experimentalGetPreviewDeviceType()
        : "Desktop";
    const initial = read();
    deviceRef.current = initial;
    setAttributes({ resOption: initial });
    const unsubscribe = subscribe(() => {
      const device = read();
      if (device && device !== deviceRef.current) {
        deviceRef.current = device;
        setAttributes({ resOption: device });
      }
    });
    return () => unsubscribe();
  }, []);

  // Unique, duplicate-safe blockId used to scope this instance's styles.
  useEffect(() => {
    duplicateBlockIdFix({
      BLOCK_PREFIX: "nx-countdown",
      blockId,
      setAttributes,
      select,
      clientId,
    });
  }, []);

  // Sensible default due date (now + 7 days) for new blocks.
  useEffect(() => {
    if (!dueTime) {
      const d = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const local = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
        d.getDate()
      )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
      setAttributes({ dueTime: local });
    }
  }, []);

  const styleObj = blockId
    ? getCountdownStyles(blockId, attributes)
    : { desktop: "", tab: "", mobile: "" };

  // Persist computed CSS so the PHP render_callback can echo it on the frontend.
  useEffect(() => {
    if (!blockId) return;
    if (JSON.stringify(blockStyles) !== JSON.stringify(styleObj)) {
      setAttributes({ blockStyles: styleObj });
    }
  }, [attributes, blockId]);

  return (
    <>
      <Inspector attributes={attributes} setAttributes={setAttributes} />
      <div {...useBlockProps()}>
        <style>
          {`
            ${styleObj.desktop}

            /* mimmikcssStart */
            ${resOption === "Tablet" ? styleObj.tab : " "}
            ${resOption === "Mobile" ? styleObj.tab + styleObj.mobile : " "}
            /* mimmikcssEnd */

            @media all and (max-width: 1024px) {
              /* tabcssStart */
              ${styleObj.tab}
              /* tabcssEnd */
            }

            @media all and (max-width: 767px) {
              /* mobcssStart */
              ${styleObj.mobile}
              /* mobcssEnd */
            }
          `}
        </style>
        <CountdownPreview blockId={blockId} attributes={attributes} />
      </div>
    </>
  );
}
