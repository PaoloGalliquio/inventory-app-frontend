import React, { useEffect, useState } from 'react'
import User from './User';
import { useManageGetRequest } from '../../hooks/useManageRequest/useManageRequest';

function DetailUser({ closeModal, refreshPage, user, roles }) {
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [executeGet] = useManageGetRequest();

  const init = async () => {
    await executeGet(`/api/User/${user.IdUser}`, (response) => {
      setFormValues(response.data ?? {});
    });
  };

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      init();
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <User
      closeModal={closeModal}
      title="Detalle de Usero"
      canEdit={false}
      roles={roles}
      formValues={formValues}
      isLoading={isLoading}
    />
  );
}

export default DetailUser;