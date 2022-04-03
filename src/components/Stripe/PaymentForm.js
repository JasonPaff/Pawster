import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
            // backgroundColor: "#A3C850",
			// iconColor: "#FFFFFF",
			// color: "#FFFFFF",
			// fontWeight: 500,
			// fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			// fontSize: "20px",
			// fontSmoothing: "antialiased",
			// ":-webkit-autofill": { color: "#fce883" },
			// "::placeholder": { color: "#FFFFFF" },
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:4000/payment", {
                amount: 1000,
                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit} className="flex-col">
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement className="p-3 rounded-md bg-background-darker text-white" options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <div className="flex">
                <button className="mt-5">Pay</button>
            </div>
        </form>
        :
       <div>
           <h2>Host booked</h2>
       </div> 
        }
            
        </>
    )
}