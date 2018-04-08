import React from 'react';
import { Link, browserHistory } from 'react-router';

const CustomLink = ({ to, onClick, ...otherProps }) => (
  <Link
    to={to}
    onClick={e => {
      e.preventDefault();
      if (window.updateRequired) return (window.location = to);
      return browserHistory.push(to);
    }}
    {...otherProps}
  />
);

export default CustomLink;
