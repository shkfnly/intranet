import React from 'react'

const styles = {
  container: {
    paddingLeft: 10,
    paddingRight: 10
  },
  profileTextArea: {
    width: 300,
    height: 450
  }
}

const ProfileMainQuestion = (props) => {
  return (
    <div style={[props.style, styles.container]}>
      <h3>{props.title}</h3>
      <p>{props.question}</p>
      {props.children}
    </div>
  )
}

export default ProfileMainQuestion
