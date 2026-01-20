const billingService = require('../services/billingService');

const create = async (req, res) => {
    try {
        const bill = await billingService.createBill(req.body);
        res.json({ message: 'Bill created', bill });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const list = async (req, res) => {
    try {
        const bills = await billingService.getBills();
        res.json(bills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const pay = async (req, res) => {
    try {
        const bill = await billingService.payBill(req.params.id);
        res.json({ message: 'Bill Paid', bill });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const remove = async (req, res) => {
    try {
        await billingService.deleteBill(req.params.id);
        res.json({ message: 'Bill deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { create, list, pay, remove };
