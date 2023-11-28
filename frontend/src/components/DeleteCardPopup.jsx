import PopupWithForm from "./PopupWithForm";
import React from "react";

function DeleteCardPopup ({
   isOpen,
   onClose,
   onConfirm,
   deletedCard
}) {

   function handleDeleteCardConfirm(e) {
      e.preventDefault();
      onConfirm(deletedCard);
   }

   return (
      <PopupWithForm
      name="delete"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteCardConfirm}
   >
      </PopupWithForm>
   )
}

export default DeleteCardPopup;