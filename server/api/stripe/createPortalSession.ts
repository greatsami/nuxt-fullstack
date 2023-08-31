import Stripe from 'stripe';

const config = useRuntimeConfig()
const stripe = new Stripe(`${config.stripeSecretKey}`);

// const stripe = Stripe('sk_test_**************');

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const session_id = body.session_id
    const returnUrl = `${config.public.appDomain}`
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
    const portalSession = await stripe.billingPortal.sessions.create({
        customer: checkoutSession.customer as string,
        return_url: returnUrl
    });

    await sendRedirect(event, portalSession.url)
})