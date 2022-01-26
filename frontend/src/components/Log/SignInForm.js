import React, { useState } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = (e) => {
    e.preventDefault();

   
  };
  return (
    <div className="center">
      <div className="signinform">
        <form action="" onSubmit={handleLogin} id="sign-up-form">
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
          <label htmlFor="password error">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          <div className="sign">
            {" "}
            <input type="submit" value="Se connecter" />
            <br />
            <button>S'inscrire</button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
