export function delay(t: number = 3000) {
  return new Promise((resolve) => setTimeout(resolve, t));
}

export function dataURLtoBlob(dataURI: string) {
  // convert base64 to raw binary data held in a string
  // src: https://stackoverflow.com/questions/12168909/blob-from-dataurl
  var byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], { type: mimeString });
  return blob;
}

export const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => resolve(image);
  });
};

export const getWorker = (onMessage: (e: MessageEvent<any>) => void) => {
  const worker = new Worker(new URL("../_worker/index.ts", import.meta.url));
  worker.onmessage = onMessage;
  return worker;
};

export const getPostDate = (rawPostDate: string) => {
  const postDate = new Date(rawPostDate);
  const today = new Date();
  const totalMinutes = Math.floor(
    (today.getTime() - postDate.getTime()) / 1000 / 60
  );
  const totalDays = Math.floor(totalMinutes / 1440);
  const totalHours = Math.floor(totalMinutes / 60);
  
  if (totalDays < 1) {
    if (totalHours === 1) return "1 hour ago";
    if (totalMinutes <= 1) return "Just now" ;
    return totalHours > 0
      ? `${totalHours} hours ago`
      : `${totalMinutes} minutes ago`;
  }

  if (totalDays === 1) {
    return "1 day ago";
  }

  if (totalDays <= 3) {
    return `${totalDays} days ago`;
  }

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as Intl.DateTimeFormatOptions;

  return postDate.toLocaleDateString(undefined, options);
};
