import React, { useState, useEffect } from "react";
import Heading from "../util/Heading";
import SubTitle from "../util/SubTitle";
import BLogsComp from "../util/BLogsComp";
import ReactPaginate from "react-paginate";
import { staticData } from "../../staticData"; // Import static data

const AllPostsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(staticData); // Store filtered blogs
  const blogsPerPage = 10; // Number of blogs per page

  useEffect(() => {
    // Filter blogs based on search query and category
    let filtered = staticData;

    // Apply search filter on both title and description (case-insensitive)
    if (searchQuery) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (blog.description &&
            blog.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (categories) {
      filtered = filtered.filter(
        (blog) => blog.source.name.toLowerCase() === categories.toLowerCase()
      );
    }

    setFilteredBlogs(filtered);
    setCurrentPage(0); // Reset to first page when filters change
  }, [searchQuery, categories]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected); // Ensure the page is being set correctly
  };

  const handleCategoryClick = (category) => {
    setCategories((prevCategory) => {
      return prevCategory === category ? "" : category;
    });
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    const targetEl = document.getElementById("dropdown");
    if (targetEl) {
      setDropdownOpen(!dropdownOpen);
      targetEl.classList.toggle("hidden");
    }
  };

  // Get current blogs for the page
  const currentBlogs = filteredBlogs.slice(
    currentPage * blogsPerPage,
    (currentPage + 1) * blogsPerPage
  );

  return (
    <section>
      <Heading props={"All blogs"} />
      <SubTitle props={"You can find all global blogs here"} />

      <form className="max-w-lg mt-4 mx-auto" onSubmit={handleFormSubmit}>
        <div className="flex relative">
          <button
            id="dropdown-button"
            type="button"
            onClick={toggleDropdown}
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 h-[40px] border-none"
          >
            {categories === "" ? "All categories" : categories}
            <svg
              className={`w-2.5 h-2.5 ms-2.5 transform transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            className="hidden absolute top-full left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 mt-1"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdown-button"
            >
              {[
                "reuters",
                "espn",
                "yahoo entertainment",
                "minneapolis star tribune",
                "al-jazeera-english",
                "cnn",
                "usa-today",
                "new york post",
              ].map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search by title or description..."
              required
              onChange={handleSearch}
              value={searchQuery}
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      <div className="flex justify-center items-center mt-4">
        <BLogsComp blogs={currentBlogs} /> {/* Pass blogs directly */}
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </span>
        }
        previousLabel={
          <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </span>
        }
        onPageChange={handlePageClick}
        pageCount={Math.ceil(filteredBlogs.length / blogsPerPage)} // Calculate total page count
        containerClassName="flex justify-center items-center mt-4"
        pageClassName="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        activeClassName="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        breakClassName="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      />
    </section>
  );
};

export default AllPostsPage;
