import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card({
   card,
   onCardClick,
   onCardLike,
   onCardDelete
}) {

   const currentUser = useContext(CurrentUserContext);

   const isOwn = card.owner === currentUser._id;

   const isLiked = card.likes.some(id => id === currentUser._id);

   const cardLikeButtonClassName = (
      `elements__like ${isLiked && 'elements__like_active'}`
   );

   function handleCardClick() {
      onCardClick(card);
   }

   function handleLikeClick() {
      onCardLike(card);
   }

   function handleDeleteClick() {
      onCardDelete(card);
   }

   return (
      <li className="elements__card">
         <img
            className="elements__image"
            src={card.link}
            alt={card.name}
            onClick={handleCardClick} />
         <div className="elements__info">
            <h2 className="elements__name">{card.name}</h2>
            <div className="elements__btn">
               <button
                  className={cardLikeButtonClassName}
                  type="button"
                  onClick={handleLikeClick}
               ></button>
               <div className="elements__like-sum">{card.likes.length}</div>
            </div>
         </div>
         {isOwn && <button
            className="elements__del"
            type="button"
            onClick={handleDeleteClick} ></button>}
      </li>
   )
}

export default Card;