const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const APPOINTMENTS_FILE = path.join(__dirname, 'appointments.json');

let todayWindow;
let createWindow;
let listWindow;
let appointments = [];

function loadAppointments() {
    try {
        if (fs.existsSync(APPOINTMENTS_FILE)) {
            const data = fs.readFileSync(APPOINTMENTS_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error('Error loading appointments:', err);
    }
    return [];
}

function saveAppointments() {
    try {
        fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), 'utf8');
    } catch (err) {
        console.error('Error saving appointments:', err);
    }
}

app.on("ready", () => {
    console.log("App is ready");

    todayWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        title: "Doctor Appointment"
    });

    todayWindow.loadURL(`file://${__dirname}/today.html`);

    todayWindow.on("closed", () => {
        app.quit();
        todayWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const createWindowCreator = () => {
    console.log("Creating createWindow");

    createWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        width: 600,
        height: 400,
        title: "Create New Appointment"
    });

    createWindow.setMenu(null);
    createWindow.loadURL(`file://${__dirname}/create.html`);

    createWindow.on("closed", () => (createWindow = null));
};

const listWindowCreator = () => {
    console.log("Creating listWindow");

    listWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        width: 600,
        height: 400,
        title: "All Appointments"
    });

    listWindow.setMenu(null);
    listWindow.loadURL(`file://${__dirname}/list.html`);

    listWindow.on("closed", () => (listWindow = null));
};

ipcMain.on("appointment:create", (event, elements) => {
    console.log("Received appointment:create with elements:");
    Object.entries(elements).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
    // Check for 15-minute conflict on the same date
    const newDate = elements.date;
    const newTime = elements.time;
    const [newHour, newMinute] = newTime.split(":").map(Number);
    const newDateObj = new Date(`${newDate}T${newTime}`);
    let conflict = false;
    for (const appt of appointments) {
        if (appt.date === newDate) {
            const [apptHour, apptMinute] = appt.time.split(":").map(Number);
            const apptDateObj = new Date(`${appt.date}T${appt.time}`);
            const diff = Math.abs(newDateObj - apptDateObj) / (1000 * 60); // difference in minutes
            if (diff < 15) {
                conflict = true;
                break;
            }
        }
    }
    if (conflict) {
        event.sender.send('appointment:result', { success: false, message: 'There is already an appointment within 15 minutes of this time.' });
    } else {
        appointments.push(elements);
        saveAppointments();
        if (listWindow) {
            listWindow.webContents.send('appointments:data', appointments);
        }
        event.sender.send('appointment:result', { success: true });
    }
});

ipcMain.on('appointments:request', (event) => {
    event.sender.send('appointments:data', appointments);
});

ipcMain.on('appointment:edit', (event, { index, updated }) => {
    if (appointments[index]) {
        // Check for 15-minute conflict (excluding the current appointment)
        const newDate = updated.date;
        const newTime = updated.time;
        const newDateObj = new Date(`${newDate}T${newTime}`);
        let conflict = false;
        for (let i = 0; i < appointments.length; i++) {
            if (i === index) continue;
            const appt = appointments[i];
            if (appt.date === newDate) {
                const apptDateObj = new Date(`${appt.date}T${appt.time}`);
                const diff = Math.abs(newDateObj - apptDateObj) / (1000 * 60);
                if (diff < 15) {
                    conflict = true;
                    break;
                }
            }
        }
        if (conflict) {
            event.sender.send('appointment:result', { success: false, message: 'There is already an appointment within 15 minutes of this time.' });
        } else {
            appointments[index] = updated;
            saveAppointments();
            if (listWindow) {
                listWindow.webContents.send('appointments:data', appointments);
            }
            event.sender.send('appointment:result', { success: true });
        }
    }
});

ipcMain.on('appointment:delete', (event, index) => {
    if (appointments[index]) {
        appointments.splice(index, 1);
        saveAppointments();
        if (listWindow) {
            listWindow.webContents.send('appointments:data', appointments);
        }
        event.sender.send('appointment:result', { success: true });
    }
});

const menuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "New Appointment",
                click() {
                    createWindowCreator();
                }
            },
            {
                label: "All Appointments",
                click() {
                    listWindowCreator();
                }
            },
            {
                label: "Quit",
                accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: "Edit",
        submenu: [
            { role: "reload" },
            { role: "toggleDevTools" }
        ]
    }
];
