"use client";

import { useState } from "react";
import DocumentList from "@/components/document/DocumentList/DocumentList";
import UploadDocument from "@/components/document/DocumentUpload/UploadDocument";
import Toast from "@/components/common/Toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVault } from "@fortawesome/free-solid-svg-icons";

export default function VaultPage() {
	const toast = useSelector((state: RootState) => state.documents.toast);
	const [activeTab, setActiveTab] = useState<"upload" | "vault">("vault");

	return (
		<div
			className='min-vh-100 py-5'
			style={{
				background:
					"linear-gradient(180deg, #e0f2fe 0%, #60a5fa 50%, #3b82f6 100%)",
			}}
		>
			<div className='container'>
				<div className='bg-white rounded-4  p-4 p-md-5'>
					{/* Tab Navigation */}
					<ul className='nav nav-tabs mb-4'>
						<li className='nav-item'>
							<button
								className={`nav-link ${activeTab === "vault" ? "active" : ""}`}
								onClick={() => setActiveTab("vault")}
							>
                <FontAwesomeIcon icon={faVault} className="text-primary" />
							</button>
						</li>
						<li className='nav-item'>
							<button
								className={`nav-link ${activeTab === "upload" ? "active" : ""}`}
								onClick={() => setActiveTab("upload")}
							>
                
								📤 Upload Document
							</button>
						</li>
					</ul>

					{/* Tab Content */}
					{activeTab === "upload" && (
						<div>
							<h4 className='fw-bold text-primary mb-3'>Add New Document</h4>
							<UploadDocument />
						</div>
					)}

          {activeTab === "vault" && (
						<div>
							<h4 className='fw-bold text-primary mb-3'>Your Vault</h4>
							<DocumentList />
						</div>
					)}

				</div>

				{toast.show && <Toast message={toast.message} type={toast.type} />}
			</div>
		</div>
	);
}
