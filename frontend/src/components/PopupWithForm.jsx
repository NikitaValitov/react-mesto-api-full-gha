function PopupWithForm({
   name,
   title,
   children,
   buttonText,
   isOpen,
   onClose,
   onSubmit
}) {

   return (
      <div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
         <div className="popup__container">
            <h2 className="popup__text">{title}</h2>
            <form
               className={`popup__form-${name}`}
               name={`popup__form - ${name}`}
               onSubmit={onSubmit}
            >
               {children}
               <button
                  className="popup__save"
                  type="submit">
                  {buttonText}
               </button>
            </form>
            <button
               className="popup__close"
               onClick={onClose}
               type="button"
            />
         </div>
      </div>
   );
}

export default PopupWithForm;