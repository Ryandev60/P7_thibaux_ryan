import React from "react";
import axios from "axios";

export default class SignInForm extends React.Component {


  render() {
   
    return (
      <div className="form">
        <form action="">
          <label htmlFor="">Email</label>
          <input type="text" name="email"/>
          <label htmlFor="">Mot de passe</label>
          <input type="password" name="password"/>
          <div className="password error"></div>
          <input type="submit" value="Se connecter" />
        </form>
      </div>
    );
  }
}
