import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const JobItem = props => {
  const {item} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = item
  return (
    <li className="job-card">
      <Link to={`/jobs/${id}`} className="job-card-link">
        <div className="logo-title-container-card">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-card"
          />
          <div className="title-rating-container-card">
            <h1 className="job-title-card">{title}</h1>
            <div className="rating-container-card">
              <AiFillStar className="star-icon-card" />
              <p className="rating-number-card">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package-container-card">
          <div className="icon-type-container-card">
            <IoLocationSharp className="type-icon" />
            <p className="type-text">{location}</p>
          </div>
          <div className="icon-type-container-card">
            <BsFillBriefcaseFill className="type-icon" />
            <p className="type-text">{employmentType}</p>
          </div>
          <p className="package-text">{packagePerAnnum}</p>
        </div>
        <hr style={{width: '100%', border: '1px solid white'}} />
        <h1 className="description-heading-card">{title}</h1>
        <p className="job-description-card">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItem
