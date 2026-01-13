const receptionService = require('../services/receptionService');

const generate = async (req, res) => {
    try {
        const token = await receptionService.generateToken(req.body);
        res.json({ message: 'Token generated', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const list = async (req, res) => {
    try {
        const tokens = await receptionService.getTokens();
        res.json(tokens);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const assign = async (req, res) => {
    try {
        const { tokenId, doctorId } = req.body;
        const token = await receptionService.assignDoctor(tokenId, doctorId);
        res.json({ message: 'Doctor assigned', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const remove = async (req, res) => {
    try {
        await receptionService.deleteToken(req.params.id);
        res.json({ message: 'Token deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { generate, list, assign, remove };
