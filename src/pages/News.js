import React from "react";

import NewsCard from "../components/NewsCard";

function News() {
  return (
    <div className="news-page">
      <h3>News</h3>
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
    </div>
  );
}

export default News;
