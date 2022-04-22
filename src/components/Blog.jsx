import React from "react";
import PropTypes from "prop-types";
import { Markup } from "interweave";

function Blog(props) {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return (
    <article
      itemScope
      itemType="http://schema.org/BlogPosting"
      className="post"
    >
      <header>
        <h2 itemProp="headline">{props.title}</h2>

        <div className="date">
          <strong>Publish Date</strong>:
          <span itemProp="datePublished">
            <time dateTime={new Date(props.date).toISOString().split("T")[0]}>
              {new Date(props.date).toLocaleDateString("en-US", options)}
            </time>
          </span>
        </div>

        <div className="author">
          <strong>Author</strong>:<span itemProp="author">{props.author}</span>
        </div>
      </header>

      <div itemProp="articleBody" className="content">
        <Markup content={props.content} />
      </div>
    </article>
  );
}

Blog.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Blog;
