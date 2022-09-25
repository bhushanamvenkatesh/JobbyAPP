import {AiFillStar, AiOutlineMail} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'

const SimilarJob = props => {
  const {eachItem} = props
  // getJobContainer = each => {
  const {
    companyLogoUrl,
    employmentType,
    id,
    location,
    jobDescription,
    rating,
    title,
  } = eachItem

  return (
    <li className="simi-container" key={id}>
      <div className="logo-title">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="logo-image"
        />
        <div>
          <h1 className="similar-title">{title}</h1>

          <div className="rating-star">
            <AiFillStar className="star" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <div className="location-type">
        <div className="row">
          <HiLocationMarker className="location-icon" />
          <p>{location}</p>
        </div>

        <div className="row">
          <AiOutlineMail className="job-icon" />
          <p className="employment-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJob
