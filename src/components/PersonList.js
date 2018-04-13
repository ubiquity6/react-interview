import React from "react";
import Person from './Person';

export default class PersonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div className="row">
        <div className="col-md-12">
          <ul className="list-group">
            {this.props.members.map((member) => <Person key={member.id} member={member}/>)}
          </ul>
        </div>
    </div>)
  }
}
