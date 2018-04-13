import React, {Component} from 'react';
import './App.css';
import MemberList from './components/MemberList';

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

  getMembers(e) {
    e.preventDefault();
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
    // this.setState({search: e.target.value});
    let members = this.state.members;
    let search = e.target.value;
    let newMembers;

    if (search.length !== 0) {
      newMembers = members.filter(function(item) {
        return item.first_name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        item.last_name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        item.state.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      this.setState({members: newMembers});
    }
  }

  onSessionChange(e) {
    this.setState({session: e.target.value});
  }

  onTypeChange(e) {
    this.setState({chamber: e.target.value});
  }

  render() {
    return (<div className="container-fluid">
      <div className="row-fluid">
        <div className="span12">
          <div className="page-header">
            <h3>Ubiquity6</h3>
            <p>React Coding Exercise</p>
          </div>
          <form>
            <div className="form-row">
              <div className="form-group col-md-2">
                <label>Session</label>
                <input className="form-control" onChange={(e) => this.onSessionChange(e)}/>
              </div>
              <div className="form-group col-md-2">
                <div className="radio">
                  <label>
                    <input type="radio" className="form-control" name="house" value="house" checked={this.state.chamber === 'house'} onChange={this.onTypeChange.bind(this)}/>
                    House
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" className="form-control" name="senate" value="senate" checked={this.state.chamber === 'senate'} onChange={this.onTypeChange.bind(this)}/>
                    Senate
                  </label>
                </div>
              </div>
              <div className="form-group col-md-2">
                <button onClick={(e) => this.getMembers(e)} className="btn btn-primary">Get Members</button>
              </div>
            </div>
          </form>
          <div className="form-row">
            <div className="form-group col-md-5">
              <label>Search:</label>
              <input type="text" id="search" className="form-control" onChange={this.onSearchChange.bind(this)}/>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-body">
            <MemberList members={this.state.members}/>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default App;
