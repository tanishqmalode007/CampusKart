const CLOUD_NAME = "fdgrjwja";
const UPLOAD_PRESET = "CampusKart";

export async function uploadImages(files) {
  const imageUrls = [];

  for (const file of files) {
    // Validation
    if (file.size > 5 * 1024 * 1024) {
      throw new Error(
        `${file.name} is larger than 5MB.`
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error(
        `${file.name} is not a supported image.`
      );
    }

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "upload_preset",
      UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error?.message || "Upload failed."
      );
    }

    imageUrls.push(data.secure_url);
  }

  return imageUrls;
}