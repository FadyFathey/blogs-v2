import React from "react";
import { Link } from "react-router-dom";
import blogIcon from "../assets/blogsIcon.svg";
import BLogsComp from "./util/BLogsComp";
import { staticData } from "../staticData";

const Blogs = () => {
  // Limit the number of blogs to 10 for the homepage
  const limitedBlogs = staticData.slice(0, 10);

  return (
    <section className="mt-[36px] md:mt-[95px] px-4">
      {/* Start blogs heading */}
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-slate-50 text-xl md:text-5xl font-bold">
            Top
          </span>
          <span className="text-cyan-400 text-xl md:text-5xl font-bold">
            headlines
          </span>
        </div>

        {/* View All Posts Link */}
        <Link
          to="/all-blogs"
          className="flex items-center gap-2 md:gap-3 hover:text-cyan-400"
        >
          <div className="text-slate-50 text-xs md:text-xl">View all Posts</div>
          <img src={blogIcon} alt="blogIcon" className="w-[50px] md:w-11" />
        </Link>
      </div>
      {/* End blogs heading */}

      {/* Start blogs card */}
      {/* Pass limitedBlogs as prop to BLogsComp */}
      <BLogsComp blogs={limitedBlogs} />
      {/* End blogs card */}
    </section>
  );
};

export default Blogs;
