import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Hero />
      <SearchBar />
      <Categories />
      <FeaturedProducts />
      <Footer />
    </>
  );
}

export default Home;