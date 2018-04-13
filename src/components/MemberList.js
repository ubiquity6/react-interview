import React from "react";
import Member from './Member';

const MemberList = ({members}) => {

    return (<div className="row">
        <div className="col-md-12">
          <ul className="list-group">
            {members.map((member) => <Member key={member.id + member.total_votes} member={member}/>)}
          </ul>
        </div>
    </div>);
}

export default MemberList;
