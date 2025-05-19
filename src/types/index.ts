export interface Document {
	id: string;
	name: string;
	uploadedAt: string;
	size?: number; // File size in MB
	type?: string; // MIME type
}

export interface Toast {
	show: boolean;
	message: string;
	type: "success" | "error";
}

export interface UploadFile {
    id: string;
    name: string;
    progress: number;
    status: "uploading" | "done";
    size?: number;
    fading?: boolean;
  }