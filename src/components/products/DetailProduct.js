import React, { useEffect, useState } from 'react'
import Product from './Product';
import { useManageGetRequest } from '../../hooks/useManageRequest/useManageRequest';

function DetailProduct({ closeModal, refreshPage, product, categories }) {
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [executeGet] = useManageGetRequest();

  const init = async () => {
    await executeGet(`/api/Product/${product.IdProduct}`, (response) => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Product
      closeModal={closeModal}
      title="Detalle de Producto"
      canEdit={false}
      categories={categories}
      formValues={formValues}
      isLoading={isLoading}
    />
  );
}

export default DetailProduct;