const pharmacyService = require('../services/pharmacyService');

const add = async (req, res) => {
    try {
        const medicine = await pharmacyService.addMedicine(req.body);
        res.json({ message: 'Medicine added', medicine });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const list = async (req, res) => {
    try {
        const medicines = await pharmacyService.getMedicines();
        res.json(medicines);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const update = async (req, res) => {
    try {
        const { id, stock, price } = req.body;
        const medicine = await pharmacyService.updateMedicine(id, { stock, price });
        res.json({ message: 'Medicine updated', medicine });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const issue = async (req, res) => {
    try {
        const { id, quantity } = req.body;
        const medicine = await pharmacyService.issueMedicine(id, quantity);
        res.json({ message: 'Medicine issued', medicine });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { add, list, update, issue };
