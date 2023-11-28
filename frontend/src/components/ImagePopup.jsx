function ImagePopup({
  card,
  onClose
}) {

  return (
    <div
      className={`popup popup_image popup-images ${card ? "popup_opened" : ""}`}>
      <div className="popup__container-image">
        <img
          src={card?.link}
          alt={card?.name}
          className="popup__image"
        />
        <h3 className="popup__image-name">{card ? card.name : ""}</h3>
        <button
          className="popup__close popup__close-image"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  )
}
export default ImagePopup;
