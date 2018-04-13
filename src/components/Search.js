import React, {Component} from 'react';

const Search = ({setSearch}) => {

  return (<div className="form-row">
    <div className="form-group col-md-5">
      <label>Search:</label>
      <input type="text" id="search" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
    </div>
  </div>);

}

export default Search;
