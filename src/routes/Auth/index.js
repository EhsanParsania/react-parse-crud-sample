import "./Auth.css";
import React, { useState } from "react";
import Parse from "parse";
import { useHistory } from 'react-router-dom'

const Auth = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);

  const history = useHistory();

  const handleLogin = () => {
    const user = new Parse.User();

    user.set('username', userName);
    user.set('password', password);

    user.logIn().then((user) => {
      history.push('/sl')
    }).catch(err => {
      alert(err.message);
    });
  };
  const handleRegister = () => {
    const user = new Parse.User();

    user.set('username', userName);
    user.set('password', password);

    user.signUp().then(() => {
      handleLogin();
    }).catch(err => alert(err.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      handleRegister();
      return;
    }
    handleLogin();
  };
  const toggleIsRegistering = () => setIsRegistering(!isRegistering);
  const generateGoogleLoginUrl = async () => {
    const result = await Parse.Cloud.run('generate-google-login-uri', {
      redirect_uri: 'https://sluice.nl'
    })
    console.log(result)
  }

  const googleLogin = async () => {
    const plainUrl = 'https://sluice.nl/google?code=4%2F0AZEOvhVRlooZmHHVFwChc-bIy5s1nbXWZJNsIrdMaUPI5MpOQOxARobFftTmJTAKsRy_mw&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&authuser=1&hd=demarkelabs.com&prompt=consent'
    const url = new URL(plainUrl);

    const code = url.searchParams.get('code');

    const result = await Parse.Cloud.run('google-login', {
      code: code,
      redirect_uri: 'https://sluice.nl'
    })
    console.log(result)
  }

  const exportCode = async () => {
    const url = new URL('https://sluice.nl/google?code=4%2F0AZEOvhWGk2A65O6ZMDtdcDfZLzLDZ0BcyzoIXwbhXnkI9AsXqeKS-3w0oP-iSdtY0TQikw&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&authuser=0&prompt=consent');

    const code = url.searchParams.get('code');

    console.log(code);
  }


  const [toggleRegisterText, authActiontext] = isRegistering
    ? ["use an existing account", "Register"]
    : ["Create an account", "Login"];

  return (
    <div className="auth-container">
      <h1>Auth</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span onClick={toggleIsRegistering}>{toggleRegisterText}</span>
        <button type="submit">{authActiontext}</button>
      </form>
    </div>
  );
};

export default Auth;