"use client";

import React from "react";
import { Form } from "react-bootstrap";

interface SortSelectorProps {
  sortBy: "name" | "date" | "size";
  setSortBy: (value: "name" | "date" | "size") => void;
}

export default function SortSelector({
  sortBy,
  setSortBy,
}: SortSelectorProps) {
  return (
    <Form.Select
      size="sm"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value as "name" | "date" | "size")}
      aria-label="Sort documents"
      className="w-100 w-md-auto"
    >
      <option value="date">Sort by Date</option>
      <option value="name">Sort by Name</option>
      <option value="size">Sort by Size</option>
    </Form.Select>
  );
}
