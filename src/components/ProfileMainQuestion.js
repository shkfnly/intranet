import React from 'react'

const styles = {
  profileTextArea: {
    width: 300,
    height: 450
  }
}

const ProfileMainQuestion = (props) => {
  return (
    <div style={props.style}>
      <h3>{props.title}</h3>
      <p>{props.question}</p>
      <textarea style={styles.profileTextArea} />
    </div>
  )
}

export default ProfileMainQuestion
