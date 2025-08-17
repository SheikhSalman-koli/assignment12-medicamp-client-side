import React from 'react';
import square from '../../../public/assets/square-denim.jpg'
import brack from '../../../public/assets/brack.jpeg'
import incepta from '../../../public/assets/incepta.jpg'
import bdrcs from '../../../public/assets/bdrcs.png'

const Sponsers = () => {
    return (
        <section className="">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Our Partners</h2>
                <p className="text-gray-600 mb-10">
                    We are grateful to our partners and sponsors who make MediCamp possible.
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8">
                   
                    <img src={square} alt="square" className="w-22 h-12 border"  title="Square Hospital" />
                    <img src={brack} alt="brack" className="w-22 h-12 border" title="BRAC NGO" />
                    <img src={incepta} alt="incepta" className="w-22 h-12 border" title="Incepta Pharmaceuticals Ltd." />
                    <img src={bdrcs} alt="bdrcs" className="w-22 h-12 border" title="Bangladesh Red Crescent Society" />
                </div>
            </div>
        </section>
    );
};

export default Sponsers;