import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51KXLYYJoPtSQuC0kAEKy6wjk5JgfTMQIwyRMd0sGL48zuaIXkmNA74OK8RG1bs26lRjyb1tqjJMdgcOGLhVWBwen00RMk6x9he');
export const Payment= async (req, res) => {
    let { a, id } = req.body
  let amount=Math.round(a*100)
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Spatula company",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}


}