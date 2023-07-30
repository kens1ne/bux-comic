import Link from "next/link";
import React from "react";

const Pagination = ({ path, currentPage, totalPages }) => {
  return (
    <div className="mt-[50px] flex justify-center">
      <nav
        className="flex flex-row flex-nowrap justify-between md:justify-center items-center"
        aria-label="Pagination"
      >
        {currentPage > 1 ? (
          <Link
            className="flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
            href={`/${path}/${currentPage - 1}`}
            title="Previous Page"
          >
            <span className="sr-only">Previous Page</span>
            <svg
              className="block w-4 h-4 fill-current"
              viewBox="0 0 256 512"
              aria-hidden="true"
              role="presentation"
            >
              <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path>
            </svg>
          </Link>
        ) : null}
        {currentPage - 3 < 0 ? null : (
          <>
            <Link
              className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
              href={`/${path}/1`}
              aria-current="page"
              title="Page 1"
            >
              1
            </Link>
            <Link
              className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
              href="/"
              onClick={(event) => event.preventDefault()}
            >
              ...
            </Link>
          </>
        )}
        {currentPage - 2 === 0 || currentPage > 0 ? null : (
          <Link
            className="flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
            href={`/${path}/${currentPage - 2}`}
          >
            {currentPage - 2}
          </Link>
        )}

        {currentPage - 1 === 0 ? null : (
          <Link
            className="flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
            href={`/${path}/${currentPage - 1}`}
          >
            {currentPage - 1}
          </Link>
        )}

        <Link
          className="flex w-10 h-10 mx-1 justify-center items-center rounded-full border outline-none bg-red-500 text-white hover:border-gray-300 pointer-events-none"
          href={`/${path}/${currentPage}`}
          title={`Page ${currentPage}`}
        >
          {currentPage}
        </Link>

        {totalPages - currentPage === 1 ||
        totalPages - currentPage === 0 ? null : (
          <Link
            className="flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
            href={`/${path}/${currentPage + 1}`}
            title={`Page ${currentPage + 1}`}
          >
            {currentPage + 1}
          </Link>
        )}

        {totalPages - currentPage === 2 ||
        totalPages - currentPage === 0 ? null : (
          <Link
            className="flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
            href={`/${path}/${currentPage + 2}`}
            title={`Page ${currentPage + 1}`}
          >
            {currentPage + 2}
          </Link>
        )}

        {totalPages - currentPage === 0 ? null : (
          <Link
            className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
            href="/"
            onClick={(event) => event.preventDefault()}
          >
            ...
          </Link>
        )}

        {totalPages - currentPage > 0 ? (
          <Link
            className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
            href={`/${path}/${totalPages}`}
            title={`Page ${totalPages}`}
          >
            {totalPages}
          </Link>
        ) : null}

        {totalPages - currentPage > 0 ? (
          <Link
            className="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
            href={`/${path}/${currentPage + 1}`}
            title="Next Page"
          >
            <span className="sr-only">Next Page</span>
            <svg
              className="block w-4 h-4 fill-current"
              viewBox="0 0 256 512"
              aria-hidden="true"
              role="presentation"
            >
              <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
            </svg>
          </Link>
        ) : null}
      </nav>
    </div>
  );
};

export default Pagination;
