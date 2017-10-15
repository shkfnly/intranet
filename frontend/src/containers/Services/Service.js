import React from 'react'
import Services from '../../services/index'
import Header from '../../components/shared/Header'
import { Card, CardHeader, CardTitle, CardText, Collapse } from 'reactstrap'

const styles = {
  serviceHeading: {
    backgroundColor: '#3e739e',
    color: 'white',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'

  },
  serviceHeadingText: {
    color: 'white'
  },
  title: {
    paddingLeft: 15,
    paddingTop: 15
    // backgroundColor: '#67aada'
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20

  }
}
const mapping = {
  orgdev: 'Organizational Development',
  tokenservices: 'Token Services',
  productdesign: 'Product Design'
}
const background = {
  orgdev: '#3e739e',
  tokenservices: 'teal',
  productdesign: '#e7bc4d'
}
const backgroundSelector = (key) => (
  {backgroundColor: background[key]}
)

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const CardTemplate = (props) => (
  <div>
    <CardTitle style={styles.title}>{props.title}</CardTitle>
    <CardText style={styles.content}>
      {props.content}
    </CardText>
  </div>
)

class Service extends React.Component {
  constructor () {
    super()
    this.state = {
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (i) {
    const j = i.toString()
    this.setState({[j]: typeof this.state[j] === 'undefined' ? true : !this.state[j]})
  }
  render () {
    const dataObj = Services[mapping[this.props.match.params.circle]]
    const offerings = dataObj.services.map((v, i) => {
      const backgroundColor = backgroundSelector(this.props.match.params.circle)
      return (
        <Card style={{marginBottom: 30, width: 300}} key={i} onClick={() => this.handleClick(i)}>
          <CardHeader tag='h4' style={{...styles.serviceHeading, ...backgroundColor}}>
            {v.name}
          </CardHeader>
          <Collapse isOpen={this.state[i.toString()]} style={{paddingBottom: 15}}>
            {v.benefits.length > 0
              ? (<CardTemplate title={'Benefits'} content={v.benefits.join(', ')} />)
              : null
            }
            {v.outputs.length > 0
              ? (<CardTemplate title={'Outputs'} content={v.outputs.join(', ')} />)
              : null
            }
            {v.methods.length > 0
              ? <CardTemplate title='Methods' content={v.methods.join(', ')} />
              : null
            }
            <CardTemplate title='Availability' content={capitalizeFirstLetter(JSON.stringify(v.availability))} />
            {v.members.length > 0
              ? <CardTemplate title='Members' content={v.members.join(', ')} />
              : null
            }
            {v.hours
              ? <CardTemplate title='Time Required' content={JSON.stringify(v.hours) + ' hours'} />
              : null
            }
            {v.links.length > 0
              ? <CardTemplate title='Links' content={v.links.map((v, j) => {
                return (<a key={j} href={v.url}>{v.name}</a>)
              })} />
              : null
            }
          </Collapse>
        </Card>
      )

      // let el = []
      // Object.keys(v).map((key, j) => {
      //   el.push(<div key={j}>
      //     <div>{key}</div>
      //     <div>{v[key]}</div>
      //   </div>)
      // })
      // return <div key={i}>{el}</div>
    })

    return (<div>
      <Header />
      {dataObj.description.length > 0
        ? (<div style={{marginTop: 20}}>
          <div>Description</div>
          <div>{dataObj.description}</div>
        </div>)
        : null
      }
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20}}>
        {offerings}
      </div>
    </div>)
  }
}

export default Service
