import { useEffect, useState, useContext, useRef } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    category: "",
    search: "",
    sort: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Inventory"
    fetchProducts();
  }, [filter.category, filter.sort, filter.search]);

  function debounce(fn, delay) {
    let timer;

    return function (...args) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }

  const searchApi = (query) => {
    console.log("search Api called : ", query);
    setFilter((prev) => ({
      ...prev,
      search: query
    }));
  };

  const handleSearch = useRef(
    debounce((e) => {
      searchApi(e.target.value);
    }, 300)
  ).current;

  const onSearchChange = (e) => {
    setSearchInput(e.target.value);
    handleSearch(e);
  };

  const handleOnChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const fetchProducts = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get("/products", {
        params: filter,
      });

      setProducts(res?.data?.products);
    } catch (error) {
      toast.error("Something went wrong while fetching products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      toast.success("Deleted successfully");
      fetchProducts();
    } catch {
      toast.error("Semething went wrong while deleting product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Header />
      <div className="h-16" />

      {/* Filters */}
      <div className="px-4 md:px-6 pt-6 pb-2">
        <div className="grid gap-3 md:grid-cols-3">

          <input
            type="text"
            placeholder="Search products..."
            className="px-3 py-2 text-sm border border-blue-500 focus:outline-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500"
            name="search"
            value={searchInput}
            onChange={onSearchChange}
          />

          <select
            className="px-3 py-2 text-sm border rounded-lg border-blue-500 focus:outline-blue-400 focus:ring-2 focus:ring-blue-500"
            name="category"
            value={filter.category}
            onChange={handleOnChange}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Clothing">Clothing</option>
            <option value="Home">Home</option>
          </select>

          <select
            className="px-3 py-2 text-sm border rounded-lg border-blue-500 focus:outline-blue-400 focus:ring-2 focus:ring-blue-500"
            name="sort"
            value={filter.sort}
            onChange={handleOnChange}
          >
            <option value="">Sort By</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>

        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 md:px-6 py-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <TailSpin height="36" width="36" color="#3267d1" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-sm text-gray-400 mt-10">No products found</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 leading-snug">
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {product.description}
                  </p>

                  <p className="mt-2 text-blue-600 font-bold text-base">
                    ₹ {product.price}
                  </p>
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full font-medium ${product.quantity < 10
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                      }`}
                  >
                    {product.quantity < 10
                      ? `Low Stock (${product.quantity})`
                      : `In Stock (${product.quantity})`}
                  </span>

                  <span className="text-xs text-gray-400">{product.category}</span>
                </div>
                {isAuthenticated &&
                  <div className="mt-3 flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/edit/${product._id}`)}
                      className="text-blue-600 text-xs bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 hover:cursor-pointer transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 text-xs bg-red-50 px-3 py-1.5 rounded-md hover:bg-red-100 hover:cursor-pointer transition"
                    >
                      Delete
                    </button>
                  </div>
                }
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;