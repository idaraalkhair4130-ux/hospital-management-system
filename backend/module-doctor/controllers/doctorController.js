const doctorService = require('../services/doctorService');

const create = async (req, res) => {
    try {
        const doctor = await doctorService.createDoctor(req.body);
        res.json({ message: 'Doctor created', doctor });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const list = async (req, res) => {
    try {
        const doctors = await doctorService.getAllDoctors();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getFee = async (req, res) => {
    try {
        const data = await doctorService.getDoctorFee(req.params.id);
        if (!data) return res.status(404).json({ message: 'Doctor not found' });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSchedule = async (req, res) => {
    try {
        const data = await doctorService.getDoctorSchedule(req.params.id);
        if (!data) return res.status(404).json({ message: 'Doctor not found' });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { create, list, getFee, getSchedule };
