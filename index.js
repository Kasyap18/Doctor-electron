const electron = require('electron');

const {app, BrowserWindow, Menu, ipcMain} = require('electron');

let todayWindow;
let createWindow;
let listWindow;

app.on("ready", () => {
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
    createWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
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
    listWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
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
    for(let i = 0; i < form.elements.length; i++) {
        console.log(form.elements[i].value);
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
                accelerator: process. platform === "darwin" ? "Command+Q" : "Ctrl+Q",
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: "Edit",
        submenu: [{role: "reload" }, {role: "toggledevTools" }]
    }
]