
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"


const stripeTestPromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

export default function StripeContainer() {
	return (
		<Elements className="w-3/5" stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}