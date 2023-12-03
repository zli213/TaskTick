"use client";
import React, { useState } from "react";
import Modal from "../../../components/pages/About/widgets/Modal";

export default function MemberModal() {
  const [modalShow, setModalShow] = useState(false);

  const handleOpenModal = () => {
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
  };
  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      <Modal show={modalShow} onClose={handleCloseModal}>
        <p>This is modal content!</p>
      </Modal>
    </div>
  );
}
