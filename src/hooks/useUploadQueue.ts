// useUploadQueue.ts
import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addDocument, showToast } from "@/store/documentSlice";
import { validateFile } from "@/utils/validateFile";
import { UploadFile } from "@/types";

export function useUploadQueue() {
	const [uploadQueue, setUploadQueue] = useState<UploadFile[]>([]);
	const dispatch = useDispatch();

	const simulateUpload = useCallback(
		(file: File) => {
			if (!validateFile(file, dispatch)) return;

			const id = uuidv4();
			const fileSize = file.size / (1024 * 1024);
			const newFile: UploadFile = {
				id,
				name: file.name,
				progress: 0,
				status: "uploading",
				size: fileSize,
				fading: false,
			};

			setUploadQueue((prev) => [...prev, newFile]);

			const speed = Math.floor(Math.random() * 11) + 10;
			const intervalTime = Math.floor(Math.random() * 100) + 200;
			let progress = 0;

			const interval = setInterval(() => {
				progress = Math.min(progress + speed, 100);
				setUploadQueue((prev) =>
					prev.map((f) => (f.id === id ? { ...f, progress } : f))
				);

				if (progress >= 100) {
					clearInterval(interval);

					dispatch(
						addDocument({
							id,
							name: file.name,
							uploadedAt: new Date().toISOString(),
							size: fileSize,
							type: file.type,
						})
					);

					dispatch(
						showToast({
							message: `${file.name} uploaded successfully`,
							type: "success",
						})
					);

					setUploadQueue((prev) =>
						prev.map((f) =>
							f.id === id
								? { ...f, status: "done", fading: true, progress: 100 }
								: f
						)
					);

					setTimeout(() => {
						setUploadQueue((prev) => prev.filter((f) => f.id !== id));
					}, 500);
				}
			}, intervalTime);
		},
		[dispatch]
	);

	const handleFiles = useCallback(
		(files: FileList) => {
			Array.from(files).forEach(simulateUpload);
		},
		[simulateUpload]
	);

	return {
		uploadQueue,
		setUploadQueue,
		handleFiles,
	};
}
