import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({
   isOpen,
   onClose,
   onUpdateAvatar
}) {

   const inputRef = React.useRef();

   function handleSumbit(e) {
      e.preventDefault();
      onUpdateAvatar({
         avatar: inputRef.current.value,
      });
   }

   React.useEffect(() => {
      inputRef.current.value = "";
   }, [isOpen]);

   return (
      <PopupWithForm
         name="avatar"
         title="Обновить аватар"
         buttonText="Сохранить"
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSumbit}
      >
         <input
            name="avatar"
            className="popup__input popup__input_type_avatar"
            placeholder="Ссылка на изображение"
            type="url"
            required
            ref={inputRef}
         />
         <span
            id="linkAvatar-error"
            className="error"
         >
         </span>
      </PopupWithForm>
   )
}
export default EditAvatarPopup;