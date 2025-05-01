import React, { useEffect, useState } from 'react'
import { useManageGetRequest, useManagePutRequest } from '../../hooks/useManageRequest/useManageRequest';
import User from './User';

function EditUser({ closeModal, refreshPage, user, roles }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [executePut] = useManagePutRequest();
  const [executeGet] = useManageGetRequest();

  const handleUpdate = async () => {
    setIsLoading(true);
    await executePut(
      `/api/User/${user.IdUser}`,
      formValues,
      successSubmitCallback
    );
    setIsLoading(false);
  };

  const successSubmitCallback = async () => {
    closeModal();
    await refreshPage();
  };
  
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

  return (
    <User
      closeModal={closeModal}
      title="Editar Usuario"
      canEdit={true}
      roles={roles}
      handleSubmit={handleUpdate}
      formValues={formValues}
      setFormValues={setFormValues}
      isLoading={isLoading}
    />
  );
}

export default EditUser;