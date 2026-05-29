import { apiClient, backendBaseUrl } from "./client";

export async function fetchDocuments() {
  const response = await apiClient.get("/documents");
  return response.data;
}

export async function uploadDocument(file, { batchId, batchTotal }, onProgress) {
  const formData = new FormData();
  formData.append("file", file);

  if (batchId) {
    formData.append("batchId", batchId);
  }

  if (batchTotal) {
    formData.append("batchTotal", String(batchTotal));
  }

  const response = await apiClient.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: (event) => {
      if (!event.total || !onProgress) {
        return;
      }
      onProgress(Math.round((event.loaded * 100) / event.total));
    }
  });

  return response.data;
}

export function getDownloadUrl(downloadPath) {
  if (!downloadPath) {
    return "#";
  }

  if (downloadPath.startsWith("http")) {
    return downloadPath;
  }

  return `${backendBaseUrl}${downloadPath}`;
}
