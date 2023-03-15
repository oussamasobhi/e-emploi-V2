import React from 'react'

const Service1 = () => {
    return (
        <div className='bg-cyan'>
            <div className='flex flex-row justify-around h-96'>
                <div className="w-1/2 px-20">
                    <div className='h-full flex flex-col items-center justify-around'>
                        <h1 className='text-white text-4xl'>Services</h1>
                        <p className='text-lime text-xl max-w-3/4'>Pour nous, la proprété doit être immaculé</p>
                    </div>
                </div>

                <div className='flex flex-col w-1/2 items-start justify-center'>
                    <p className='text-white w-3/4 px-5'>
                        La plateforme propose une gestion des compétences, les produits destinés à servir d'autre personne contre une paye. <br />
                        Vous pouvez créer une annonce de produit, déposer une proposition de service au tarif que vous avez décider,
                        la possibilité d'échanger directement avec l'intéressé, partager les documents relatif à la mission,
                        jusu'a la validation du devis avec l'accord des 2 parties sur les termes du contrat.<br />
                        Les utilisateurs peuvent mettre en défits les prticuliers ou les professioels d'encherre sur votre demande,
                        votre projet, afin d'obtenir la qualitée et le prx qui vous conviennent.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Service1