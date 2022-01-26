import React, { useState } from "react";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
  };
  return (
    <div className="center">
      {/* Formulaire*/}
      <div className="signinform">
        <form action="" onSubmit={handleLogin} id="sign-up-form">
          {/* Email */}
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          {/* Prénom */}
          <label htmlFor="firstname">Prénom</label>
          <br />
          <input type="text" name="firstname" id="firstname" />
          <div className="firstname error"></div>
          <br />
          {/* Nom */}
          <label htmlFor="lastname">Nom</label>
          <br />
          <input type="text" name="lastname" id="lastname" />
          <div className="lastname error"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input type="password" name="password" id="password" />
          <div className="password error"></div>
          <br />
          {/* S'inscrire */}

          <div className="sign">
            {" "}
            <button>S'inscrire</button>
            <br />
            {/* Se connecter */}
            <input type="submit" value="Se connecter" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
