import React from 'react'

const DayIndicator = () => {
  return (
    <div>
        <div className='flex gap-4 sm:flex-col items-center justify-center max-w-2xl'>
            <h3 className='text-center font-semibold text-md sm:text-lg'>Indicator</h3>
            <ul className='' style={{width : "100%"}}>
                <li className='flex gap-4 items-center justify-start '><span className='text-left'>Present Mark</span><span className='present '></span></li>
                <li className='flex gap-4 items-center justify-start'><span className='text-left'>Absent Mark</span><span className='absent '></span></li>
                <li className='flex gap-4 items-center justify-start'><span className='text-left'>Half-Day Mark</span><span className='half-day '></span></li>
            </ul>
        </div>
    </div>
  )
}

export default DayIndicator