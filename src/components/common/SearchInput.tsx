"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function SearchInput({
  searchTerm,
  setSearchTerm,
}: SearchInputProps) {
  return (
    <div className="input-group">
      <span className="input-group-text bg-white border-secondary-subtle">
        <FontAwesomeIcon icon={faSearch} color="#6c757d" />
      </span>
      <input
        type="text"
        className="form-control border-secondary-subtle"
        placeholder="Search documents..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search documents"
      />
    </div>
  );
}
