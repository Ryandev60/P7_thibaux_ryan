import React, {useState} from "react";
import SignInForm from "../components/Log/SignInForm";
import SignUpForm from "../components/Log/SignUpForm";
import Navbar from "../components/Navbar";

export default function Login() {
  const [isLog, setIsLog] = useState(true)

  const handleChange = () => {
    setIsLog(!isLog)
  }

  const Greeting = () => {
    <div className="salut">salut</div>
    if (isLog) {
      return <SignUpForm />;
    }
    return <SignInForm />;
  }
  
    return (
      <div>
        <Navbar />
        <Greeting />
        <div className="containerswitchbutton">
        <button className="switchbutton" onClick={handleChange}>
          {isLog ? "Connexion" : " Inscription"}
        </button>
        </div>
      </div>
    );
}
