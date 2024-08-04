function Nav() {
    return (
      <>
        <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">ICTPEDIA</a>
  
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
  
            <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Pricing</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item hidden" href="/profile">Profile</a></li>
                    <li><a className="dropdown-item" href="/login">Login</a></li>
                    <li><a className="dropdown-item" href="/register">Register</a></li>
                    <li><a className="dropdown-item hidden" href="#">Log-out</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
  
  export default Nav;
  