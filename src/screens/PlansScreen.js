import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import './PlansScreen.css'
import { loadStripe } from '@stripe/stripe-js';

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);

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

    // use async function
    const loadCheckout = async (priceId) => {
        const docRef = await db.collection('customers').doc(user.uid).collection('checkout_sessions')
        .add({
            price: priceId,
            succes_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot(async(snap) => {
            const {error, sessionId} = snap.data();

            if (error) {
                // Show an error to your customer and
                // inspect your Cloud Function logs in the Firebase console.
                alert(`An error occured: ${error.message}`);
            }

            if (sessionId) {
                // We have a session, let's redirect to Checkout
                // init Stripe

                const stripe = await loadStripe('publish_keyxxxxxxx');
                stripe.redirectToCheckout({ sessionId })
            }
        })
    }

    return (
        <div className='planScreen'>
            {Object.entries(products).map(([productId, productData]) => {
                // add some logic to check if the user's subscription is active
                return (
                    <div className="plansScreen__plan">
                        <div className="plansScreen__info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>

                        <button onClick={() => loadCheckout(productData.prices.priceId)} >Subscribe</button>
                    </div>
                )
            })}
        </div>
    )
}

export default PlansScreen
