import { Subscription } from "../models/subscription.model.js";

export const createSubscription = async (req, res) => {
    try {
        const { name, billingCycle, nextBillingDate, category } = req.body;
        
        if (!name || !billingCycle || !nextBillingDate || !category) {
            return res.status(400).json({ error: 'All details are required' });
        }
        const newSubscription = await Subscription.create({
            name,
            billingCycle,
            nextBillingDate,
            category,
            userId: req.user.id
        });
        return res.status(201).json(newSubscription);

    } catch (error) {
        console.error("Create Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getSubscription = async (req, res) => {
    try {
        const subs = await Subscription.find({ userId: req.user.id });

        return res.status(200).json(subs);
    } catch (error) {
        console.error("Get Error:", error);
        return res.status(500).json({ error: 'Failed to get subscriptions' });
    }
}