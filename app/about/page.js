"use client";
import AboutPage from "../../components/pages/About/index";
import Gallery from "../../components/pages/About/GalleryComponent";
import FooterPage from "../../components/pages/About/widgets/FooterPage";

function About() {
  return (
    <div className="aboutPage">
      <AboutPage />
      <Gallery />
      <FooterPage />
    </div>
  );
}

export default About;
