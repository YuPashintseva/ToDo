import React from 'react';

const SearchPanel = () => {
    const searchText = 'type something for search';
    const searchStyle = {
      fontSize: '18px'
    }
    return (
      <input style = {searchStyle} placeholder={searchText} />
    );
  };

export default SearchPanel;