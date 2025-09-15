export async function createBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject("No blob available");
        }
      },
      "image/webp",
      0.5,
    );
  });
}
