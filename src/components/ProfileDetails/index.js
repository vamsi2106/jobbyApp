import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileDetails extends Component {
  state = {
    profile: {},
    status: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    console.log('Im fetching details broooo..')
    this.setState({status: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearers ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const da = await response.json()
      const data = da.profile_details
      const updatedData = {
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }
      this.setState({profile: updatedData, status: apiStatusConstants.success})
    } else {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  renderProfileDetails = () => {
    const {profile, status} = this.state
    const {name, profileImageUrl, shortBio} = profile
    switch (status) {
      case apiStatusConstants.inProgress:
        return (
          <div
            className="loader-container"
            data-testid="loader"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case apiStatusConstants.success:
        return (
          <div className="profile-card">
            <img src={profileImageUrl} alt="profile" />

            <h1 style={{color: '#6f73f2'}}>{name}</h1>
            <p>
              <strong>{shortBio}</strong>
            </p>
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <button type="button" onClick={() => this.getProfileDetails()}>
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderProfileDetails()}</div>
  }
}

export default ProfileDetails
