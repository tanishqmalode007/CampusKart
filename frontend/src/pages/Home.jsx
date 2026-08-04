import { useState, useEffect } from "react";

import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import WelcomeModal from "../components/WelcomeModal";
import { useAuth } from "../context/AuthContext";

function Home() {
    const { isLoggedIn } = useAuth();

  const [showModal, setShowModal] = useState(false);

 useEffect(() => {
  if (!isLoggedIn) {
    setShowModal(true);
  } else {
    setShowModal(false);
  }
}, [isLoggedIn]);

  const closeModal = () => {
  setShowModal(false);
};

  return (
    <>

      <WelcomeModal
        isOpen={showModal}
        onClose={closeModal}
      />

      <Hero />
      <SearchBar />
      <Categories />
      <FeaturedProducts />
      <Footer />

    </>
  );
}

export default Home;