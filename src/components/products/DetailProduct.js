import React, { useEffect, useState } from 'react'
import Product from './Product';
import { useManageGetRequest, useManagePutRequest } from '../../hooks/useManageRequest/useManageRequest';

function DetailProduct({ show, setShow, categories, product, setProduct }) {
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [executePut] = useManagePutRequest();
  const [executeGet] = useManageGetRequest();

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

  if(isLoading) return <></>;
  
  return (
    <Product
      show={show}
      setShow={setShow}
      canEdit={false}
      categories={categories}
      product={product}
      setProduct={setProduct}
      title="Detalle Producto"
      formValues={formValues}
      setFormValues={setFormValues}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
}

export default DetailProduct;