import {CompatibilityEvent} from "h3";

import Stripe from 'stripe';

const config = useRuntimeConfig()
// const stripe = new Stripe(config.private.stripeSecretKey);

const stripe = Stripe('sk_test_51KjUqiLFKH21qqudtgwDCjDSRRPzUXmyFtd8V7d9lhEBBBMB74FD0xNJpZLcbQgz0LnSIFPfXTM8mrQHetHQTpNj0044bFUerJ');

export default defineEventHandler(async (event: CompatibilityEvent) => {
    const body = await readBody(event)
    const session_id = body.session_id
    const returnUrl = 'http://localhost:3000'
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
    const portalSession = await stripe.billingPortal.sessions.create({
        customer: checkoutSession.customer as string,
        return_url: returnUrl
    });

    await sendRedirect(event, portalSession.url)
})