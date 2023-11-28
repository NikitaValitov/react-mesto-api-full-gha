import { Routes, Route, Link } from "react-router-dom";

function Header({ userEmail, logOut }) {
   return (
      <header className="header">
         <div className="header__conteiner">
            <div className="header__logo"></div>
            <Routes>

               <Route
                  path="/"
                  element={
                     <div className="header__user">
                        <p className="header__email" >{userEmail}</p>
                        <button className="header__exit" onClick={logOut}>
                           Выйти
                        </button>
                     </div>
                  }
               />
               <Route
                  path="/sign-in"
                  element={
                     <Link className="header__link" to="/sign-up">
                        Регистрация
                     </Link>
                  }
               />
               <Route
                  path="/sign-up"
                  element={
                     <Link className="header__link" to="/sign-in">
                        Войти
                     </Link>
                  }
               />
            </Routes>
         </div>
      </header>
   )
}

export default Header;