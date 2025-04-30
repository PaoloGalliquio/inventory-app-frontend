import React, { useState } from 'react'
import { useManagePostRequest } from '../../hooks/useManageRequest/useManageRequest';
import Product from './Product';

function CreateProduct({ show, setShow, categories }) {
  
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [executePost] = useManagePostRequest();

  const handleCreate = async () => {
    setIsLoading(true);
    const response = await executePost("/api/Product", formValues, () => {});
    if (response.status === 200) {
      setShow(false);
    }
    setIsLoading(false);
  };
  
  return (
    <Product
      show={show}
      setShow={setShow}
      canEdit={true}
      categories={categories}
      product={null}
      title="Crear Producto"
      handleSubmit={handleCreate}
      formValues={formValues}
      setFormValues={setFormValues}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
}

export default CreateProduct