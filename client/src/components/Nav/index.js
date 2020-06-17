import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Google Books Search
      </a>
      <a className="navbar-text" href="/" style={{ marginLeft: 10 }}>
        Search
      </a>
      <a className="navbar-text" href="/saved" style={{ marginLeft: 10 }}>
        Saved
      </a>
    </nav>
  );
}

export default Nav;
