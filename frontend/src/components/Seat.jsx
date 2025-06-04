import React from 'react'
import { MdEventSeat } from 'react-icons/md'


function Seat({seat}) {

    const getSeatColor = (status) => {
        switch (status) {
          case 'booked':
            return 'text-red-500'
          case 'available':
            return 'text-green-500'
          default:
            return 'text-gray-500'
        }
    }
  return (
    <div className="flex flex-col items-center text-xs">
    <MdEventSeat  size={28} className={`${getSeatColor(seat?.status)} transition-colors`} />
    <span>{seat.row}{seat.number}</span>
  </div>
  )
}

export default Seat