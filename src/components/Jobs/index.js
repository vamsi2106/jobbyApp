import {IoMdSearch} from 'react-icons/io'

import {Component} from 'react'
import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'

import './index.css'
import ProfileDetails from '../ProfileDetails'
import FilterGroup from '../FilterGroup'
import JobItem from '../JobItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobs: [],
    employmentType: [],
    salary: '',
    search: '',
    status: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({status: apiStatusConstants.inProgress})
    const {employmentType, salary, search} = this.state
    const newEmploymentType =
      employmentType.length > 0 ? employmentType.join() : ''

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${newEmploymentType}&minimum_package=${salary}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      console.log(updatedData)
      this.setState({jobs: updatedData, status: apiStatusConstants.success})
    } else {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  onChangeJobType = id => {
    this.setState(prevState => {
      // Check if the new id is already selected
      const isAlreadySelected = prevState.employmentType.includes(id)

      // If the id is not already selected, add it to the array
      const updatedEmploymentType = isAlreadySelected
        ? prevState.employmentType.filter(type => type !== id) // Remove the id if already selected
        : [...prevState.employmentType, id] // Add the id if not already selected

      // Return the updated state
      return {employmentType: updatedEmploymentType}
    }, this.getJobsData)
  }

  onChangeSalary = id => {
    this.setState({salary: id}, this.getJobsData)
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value}, this.getJobsData)
  }

  renderSideBar = () => (
    <>
      <ProfileDetails />
      <FilterGroup
        onChangeJobType={this.onChangeJobType}
        onChangeSalary={this.onChangeSalary}
      />
    </>
  )

  renderMainContent = () => {
    const {jobs} = this.state
    return (
      <>
        {jobs.length > 0 ? (
          <div className="jobs-tab">
            <ul className="jobsList">
              {jobs.map(eachItem => (
                <JobItem key={eachItem.id} item={eachItem} />
              ))}
            </ul>
          </div>
        ) : (
          this.renderNoJobsView()
        )}
      </>
    )
  }

  failure = () => (
    <div className="jobs-api-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-api-failure-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={() => this.getJobsData()}
      >
        Retry
      </button>
    </div>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsPage = () => {
    const {status} = this.state
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
        return this.renderMainContent()
      case apiStatusConstants.failure:
        return this.failure()
      default:
        return null
    }
  }

  render() {
    const {search} = this.state
    return (
      <div>
        <Navbar />
        <div className="Jobs-container">
          <div className="side-bar">{this.renderSideBar()}</div>
          <div className="main-container">
            <div className="search-bar-container">
              <input
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearch}
                value={search}
              />
              <button
                data-testid="searchButton"
                type="button"
                style={{cursor: 'pointer'}}
              >
                <IoMdSearch style={{fontSize: '35px'}} />{' '}
              </button>
            </div>
            {this.renderJobsPage()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
