import React from "react";

const Member = ({member}) => {

  return (<li id={member.id} className="list-group-item">
    <h3 className="title">
      {member.short_title} {member.first_name} {member.last_name}
    </h3>
    <h4>{member.state}</h4>
    <h5>{member.election_year}</h5>
    <h5>{
        member.party === "D"
          ? "Democrat"
          : "Republican"
      }</h5>
    <p>{
        member.gender === "M"
          ? "Male"
          : "Female"
      }</p>
    <a href={'http://twitter.com/' + member.twitter_account}>@{member.twitter_account}</a>
  </li>);

}

export default Member;
