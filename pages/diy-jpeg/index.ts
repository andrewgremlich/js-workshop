// pages/diy-jpeg/index.ts
// Generates a JPEG in the browser from procedural pixel data and displays it.

export {};

type PixelFn = (x: number, y: number, w: number, h: number) => { r: number; g: number; b: number };

const generateCanvas = (width: number, height: number, pixelFn: PixelFn): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d context unavailable');
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;
  let offset = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const { r, g, b } = pixelFn(x, y, width, height);
      data[offset++] = r & 0xff;
      data[offset++] = g & 0xff;
      data[offset++] = b & 0xff;
      data[offset++] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

const canvasToJpegBlob = async (canvas: HTMLCanvasElement, quality = 0.92): Promise<Blob> =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (!blob) return reject(new Error('JPEG blob creation failed'));
        resolve(blob);
      },
      'image/jpeg',
      quality
    );
  });

const blobToDataUrl = async (blob: Blob): Promise<string> =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });

const createProceduralJpegDataUrl = async (): Promise<string> => {
  const width = 256;
  const height = 256;
  const pixelFn: PixelFn = (x, y, w, h) => {
    const r = (x / w) * 255;
    const g = (y / h) * 255;
    const b = ((x + y) / (w + h)) * 255;
    return { r, g, b };
  };
  const canvas = generateCanvas(width, height, pixelFn);
  const blob = await canvasToJpegBlob(canvas, 0.9);
  return blobToDataUrl(blob);
};

const render = async () => {
  const root = document.body;
  const heading = document.createElement('h1');
  heading.textContent = 'Procedural JPEG';
  root.appendChild(heading);

  try {
    const dataUrl = await createProceduralJpegDataUrl();
    const img = document.createElement('img');
    img.alt = 'Generated JPEG';
    img.width = 256;
    img.height = 256;
    img.src = dataUrl;
    root.appendChild(img);

    // Optional: show raw byte length
    const info = document.createElement('pre');
    const byteLength = Math.round((dataUrl.length * 3) / 4); // approximate
    info.textContent = `Data URL length: ${dataUrl.length}\nApprox JPEG bytes: ${byteLength}`;
    root.appendChild(info);
  } catch (err) {
    const errorEl = document.createElement('pre');
    errorEl.textContent = `Error: ${(err as Error).message}`;
    root.appendChild(errorEl);
  }
};

if (typeof window !== 'undefined') {
  // Defer to next tick to ensure DOM is ready.
  (async () => {
    await new Promise(r => setTimeout(r, 0));
    await render();
  })();
}