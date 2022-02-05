import React, { useState } from "react";
import axios from "axios";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin =  (e) => { 
    e.preventDefault();

    const emailError = document.getElementsByClassName("email");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://localhost:5000/api/users/login",
      data: {
        email,
        password,
      },
    }).then((res) => console.log(res))
    .catch(console.log("slt"))

  }

    return (
      <div className="form">
        <form action="" onSubmit={handleLogin}>
          <label htmlFor="">Email</label>
          <input type="text" name="email" onChange={(e) => setEmail(e.target.value)}/>
          <div className="password error"></div>
          <label htmlFor="">Mot de passe</label>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
          <div className="password error"></div>
          <input type="submit" value="Se connecter" />
        </form>
      </div>
    );
  
}
