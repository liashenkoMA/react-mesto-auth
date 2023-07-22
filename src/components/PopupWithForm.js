export function PopupWithForm(props) {
  return (
      <div className={`popup popup_type_${props.name} ${props.isOpen}`}>
        <div className="popup__container">
          <h2 className="popup__title">{props.title}</h2>
          <form className="popup__form" name={`${props.name}`} onSubmit={props.onSubmit}>
            {props.children}
            <button type="submit" className="popup__button" aria-label={props.buttonText}>Сохранить</button>
          </form>
          <button type="button" onClick={props.onClose} className="popup__button-close" aria-label="Закрыть окно"></button>
        </div>
      </div>
  )
}