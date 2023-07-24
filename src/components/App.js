import React from 'react';
import { api } from '../utils/Api';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { PopupWithForm } from './PopupWithForm';
import { ImagePopup } from './ImagePopup';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { Login } from './Login';
import { Register } from './Register';
import { InfoTooltip } from './InfoTooltip';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentCardsContext } from '../contexts/CurrentCardsContext';
import { ProtectedRoute } from './ProtectedRoute';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isRoutPopupOpen, setRoutPopupOpen] = React.useState(false);
  const [isRoutOn, setRoutOn] = React.useState(null)

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});
  const [currentCards, setCurrentCards] = React.useState([]);

  const navigate = useNavigate()

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    Promise.all([api.getUserInfo(), api.getInitialCards(), jwt && api.tokenCheack(jwt)])
      .then(([user, cards, data]) => {
        setCurrentUser(user, user.email = `${data && data.email}`);
        setCurrentCards(cards.reverse());

        if (data) {
          navigate(rout.main);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  function exit() {
    localStorage.clear();
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setRoutPopupOpen(false);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (isLiked) {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCurrentCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      api.putLike(card._id)
        .then((newCard) => {
          setCurrentCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        })
    }
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCurrentCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function handleUpdateUser(user, element) {
    api.patchUserInfo(user.name, user.about)
      .then((state) => {
        setCurrentUser(state);
        closeAllPopups();
        element.target.reset();
      })
      .catch((err) => {
        console.log(err)
      })
  };

  function handleUpdateAvatar(avatar, element) {
    api.patchAvatar(avatar.avatar)
      .then((state) => {
        setCurrentUser(state);
        closeAllPopups();
        element.target.reset();
      })
      .catch((err) => {
        console.log(err)
      })
  };

  function handleAddPlaceSubmit(card, element) {
    api.postNewCard(card.name, card.link)
      .then((newCard) => {
        setCurrentCards([newCard, ...currentCards]);
        closeAllPopups();
        element.target.reset();
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const rout = {
    main: '/',
    login: '/sign-in',
    register: '/sign-up',
  }

  function handleRegisterSubmit(email, password) {
    api.register(email, password)
      .then(() => {
        setRoutPopupOpen(true);
        setRoutOn(true)
        navigate(rout.login);
      })
      .catch((err) => {
        setRoutPopupOpen(true);
        setRoutOn(false)
        console.log(`status: ${err.status}`, `statusText: ${err.statusText}`)
      })
  };

  function handleLoginSubmit(email, password) {
    api.auth(email, password)
      .then((data) => {
        if (data.token) {
          setCurrentUser(currentUser, currentUser.email = `${email}`);
          navigate(rout.main)
        }
      })
      .catch((err) => {
        setRoutPopupOpen(true);
        setRoutOn(false)
        console.log(err) 
      });
  };

  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <CurrentCardsContext.Provider value={currentCards}>
            <Header exit={exit} rout={rout} />
            <Routes>
              <Route path={rout.main} element={
                <ProtectedRoute rout={rout}>
                  <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
                  <Footer />
                </ProtectedRoute>}
              />
              <Route path={rout.login} element={<Login rout={rout} onLogin={handleLoginSubmit} />} />
              <Route path={rout.register} element={<Register rout={rout} onRegister={handleRegisterSubmit} />} />
            </Routes>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateCard={handleAddPlaceSubmit} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <PopupWithForm name="delete-element" buttonText="Удалить карточку" title="Вы уверены?" />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <InfoTooltip isOpen={isRoutPopupOpen} onClose={closeAllPopups} register={isRoutOn} />
          </CurrentCardsContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;