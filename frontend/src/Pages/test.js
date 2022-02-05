import React from "react";
import SignInForm from "../components/Log/SignInForm";
import SignUpForm from "../components/Log/SignUpForm";
import Navbar from "../components/Navbar";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSwitchButton = this.handleSwitchButton.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleSwitchButton() {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  }

  Greeting(props) {
    const isLoggedIn = props.isLoggedIn;

    if (isLoggedIn) {
      return <SignUpForm />;
    }
    return <SignInForm />;
  }
  render() {
    return (
      <div>
        <Navbar />
        <this.Greeting isLoggedIn={this.state.isLoggedIn} />
        <div className="containerswitchbutton">
        <button className="switchbutton" onClick={this.handleSwitchButton}>
          {this.state.isLoggedIn ? "Connexion" : " Inscription"}
        </button>
        </div>
      </div>
    );
  }
}