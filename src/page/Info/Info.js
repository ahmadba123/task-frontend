import React from 'react'
import "./Info.css"
import remove from '../../pic/RemoveQuote.svg'

function Info(props) {
  return (
    <div className='containerInfo'>
      <span>"Anything that can go wrong, will go wrong!"</span>
      <img src={remove} width={15} className="removeInfo"
        onClick={props.handleClose}
      />

    </div>
  )
}

export default Info