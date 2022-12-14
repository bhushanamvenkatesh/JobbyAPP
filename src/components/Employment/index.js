import './index.css'

const Employment = props => {
  const {eachItem, onChangeJobType} = props
  const {label, employmentTypeId} = eachItem

  const onClickEmploymentType = event => {
    if (event.target.checked === true) {
      onChangeJobType(employmentTypeId)
    }
  }

  return (
    <li className="each-type">
      <input
        id={employmentTypeId}
        type="checkbox"
        onClick={onClickEmploymentType}
      />
      <label htmlFor={employmentTypeId} className="each-label">
        {label}
      </label>
    </li>
  )
}

export default Employment
