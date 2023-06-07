import React from 'react'
import { Link } from 'react-router-dom';


const Card = (props) => {
    
    return (
        <Link to={`/${props.page}`} className='hover:bg-teal-500 hover:text-white rounded-2xl py-8 px-6' onClick={props.choice}>
            <div className='flex flex-col border text-left rounded-2xl py-12 px-8'>
                <div>
                    <div className='bg-[#02f9ab] inline-flex p-2 rounded-full'>
                        {props.icon}
                    </div>
                    <h3 className='text-xl font-bold py-4'>{props.heading}</h3>
                    <p>
                        {props.text}
                    </p>

                </div>
            </div>
        </Link>
    )
}

export default Card;