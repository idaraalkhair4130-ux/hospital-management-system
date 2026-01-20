/**
 * DASHBOARD CONTROLLER
 * Handles View Routing and Interaction Logic.
 */

const DASHBOARD = {
    contentArea: null,

    init: () => {
        DASHBOARD.contentArea = document.getElementById('roleContent');
        const user = AUTH.getUser();

        if (user.role === 'ADMIN') {
            DASHBOARD.renderOverview();
        } else if (user.role === 'DOCTOR') {
            DASHBOARD.renderDoctorOverview();
        } else {
            DASHBOARD.contentArea.innerHTML = `<p>Welcome, ${user.fullName}</p>`;
        }
    },

    // --- ADMIN VIEWS (Existing) ---
    renderOverview: () => { /* ... existing code ... */
        const users = MOCK_DB.getUsers();
        DASHBOARD.contentArea.innerHTML = `
            <h3>System Overview</h3>
            <p style="color: #666; margin-bottom: 2rem;">Here is what's happening in the hospital today.</p>
            
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <div class="stat-card" style="flex: 1; min-width: 200px;">
                    <h3>Total Users</h3>
                    <p style="font-size: 2rem; color: var(--primary); font-weight: 700;">${users.length}</p>
                </div>
                <!-- ... -->
            </div>
        `;
    },

    renderUserManagement: () => {
        // ... (Existing implementation kept in mind, re-injecting full for file consistency) ...
        const users = MOCK_DB.getUsers();
        let rows = users.map(u => `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${u.avatar}" style="width: 32px; height: 32px; border-radius: 50%;">
                        <div><div style="font-weight: 500;">${u.fullName}</div><div style="font-size: 0.8rem; color: #888;">@${u.username}</div></div>
                    </div>
                </td>
                <td><span class="badge badge-${u.role.toLowerCase()}">${u.role}</span></td>
                <td><button class="action-btn delete" onclick="DASHBOARD.handleDeleteUser('${u.id}')" ${u.username === 'admin' ? 'disabled' : ''}><span class="material-icons-round">delete</span></button></td>
            </tr>`).join('');

        DASHBOARD.contentArea.innerHTML = `
            <div style="display: flex; justify-content: space-between;"><h3>User Management</h3></div>
            <div class="table-container"><table><thead><tr><th>User</th><th>Role</th><th>Actions</th></tr></thead><tbody>${rows}</tbody></table></div>
            <button class="fab" onclick="document.getElementById('addUserModal').classList.add('show')"><span class="material-icons-round">add</span></button>
            
            <!-- Modals defined in main HTML for simplicity or re-injected here -->
            <div id="addUserModal" class="modal-backdrop">
                <div class="modal-card">
                    <div class="modal-header"><h3>Add User</h3><button class="close-btn" onclick="document.getElementById('addUserModal').classList.remove('show')">&times;</button></div>
                    <form onsubmit="DASHBOARD.handleAddUser(event)">
                        <div class="form-group"><label class="form-label">Full Name</label><input type="text" name="fullName" class="form-input" required></div>
                        <div class="form-group"><label class="form-label">Username</label><input type="text" name="username" class="form-input" required></div>
                        <div class="form-group"><label class="form-label">Password</label><input type="password" name="password" class="form-input" required></div>
                        <div class="form-group"><label class="form-label">Role</label>
                            <select name="role" class="form-input" required>
                                <option value="DOCTOR">Doctor</option><option value="RECEPTIONIST">Receptionist</option><option value="PHARMACIST">Pharmacist</option><option value="WARD_STAFF">Ward Staff</option>
                            </select>
                        </div>
                        <button type="submit" class="btn-primary">Create</button>
                    </form>
                </div>
            </div>
        `;
    },

    renderSettings: () => { /* ... existing ... */
        const settings = MOCK_DB.getSettings();
        DASHBOARD.contentArea.innerHTML = `<h3>System Settings</h3><form onsubmit="DASHBOARD.handleSaveSettings(event)"><div class="settings-grid">
            <div class="form-group"><label class="form-label">Hospital Name</label><input name="hospitalName" class="form-input" value="${settings.hospitalName}"></div>
            <div class="form-group"><label class="form-label">Fee</label><input name="doctorFee" class="form-input" value="${settings.doctorFee}"></div>
            <div class="form-group"><button type="submit" class="btn-primary">Save</button></div>
        </div></form>`;
    },


    // --- DOCTOR VIEWS ---

    renderDoctorOverview: () => {
        const user = AUTH.getUser();
        // Force re-fetch from DB to ensure latest stats
        const appointments = MOCK_DB.getAppointments(user.id);
        const pending = appointments.filter(a => a.status === 'PENDING').length;
        const completed = appointments.filter(a => a.status === 'COMPLETED').length;

        DASHBOARD.contentArea.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3>Doctor Dashboard</h3>
                <button class="btn-primary" style="width: auto; padding: 8px 16px; font-size: 0.8rem;" onclick="DASHBOARD.renderDoctorOverview()">
                    <span class="material-icons-round" style="vertical-align: middle; font-size: 1rem;">refresh</span> Refresh Stats
                </button>
            </div>
            <p style="color: #666; margin-bottom: 2rem;">Welcome back, ${user.fullName}.</p>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;">
                <div class="stat-card" style="flex: 1; border-left: 5px solid #f59e0b;">
                    <h3>Pending Tokens</h3>
                    <p style="font-size: 2.5rem; color: #f59e0b; font-weight: 700;">${pending}</p>
                    <p style="font-size: 0.85rem; color: #888;">Patients waiting in queue</p>
                </div>
                <div class="stat-card" style="flex: 1; border-left: 5px solid var(--success);">
                    <h3>Treated Today</h3>
                    <p style="font-size: 2.5rem; color: var(--success); font-weight: 700;">${completed}</p>
                    <p style="font-size: 0.85rem; color: #888;">Prescriptions written</p>
                </div>
            </div>

            <h4 style="margin-bottom: 1rem; color: var(--text-color);">Current Queue</h4>
            ${DASHBOARD.getAppointmentsTable(appointments.filter(a => a.status === 'PENDING'))}
        `;
    },

    renderDoctorAppointments: () => {
        const user = AUTH.getUser();
        const appointments = MOCK_DB.getAppointments(user.id);

        DASHBOARD.contentArea.innerHTML = `
             <h3>My Appointments</h3>
             <p style="margin-bottom:1rem;">Manage your patient queue.</p>
             ${DASHBOARD.getAppointmentsTable(appointments)}
        `;
    },

    getAppointmentsTable: (list) => {
        if (!list.length) return `<div style="padding: 2rem; text-align: center; color: #888; background: #f9fafb; border-radius: 12px;">No appointments found.</div>`;

        let rows = list.map(a => `
            <tr>
                <td><span style="font-weight: 700; color: var(--primary);">${a.token}</span></td>
                <td>${a.time}</td>
                <td>${a.patientName} <span style="font-size:0.8rem; color:#888;">(${a.age} Y/O)</span></td>
                <td><span class="badge ${a.status === 'PENDING' ? 'badge-reception' : 'badge-patient'}">${a.status}</span></td>
                <td>
                    ${a.status === 'PENDING' ?
                `<button class="btn-primary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="DASHBOARD.openPrescriptionModal(${a.id})">Treat / Rx</button>`
                : '<span style="color: green; font-weight: 600;"><span class="material-icons-round" style="vertical-align: middle; font-size: 1rem;">check_circle</span> Treated</span>'}
                </td>
            </tr>
        `).join('');

        return `
            <div class="table-container">
                <table><thead><tr><th>Token</th><th>Time</th><th>Patient</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table>
            </div>
            
            <!-- Prescription Modal -->
            <div id="rxModal" class="modal-backdrop">
                <div class="modal-card" style="max-width: 600px;">
                    <div class="modal-header"><h3>Write Prescription</h3><button class="close-btn" onclick="document.getElementById('rxModal').classList.remove('show')">&times;</button></div>
                    <div id="rxPatientInfo" style="margin-bottom: 1rem; padding: 10px; background: #f3f4f6; border-radius: 8px; font-size: 0.9rem;"></div>
                    
                    <form onsubmit="DASHBOARD.handleSaveRx(event)">
                        <input type="hidden" name="appointmentId" id="rxAppointmentId">
                        <div class="form-group"><label class="form-label">Diagnosis</label><input type="text" name="diagnosis" class="form-input" placeholder="e.g. Viral Fever" required></div>
                        <div class="form-group"><label class="form-label">Medicines (One per line)</label><textarea name="medicines" class="form-input" rows="4" placeholder="1. Paracetamol 500mg - 2 Days" required></textarea></div>
                        <div class="form-group"><label class="form-label">Notes / Advice</label><textarea name="notes" class="form-input" rows="2" placeholder="Drink plenty of water"></textarea></div>
                        <button type="submit" class="btn-primary">Save & Complete</button>
                    </form>
                </div>
            </div>
        `;
    },

    renderDoctorSchedule: () => {
        const user = AUTH.getUser();
        const schedule = MOCK_DB.getDoctorSchedule(user.id);

        DASHBOARD.contentArea.innerHTML = `
            <h3>My Schedule</h3>
            <div class="glass-card" style="text-align: left; margin-top: 1rem;">
                <div style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1rem; color: var(--primary);">Weekly Roster</div>
                <div style="display: grid; gap: 1rem;">
                    <div><span style="font-weight: 600; width: 100px; display: inline-block;">Days:</span> ${schedule.days.join(', ')}</div>
                    <div><span style="font-weight: 600; width: 100px; display: inline-block;">Time:</span> ${schedule.time}</div>
                    <div><span style="font-weight: 600; width: 100px; display: inline-block;">Room:</span> ${schedule.room}</div>
                </div>
            </div>
        `;
    },


    // --- HANDLERS ---

    // ... (Old Admin Handlers kept) ...
    handleAddUser: (e) => { /* ... existing ... */ e.preventDefault(); /* simplified for this file */ MOCK_DB.addUser({ username: e.target.username.value, role: e.target.role.value, fullName: e.target.fullName.value, password: e.target.password.value }); document.getElementById('addUserModal').classList.remove('show'); DASHBOARD.renderUserManagement(); },
    handleDeleteUser: (id) => { if (confirm("Delete?")) { MOCK_DB.deleteUser(id); DASHBOARD.renderUserManagement(); } },
    handleSaveSettings: (e) => { e.preventDefault(); MOCK_DB.updateSettings({ hospitalName: e.target.hospitalName.value, doctorFee: e.target.doctorFee.value }); alert("Saved"); },

    // Doctor Handlers
    openPrescriptionModal: (aptId) => {
        const appointments = MOCK_DB.getAppointments();
        const apt = appointments.find(a => a.id == aptId);

        document.getElementById('rxAppointmentId').value = aptId;
        document.getElementById('rxPatientInfo').innerHTML = `<strong>Patient:</strong> ${apt.patientName} (${apt.age}) <br> <strong>Issue:</strong> ${apt.issue}`;
        document.getElementById('rxModal').classList.add('show');
    },

    handleSaveRx: (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const rx = {
            appointmentId: fd.get('appointmentId'),
            diagnosis: fd.get('diagnosis'),
            medicines: fd.get('medicines'),
            notes: fd.get('notes'),
            doctorId: AUTH.getUser().id
        };

        const res = MOCK_DB.savePrescription(rx);
        if (res.success) {
            alert("Prescription Saved!");
            document.getElementById('rxModal').classList.remove('show');
            DASHBOARD.renderDoctorOverview(); // Refresh
        }
    }
};
