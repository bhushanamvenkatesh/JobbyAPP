const SkillItem = props => {
  const {each} = props

  return (
    <li className="each-skill" key={each.id}>
      <img src={each.imageUrl} alt={each.name} className="skill-image" />
      <h1 className="skill-name">{each.name}</h1>
    </li>
  )
}

export default SkillItem
