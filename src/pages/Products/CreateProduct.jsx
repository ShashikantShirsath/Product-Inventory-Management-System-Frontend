import Header from "../../components/Header";
import ProductForm from "../../components/ProductForm";

const CreateProduct = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="h-20" />
      <ProductForm mode="create" />
    </div>
  );
};

export default CreateProduct;