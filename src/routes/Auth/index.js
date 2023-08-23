import "./Auth.css";
import React, { useEffect, useState } from "react";
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
    const plainUrl = ''
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

  const twitterLogin = async () => {
    // post req to this url 
    let session = await Parse.User.logInWith('twitter', {
      // "authData": {
      //     "auth_token":"xxxxxxxx-x",
      //     "auth_token_secret":"xxxxxxxxx",
      //     "id": "xxxxxxxxxxx",
      //     "consumer_key": "xxxxxxxxxxx",
      //     "consumer_secret":"xxxxxxxxxxxxxx"
      //  }
      "authData": {
        code: "",
        redirect_uri: "http://localhost:3000/twitter",
        code_verifier: "",
      }
    });
    console.log(session)
  }


  const spotifyLogin = async () => {
    // client side url
    let codeVerifier = localStorage.getItem('code_verifier')

    // post req to this url
    let body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: 'AQAAspoF73h2pstOwl_zhuppI7yW-K1-xxxxxxxxxxxx-xxxxxx',
      redirect_uri: 'http://localhost:3000/spotify',
      client_id: 'xxxxxxxxxxx',
      code_verifier: codeVerifier,
    });
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    })
      .then(response => {
        console.log(response)
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem('access_token', data.access_token);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
  }

  const reachCode = async () => {
    const clientId = 'xxxxxxxxx';
    const redirectUri = 'http://localhost:3000/spotify';

    let codeVerifier = generateRandomString(128);

    generateCodeChallenge(codeVerifier).then(codeChallenge => {
      let state = generateRandomString(16);
      let scope = 'user-read-private user-read-email';

      localStorage.setItem('code_verifier', codeVerifier);
      console.log('code_verifier', codeVerifier)

      let args = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
      });

      window.location = 'https://accounts.spotify.com/authorize?' + args;
    });
  }

  const loginWithSpotify = async () => {
    // const access_token = 'AQCpO-pv9oP9ASRVyTX9tI8Q0nzCUkjSDo_HFFQKVAaeHeLQCJuvcPngirh-27irzc4OWmCzPhzYXIuzI1BSkYKTaKZezdPFW27RcBAkj5S_280Sh9yeeVUnHKsVbevOVeK1aQDAqkww9ThhAg4VFJif2EoLMK5XilzwL_kjwVd1IbLxhskUVJ9Sn44pyognGjuKWCiHy-AWAIoNBME-ILnktk6oqjuFhBgcN2JKKyOtK92xOK5OOyLn9LWtP_hjQDJIWPK2pxfWc23vl92tX3KKBZ3ogb8M'
    async function getProfile() {
      let accessToken = 'xxxxxxxxxx-MaSPPn-oKqVSC6fEY0luxdoFYz8z8h9pZk-LQgA'
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });

      const data = await response.json();
      console.log(data)
    }


    await getProfile();
    const clientId = 'xxxxxxxx';
    const redirectUri = 'http://localhost:3000/spotify';


  }

  const loginWithSpotifyParse = async () => {
    // insecure:
    // let accessToken = 'xxxxxxxxxxxxxxxxx-KdQLC8S00-ar0JgI4ZRvNd-nFY31mMCF4zFluyZCb8pw';

    // let session = await Parse.User.logInWith('spotify', {
    //   authData: {
    //     id: 'xxxxxxxxxx',
    //     access_token:accessToken,
    //   }
    // });

    // Secure

    let session = await Parse.User.logInWith('spotify', {
      authData: {
        redirect_uri: 'http://localhost:3000/spotify',
        code: 'xxxxxxx5Ooxxxxxxxxxxxxxxx2JE73d5iY9qZ4V051S9FPj',
        code_verifier: 'xxxxxxxxxxxxx'
      }
    });
    console.log(session)
  }

  const spotifyInsecureLinkWith = async () => {
    const id = 'xxxxxxxxxx'
    const access_token = 'xxxxxxxxxxxxxxxx-MaSPPn-oKqVSC6fEY0luxdoFYz8z8h9pZk-LQgA'
    const spotifyAuthData = {
      id,
      access_token
    };
    const user = Parse.User.current();
    // Link user's Spotify account to their Parse account
    user.linkWith('spotify', { authData: spotifyAuthData }).then((user) => {
      console.log('user', user)
      console.log('Spotify account linked!');
    }).catch((error) => {
      console.log('Error linking Spotify account:', error);
    });
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

      <button onClick={generateGoogleLoginUrl}>Generate Google Login Url</button>
      <button onClick={googleLogin}>Google Login</button>
      <button onClick={exportCode}>Export Code</button>
      <button onClick={twitterLogin}>Twitter Login</button>
      <button onClick={spotifyLogin}>Spotify Login</button>
      <button onClick={reachCode}>Reach Code</button>
      <button onClick={loginWithSpotify}>Login With Spotify</button>
      <button onClick={loginWithSpotifyParse}>Login With Spotify Parse</button>
      <button onClick={spotifyInsecureLinkWith} >Spotify Insecure Link With</button>

    </div>
  );
};

export default Auth;