export const BASE_URL = "http://localhost:3001";
// export const BASE_URL = "https://api.mesto-nik.nomoredomainsmonster.ru";

const checkError = (res) => {
   if (res.ok) {
     return res.json();
   }
   return Promise.reject(`Статус ошибки: ${res.status}`);
 }

export const register = (email, password) => {
   return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
   })
   .then((res) => checkError(res));
};

export const authorize = (email, password) => {
   return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
   })
   .then((res) => checkError(res));
};

export const checkToken = () => {
   const token = localStorage.getItem('jwt');
   return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
      }
   })
   .then((res) => checkError(res));
}