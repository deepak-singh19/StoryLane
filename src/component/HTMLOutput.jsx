import React from 'react';
import { btnStyle, btnAltStyle } from '../utils/commonStyle';

const HTMLOutput = ({ htmlOutput }) => {
  return (
    <div
          style={{
            maxWidth: 1100,
            margin: "20px auto 80px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              overflow: "hidden",
              minHeight: 480,
            }}
          >
            <div
              style={{
                padding: 8,
                borderBottom: "1px solid #eee",
                background: "#fafafa",
              }}
            >
              <strong style={{ color: "#111" }}>Rendered Preview</strong>
            </div>
            <iframe
              title="Rendered HTML"
              srcDoc={htmlOutput}
              style={{ width: "100%", height: 640, border: 0 }}
            />
          </div>

          <div style={{ background: "#0b1220", borderRadius: 8, padding: 12 }}>
            <div style={{ marginBottom: 8 }}>
              <strong style={{ color: "#fff" }}>Raw HTML Source</strong>
            </div>
            <textarea
              readOnly
              value={htmlOutput}
              style={{
                width: "100%",
                height: 640,
                background: "#020617",
                color: "#c0f0ff",
                borderRadius: 6,
                padding: 12,
                border: "1px solid #122033",
                fontFamily: "monospace",
                fontSize: 12,
                lineHeight: "1.4",
                resize: "none",
              }}
            />
            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
              <button
                onClick={() => {
                  const blob = new Blob([htmlOutput], { type: "text/html" });
                  const url = URL.createObjectURL(blob);
                  window.open(url, "_blank");
                }}
                style={btnStyle}
              >
                Open in new tab
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(htmlOutput).then(
                    () => alert("Copied"),
                    () => alert("Copy failed")
                  );
                }}
                style={btnAltStyle}
              >
                Copy source
              </button>
            </div>
          </div>
        </div>
  );
};

export default HTMLOutput;