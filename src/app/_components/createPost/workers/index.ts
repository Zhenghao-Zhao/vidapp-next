import { CanvasData } from "../uploadSteps/constants";

onmessage = async function (event) {
  const canvas: OffscreenCanvas = event.data.canvas;
  const blobData: Blob[] = event.data.blobs;
  const canvasData: CanvasData[] = event.data.canvasData;

  const bitMapPromises: Promise<ImageBitmap>[] = [];
  const blobPromises: Promise<Blob>[] = [];

  blobData.forEach((blob) => {
    bitMapPromises.push(createImageBitmap(blob))
  })
  const bitMaps = await Promise.all(bitMapPromises);
  const ctx = canvas.getContext('2d')
  if (!ctx) return;
  for (let i = 0; i < bitMaps.length; i++) {
    const {brightness, contrast, saturation, sepia, grayscale} = canvasData[i].filter
    const {sx, sy, sWidth, sHeight, dx, dy, dSize} = canvasData[i]
    canvas.width = dSize;
    canvas.height = dSize;

    ctx.filter = `contrast(${contrast}) brightness(${brightness}) saturate(${saturation}) sepia(${sepia}) grayscale(${grayscale})`;
    ctx.drawImage(bitMaps[i], sx, sy, sWidth, sHeight, dx, dy, dSize, dSize);
    blobPromises.push(canvas.convertToBlob());
  }

  const blobs = await Promise.all(blobPromises);
  postMessage(blobs);
};