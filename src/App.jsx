import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import jwt_decode from "jwt-decode";

function App() {
  const [user, setUser] = useState({});

  let handleCallbackResponse = (response) => {
    console.log(response);
    let userObject = jwt_decode(response.credential);
    setUser(userObject);
    document.getElementById("SignIn").hidden = true;
  };
  let handleSignOut = () => {
    setUser({});
    Document.getElementById("SignIn").hidden = false;
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "521808617870-q491l62b1u0i5gcqk2gl4gpj1d7mr3uc.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("SignIn"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

  return (
    <>
      <div className="App">
        <div id="SignIn"></div>
        {Object.keys(user).length != 0 && (
          <button onClick={handleSignOut}>SignOut</button>
        )}
        {user && (
          <div>
            <h1>{user.name}</h1>
            <img src={user.picture} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
