import { useState, useEffect } from "react";
import ProductData from "../utilis/productData";
import PageHeader from "../components/PageHeader";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import Search from "./Search";
import ShopCategory from "./ShopCategory";
import PopularPost from "./PopularPost";
import Tags from "./Tags";

const Shop = () => {
  const productsData = ProductData();
  const showResults = `Showing 01 - 12 of ${productsData.length} results`;
  const [gridList, setGridList] = useState(true);
  const [products, setProducts] = useState(productsData);
  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  //   pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  //   funtion to change current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //   filter products based on category
  const [selectedCategory, setSelectedCategory] = useState("All");
  const menuItems = [...new Set(productsData.map((val) => val.category))];

  const filterItems = (curcat) => {
    const newItem = productsData.filter((newVal) => {
      return newVal.category === curcat;
    });

    setSelectedCategory(curcat);
    setProducts(newItem);
  };

  return (
    <div>
      <PageHeader title="Our Shop Page" curPage="Shop" />

      {/* shop page */}
      <div className="shop-page padding-tb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="shop-title d-flex flex-wrap justify-content-between">
                  <p>{showResults}</p>
                  <div
                    className={`product-view-mode ${
                      gridList ? "gridActive" : "listActive"
                    }`}
                  >
                    <a className="grid" onClick={() => setGridList(!gridList)}>
                      <i className="icofont-ghost"></i>
                    </a>
                    <a className="list" onClick={() => setGridList(!gridList)}>
                      <i className="icofont-listine-dots"></i>
                    </a>
                  </div>
                </div>

                {/* products card */}
                <div>
                  <ProductCard gridList={gridList} products={currentProducts} />
                </div>

                {/* pagination */}
                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={products.length}
                  paginate={paginate}
                  activePage={currentPage}
                />
              </article>
            </div>
            <div className="col-lg-4 col-12">
              <aside>
                <Search products={products} gridList={gridList} />
                <ShopCategory
                  filterItems={filterItems}
                  setItems={setProducts}
                  menuItems={menuItems}
                  setProducts={setProducts}
                  selectedCategory={selectedCategory}
                />
                <PopularPost />
                <Tags />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
