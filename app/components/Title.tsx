import React from 'react'

const Title = ({ title }: { title: string }) => {
    return (
        <div className='bg-black text-white flex items-center justify-center text-4xl pt-25 pb-14'>
            <p>{title}</p>
        </div>)
}

export default Title