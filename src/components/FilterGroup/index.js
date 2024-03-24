import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const {onChangeJobType, onChangeSalary} = props
  const renderEmploysFilter = () => (
    <>
      <hr className="separator" />
      <h1>Type of Employment</h1>
      <ul className="employment-filters-card">
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId}>
            <input
              type="checkbox"
              value={each.employmentTypeId}
              id={each.employmentTypeId}
              onChange={() => {
                onChangeJobType(each.employmentTypeId)
              }}
            />
            <label htmlFor={each.employmentTypeId}>{each.label}</label>
          </li>
        ))}
      </ul>
    </>
  )

  const renderSalaryFilter = () => (
    <>
      <hr className="separator" />
      <h1>Salary Range</h1>
      <ul className="employment-filters-card">
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId}>
            <input
              name="salary"
              type="radio"
              value={each.salaryRangeId}
              id={each.salaryRangeId}
              onChange={() => {
                onChangeSalary(each.salaryRangeId)
              }}
            />
            <label htmlFor={each.salaryRangeId}>{each.label}</label>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <div>
      <div>{renderEmploysFilter()}</div>
      <div>{renderSalaryFilter()}</div>
    </div>
  )
}

export default FilterGroup
