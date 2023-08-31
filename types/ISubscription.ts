export type ISubscription = {
    id?: string
    userId: number
    stripeId: string
    stripeStatus: string | null
    stripePriceId: string | null
    quantity: number | null
    trialEndsAt: number | null
    endsAt: number | null
    startDate: number | null
    lastEventDate: number | null
}