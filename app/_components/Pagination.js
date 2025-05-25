import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function EllipsisInput({ setPageNumber, totalPages }) {
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setShowInput(true);
    } else {
      const timeout = setTimeout(() => setShowInput(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isHovered]);

  const onChange = (e) => {
    if (/^\d*$/.test(e.target.value)) setInputValue(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      const num = Number(inputValue);
      if (num >= 1 && num <= totalPages) {
        setPageNumber(num);
        setInputValue("");
        setIsHovered(false);
      }
    } else if (e.key === "Escape") {
      setInputValue("");
      setIsHovered(false);
    }
  };

  const onBlur = () => {
    setInputValue("");
    setIsHovered(false);
  };

  return (
    <div
      className="w-12 h-8 flex items-center justify-center cursor-pointer relative flex-wrap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!inputValue) setIsHovered(false);
      }}
    >
      {/* Ellipsis */}
      <span
        className={`select-none absolute transition-opacity duration-500 ${
          isHovered ? "opacity-0 scale-" : "opacity-100 scale-100"
        }`}
        style={{ pointerEvents: isHovered ? "none" : "auto" }}
      >
        ...
      </span>

      {/* Input */}
      {showInput && (
        <input
          autoFocus
          type="text"
          value={inputValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          placeholder="Page"
          className={`w-full h-7 mx text-center border rounded text-xs 
  absolute transition-opacity duration-500
  ${isHovered ? "opacity-100 " : "opacity-0 "}`}
          style={{ top: 0, left: 0 }}
        />
      )}
    </div>
  );
}

export default function PaginationDemo({
  totalPages,
  currentPage = 1,
  setPageNumber,
}) {
  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <Pagination className="mb-16">
      <PaginationContent className="flex flex-wrap gap-1">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setPageNumber(currentPage - 1);
            }}
          />
        </PaginationItem>

        {pages.map((page, i) =>
          page === "..." ? (
            <PaginationItem key={i}>
              <EllipsisInput setPageNumber={setPageNumber} totalPages={totalPages} />
            </PaginationItem>
          ) : (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  setPageNumber(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) setPageNumber(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
