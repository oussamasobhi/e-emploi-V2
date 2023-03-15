import React from 'react'

const Hero = () => {
    return (
        <div className='h-114 pt-12 bg-hero-bg bg-cover bg-left bg-origin-border'>
            <div className='h-full flex flex-col items-center justify-around'>
                <div className='h-9/12'>
                    <div className='flex flex-col items-center'>
                        <p className='text-4xl bg-cyan text-white italic px-5 font-extrabold mb-1'>Pour vous aider à réaliser votre projet</p>
                        <p className='text-4xl bg-cyan text-white italic px-5 font-extrabold w-fit'>Décrivez-nous votre besoin</p>
                    </div>
                    <div className='flex flex-col justify-center items-end pt-12'>
                        <button className='text-cyan font-semibold bg-lime mb-8 p-4 text-xl w-fit hover:bg-slate-50 transition-colors duration-300 ease-in-out'>Trouvez votre femme de ménage</button>
                        <button className='text-cyan font-semibold bg-lime p-4 text-xl w-fit hover:bg-slate-50 transition-colors duration-300 ease-in-out'>Trouvez votre artisan</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero