import { FilterParams } from "../../CanvasImage";

export type CanvasData = {
  sx: number,
  sy: number,
  sWidth: number;
  sHeight: number;
  dx: number;
  dy: number;
  dSize: number;
  styleSize: number;
  filter: FilterParams;
}

onmessage = async function (event) {
  console.log('Received message from the main thread:', event.data);

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
  const imageURLs = blobs.map((blob) => {
    return URL.createObjectURL(blob)
  }) 

  // Send the result back to the main thread
  postMessage(imageURLs);
};