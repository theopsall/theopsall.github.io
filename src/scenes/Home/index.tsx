import { lazy, Suspense } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Index from "./components/Index";
import "./index.css";

// Lazy load below-the-fold sections
const AboutMe = lazy(() => import("./components/AboutMe"));
const Projects = lazy(() => import("./components/Projects"));
const Info = lazy(() => import("./components/Info"));

const SectionLoader = () => (
  <div className="section-loader" style={{ minHeight: "200px" }}>
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-48" />
  </div>
);

const Home = () => {
  return (
    <div className="home-screen">
      <Header />
      <Index />

      <Suspense fallback={<SectionLoader />}>
        <AboutMe />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Info />
      </Suspense>

      <Footer />
    </div>
  );
};
export default Home;
