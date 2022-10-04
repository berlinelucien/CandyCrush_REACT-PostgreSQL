import React from 'react'

const Scoreboard = ({score}) => {
  return (
      <div className='scoreboard'>
          <h2>
              {score}
          </h2>
          </div>
  )
}

export default Scoreboard