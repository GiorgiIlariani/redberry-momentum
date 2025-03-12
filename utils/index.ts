export const getValidationClass = (value: string, min: number, max: number) => {
  if (!value) return "text-black"; // Default (Black)
  if (value.length < min || value.length > max) return "text-red-500"; // Error (Red)
  return "text-green-500"; // Success (Green)
};

export const handleFileChange = (fileProp: File | undefined) => {
  return new Promise((resolve, reject) => {
    const file = fileProp;
    if (file) {
      if (file.size > 600 * 1024) {
        reject("Image is too large");
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    } else {
      reject("No file provided");
    }
  });
};
