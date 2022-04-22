import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Head, Navbar, Blog } from "../components";
import { authActions, validateToken } from "../features/auth/authSlice";
import { fetchAuthor, authorActions } from "../features/author/authorSlice";
import { fetchBlog, blogActions } from "../features/blog/blogSlice";

export default function Home() {
  const dispatch = useDispatch();

  const blogState = useSelector((state) => state.blog);
  const authorState = useSelector((state) => state.author);
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBlog());

    return () => {
      dispatch(blogActions.reset());
      dispatch(authorActions.reset());
      dispatch(authActions.reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (authState.user) dispatch(validateToken());
  }, [authState.user, dispatch]);

  useEffect(() => {
    if (blogState.isSuccess) {
      let uniqueAuthors = {};
      blogState.blogs.forEach((element) => {
        if (!authorState.authorMap[element.author]) {
          uniqueAuthors[element.author] = element["_links"].author[0].href;
        }
      });

      if (Object.keys(uniqueAuthors).length > 0)
        dispatch(fetchAuthor(Object.values(uniqueAuthors)));
    }
  }, [blogState, authorState.authorMap, dispatch]);

  return (
    <>
      <Head />
      <Navbar />

      {authState.isLoading && (
        <section className="welcome logged-in">
          Getting user please wait
        </section>
      )}

      {authState.user && authState.isValid && !authState.isLoading && (
        <section className="welcome logged-in">
          Welcome {authState.user.user_display_name} !
        </section>
      )}

      {authState.user && !authState.isValid && !authState.isLoading && (
        <section className="welcome logged-in">
          <Link to="/login">Session expired please login again</Link>
        </section>
      )}

      <div itemScope itemType="https://schema.org/Blog">
        {blogState.isLoading || blogState.isError
          ? blogState.message
          : blogState.blogs.map((blog) => (
              <Blog
                key={blog.id}
                title={blog.title.rendered}
                date={blog.date}
                author={authorState.authorMap[blog.author] || "..fetching"}
                content={blog.content.rendered}
              />
            ))}
      </div>
    </>
  );
}
