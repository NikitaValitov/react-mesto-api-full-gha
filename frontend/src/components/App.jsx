import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth.js";
import DeleteCardPopup from "./DeleteCardPopup";


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const [infoTooltipMessage, setInfoTooltipMessage] = useState({
    status: "",
    text: "",
  });


  const checkToken = async (jwt) => {
    return auth.checkToken(jwt)
      .then((res) => {
        if (jwt) {
          setLoggedIn(true);
          setUserEmail(res.email);
          navigate('/');
        }
      })
      .catch((err) => {
        console.error('Что-то пошло не так', err);
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      checkToken(jwt);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) navigate('/');
  }, [loggedIn, navigate]);


  const onRegister = ({ email, password }) => {
    return auth.register(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipMessage({
          status: true,
          text: "Вы успешно зарегистрировались!",
        })
      })
      .then(() => navigate('/sign-in'))
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipMessage({
          status: false,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        console.log(err);
      });
  };

  const onLogin = ({ email, password }) => {
    return auth.authorize(email, password)
      .then((res) => {
        if (!res) throw new Error('Неправильные почта пользователя или пароль');
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          navigate('/', { replace: true });
          setUserEmail(email);
        }
      })
      .catch((err) => {
        console.error('Что-то пошло не так', err);
      })
  }

  const logOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in');
  };

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfileInfo(), api.getInitialCards()])
        .then(([data, cards]) => {
          setCurrentUser(data);
          setCards(cards);
          setCards(cards.reverse());
        })
        .catch((err) => {
          console.log('Ошибка при получении данных юзера и карточек: ', err);
        })
    }

  }, [loggedIn])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteCard(card) {
    setIsConfirmPopupOpen(true);
    setCardToDelete(card);
  }


  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
    setIsConfirmPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log('Ошибка при лайкедизлайке', err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка при удалении карточки', err);
      });
  }

  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка при обновлении данных профиля', err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка при обновлении аватара', err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error('Ошибка придобавлени новой карточки', err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <DeleteCardPopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onConfirm={handleCardDelete}
            deletedCard={cardToDelete}
          ></DeleteCardPopup>

          <InfoTooltip
            message={infoTooltipMessage}
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
          />

          <Header logOut={logOut} userEmail={userEmail} />

          <Routes>
            <Route path='/' element={<ProtectedRoute
              element={Main}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCard}
              cards={cards}
            />} />
            <Route
              path='/sign-up'
              element={<Register
                onRegister={onRegister}
              />} />
            <Route
              path='/sign-in'
              element={<Login
                onLogin={onLogin}
              />} />
            <Route
              path="/*"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
          </Routes>

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
