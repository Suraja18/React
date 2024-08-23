import React from 'react'

const AllTable = (props) => {
    return (
        <div>
            <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price (Rs)</th>
                <th>Color</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {props.children}
            </tbody>
          </table>
        </div>
    )
}

export default AllTable