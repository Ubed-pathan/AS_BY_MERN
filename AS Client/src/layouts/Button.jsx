import React from 'react'

export default function Button(props) {
    return (
        <div>
            <button className="px-6 py-1 border-2 border-customGreen text-customGreen hover:bg-customGreen hover:text-customYellow hover:border-customGreen transition-all rounded-full cursor-pointer"
            onClick={props.onClick}
            >
                {props.title}
            </button>
        </div>
    )
}
