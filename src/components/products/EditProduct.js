import React, { useEffect, useState } from 'react'
import Product from './Product';
import { useManageGetRequest, useManagePutRequest } from '../../hooks/useManageRequest/useManageRequest';

function EditProduct({ show, setShow, categories, product, setProduct }) {
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [executePut] = useManagePutRequest();
  const [executeGet] = useManageGetRequest();

  const handleUpdate = async () => {
    setIsLoading(true);
    const response = await executePut(
      `/api/Product/${product.idProduct}`,
      formValues,
      () => {}
    );
    if (response.status === 200) {
      setProduct(null);
      setShow(false);
    }
    setIsLoading(false);
  };

  const init = async () => {
    await executeGet(`/api/Product/${product.idProduct}`, (response) => {
      setFormValues(response.data ?? {});
    });
  };

  useEffect(() => {
    setIsLoading(true);
    if (product) {
      init();
    }
    setIsLoading(false);
  }, []);
  
  return (
    <Product
      show={show}
      setShow={setShow}
      canEdit={true}
      categories={categories}
      product={product}
      setProduct={setProduct}
      title="Editar Producto"
      handleSubmit={handleUpdate}
      formValues={formValues}
      setFormValues={setFormValues}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
}

export default EditProduct