import InfoTooltipSuccess from "../images/InfoTooltipSuccess.svg";
import InfoTooltipUnsuccess from "../images/InfoTooltipUnsuccess.svg";

function InfoTooltip ({
   onClose,
   isOpen,
   message
}) {

   return (

     <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
       <div className="popup__container popup_type_tooltip">
         <button
           className="popup__close"
           onClick={onClose}
           type="button"
         ></button>
         <img
           className="popup__status-image"
           src={message.status ? InfoTooltipSuccess : InfoTooltipUnsuccess}
         ></img>
         <p className="popup__status-text">{message.text}</p>
       </div>
     </div>
   );
 };
 
 export default InfoTooltip;