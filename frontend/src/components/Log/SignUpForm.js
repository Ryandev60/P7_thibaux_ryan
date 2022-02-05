import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

export default function SignUpForm() {
  const [formSubmit, setFormSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword) {
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";
      }

      if (!terms.checked) {
        termsError.innerHTML = "Veuillez valider les condtions générales";
      }
    } else {
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        url: "http://localhost:5000/api/users/signup",
        data: {
          email,
          password,
          firstName,
          lastName,
        },
      })
        .then(() => {
          console.log("slt");
        })
        .catch((error) => {
          throw error;
        });
    }
  };
  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="sucess">
            Enregistrement réussi veuillez vous connecter
          </h4>
        </>
      ) : (
        <div className="form signup">
          <form action="" onSubmit={handleRegister}>
            <img src="./img/logowhite.png" alt="" />
            <label htmlFor="">Email</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
            <div className="email error"></div>
            <label htmlFor="">Prénom</label>
            <input type="text" onChange={(e) => setFirstName(e.target.value)} />
            <div className="firstname error"></div>
            <label htmlFor="">Nom</label>
            <input type="text" onChange={(e) => setLastName(e.target.value)} />
            <div className="lastname error">error</div>
            <label htmlFor="">Mot de passe</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password error"></div>
            <label htmlFor="">Confirmer votre mot de passe</label>{" "}
            <input
              type="password"
              name="password-confirm"
              onChange={(e) => setControlPassword(e.target.value)}
            />{" "}
            <div className="password-confirm error">error</div>
            <div className="terms">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                J'accepte les
                <a href="/" target="_blank" rel="noopener noreferrer">
                  {" "}
                  conditions générales
                </a>
              </label>
            </div>
            <div className="terms error"></div>
            <input type="submit" value="Valider l'inscription" />
          </form>
        </div>
      )}
    </>
  );
}
