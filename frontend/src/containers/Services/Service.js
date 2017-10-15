import React from 'react'
import Services from '../../services/index'
import Header from '../../components/shared/Header'

const mapping = {
  orgdev: 'Organizational Development',
  tokenservices: 'Token Services',
  productdesign: 'Product Design'
}
const Service = (props) => {
  const dataObj = Services[mapping[props.match.params.circle]]

  return (<div>
    <Header />
    {JSON.stringify(dataObj)}
  </div>)
}

export default Service
