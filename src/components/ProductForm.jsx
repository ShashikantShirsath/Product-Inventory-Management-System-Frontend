import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductForm = ({ mode = "create", productId }) => {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: ""
    });
    const [formErrors, setFormErrors] = useState({
        name: false,
        description: false,
        price: false,
        quantity: false,
        category: false
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (mode === "edit" && productId) {
            fetchProduct();
        }
    }, [mode, productId]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/products/${productId}`);
            setProduct(res.data.product);
        } catch {
            toast.error("Failed to fetch product");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProduct((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        setFormErrors((prev) => ({
            ...prev,
            [e.target.name]: false
        }));
    };

    const validateForm = () => {
        let errors = {
            name: false,
            description: false,
            price: false,
            quantity: false,
            category: false
        };

        if (!product.name) errors.name = true;
        if (!product.description) errors.description = true;
        if (!product.price || Number(product.price) <= 0) errors.price = true;
        if (!product.quantity || Number(product.quantity) < 0) errors.quantity = true;
        if (!product.category) errors.category = true;

        setFormErrors(errors);

        return !errors.name && !errors.description && !errors.price && !errors.quantity && !errors.category;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            if (!validateForm()) return;

            if (mode === "create") {
                await axios.post("/products", product);
                toast.success("Product created successfully");
            } else {
                await axios.put(`/products/${productId}`, product);
                toast.success("Product updated successfully");
            }

            navigate("/");
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="h-6" />
            <div className="max-w-md mx-auto bg-white p-5 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-3 text-center text-gray-800">
                    {mode === "create" ? "Add New Product" : "Edit Product"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <input
                            name="name"
                            value={product.name}
                            placeholder="Product name"
                            onChange={handleChange}
                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.name ? "border-red-500" : "border-blue-500"}`}
                        />
                        {formErrors.name && (
                            <p className="text-red-500 text-xs mt-1">Please enter a name</p>
                        )}
                    </div>

                    <div>
                        <textarea
                            name="description"
                            value={product.description}
                            placeholder="Product description"
                            onChange={handleChange}
                            rows={3}
                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.description ? "border-red-500" : "border-blue-500"}`}
                        />
                        {formErrors.description && (
                            <p className="text-red-500 text-xs mt-1">Please enter a description</p>
                        )}
                    </div>

                    <div>
                        <input
                            name="price"
                            type="number"
                            value={product.price}
                            placeholder="Price (₹)"
                            onChange={handleChange}
                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.price ? "border-red-500" : "border-blue-500"}`}
                        />
                        {formErrors.price && (
                            <p className="text-red-500 text-xs mt-1">Please enter a valid price</p>
                        )}
                    </div>

                    <div>
                        <input
                            name="quantity"
                            type="number"
                            value={product.quantity}
                            placeholder="Stock quantity"
                            onChange={handleChange}
                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.quantity ? "border-red-500" : "border-blue-500"}`}
                        />
                        {formErrors.quantity && (
                            <p className="text-red-500 text-xs mt-1">Please enter a valid quantity</p>
                        )}
                    </div>

                    <div>
                        <input
                            name="category"
                            value={product.category}
                            placeholder="Category"
                            onChange={handleChange}
                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.category ? "border-red-500" : "border-blue-500"}`}
                        />
                        {formErrors.category && (
                            <p className="text-red-500 text-xs mt-1">Please enter a category</p>
                        )}
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer disabled:opacity-60 transition"
                    >
                        {loading
                            ? "Processing..."
                            : mode === "create"
                                ? "Create Product"
                                : "Update Product"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default ProductForm;