import React, { Component } from 'react'
import ProfileMainQuestion from '../components/ProfileMainQuestion'

class NodeProfileForm extends Component {
  render () {
    return (
      <div style={{flex: 1}}>
        <div style={{display: 'flex'}}>
          <div style={{height: 100, width: 100, backgroundColor: 'blue'}} />
          <div style={{marginLeft: 25}}>
            <div>
              <text>Name: </text>
              <input placeholder={'Name'} />
            </div>
            <div style={{marginTop: 7}}>
              <text>Age: </text>
              <input type={'numeric'} />
            </div>
            <div style={{marginTop: 7}}>
              <text>Role: </text>
              <input placeholder={'Role'} />
            </div>
            <div style={{marginTop: 7}}>
              <text>Location: </text>
              <input placeholder={'Location'} />
            </div>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
          {/* Profile Row */}
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <ProfileMainQuestion ref='story' title={'Story'} question={'Where have you been?'} />
            <ProfileMainQuestion ref='purpose' title={'Purpose'} question={'What do you love?'} />
            <ProfileMainQuestion ref='skills' title={'Skills'} question={'What gifts do you bring?'} />
          </div>
          {/* Profile Row */}
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <ProfileMainQuestion ref='accountability' title={'Accountability'} question={'Expectations'} />
            <ProfileMainQuestion ref='needs' title={'Needs'} question={'To meet expectations'} />
            <ProfileMainQuestion ref='goals' title={'Growth Goals'} question={'Hopes for the future'} />
          </div>
        </div>
      </div>
    )
  }
}

export default NodeProfileForm
