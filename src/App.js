import React, {Component} from 'react';
import './App.css';
import MemberList from './components/MemberList';
import Search from './components/Search';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
      chamber: 'house',
      session: 115,
      search: '',
      sort: '',
      filter: '',
      isLoading: false,
      cache: {}
    };
  }

  getMembers(e) {
    e.preventDefault();

    let self = this;
    let newResponse = {};
    const session = this.state.session;
    const chamber = this.state.chamber;

    let URI = `https://api.propublica.org/congress/v1/${session}/${chamber}/members.json`; // set API URI

    this.setState({isLoading: true}) // start displaying loading UI

    /**
     * check if request has already been made via cache
     * if so, display stored response
     * else, initiate call and store in cache
     */
    if (this.state.cache[URI]) {
      this.setState({
        members: this.state.cache[URI]
      }, () => {
        self.setState({isLoading: false});
      });
    } else {
      fetch(URI, {
        headers: new Headers({'X-API-Key': 'd0ywBucVrXRlMQhENZxRtL3O7NPgtou2mwnLARTr'})
      }).then((res) => res.json()).then((json) => json.results[0].members).then((members) => {
        newResponse[URI] = members;
        self.setState({
          members: members,
          cache: newResponse
        }, () => {
          self.setState({isLoading: false});
        });
      });
    }

  }

  /**
   * display and filter results from search
   */
  setSearch(term) {
      let newMembers;

      if (term.length !== 0) {
        newMembers = this.state.members.filter(function(item) {
          return item.first_name.toLowerCase().indexOf(term.toLowerCase()) > -1 || item.last_name.toLowerCase().indexOf(term.toLowerCase()) > -1 || item.state.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
        this.setState({members: newMembers});
      }
  }

  /**
   * capture session changes
   */
  onSessionChange(e) {
    this.setState({session: e.target.value});
  }

  /**
   * capture type changes
   */
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
          <Search setSearch={this.setSearch.bind(this)}/>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            {
              this.state.isLoading
                ? "Hold tight... results are on their way!"
                : ""
            }
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-body">
            <MemberList members={this.state.members} filter={this.state.filter} search={this.state.search}/>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default App;
