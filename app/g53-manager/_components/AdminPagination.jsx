import Link from "next/link";

const AdminPagination = ({ basePath, page, totalPages }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="mt-6 flex flex-wrap items-center gap-2">
      {pages.map((pageNumber) => {
        const isActive = pageNumber === page;

        return (
          <Link
            key={pageNumber}
            href={`${basePath}?page=${pageNumber}`}
            className={`flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium transition ${
              isActive
                ? "bg-dark text-white"
                : "bg-dark10 text-dark hover:bg-accent hover:text-white"
            }`}
          >
            {pageNumber}
          </Link>
        );
      })}
    </nav>
  );
};

export default AdminPagination;
