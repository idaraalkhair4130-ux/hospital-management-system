const patientService = require('../services/patientService');

const create = async (req, res) => {
    try {
        const patient = await patientService.createPatient(req.body);
        res.json({ message: 'Patient created', patient });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const list = async (req, res) => {
    try {
        const patients = await patientService.getAllPatients();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOne = async (req, res) => {
    try {
        const patient = await patientService.getPatientById(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.json(patient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const update = async (req, res) => {
    try {
        const patient = await patientService.updatePatient(req.params.id, req.body);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.json({ message: 'Patient updated', patient });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { create, list, getOne, update };
