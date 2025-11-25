// src/components/Pagination.jsx
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="pagination">
      <button
        className="btn btn--ghost"
        disabled={!canPrev}
        onClick={() => canPrev && onPageChange(currentPage - 1)}
      >
        ← Prev
      </button>

      <span className="pagination__info">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>

      <button
        className="btn btn--ghost"
        disabled={!canNext}
        onClick={() => canNext && onPageChange(currentPage + 1)}
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;
