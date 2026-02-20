"use client"
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

    // Helper to generate the sequence of page numbers
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // Always show first 3 pages
            if (currentPage <= 3) {
                pages.push(1, 2, 3, '...', totalPages - 2, totalPages - 1, totalPages);
            }
            // Always show last 3 pages if we are near the end
            else if (currentPage >= totalPages - 2) {
                pages.push(1, 2, 3, '...', totalPages - 2, totalPages - 1, totalPages);
            }
            // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
            else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between w-full pt-6 mt-8 gap-4 md:px-10">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="order-2 sm:order-1 flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-black/5 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed group cursor-pointer bg-white"
                aria-label="Previous page"
            >
                <ArrowLeft className="w-4 h-4 text-black group-hover:-translate-x-0.5 transition-transform" />
                <span className="md:text-sm text-xs font-medium text-black">Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="order-1 sm:order-2 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1 w-full sm:w-auto justify-center">
                {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                        {page === '...' ? (
                            <span className="px-2 sm:px-3 py-2 text-black/40 font-medium">...</span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page as number)}
                                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                                    ${currentPage === page
                                        ? 'bg-[#F0F0F0] text-black shadow-sm'
                                        : 'text-black/40 hover:bg-black/5 hover:text-black'
                                    }`}
                            >
                                {page}
                            </button>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="order-3 sm:order-3 flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-black/5 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed group cursor-pointer bg-white"
                aria-label="Next page"
            >
                <span className="text-sm font-medium text-black">Next</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
            </button>
        </div>
    );
};

export default Pagination;
