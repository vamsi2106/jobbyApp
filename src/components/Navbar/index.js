import {Link, withRouter} from 'react-router-dom'

import './navbar.css'

import {AiFillHome} from 'react-icons/ai'
import Cookies from 'js-cookie'
import {MdWork} from 'react-icons/md'
import {IoLogOutOutline} from 'react-icons/io5'

const Navbar = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="navbar-container">
      <div className="desktop-logo">
        <Link to="/">
          <img
            className="navbar-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </div>
      <div className="navbar-items-desktop">
        <ul>
          <li>
            <Link to="/" className="link">
              <strong>Home</strong>
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="link">
              <strong>Jobs</strong>
            </Link>
          </li>
        </ul>
      </div>
      <div className="desktop-logout-btn">
        <button className="logout-btn" type="button" onClick={onClickLogout}>
          <strong>Logout</strong>
        </button>
      </div>

      {/* Mobile-View */}
      <div className="mobile-view-logo-container">
        <Link to="/">
          <img
            className="mobile-navbar-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </div>
      <div className="mobile-navbar-container">
        <ul className="mobile-navbar">
          <li>
            <Link to="/">
              <AiFillHome style={{color: 'white'}} />
            </Link>
          </li>
          <li>
            <Link to="jobs">
              <MdWork style={{color: 'white'}} />
            </Link>
          </li>
          <li>
            <button type="submit" onClick={onClickLogout}>
              <IoLogOutOutline style={{color: 'white'}} />{' '}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
