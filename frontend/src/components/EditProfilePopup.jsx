import PopupWithForm from "./PopupWithForm";
import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditFrofilePopup({
  isOpen,
  onClose,
  onUpdateUser
}) {

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function hadleChangeName(e) {
    setName(e.target.value);
  }

  function hadleChangeAbout(e) {
    setDescription(e.target.value);
  }

  function handleSumbit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSumbit}
    >
      <input
        name="name"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        type="text"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={hadleChangeName}
      />
      <span id="popup-name-error" className="error"></span>
      <input
        name="about"
        className="popup__input popup__input_type_activity"
        placeholder="О себе"
        type="text"
        required
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={hadleChangeAbout}
      />
      <span id="popup-activity-error" className="error"></span>
    </PopupWithForm>
  )
}

export default EditFrofilePopup;