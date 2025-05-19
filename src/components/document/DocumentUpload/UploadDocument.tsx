"use client";

import React, { useState, useRef, useEffect, DragEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useUploadQueue } from "@/hooks/useUploadQueue";
import UploadProgressItem from "./UploadProgressItem";

export default function UploadDocument() {
	const [dragOver, setDragOver] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const { uploadQueue, handleFiles } = useUploadQueue();

	useEffect(() => {
		if (uploadQueue.length === 0 && inputRef.current) {
			inputRef.current.value = "";
		}
	}, [uploadQueue]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) handleFiles(e.target.files);
	};

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(false);
		if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
	};

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(true);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			inputRef.current?.click();
		}
	};

	return (
		<>
			<div className='text-start mb-2'>
				<p className='text-muted mb-0'>Your next upload starts here.</p>
			</div>
			<div
				role='button'
				tabIndex={0}
				onClick={() => inputRef.current?.click()}
				onKeyDown={handleKeyDown}
				onDragOver={handleDragOver}
				onDragLeave={() => setDragOver(false)}
				onDrop={handleDrop}
				aria-label='Upload a document'
				className={`border rounded-4 p-5 text-center d-flex flex-column justify-content-center align-items-center shadow-sm transition-all
          ${
						dragOver
							? "border-3 border-primary bg-primary bg-opacity-10"
							: "border-secondary-subtle bg-light"
					}`}
				style={{ minHeight: 250, cursor: "pointer", userSelect: "none" }}
			>
				<FontAwesomeIcon
					icon={faUpload}
					size='3x'
					className={`mb-3 ${dragOver ? "text-primary" : "text-secondary"}`}
					aria-hidden='true'
				/>
				<p className='fw-semibold fs-5 text-dark mb-2'>
					Drag & drop files here, or click to select
				</p>
				<p className='text-muted small mb-0'>
					Supported: PDF, TXT, JPEG, PNG (max 5MB)
				</p>

				{uploadQueue.length > 0 && (
					<div
						className='mt-4 w-100 overflow-auto'
						style={{ maxHeight: 300 }}
						aria-live='polite'
					>
						{uploadQueue.map((file) => (
							<UploadProgressItem key={file.id} file={file} />
						))}
					</div>
				)}
			</div>

			{/* Hidden file input */}
			<input
				id='fileUpload'
				type='file'
				className='d-none'
				ref={inputRef}
				onChange={handleFileChange}
				multiple
				accept='.pdf,.txt,.jpeg,.jpg,.png'
				aria-hidden='true'
			/>
		</>
	);
}
