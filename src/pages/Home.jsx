import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";

const fetchItems = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
};

function Home() {
  const {
    data: items,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading items</div>;

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  // Function to handle pagination click
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Items</h1>
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((item) => (
          <div key={item.id} className="bg-white p-4 flex flex-col gap-2 shadow rounded-lg">
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="text-[15px] ">{item.body}</p>
            <Link
              to={`/item/${item.id}`}
              className="text-blue-700  hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {/* Page Numbers for Large Screens */}
          <div className="hidden md:flex space-x-2">
            {Array.from({ length: Math.min(6, totalPages) }, (_, i) => {
              const startPage = Math.max(1, currentPage - 3);
              const page = startPage + i;
              return (
                page <= totalPages && (
                  <button
                    key={page}
                    onClick={() => changePage(page)}
                    className={`px-3 py-2 rounded ${
                      page === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                )
              );
            })}
          </div>

          {/* Mobile View: Show "Page X of Y" */}
          <div className="md:hidden text-gray-700">
            Page {currentPage} of {totalPages}
          </div>

          {/* Next Button */}
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
