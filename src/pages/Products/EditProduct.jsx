import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import ProductForm from "../../components/ProductForm";
import { useEffect } from "react";

const EditProduct = () => {
  const { id } = useParams();

  useEffect(() => {
    document.title = "Update";
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="h-20" />
      <ProductForm mode="edit" productId={id} />
    </div>
  );
};

export default EditProduct;