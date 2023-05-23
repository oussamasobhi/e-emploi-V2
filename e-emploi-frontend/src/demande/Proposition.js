import React, { useEffect } from 'react'

const Proposition = ({proposition}) => {
    useEffect(() => {
      console.log(proposition)
    }, [proposition]);
    

  return (
    <div>Proposition</div>
  )
}

export default Proposition