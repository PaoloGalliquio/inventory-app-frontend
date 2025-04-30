import React from 'react'
import { useManageDeleteRequest } from '../../hooks/useManageRequest/useManageRequest';

function DeleteProduct() {
  const [executeDelete] = useManageDeleteRequest();
  return (
    <div>DeleteProduct</div>
  )
}

export default DeleteProduct