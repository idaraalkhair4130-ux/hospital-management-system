/* ... Previous Code (User & Settings) ... */

const DB_KEY_USERS = 'HMS_DB_USERS';
const DB_KEY_SETTINGS = 'HMS_DB_SETTINGS';
const DB_KEY_APPOINTMENTS = 'HMS_DB_APPOINTMENTS';
const DB_KEY_PRESCRIPTIONS = 'HMS_DB_PRESCRIPTIONS';

// ... (DEFAULT_USERS and DEFAULT_SETTINGS kept same as before) ...

// Seed Appointments
const DEFAULT_APPOINTMENTS = [
    { id: 101, doctorId: 2, patientName: "Sarah Connor", age: 35, token: "A-001", status: "PENDING", time: "09:00 AM", issue: "Fever & Cold" },
    { id: 102, doctorId: 2, patientName: "Tony Stark", age: 45, token: "A-002", status: "PENDING", time: "09:30 AM", issue: "Chest Pain" },
    { id: 103, doctorId: 2, patientName: "Peter Parker", age: 18, token: "A-003", status: "COMPLETED", time: "10:00 AM", issue: "Back Injury" },

    // Additional Demo Data
    { id: 105, doctorId: 2, patientName: "Bruce Wayne", age: 40, token: "A-004", status: "PENDING", time: "10:30 AM", issue: "General Checkup" },
    { id: 106, doctorId: 2, patientName: "Clark Kent", age: 30, token: "A-005", status: "PENDING", time: "11:00 AM", issue: "Weakness (Kryptonite)" },
    { id: 107, doctorId: 2, patientName: "Diana Prince", age: 500, token: "A-006", status: "COMPLETED", time: "08:30 AM", issue: "Fatigue" },
    { id: 108, doctorId: 2, patientName: "Barry Allen", age: 25, token: "A-007", status: "COMPLETED", time: "08:00 AM", issue: "Shin Splints" },

    // For other doctors (demo)
    { id: 104, doctorId: 5, patientName: "Clara Oswald", age: 28, token: "B-001", status: "PENDING", time: "11:00 AM", issue: "Dizziness" }
];

const MOCK_DB = {
    // ... (Previous User/Settings methods) ...

    // --- RE-DECLARING PREVIOUS GETTERS TO BE SAFE ---

    getUsers: () => {
        const stored = localStorage.getItem(DB_KEY_USERS);
        if (!stored) {
            localStorage.setItem(DB_KEY_USERS, JSON.stringify(DEFAULT_USERS));
            return DEFAULT_USERS;
        }
        // Auto-seed logic from before
        const users = JSON.parse(stored);
        if (users.length <= 4) {
            localStorage.setItem(DB_KEY_USERS, JSON.stringify(DEFAULT_USERS));
            return DEFAULT_USERS;
        }
        return users;
    },

    saveUsers: (users) => localStorage.setItem(DB_KEY_USERS, JSON.stringify(users)),

    getSettings: () => {
        const stored = localStorage.getItem(DB_KEY_SETTINGS);
        return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
    },

    saveSettings: (settings) => localStorage.setItem(DB_KEY_SETTINGS, JSON.stringify(settings)),

    findUser: (username) => MOCK_DB.getUsers().find(u => u.username === username),
    verifyPassword: (user, pass) => user.password === pass,

    addUser: (user) => {
        const users = MOCK_DB.getUsers();
        if (users.find(u => u.username === user.username)) return { success: false, message: "Username taken!" };
        user.id = Date.now();
        user.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random&color=fff`;
        users.push(user);
        MOCK_DB.saveUsers(users);
        return { success: true, message: "User added!" };
    },

    deleteUser: (id) => {
        const users = MOCK_DB.getUsers();
        const filtered = users.filter(u => u.id != id);
        if (users.length === filtered.length) return { success: false, message: "Not found" };
        MOCK_DB.saveUsers(filtered);
        return { success: true, message: "Deleted" };
    },

    updateSettings: (s) => { MOCK_DB.saveSettings(s); return { success: true }; },


    // --- DOCTOR MODULE OPERATIONS ---

    getAppointments: (doctorId) => {
        const stored = localStorage.getItem(DB_KEY_APPOINTMENTS);
        let appointments = stored ? JSON.parse(stored) : DEFAULT_APPOINTMENTS;

        // Initial setup if empty OR if using old default data (Auto-Seed Update)
        if (!stored || (stored && appointments.length <= 4)) {
            localStorage.setItem(DB_KEY_APPOINTMENTS, JSON.stringify(DEFAULT_APPOINTMENTS));
            appointments = DEFAULT_APPOINTMENTS;
        }

        // Return appointments for specific doctor (or all if admin)
        if (doctorId) {
            return appointments.filter(a => a.doctorId == doctorId);
        }
        return appointments;
    },

    completeAppointment: (id) => {
        let appointments = MOCK_DB.getAppointments();
        const apt = appointments.find(a => a.id == id);
        if (apt) {
            apt.status = "COMPLETED";
            localStorage.setItem(DB_KEY_APPOINTMENTS, JSON.stringify(appointments));
            return true;
        }
        return false;
    },

    savePrescription: (prescription) => {
        const stored = localStorage.getItem(DB_KEY_PRESCRIPTIONS);
        let prescriptions = stored ? JSON.parse(stored) : [];

        prescription.id = Date.now();
        prescription.date = new Date().toLocaleDateString();

        prescriptions.push(prescription);
        localStorage.setItem(DB_KEY_PRESCRIPTIONS, JSON.stringify(prescriptions));

        // Mark appointment as completed
        MOCK_DB.completeAppointment(prescription.appointmentId);

        return { success: true, message: "Prescription saved!" };
    },

    getDoctorSchedule: (doctorId) => {
        // Mock schedule data (static for now)
        return {
            days: ["Monday", "Wednesday", "Friday"],
            time: "09:00 AM - 02:00 PM",
            room: "OPD Room 3"
        };
    }
};

// Init
MOCK_DB.getUsers();
window.MOCK_DB = MOCK_DB;
