"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeDocument, showToast } from "@/store/documentSlice";
import { Document } from "@/types";
import { getFileIcon } from "@/utils/fileIcons";
import DocumentItem from "./DocumentItem";
import ConfirmDeleteModal from "../../common/modals/ConfirmDeleteModal";
import SortSelector from "../../common/SortSelector";
import SearchInput from "../../common/SearchInput";

export default function DocumentList() {
	const dispatch = useDispatch();
	const documents = useSelector((state: RootState) => state.documents.items);

	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState<"name" | "date" | "size">("date");
	const [docToDelete, setDocToDelete] = useState<Document | null>(null);
	const [showConfirm, setShowConfirm] = useState(false);

	// Sync to localStorage
	useEffect(() => {
		localStorage.setItem("documents", JSON.stringify(documents));
	}, [documents]);

	// Sorting logic
	const sortFunctions = useMemo(
		() => ({
			name: (a: Document, b: Document) => a.name.localeCompare(b.name),
			date: (a: Document, b: Document) =>
				new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
			size: (a: Document, b: Document) => (b.size || 0) - (a.size || 0),
		}),
		[]
	);

	const filteredDocuments = useMemo(() => {
		const lowerSearch = searchTerm.toLowerCase();
		return [...documents]
			.sort(sortFunctions[sortBy])
			.filter((doc) => doc.name.toLowerCase().includes(lowerSearch));
	}, [documents, searchTerm, sortBy, sortFunctions]);

	// Event handlers
	const handleView = useCallback(
		(doc: Document) => {
			console.log(`Viewing file: ${doc.name} (ID: ${doc.id})`);
			dispatch(showToast({ message: `Viewing ${doc.name}`, type: "success" }));
		},
		[dispatch]
	);

	const handleDelete = useCallback((doc: Document) => {
		setDocToDelete(doc);
		setShowConfirm(true);
	}, []);

	const confirmDelete = useCallback(() => {
		if (docToDelete) {
			dispatch(removeDocument(docToDelete.id));
			dispatch(
				showToast({ message: "Document deleted successfully", type: "success" })
			);
			setShowConfirm(false);
			setDocToDelete(null);
		}
	}, [docToDelete, dispatch]);

	return (
		<div>
			{/* Controls */}
			<div className='mb-4'>
				<div className='text-start mb-2'>
					<p className='text-muted mb-0'>
						Manage, sort, and explore your uploaded documents.
					</p>
				</div>
				<div className='d-flex flex-column flex-md-row align-items-stretch gap-2'>
					<SortSelector sortBy={sortBy} setSortBy={setSortBy} />
					<SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				</div>
			</div>

			{/* Document List */}
			<ul className='list-group' aria-live='polite'>
				{filteredDocuments.length === 0 ? (
					<li className='list-group-item bg-light text-muted rounded-3 shadow-sm p-3'>
						{searchTerm
							? "No documents match your search."
							: "No documents uploaded yet."}
					</li>
				) : (
					filteredDocuments.map((doc) => (
						<DocumentItem
							key={doc.id}
							doc={doc}
							onView={handleView}
							onDelete={() => handleDelete(doc)}
							getFileIcon={getFileIcon}
						/>
					))
				)}
			</ul>

			{/* Delete Confirmation */}
			<ConfirmDeleteModal
				show={showConfirm}
				onHide={() => setShowConfirm(false)}
				onConfirm={confirmDelete}
			/>
		</div>
	);
}
