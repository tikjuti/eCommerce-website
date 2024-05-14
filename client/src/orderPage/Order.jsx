import PageHeader from "../components/PageHeader";
const Order = () => {
  return (
    <div>
      <PageHeader title={"Order"} curPage={"Order Page"} />

      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cat-product">Product</th>
                    <th className="cat-price">Price</th>
                    <th className="cat-quantity">Quantity</th>
                    <th className="cat-toprice">Total</th>
                    <th className="cat-edit">Status</th>
                  </tr>
                </thead>

                {/* <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td className="product-item cat-product">
                        <div className="p-thumb">
                          <Link to={`/shop/${item.id}`}>
                            <img src={item.image} alt="" />
                          </Link>
                        </div>
                        <div className="p-content">
                          <Link to={`/shop/${item.id}`}>{item.title}</Link>
                        </div>
                      </td>

                      <td className="cat-price">${item.price}</td>
                      <td className="cat-quantity">
                        <div className="cart-plus-minus">
                          <div
                            className="dec qtybutton"
                            onClick={() => handleDescrease(item)}
                          >
                            -
                          </div>
                          <input
                            type="text"
                            className="cart-plus-minus-box"
                            name="qtybutton"
                            value={item.quantity}
                          />
                          <div
                            className="inc qtybutton"
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </div>
                        </div>
                      </td>

                      <td className="cat-toprice">
                        ${caculateTotalPrice(item)}
                      </td>
                      <td className="cat-edit">
                        <a href="" onClick={() => handleRemoveItems(item)}>
                          <img src={delImgUrl} alt="" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Order;
