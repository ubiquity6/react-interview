import React from "react";
import Member from './Member';

export default class MemberList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div className="row">
        <div className="col-md-12">
          <ul className="list-group">
            {this.props.members.map((member) => <Member key={member.id} member={member}/>)}
          </ul>
        </div>
    </div>)
  }
}
