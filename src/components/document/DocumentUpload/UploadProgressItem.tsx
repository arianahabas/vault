"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface UploadProgressItemProps {
	file: {
		id: string;
		name: string;
		progress: number;
		status: "uploading" | "done";
	};
}

export default function UploadProgressItem({ file }: UploadProgressItemProps) {
	const { name, progress, status } = file;

	return (
		<div
			className={`d-flex justify-content-between align-items-center bg-white rounded-3 px-3 py-2 my-2 shadow-sm
        ${status === "done" ? "fade-out fading" : ""}`}
			title={name}
			style={{ fontSize: "0.9rem" }}
		>
			<div className='text-truncate' style={{ maxWidth: "70%" }}>
				{name}
			</div>

			{status === "done" ? (
				<FontAwesomeIcon
					icon={faCheckCircle}
					color='#14b8a6'
					className='fs-5'
					aria-label='Upload successful'
				/>
			) : (
				<div
					className='d-flex align-items-center'
					style={{ minWidth: 90, gap: "0.5rem" }}
					aria-label={`Uploading ${name}, ${progress}% complete`}
				>
					<small>{progress}%</small>
					<div className='progress flex-grow-1' style={{ height: 8 }}>
						<div
							className='progress-bar progress-bar-striped progress-bar-animated bg-teal'
							role='progressbar'
							style={{ width: `${progress}%` }}
							aria-valuenow={progress}
							aria-valuemin={0}
							aria-valuemax={100}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
