import React, { useState,  } from 'react';

const Login = ({ onLogin }) => {

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
      onLogin({ email, password })
   };

   return (
      <div className="auth">
         <p className="auth__welcome">
            Вход
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
               className="auth__button"
            >
               Войти
            </button>
         </form>
      </div>
   );
}

export default Login;