import React from "react";
import axios from "axios";

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    };
  }

 handleLogin(e) {
    e.preventDefault();
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://localhost:5000/api/users/signup",
      data: {
        email : this.state.email,
        password : this.state.password,
        firstName :this.state.firstName,
        lastName :this.state.lastName,
      } 
    })
  }

  render() {
    return (
      <div className="form signup">
        <form action="">
          <label htmlFor="">Email</label>
          <input type="text" onChange={(e) => this.setState({email: e.target.value})}/>
          <div className="email error"></div>
          <label htmlFor="">Prénom</label>
          <input type="text" onChange={(e) => this.setState({firstName: e.target.value})} />
          <div className="firstname error"></div>
          <label htmlFor="">Nom</label>
          <input type="text" onChange={(e) => this.setState({lastName: e.target.value})} />
          <div className="lastname error"></div>
          <label htmlFor="">Mot de passe</label>
          <input type="password" onChange={(e) => this.setState({password: e.target.value})} />
          <div className="password error"></div>
          <label htmlFor="">Confimer votre mot de passe</label>{" "}
          <input type="password" name="password-confirm" />{" "}
          <div className="password-confirm error"></div>
          <input
            type="submit"
            value="Valider l'inscription"
            name="submit"
            onClick={this.handleLogin.bind(this)}
          />
        </form>
      </div>
    );
  }
}
