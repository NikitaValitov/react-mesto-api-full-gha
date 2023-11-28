import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleEmailChange = (e) => {
      setEmail(e.target.value)
   }

   const handlePasswordChange = (e) => {
      setPassword(e.target.value)
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      onRegister({ email, password })
   }

   return (
      <div className="auth">
         <p className="auth__welcome">
            Регистрация
         </p>
         <form
            onSubmit={handleSubmit}
            className="auth__form"
         >
            <input
               className="auth__input"
               name="email"
               type="email"
               value={email}
               onChange={handleEmailChange}
               placeholder="Email"
            />
            <input
               className="auth__input"
               name="password"
               type="password"
               value={password}
               onChange={handlePasswordChange}
               placeholder="Пароль"
            />
            <button
               type="submit"
               onSubmit={handleSubmit}
               className="auth__button"
            >
               Зарегистрироваться
            </button>
         </form>
         <div className="auth__signin">
            <p className="auth__text">Уже зарегистрированы?</p>
            <Link to="/sign-in" className="auth__login-link">Войти</Link>
         </div>
      </div>
   );
}

export default Register;