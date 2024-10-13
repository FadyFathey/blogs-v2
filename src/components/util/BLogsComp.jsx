import React from "react";
import { useNavigate } from "react-router-dom";

const BLogsComp = ({ blogs }) => {
  const navigate = useNavigate();

  const handleBlogClick = (blog) => {
    navigate("/blog", { state: blog });
  };

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
              {blog.title}
            </h3>
            <p className="text-gray-400 text-xl font-normal text-center mb-2">
              {blog.publishedAt.slice(0, 10)}
            </p>
            <h4 className="text-gray-400 text-xl font-normal text-center mb-4">
              {blog.author}
            </h4>
            <p className="text-slate-50 text-xl font-normal text-center">
              {blog.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(BLogsComp);
