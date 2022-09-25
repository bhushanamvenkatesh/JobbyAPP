import Cookies from 'js-cookie'

import {Component} from 'react'
import {GrShare} from 'react-icons/gr'
import {AiFillStar, AiOutlineMail} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import './index.css'
import SimilarJob from '../SimilarJob'
import SkillItem from '../SkillItem'

const jobDetailsConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    eachjobDetails: {},
    jobDetailsStatus: jobDetailsConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const formattedData = {
        jobDetails: data.job_details,
        similarjobs: data.similar_jobs,
      }
      this.setState({
        // isLoading: false,
        eachjobDetails: formattedData,
        jobDetailsStatus: jobDetailsConstants.success,
      })
    } else {
      this.setState({jobDetailsStatus: jobDetailsConstants.failure})
    }
  }

  renderLoader = () => (
    <div /* testid="loader" */>
      <Loader type="TailSpin" color="#2f2f" height={50} width={50} />
    </div>
  )

  getSkillsData = skills => {
    const skillArray = skills.map(each => ({
      name: each.name,
      imageUrl: each.image_url,
    }))
    return skillArray
  }

  getLifeAtCompany = life => ({
    description: life.description,
    imageUrl: life.image_url,
  })

  getSimilarJobsList = similar => {
    console.log(similar)
    const formattedSimilardata = similar.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      location: eachItem.location,
      rating: eachItem.rating,
      title: eachItem.title,
      jobDescription: eachItem.job_description,
    }))

    return (
      <div>
        <ul className="similar-jobs-list">
          {formattedSimilardata.map(eachItem => (
            <SimilarJob key={eachItem.id} eachItem={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobData = () => {
    const {eachjobDetails} = this.state
    const {jobDetails, similarjobs} = eachjobDetails

    const formattedJobData = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      lifeAtCompany: this.getLifeAtCompany(jobDetails.life_at_company),
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      skills: this.getSkillsData(jobDetails.skills),
      title: jobDetails.title,
    }
    const listb = formattedJobData.skills

    //     console.log(formattedJobData.skills)
    return (
      <>
        <div className="job-details">
          <div className="each-job-descriptions">
            <div className="logo-container">
              <img
                src={formattedJobData.companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="log-title-container">
                <h1>{formattedJobData.title}</h1>
                <div className="display-row">
                  <AiFillStar className="star" />
                  <p>{formattedJobData.rating}</p>
                </div>
              </div>
            </div>
            <div className="location-package">
              <div className="location-package-container">
                <div className="row">
                  <HiLocationMarker className="location-icon" />
                  <p>{formattedJobData.location}</p>
                </div>
                <div className="row">
                  <AiOutlineMail className="job-icon" />
                  <p className="employment-type">
                    {formattedJobData.employmentType}
                  </p>
                </div>
              </div>

              <p className="package">{formattedJobData.packagePerAnnum}</p>
            </div>
            <hr className="hr-line" />
            <div className="visit-description">
              <h1>Description</h1>
              <div>
                <a href={formattedJobData.companyWebsiteUrl} className="visit">
                  Visit
                </a>
                <GrShare />
              </div>
            </div>

            <p className="description">{formattedJobData.jobDescription}</p>
            <div>
              <h1>skills</h1>
              <ul className="skills-list">
                {listb.map(each => (
                  <SkillItem key={each.id} each={each} />
                ))}
              </ul>
            </div>
            <div>
              <h1>Life at company</h1>
              <div className="life-at-company">
                <p>{formattedJobData.lifeAtCompany.description}</p>
                <img
                  src={formattedJobData.lifeAtCompany.imageUrl}
                  alt="life at company"
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <div>
          <ul>{this.getSimilarJobsList(similarjobs)}</ul>
        </div>
      </>
    )
  }

  renderJobDetailsFailure = () => (
    <div className="JobDetails-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        className="retry"
        type="button"
        onClick={this.getData} // {this.onClickRetryJobDetails}
      >
        Retry
      </button>
    </div>
  )
  //  {isLoading ? this.renderLoader() : this.renderJobData()}

  renderResult = () => {
    const {jobDetailsStatus} = this.state
    switch (jobDetailsStatus) {
      case jobDetailsConstants.initial:
        return this.renderLoader()

      case jobDetailsConstants.success:
        return this.renderJobData()

      case jobDetailsConstants.failure:
        return this.renderJobDetailsFailure()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">{this.renderResult()}</div>
      </>
    )
  }
}

export default JobItemDetails
