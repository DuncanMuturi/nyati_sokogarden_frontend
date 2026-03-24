import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetProductsComponent = () => {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState("");
  let [error, setError] = useState("");
  let [trousers, setTrousers] = useState([]);
  // let [tshirst, setTshirts] = useState([]);
  let [jackets, setJackets] = useState([]);
  let [search_word, setSearchWord] = useState("");
  let [filtered_products, setFilteredProducts] = useState([]);

  let navigator = useNavigate();

  // base url for image path from server
  const img_url = "https://kvictor.alwaysdata.net/static/images/";

  // create function to fetch products from server
  const getProducts = async () => {
    console.log("getting products");
    setError("");
    setLoading("Fetching products. Please wait...");

    try {
      const response = await axios.get(
        "https://kvictor.alwaysdata.net/api/get_products",
      );
      console.log(response);
      if (response.status === 200) {
        setLoading("");
        setProducts(response.data);

        let jackets_cat = response.data.filter(
          (product) => product.product_category === "jackets",
        );
        setJackets(jackets_cat);

        let trousers_cat = response.data.filter(
          (product) => product.product_category === "trousers",
        );
        setTrousers(trousers_cat);
      }
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSearch = (search_word) => {
    let filterd = products.filter((product) =>
      product.product_name.toLowerCase().includes(search_word.toLowerCase()),
    );
    setFilteredProducts(filterd);
  };

  useEffect(() => {
    handleSearch(search_word);
  }, [search_word]);

  return (
    <div>
      <NavbarComponent />
      <div className="row">
        <h3 className="mt-5">Available Products</h3>
        <h6 className="text-warning">{loading}</h6>
        <h6 className="text-danger">{error}</h6>

        <div className="row justify-content-center my-3">
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Search Product by name"
              className="form-control"
              value={search_word}
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
            />
          </div>
        </div>

        {filtered_products.map((product) => (
          <div className="col-md-3 justify-content-center mb-4">
            <div className="card shadow card-margin">
              <img
                src={img_url + product.product_image}
                alt=""
                className="product_img mt-4"
              />

              <div className="card-body">
                <h5 className="mt-2">{product.product_name}</h5>
                <p className="text-muted">{product.product_description}</p>
                <b className="text-warning">{product.product_cost}</b>
                <br />
                <br />
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    navigator("/makepayment", { state: { product } });
                  }}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
        ))}

        <h2 className="text-center text-white bg-dark my-2 p-4">Jackets</h2>

        {jackets.map((product) => (
          <div className="col-md-3 justify-content-center mb-4">
            <div className="card shadow card-margin">
              <img
                src={img_url + product.product_image}
                alt=""
                className="product_img mt-4"
              />

              <div className="card-body">
                <h5 className="mt-2">{product.product_name}</h5>
                <p className="text-muted">{product.product_description}</p>
                <b className="text-warning">{product.product_cost}</b>
                <br />
                <br />
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    navigator("/makepayment", { state: { product } });
                  }}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
        ))}

        <h2 className="text-center text-white bg-dark my-2 p-4">Trousers</h2>

        {trousers.map((product) => (
          <div className="col-md-3 justify-content-center mb-4">
            <div className="card shadow card-margin">
              <img
                src={img_url + product.product_image}
                alt=""
                className="product_img mt-4"
              />

              <div className="card-body">
                <h5 className="mt-2">{product.product_name}</h5>
                <p className="text-muted">{product.product_description}</p>
                <b className="text-warning">{product.product_cost}</b>
                <br />
                <br />
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    navigator("/makepayment", { state: { product } });
                  }}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetProductsComponent;
