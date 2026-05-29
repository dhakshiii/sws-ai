import { useEffect, useMemo, useState } from "react";
import { fetchDocuments, uploadDocument } from "../api/documents";
import { DocumentsTable } from "../components/documents/DocumentsTable";
import { UploadDropzone } from "../components/upload/UploadDropzone";
import { UploadQueue } from "../components/upload/UploadQueue";

function createQueueItem(file) {
  return {
    id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    file,
    name: file.name,
    size: file.size,
    type: file.type || "application/pdf",
    progress: 0,
    status: "pending",
    error: ""
  };
}

function extractErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Upload failed. Please try again."
  );
}

function isPdfFile(file) {
  return (
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
  );
}

export function DashboardPage() {
  const [documents, setDocuments] = useState([]);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(true);
  const [uploadItems, setUploadItems] = useState([]);
  const [statusBanner, setStatusBanner] = useState(null);
  const [queueCollapsed, setQueueCollapsed] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      setIsLoadingDocuments(true);
      const data = await fetchDocuments();
      setDocuments(data);
    } finally {
      setIsLoadingDocuments(false);
    }
  }

  async function handleFilesSelected(selectedFiles) {
    const validFiles = selectedFiles.filter(isPdfFile);
    const invalidFiles = selectedFiles.filter((file) => !isPdfFile(file));

    const validItems = validFiles.map(createQueueItem);
    const invalidItems = invalidFiles.map((file) => ({
      ...createQueueItem(file),
      status: "failed",
      error: "Only PDF files are allowed."
    }));

    setUploadItems((current) => [...validItems, ...invalidItems, ...current]);

    if (!validItems.length) {
      setStatusBanner({
        type: "error",
        message: "Please choose PDF files only."
      });
      return;
    }

    const batchId =
      validItems.length > 1
        ? `batch-${Date.now()}-${Math.random().toString(16).slice(2)}`
        : "";

    if (validItems.length > 3) {
      setIsBulkMode(true);
      setStatusBanner({
        type: "info",
        message: `Upload in progress — processing ${validItems.length} files in background.`
      });
      setQueueCollapsed(true);
    } else {
      setIsBulkMode(false);
      setStatusBanner(null);
    }

    const uploadPromises = validItems.map((item) =>
      uploadSingleFile(item, batchId, validItems.length)
    );

    const results = await Promise.allSettled(uploadPromises);
    await loadDocuments();

    if (validItems.length <= 3) {
      const failedCount = results.filter(
        (result) => result.status === "rejected"
      ).length;

      setStatusBanner({
        type: failedCount ? "error" : "success",
        message: failedCount
          ? "Some files could not be uploaded."
          : `${validItems.length} file${validItems.length > 1 ? "s" : ""} uploaded successfully.`
      });
    }
  }

  async function uploadSingleFile(item, batchId, batchTotal) {
    updateUploadItem(item.id, {
      status: "uploading",
      progress: 1,
      error: ""
    });

    try {
      const response = await uploadDocument(
        item.file,
        {
          batchId,
          batchTotal
        },
        (progress) => {
          updateUploadItem(item.id, {
            status: "uploading",
            progress
          });
        }
      );

      updateUploadItem(item.id, {
        status: "complete",
        progress: 100
      });

      setDocuments((current) => [response.document, ...current]);
    } catch (error) {
      updateUploadItem(item.id, {
        status: "failed",
        error: extractErrorMessage(error)
      });
      throw error;
    }
  }

  function updateUploadItem(itemId, updates) {
    setUploadItems((current) =>
      current.map((item) =>
        item.id === itemId
          ? {
              ...item,
              ...updates
            }
          : item
      )
    );
  }

  const stats = useMemo(() => {
    const total = documents.length;
    const totalSize = documents.reduce(
      (accumulator, document) => accumulator + document.fileSize,
      0
    );

    return {
      total,
      totalSize,
      recentUploads: uploadItems.filter((item) => item.status === "complete")
        .length
    };
  }, [documents, uploadItems]);

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1.45fr_0.95fr]">
        <div className="rounded-[28px] bg-slate-950 px-6 py-8 text-white shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-300">
            Live Workspace
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            Manage every PDF upload from one dashboard.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Track progress file-by-file, download uploaded documents, and stay
            updated through persistent realtime notifications.
          </p>

          {statusBanner ? (
            <div
              className={`mt-6 rounded-[24px] px-5 py-4 text-sm font-medium ${
                statusBanner.type === "success"
                  ? "bg-emerald-500/15 text-emerald-200"
                  : statusBanner.type === "error"
                    ? "bg-rose-500/15 text-rose-200"
                    : "bg-brand-500/15 text-brand-100"
              }`}
            >
              {statusBanner.message}
            </div>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm text-slate-500">Total documents</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              {stats.total}
            </p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm text-slate-500">Recent uploads</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              {stats.recentUploads}
            </p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm text-slate-500">Stored size</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              {(stats.totalSize / (1024 * 1024)).toFixed(1)} MB
            </p>
          </div>
        </div>
      </section>

      <UploadDropzone onFilesSelected={handleFilesSelected} />

      <UploadQueue
        items={uploadItems}
        collapsed={queueCollapsed}
        onToggleCollapse={() => setQueueCollapsed((current) => !current)}
        showCompactHint={isBulkMode}
      />

      <DocumentsTable documents={documents} isLoading={isLoadingDocuments} />
    </div>
  );
}
