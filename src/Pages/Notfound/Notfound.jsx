import React from 'react'
import error from '../../assets/images/error.svg'

export default function Notfound() {
  return (
    <div className='w-full pb-10 pt-26 flex items-center justify-center'>
        <img src={error}/>
    </div>
  )
}
