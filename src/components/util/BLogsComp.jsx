import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BLogsComp = ({ blogs }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a delay to show the skeleton while data is loading
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after a delay (simulating data fetch)
    }, 1300);

    // Cleanup timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleBlogClick = (blog) => {
    navigate("/blog", { state: blog });
  };

  // If loading, show skeletons
  if (loading) {
    return (
      <div className="grid gap-8 mt-[82px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto cursor-pointer">
        {Array(6)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-[20px] overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <div className="p-4">
                  <Skeleton height={300} className="mb-4" />
                  <h3 className="text-slate-50 text-2xl font-bold text-center mb-2">
                    <Skeleton width={200} />
                  </h3>
                  <p className="text-gray-400 text-xl font-normal text-center mb-2">
                    <Skeleton width={100} />
                  </p>
                  <h4 className="text-gray-400 text-xl font-normal text-center mb-4">
                    <Skeleton width={150} />
                  </h4>
                  <p className="text-slate-50 text-xl font-normal text-center">
                    <Skeleton count={3} />
                  </p>
                </div>
              </SkeletonTheme>
            </div>
          ))}
      </div>
    );
  }

  // If blogs are available and not loading, show the content
  if (!blogs || blogs.length === 0) {
    return <p className="text-center text-gray-400">No blogs found.</p>;
  }

  return (
    <div className="grid gap-8 mt-[82px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto cursor-pointer">
      {blogs.map((blog, index) => (
        <div
          key={index}
          className="bg-slate-800 rounded-[20px] overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300"
          onClick={() => handleBlogClick(blog)}
        >
          <img
            src={
              blog.urlToImage &&
              blog.urlToImage.trim() !== "" &&
              blog.urlToImage !== "null" &&
              blog.urlToImage !== null
                ? blog.urlToImage
                : "https://cdn.pixabay.com/photo/2016/01/31/16/34/blogging-1171731_1280.jpg"
            }
            alt={blog.title || "Default blog image"}
            className="w-full h-[300px] object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.src =
                "https://cdn.pixabay.com/photo/2016/01/31/16/34/blogging-1171731_1280.jpg";
            }}
          />
          <div className="p-4">
            <h3 className="text-slate-50 text-2xl font-bold text-center mb-2">
              {blog.title ? blog.title.slice(0, 50) : <Skeleton />}
            </h3>
            <p className="text-gray-400 text-xl font-normal text-center mb-2">
              {blog.publishedAt ? blog.publishedAt.slice(0, 10) : <Skeleton />}
            </p>
            <h4 className="text-gray-400 text-xl font-normal text-center mb-4">
              {blog.author ? blog.author : <Skeleton />}
            </h4>
            <p className="text-slate-50 text-xl font-normal text-center">
              {blog.description ? (
                blog.description.slice(0, 100)
              ) : (
                <Skeleton count={3} />
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(BLogsComp);
