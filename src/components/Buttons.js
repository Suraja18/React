import React from 'react'

function Buttons(props) {
  return (
    <div>
        <div className="form-input">
            {
            !props.data ?
            <button className="btn add" onClick={(e) => props.add(e)}>Add</button>
            :
            <button className="btn edit" onClick={() => props.update()}>Update</button>
            }
            <button className="btn delete" onClick={() => props.clear()}>Clear</button>
        </div>
    </div>
  )
}

export default Buttons