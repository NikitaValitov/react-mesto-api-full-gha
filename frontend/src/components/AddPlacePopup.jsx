import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({
   isOpen,
   onClose,
   onAddPlace
}) {

   const [name, setName] = React.useState("");
   const [link, setLink] = React.useState("");

   React.useEffect(() => {
      setName("");
      setLink("");
   }, [isOpen]);

   function handleNameChange(e) {
      setName(e.target.value);
   }

   function handleLinkChange(e) {
      setLink(e.target.value);
   }

   function handleSubmit(e) {
      e.preventDefault();
      onAddPlace({
         name,
         link
      });
   }

   return (
      <PopupWithForm
         name="add"
         title="Новое место"
         buttonText="Создать"
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit}
      >
         <input
            name="name"
            className="popup__input popup__input_type_image-name"
            placeholder="Название"
            type="text"
            required
            minLength="2"
            maxLength="30"
            onChange={handleNameChange}
            value={name}
         />
         <span id="name-error" className="error"></span>
         <input
            name="link"
            className="popup__input popup__input_type_image-link"
            placeholder="Ссылка на картинку"
            type="url"
            required
            onChange={handleLinkChange}
            value={link}
         />
         <span id="link-error" className="error"></span>
      </PopupWithForm>
   )
}
export default AddPlacePopup;