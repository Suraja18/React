import React, { useState } from 'react'

function HooksCounter() {

    const [count, setCount] = useState(0);

  return (
    <div>
        <input type='text' value={count} readOnly />
        <button onClick={() => setCount(count + 1)}>Counter</button>
    </div>
  )
}

export default HooksCounter