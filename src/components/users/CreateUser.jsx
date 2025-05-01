import React, { useState } from 'react'
import { useManagePostRequest } from '../../hooks/useManageRequest/useManageRequest';
import User from './User';

function CreateUser({ closeModal, refreshPage, roles }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [executePost] = useManagePostRequest();

  const handleCreate = async () => {
    setIsLoading(true);
    await executePost("/api/User", formValues, successSubmitCallback);
    setIsLoading(false);
  };

  const successSubmitCallback = async () => {
    closeModal();
    await refreshPage();
  };

  return (
    <User
      closeModal={closeModal}
      title="Crear Usuario"
      canEdit={true}
      roles={roles}
      handleSubmit={handleCreate}
      formValues={formValues}
      setFormValues={setFormValues}
      isLoading={isLoading}
    />
  );
}

export default CreateUser