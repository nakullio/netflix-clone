import React, { useEffect, useState } from 'react'
import db from '../firebase';
import './PlansScreen.css'

function PlansScreen() {
    const [products, setProducts] = useState([]);

    // using useEffect to fetch the plan, which has been created with firebase-stripe integration
    useEffect(() => {
        db.collection('products').where('active', '==', true)
        .get().then(querySnapshot => {
            const products = {};
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection('prices').get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    } 
                })
            })
            setProducts(products);
        });
    }, []);

    console.log(products)

    return (
        <div className='planScreen'>
            
        </div>
    )
}

export default PlansScreen
