import Banner from "./Banner";
import HomeCategory from "./HomeCategory";
import CategoryShowCase from "./CategoryShowCase";
import Register from "./Register";
import AppSection from "./AppSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <HomeCategory />
      {/* <CategoryShowCase /> */}
      <Register />
      <AppSection />
    </div>
  );
};

export default Home;
