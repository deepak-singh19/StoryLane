import React, { useState } from "react";
import { generateHTML } from "./utils/generateHTML";
import { btnStyle, btnAltStyle } from "./utils/commonStyle";
import HTMLOutput from "./component/HTMLOutput";


export default function App() {
  const [jsonData, setJsonData] = useState(null);
  const [htmlOutput, setHtmlOutput] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [uploadedFilename, setUploadedFilename] = useState("Storylane");


  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFilename(file.name.replace(/\.json$/i, "") || "Storylane");

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        setJsonData(parsed);
        const html = generateHTML(parsed);
        setHtmlOutput(html);
        setPreviewVisible(true);
      } catch (err) {
        alert("Invalid JSON file: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  const downloadHTML = () => {
    if (!htmlOutput) {
      alert("Generate HTML first by uploading a JSON file.");
      return;
    }
    const filename = `${uploadedFilename || "product-tour"}.html`;
    const blob = new Blob([htmlOutput], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  const copyToClipboard = async () => {
    if (!htmlOutput) return alert("No HTML to copy");
    try {
      await navigator.clipboard.writeText(htmlOutput);
      alert("HTML copied to clipboard");
    } catch (err) {
      alert("Copy failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          background: "#0b1220",
          padding: 20,
          borderRadius: 12,
        }}
      >
        <h1 style={{ margin: 0, marginBottom: 12, color: "#fff" }}>
          Product Tour → HTML Generator
        </h1>
        <p style={{ marginTop: 0, color: "#cbd5e1" }}>
          Upload a Storylane JSON and generate a standalone HTML document.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 12,
            alignItems: "center",
          }}
        >
          <label
            style={{
              background: "#111827",
              padding: "10px 14px",
              borderRadius: 8,
              cursor: "pointer",
              color: "#fff",
            }}
          >
            Choose JSON file
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </label>

          <button onClick={downloadHTML} style={btnStyle}>
            Download HTML
          </button>
          <button onClick={copyToClipboard} style={btnAltStyle}>
            Copy HTML
          </button>

          <label style={{ marginLeft: "auto", color: "#aab3c6" }}>
            Preview
            <input
              type="checkbox"
              checked={previewVisible}
              onChange={() => setPreviewVisible((v) => !v)}
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>

        {jsonData && (
          <div style={{ marginTop: 12, color: "#9fb0d3" }}>
            <strong>Loaded:</strong> {jsonData.name || uploadedFilename} —{" "}
            {jsonData.flowlists?.[0]?.items?.length ?? 0} chapter(s)
          </div>
        )}
      </div>

      {htmlOutput && previewVisible && (
        <HTMLOutput htmlOutput={htmlOutput} />
      )}
    </div>
  );
}



