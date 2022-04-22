import { Markup } from "interweave";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Head, Navbar } from "../components";
import { fetchAbout, aboutActions } from "../features/about/aboutSlice";

export default function About() {
  const dispatch = useDispatch();

  const aboutState = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(fetchAbout());
    return () => {
      dispatch(aboutActions.reset());
    };
  }, [dispatch]);

  return (
    <>
      <Head type="About" />
      <Navbar />
      <h1>About</h1>

      <div className="page">
        {aboutState.isLoading || aboutState.isError ? (
          aboutState.message
        ) : (
          <Markup content={aboutState.about} />
        )}
      </div>
    </>
  );
}
