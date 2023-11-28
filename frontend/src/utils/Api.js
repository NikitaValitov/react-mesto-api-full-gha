class Api {
  constructor({ url }) {
    this._url = url;
  }

  #onResponce(res) {
    return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData));
  }

  getProfileInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers:{
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then(this.#onResponce)
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then(this.#onResponce)
  }

  editUserInfo(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
      .then(this.#onResponce)
  }

  addNewCard(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(this.#onResponce)
  }

  setLike(idCard) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then(this.#onResponce)
  }

  deleteLike(idCard) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then(this.#onResponce)
  }


  changeLikeCardStatus(idCard, isLiked) {
    if (isLiked) {
      return this.setLike(idCard);
    } else {
      return this.deleteLike(idCard);
    }
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then(this.#onResponce);
  }

  editAvatar(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
      .then(this.#onResponce);
  }
}

const api = new Api({
  // url: 'https://mesto.nomoreparties.co/v1/cohort-73',
  url: "http://localhost:3001",
  // headers: {
  //   "content-type": 'application/json',
  //   "authorization": '570b2666-b41f-4db7-ab46-34b70d53b1fa'
  // }
});

export default api;
