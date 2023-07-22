import React from "react";
import { PopupWithForm } from "./PopupWithForm";

export function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value)
  };

  function handleChangeLink(e) {
    setLink(e.target.value)
  };

  function handleSubmit(element) {
    element.preventDefault();

    props.onUpdateCard({
      name,
      link: link,
    }, element);
  };

  React.useEffect(() => {
    if (props.isOpen === false) {
      setName('')
      setLink('')
    }
  }, [props.isOpen])

  return (
    <PopupWithForm name="add-element" title="Новое место" buttonText="Сохранить карточку" isOpen={props.isOpen ? 'popup_opened' : ''} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="popup__form-field">
        <input type="text" onChange={handleChangeName} placeholder="Название" id="input-place-name"
          className="popup__input popup__input_type_place-name" name="placeName" required minLength="2" maxLength="30" />
        <span className="popup__input-error input-place-name-error"></span>
      </label>
      <label className="popup__form-field">
        <input type="url" onChange={handleChangeLink} placeholder="Ссылка на картинку" id="input-image-link"
          className="popup__input popup__input_type_image-link" name="placeImg" required />
        <span className="popup__input-error input-image-link-error"></span>
      </label>
    </PopupWithForm>
  )
}