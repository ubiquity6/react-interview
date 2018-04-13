import React from "react";

export default class Member extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (<li id={this.props.member.id} className="list-group-item">
        <h3 className="title">
          {this.props.member.first_name} {this.props.member.last_name}
        </h3>
        <h4>{this.props.member.state}</h4>
        <h5>{this.props.member.election_year}</h5>
        <a href={'http://twitter.com/' + this.props.member.twitter_account}>@{this.props.member.twitter_account}</a>
      </li>);
  }
}
