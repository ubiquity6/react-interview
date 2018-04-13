import React, {Component} from 'react';
import logo from './logo.png';
import './App.css';
import PersonList from './components/PersonList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
      chamber: 'house',
      session: 115,
      search: ''
    };
  }

  componentWillMount() {}

  getMembers() {
    const session = this.state.session;
    const chamber = this.state.chamber;

    let self = this;
    fetch(`https://api.propublica.org/congress/v1/${session}/${chamber}/members.json`, {
      headers: new Headers({'X-API-Key': 'd0ywBucVrXRlMQhENZxRtL3O7NPgtou2mwnLARTr'})
    }).then((res) => res.json()).then((json) => json.results[0].members).then((members) => {
      self.setState({members: members});
    });
  }

  onSearchChange(e) {
    this.setState({search: e.target.value});
  }

  onSearchSubmit(e) {
    e.preventDefault();
    let members = this.state.members;
    let search = this.state.search;

    let newList = members.filter(function(item) {
      return item.first_name.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });

    // Issue here with asynch

    this.setState({members: newList});
  }

  onSessionChange(e) {
    this.setState({session: e.target.value});
  }

  onTypeChange(e) {
    this.setState({chamber: e.target.value});
  }

  render() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">React Programming Exercise</h1>
      </header>
      <section className="container">
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <label>Session</label>
              <input onChange={(e) => this.onSessionChange(e)}/>
            </div>
            <form>
              <div className="radio">
                <label>
                  <input type="radio" name="house" value="house" checked={this.state.chamber === 'house'} onChange={this.onTypeChange.bind(this)}/>
                  House
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="senate" value="senate" checked={this.state.chamber === 'senate'} onChange={this.onTypeChange.bind(this)}/>
                  Senate
                </label>
              </div>
            </form>
            <button onClick={this.getMembers.bind(this)} className="btn btn-primary">Get Members</button>
            <form onSubmit={this.onSearchSubmit.bind(this)}>
              <input id="search" onChange={this.onSearchChange.bind(this)}/>
              <button type="submit" className="btn btn-default">Search By First Name</button>
            </form>
          </div>
          <div className="panel panel-default">
            <div className="panel-body">
              <PersonList members={this.state.members}/>
            </div>
          </div>
        </div>
      </section>
    </div>);
  }
}

export default App;
