import React from 'react'
import { Modal } from 'react-bootstrap';

function ModalEnabled({
  modalEnabled = { isEnable: false },
  setModalEnabled,
  refreshPage,
}) {
  return (
    <Modal
      show={modalEnabled.isEnable}
      onHide={() => setModalEnabled({ isEnable: false })}>
      {modalEnabled.component && typeof modalEnabled.component !== "symbol" ? (
        <modalEnabled.component
          closeModal={() => setModalEnabled({ isEnable: false })}
          refreshPage={refreshPage}
          {...modalEnabled.props}
        />
      ) : (
        <React.Fragment />
      )}
    </Modal>
  );
}

export default ModalEnabled