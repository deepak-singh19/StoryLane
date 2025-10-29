import { get, escapeHtml } from "./helper";

export const generateHTML = (data) => {
  console.log("Generating HTML from data:", data);
  const flowlists = data.flowlists || [];
  const flows = data.flows || [];
  const pages = data.pages || [];

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
<title>${escapeHtml(data.name || "Mercury Banking Product Tour")}</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    background: #f8f9fa;
    color: #333;
  }
  .header {
    text-align: center;
    margin-bottom: 50px;
    padding-bottom: 30px;
    border-bottom: 3px solid #000;
  }
  .header h1 { color: #000; font-size: 2.5em; margin-bottom: 10px; }
  .header p { color: #000; font-size: 1.1em; }
  .chapter {
    background: white;
    border-radius: 12px;
    padding: 40px;
    margin-bottom: 40px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .chapter-title {
    color: #000;
    font-size: 2em;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f0f0f0;
  }
  .step {
    margin-bottom: 40px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #000;
  }
  .step-number {
    display: inline-block;
    background: #000;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    text-align: center;
    line-height: 32px;
    font-weight: bold;
    margin-right: 15px;
    vertical-align: top;
    flex-shrink: 0;
  }
  .step-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
  }
  .step-content { flex: 1; }
  .step-description { color: #000; line-height: 1.6; }
  .step-description p { margin: 10px 0; }
  .step-description h2 { color: #000; font-size: 1.3em; margin: 15px 0 10px 0; }
  .step-image-container { position: relative; width: 100%; margin-top: 15px; }
  .step-image { width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: block; }
  .marker-circle {
    position: absolute;
    width: 40px;
    height: 40px;
    border: 3px solid #ff0000;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    background-color: rgba(255, 0, 0, 0.2);
  }
  .no-description { color: #999; font-style: italic; }
  .download-btn {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #000;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 1000;
    transition: background 0.3s ease;
  }
  .download-btn:hover { background: #333; }
  .download-btn:active { transform: scale(0.98); }

  @media (max-width: 768px) {
    body { padding: 20px 15px; }
    .header h1 { font-size: 1.8em; }
    .header p { font-size: 1em; }
    .chapter { padding: 20px; border-radius: 8px; }
    .chapter-title { font-size: 1.5em; }
    .step { padding: 15px; }
    .step-number { width: 28px; height: 28px; line-height: 28px; font-size: 14px; margin-right: 10px; }
    .step-description h2 { font-size: 1.1em; }
    .marker-circle { width: 30px; height: 30px; border-width: 2px; }
  }

  @media (max-width: 480px) {
    body { padding: 15px 10px; }
    .header { margin-bottom: 30px; padding-bottom: 20px; }
    .header h1 { font-size: 1.5em; }
    .chapter { padding: 15px; }
    .chapter-title { font-size: 1.3em; }
    .step { padding: 12px; }
    .marker-circle { width: 25px; height: 25px; }
  }
</style>
</head>
<body>
  <div class="header">
    <h1>${escapeHtml(data.name || "Mercury Banking Product Tour")}</h1>
    <p>${escapeHtml(
      flowlists[0]?.options?.title?.value || "Experience Product"
    )} - ${escapeHtml(flowlists[0]?.options?.description?.value || "")}</p>
  </div>
`;

  flowlists.forEach((flowlist) => {
    (flowlist.items || []).forEach((item) => {
      const flow = flows.find((f) => f.id === item.target_value);
      const chapterTitleSafe = escapeHtml(item.name || "");
      const chapterDescSafe = escapeHtml(item.description || "");

      html += `
  <!-- ${chapterTitleSafe}${chapterDescSafe ? `: ${chapterDescSafe}` : ""} -->
  <div class="chapter">
    <h2 class="chapter-title">${chapterTitleSafe}${
        chapterDescSafe ? `: ${chapterDescSafe}` : ""
      }</h2>
`;

      if (!flow) {
        html += `<p class="no-description">No matching flow found for this chapter</p></div>`;
        return;
      }

      const widgets = (flow.widgets || [])
        .slice()
        .sort((a, b) => (a.sequence || 0) - (b.sequence || 0));

      widgets.forEach((widget) => {
        let descriptionHtml = get(
          widget,
          "options.description.value",
          ""
        ).trim();

        if (!descriptionHtml)
          descriptionHtml = get(
            widget,
            "overlay_video.external_video_prompt",
            ""
          );
        if (!descriptionHtml)
          descriptionHtml = get(widget, "transcription_options.prompt", "");
        if (!descriptionHtml)
          descriptionHtml = get(widget, "options.meta.elementText", "");

        if (!descriptionHtml) {
          const pageRef = pages.find((p) => p.id === widget.page_id);
          const pageKind = pageRef?.kind || "";
          if (widget.kind === "video_clip" || pageKind === "video") {
            descriptionHtml =
              '<p class="no-description">No description found</p>';
          } else {
            descriptionHtml =
              '<p class="no-description">No description found</p>';
          }
        }

        const page = pages.find((p) => p.id === widget.page_id);

        let imgUrl = "";
        if (page) {
          if (page.kind === "video") {
            imgUrl = page.preview_url || page.thumbnail_url || page.file_url;
          } else {
            imgUrl = page.file_url || page.preview_url || page.thumbnail_url;
          }
        }

        html += `
    <div class="step">
      <div class="step-header">
        <span class="step-number">${escapeHtml(
          String(widget.sequence || "")
        )}</span>
        <div class="step-content">
          <div class="step-description">
            ${descriptionHtml}
          </div>
        </div>
      </div>
`;

        if (imgUrl) {
          let altText = "Step image";
          if (page) {
            if (page.kind === "video") {
              altText = "Video Clip";
            } else if (page.name) {
              altText =
                page.name.charAt(0).toUpperCase() +
                page.name.slice(1).replace(/-/g, " ");
            }
          }

          html += `
      <div class="step-image-container">
        <img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(
            altText
          )}" class="step-image">
`;
          const offset = widget.options?.root?.offset;
          if (offset && offset.x !== undefined && offset.y !== undefined) {
            html += `        <div class="marker-circle" style="left: ${Number(
              offset.x
            )}%; top: ${Number(offset.y)}%;"></div>\n`;
          }
          html += `      </div>\n`;
        }

        html += `    </div>\n`;
      });

      html += `  </div>\n`;
    });
  });

  html += `
    <script>
        function downloadPDF() {
            const button = document.querySelector('.download-btn');
            const originalText = button.textContent;
            button.textContent = 'Generating PDF...';
            button.disabled = true;

            const element = document.body;
            const opt = {
                margin: 10,
                filename: 'document-tour.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, logging: false },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            html2pdf().set(opt).from(element).save().then(() => {
                button.textContent = originalText;
                button.disabled = false;
            }).catch((error) => {
                console.error('PDF generation error:', error);
                button.textContent = 'Error - Try Again';
                button.disabled = false;
                setTimeout(() => {
                    button.textContent = originalText;
                }, 3000);
            });
        }
    </script>
</body>
</html>
`;
  return html;
};
