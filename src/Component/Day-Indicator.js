import React from 'react'

const DayIndicator = () => {
  return (
    <div>
        <div className='flex gap-4 flex-col items-center justify-center max-w-2xl'>
            <h3 className='text-center font-semibold text-md sm:text-lg'>Indicator</h3>
            <ul className='flex gap-4 ' style={{width : "100%"}}>
                <li className='flex gap-1 items-center justify-start '><span className='present '></span><span className='text-left'>Present Mark</span></li>
                <li className='flex gap-1 items-center justify-start'><span className='absent '></span><span className='text-left'>Absent Mark</span></li>
                <li className='flex gap-1 items-center justify-start'><span className='half-day '></span><span className='text-left'>Half-Day Mark</span></li>
            </ul>
        </div>
    </div>
  )
}

export default DayIndicator