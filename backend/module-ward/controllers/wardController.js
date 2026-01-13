const wardService = require('../services/wardService');

const add = async (req, res) => {
    try {
        const bed = await wardService.addBed(req.body);
        res.json({ message: 'Bed added', bed });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const list = async (req, res) => {
    try {
        const beds = await wardService.getBeds();
        res.json(beds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        // Handle both /:id/status and body
        const id = req.params.id;
        const { status } = req.body;
        const bed = await wardService.updateBedStatus(id, status);
        res.json({ message: 'Status updated', bed });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const remove = async (req, res) => {
    try {
        await wardService.deleteBed(req.params.id);
        res.json({ message: 'Bed deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { add, list, updateStatus, remove };
