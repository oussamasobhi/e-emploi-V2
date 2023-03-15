import React from 'react'

const WhyUs = () => {
    return (
        <div className='bg-lime flex flex-col w-auto items-center'>
            <div className="flex flex-col h-96 px-10 justify-around text-cyan">
                <h1 className='text-center text-4xl py-6'>Pourquoi nous?</h1>
                <div className='flex flex-row h-1/2 font-bold text-xl '>
                    <div className='relative'>
                        <p className='border-l-2 border-l-green h-1/3'></p>
                        <p className='relative bottom-12 w-3/4 pl-3'>Vous aider dans vos recherches d'emplois</p>
                    </div>
                    <div>
                        <p className='relative top-12 border-l-2 border-l-green h-1/3'></p>
                        <p className='relative w-3/4 pl-3'>Suivre avec vous votre projet professionnel</p>
                    </div>
                    <div className=''>
                        <p className='border-l-2 border-l-green h-1/3'></p>
                        <p className='relative bottom-12 w-3/4 pl-3'>Vous assister pour réaliser votre projet</p>
                    </div>
                    <div>
                        <p className='relative top-12 border-l-2 border-l-green h-1/3'></p>
                        <p className='relative w-3/4 pl-3'>Vous assurer la qualité avec votre budget</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default WhyUs