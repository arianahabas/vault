// src/utils/fileIcons.ts
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFilePdf,
	faFileAlt,
	faFileImage,
} from "@fortawesome/free-solid-svg-icons";

export function getFileIcon(type: string) {
	switch (type) {
		case "application/pdf":
			return (
				<FontAwesomeIcon icon={faFilePdf} className='me-2' color='#dc3545' />
			);
		case "text/plain":
			return (
				<FontAwesomeIcon icon={faFileAlt} className='me-2' color='#6c757d' />
			);
		case "image/jpeg":
		case "image/png":
			return (
				<FontAwesomeIcon icon={faFileImage} className='me-2' color='#14b8a6' />
			);
		default:
			return (
				<FontAwesomeIcon icon={faFileAlt} className='me-2' color='#6c757d' />
			);
	}
}