import React from 'react'
import Parse from 'parse'

function Parydise() {
  const spotifyInsecureLinkWith = async () => {
    const id = '317bpe5rftsbe2iyik4pylgkegmu'
    const access_token = 'BQDWWNGY6UclbtbXU6HZrXfp45EbVsAaI_aZtuzupDkdY1KmuzDtSWAZOrujuYnLqeV-W6gmUW8U4EvMWo1aGn5cqTc8ScoXTltQ64b68lZEJ7tEk7koUFLk7VpStObLXH-N5xlM0uBlbyG2ymZbpbsHct5i8dDgvLXcDigyH1MhmUXtXy-MaSPPn-oKqVSC6fEY0luxdoFYz8z8h9pZk-LQgA'
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

  return (
    <div className="App" >
      <header className="app-header">
        <img className="logo" alt="back4app's logo" src={'https://blog.back4app.com/wp-content/uploads/2019/05/back4app-white-logo-500px.png'} />
        <h2 className="spacing">parse hooks</h2>
        <span>Parydise mock</span>
        <p>{Parse.User.current().get('username')}</p>
      </header>
      <div>
        <button style={{ margin: '7px', padding: '5px' }} onClick={spotifyInsecureLinkWith}>spotifyInsecureLinkWith</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={printUser}>printUser</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={getArtistInfo}>getArtistInfo</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={getArtistId}>getArtistId</button><br />



        <br /> <br /> <br />
        <br /> <br /> <br />
      </div>
    </div >
  )
}

export default Parydise