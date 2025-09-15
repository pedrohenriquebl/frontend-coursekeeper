import { RefObject } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { QualityOption } from "../components/ExportDialog";

export function useExportPDF(
  reportRef: RefObject<HTMLDivElement>,
  userName?: string
) {
  const exportPDF = async (
    quality: QualityOption,
    before?: () => void,
    after?: () => void
  ) => {
    if (!reportRef.current) return;

    const filterElement = reportRef.current.querySelector(
      "#report-filter-select"
    ) as HTMLElement | null;
    if (filterElement) filterElement.style.display = "none";

    before?.();

    try {
      const origCanvas = await html2canvas(reportRef.current, {
        scale: quality.scale,
        backgroundColor: null,
        useCORS: true,
      });

      const DPI = quality.dpi;
      const a4WidthMm = 210;
      const a4HeightMm = 297;
      const a4WidthPx = Math.round((a4WidthMm * DPI) / 25.4);
      const a4HeightPx = Math.round((a4HeightMm * DPI) / 25.4);

      const scaledWidth = a4WidthPx;
      const scaledHeight = Math.ceil(
        (origCanvas.height * scaledWidth) / origCanvas.width
      );

      const scaledCanvas = document.createElement("canvas");
      scaledCanvas.width = scaledWidth;
      scaledCanvas.height = scaledHeight;
      const scCtx = scaledCanvas.getContext("2d")!;
      scCtx.imageSmoothingEnabled = true;
      scCtx.imageSmoothingQuality = "high";
      scCtx.drawImage(origCanvas, 0, 0, scaledWidth, scaledHeight);

      const totalPages = Math.ceil(scaledHeight / a4HeightPx);
      const pdf = new jsPDF({
        unit: "px",
        format: [a4WidthPx, a4HeightPx],
        orientation: "portrait",
      });

      const canvasForGradient = document.createElement("canvas");
      canvasForGradient.width = a4WidthPx;
      canvasForGradient.height = a4HeightPx;
      const gradientCtx = canvasForGradient.getContext("2d")!;

      const grad = gradientCtx.createLinearGradient(0, 0, a4WidthPx, a4HeightPx);
      grad.addColorStop(0, "#0f172a");
      grad.addColorStop(0.5, "#1e293b");
      grad.addColorStop(1, "#111827");

      for (let page = 0; page < totalPages; page++) {
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = a4WidthPx;
        pageCanvas.height = a4HeightPx;

        const pCtx = pageCanvas.getContext("2d")!;
        pCtx.fillStyle = grad;
        pCtx.fillRect(0, 0, a4WidthPx, a4HeightPx);

        const sx = 0;
        const sy = page * a4HeightPx;
        const sWidth = scaledWidth;
        const sHeight = Math.min(a4HeightPx, scaledHeight - sy);

        pCtx.drawImage(
          scaledCanvas,
          sx,
          sy,
          sWidth,
          sHeight,
          0,
          0,
          a4WidthPx,
          sHeight
        );

        const imgData = pageCanvas.toDataURL("image/png", 1.0);

        if (page === 0) {
          pdf.addImage(imgData, "PNG", 0, 0, a4WidthPx, a4HeightPx);
        } else {
          pdf.addPage([a4WidthPx, a4HeightPx], "portrait");
          pdf.addImage(imgData, "PNG", 0, 0, a4WidthPx, a4HeightPx);
        }
      }

      const fileName = `relatorio-${userName ?? "usuario"}-${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
    } finally {
      if (filterElement) filterElement.style.display = "";
      after?.();
    }
  };

  return { exportPDF };
}
