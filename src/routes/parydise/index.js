import React from 'react'
import Parse from 'parse'

function Parydise() {

  const CLIENT_ID = 'xxxx'
  const REDIRECT_URI = 'http://localhost:3000/xxxx'
  const spotifyInsecureLinkWith = async () => {
    const id = '313tle32cpbzm2bzfd2r6tmobhhm'
    const access_token = 'BQC5a5B0AsNFJ-maZ0EQ37bBXBaROyBl_onb1sBZojdCkK6lQsvptjQzCF-0f8cQgWgCtEGnr1TwJmO0W-5EwV4bg1LkgappcxcLIFpSPwloiqr0f8SCLZ4wAJQpcvIl1vldfSrKmHv0tqi1ALLoe8RuCoAyHBqDsPqyFxRJlyIj37ObFrPx3Y8K4auiMUbS87Q3ofFaAFhZm6ChTQlqhhq_vw'
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

  const printUser = () => {
    console.log(Parse.User.current())
    console.log(Parse.User.current().get('authData').spotify.id)
  }

  const getArtistInfo = async () => {
    const id = "xxxxxxxxxxxxx";
    const access_token = "xxxxxxxx-MaSPPn-xxxxx";

    fetch(`https://api.spotify.com/v1/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error("There was an error fetching user details:", error);
      });
  }

  const getArtistId = async () => {
    const access_token = "xxxxxxxxxxxxxxxxxxx-MaSPPn-xxxxx-LQgA";

    const artistName = 'Yas'; // Replace with the artist's name you're searching for

    fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.artists.items.length > 0) {
          const artistId = data.artists.items[0].id;
          console.log(artistId); // This is the ID of the artist (or the first match)
        } else {
          console.log('Artist not found.');
        }
      })
      .catch(error => {
        console.error("There was an error fetching the artist ID:", error);
      });
  }

  const searchArtist = async () => {
    const result = await Parse.Cloud.run('search-artists', { artist: 'adele', platform: 'spotify' })
    console.log(result)
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

  const reachCodeAndRedirect = async () => {
    let codeVerifier = generateRandomString(128);

    generateCodeChallenge(codeVerifier).then(codeChallenge => {
      let state = generateRandomString(16);
      let scope = 'user-read-private user-read-email';

      localStorage.setItem('code_verifier', codeVerifier);
      console.log('code_verifier', codeVerifier)

      let args = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
      });

      window.location = 'https://accounts.spotify.com/authorize?' + args;
    });
  }

  const getAccessToken = async () => {
    let codeVerifier = localStorage.getItem('code_verifier')
    let body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: 'AQBbtg6ZKVY2qz5IgMWY3EKhJil6APhrx9eeEttbaE2gspmomQAOTFNvwxqCTclzAcxeuXsJgSPLTgoAx-DjOn8z9S9eovLPw2bnPU6RziB6Gi8IGr5t93MZ0tf_zUfacTOf8wilC8dGSVnhzx9M3Qf9qeKHpw2vVOwm1zgGWZN9Vv_SjqtVJTncma7BL_wpCPTNFYZl_Vzd01h4VXOozW6uKrRHH3fzYgvO-HG9--JrkluzxBqF7NuIxaOS8shI5-wLZYZkfpGTwBH3Z4IRoXJnL8t6Og',
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
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
        localStorage.setItem('refresh_token', data.refresh_token);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const loginAndGetID = async () => {
    (async () => {
      let accessToken = localStorage.getItem('access_token')
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });
      const data = await response.json();
      console.log(data)
    })();
  }

  const linkWithSpotifyCloudFunction = async () => {
    const result = await Parse.Cloud.run('link-with', {
      code: 'xxxxxxxxxxxxxxxxxxxxxx',
      code_verifier: localStorage.getItem('code_verifier'),
      platform: 'spotify'
    })
    console.log(result)
  }


  return (
    <div className="App" >
      <header className="app-header">
        <img className="logo" alt="back4app's logo" src={'https://blog.back4app.com/wp-content/uploads/2019/05/back4app-white-logo-500px.png'} />
        <h2 className="spacing">parse hooks</h2>
        <span>Parydise mock</span>
        <p>{Parse.User.current().get('username')}</p>
      </header>
      <div>
        <button style={{ margin: '7px', padding: '5px' }} onClick={reachCodeAndRedirect}>reachCodeAndRedirect</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={getAccessToken}>getAccessToken</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={spotifyInsecureLinkWith}>spotifyInsecureLinkWith</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={loginAndGetID}>loginAndGetID</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={linkWithSpotifyCloudFunction}>linkWithSpotifyCloudFunction</button><br />


        <button style={{ margin: '7px', padding: '5px' }} onClick={printUser}>printUser</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={getArtistInfo}>getArtistInfo</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={getArtistId}>getArtistId</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={searchArtist}>searchArtist</button><br />



        <br /> <br /> <br />
        <br /> <br /> <br />
      </div>
    </div >
  )
}

export default Parydise