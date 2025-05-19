"use client";

import React, { JSX } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Document } from "@/types";

interface DocumentItemProps {
	doc: Document;
	onView: (doc: Document) => void;
	onDelete: () => void;
	getFileIcon: (type: string) => JSX.Element;
}

export default function DocumentItem({
	doc,
	onView,
	onDelete,
	getFileIcon,
}: DocumentItemProps) {
	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			onView(doc);
		}
	};

	return (
		<li
		className="list-group-item bg-white border-0 rounded-3 shadow-sm p-3 mb-2"
		aria-describedby={`doc-${doc.id}`}
	  >
		<div className="d-flex justify-content-between align-items-start gap-2 flex-wrap">
		  {/* Left: Icon + Name */}
		  <div className="d-flex align-items-center flex-grow-1 gap-2">
			{getFileIcon(doc.type || "")}
			<strong
			  role="button"
			  tabIndex={0}
			  onClick={() => onView(doc)}
			  onKeyDown={handleKeyPress}
			  className="text-dark text-truncate clickable-file"
			  style={{ maxWidth: "180px" }}
			>
			  {doc.name}
			</strong>
		  </div>
	  
		  {/* Right: Delete */}
		  <button
			className="btn btn-outline-danger btn-sm rounded-pill d-flex align-items-center justify-content-center"
			onClick={onDelete}
			aria-label={`Delete ${doc.name}`}
		  >
			<FontAwesomeIcon icon={faTrash} />
		  </button>
		</div>
	  
		{/* Meta Info */}
		<div
		  id={`doc-${doc.id}`}
		  className="text-muted small mt-2 d-flex flex-wrap gap-2"
		>
		  <span>
			<strong>Uploaded:</strong>{" "}
			{doc.uploadedAt
			  ? new Date(doc.uploadedAt).toLocaleString()
			  : "Unknown"}
		  </span>
		  <span className="d-none d-md-inline">|</span>
		  <span>
			<strong>Size:</strong>{" "}
			{doc.size ? `${doc.size.toFixed(2)} MB` : "Unknown"}
		  </span>
		</div>
	  </li>
	  
	);
}
