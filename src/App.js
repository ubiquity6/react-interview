import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

// you should feel free to reorganize the code however you see fit
// including creating additional folders/files and organizing your
// components however you would like.

class App extends Component {
  componentWillMount() {
    const session = 115 // 115th congressional session
    const chamber = 'senate' // or 'house'

    // sample API call
    fetch(`https://api.propublica.org/congress/v1/${session}/${chamber}/members.json`, {
      headers: new Headers({
        'X-API-Key': 'd0ywBucVrXRlMQhENZxRtL3O7NPgtou2mwnLARTr',
      }),
    })
    .then((res) => res.json())
    .then((json) => json.results[0].members)
    .then((members) => {
      // array of congressperson JSON objects
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Programming Exercise</h1>
        </header>
        <section className="container">
          {/*
            Your app should render this part of the page.
          */}
        </section>
      </div>
    );
  }
}

export default App;
