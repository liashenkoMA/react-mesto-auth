class Api {

  constructor(cohort, key) {
    this._cohort = cohort;
    this._key = key;
  }

  getUserInfo() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me`, {
      headers: {
        authorization: `${this._key}`
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .then((result) => {
      return result;
    })
  };

  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      headers: {
        authorization: `${this._key}`
      }
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .then((result) => {
        return result.reverse();
      })
  };

  patchUserInfo(name, about) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  postNewCard(name, link) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${this._key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  deleteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._key}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  putLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `${this._key}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  deleteLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._key}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  patchAvatar(avatar) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${avatar}`
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  register (email, password) {
    return fetch('https://auth.nomoreparties.co/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: `${password}`,
        email: `${email}`,
      })
    })
    .then((response) => {
        if(response.ok) {
          return response.json();
        }
        return Promise.reject(response);
    })
  }

  auth(email, password) {
    return fetch('https://auth.nomoreparties.co/signin', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: `${password}`,
        email: `${email}`,
      })
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      localStorage.setItem('jwt', data.token)
      return data;
    })
  };

  tokenCheack(token) {
    return fetch('https://auth.nomoreparties.co/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`,
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((user) => {
      return user.data;
    })
  };
};

export const api = new Api('cohort-68', 'f1605107-de74-4364-b9cb-272c1e5a2dd9');