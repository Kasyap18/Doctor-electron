Doctor Appointment Manager (Electron App)
A cross-platform desktop application built with Electron for managing doctor appointments. This modern and user-friendly app allows you to create, view, edit, delete, and filter appointments with persistent storage on disk.

✨ Features
📝 Create Appointment
Fill out a form with:

Name

Phone Number

Date

Time

Symptoms

Automatically checks for any existing appointment within ±15 minutes on the same date.

Shows an error if a time conflict exists, otherwise saves with a success message.

📋 View Appointments
Scrollable, responsive list of all appointments.

Live updates as appointments are added, edited, or deleted.

✏️ Edit Appointment
Each appointment includes an Edit button.

Opens a modal with pre-filled details.

Enforces the 15-minute conflict rule on update.

❌ Delete Appointment
Each appointment includes a Delete button.

Confirms and removes the appointment from list and disk.

🔍 Search & Filter
Real-time filtering of appointments by:

Name

Date

Symptoms

💾 Persistent Storage
All appointments are saved to a local appointments.json file.

Data persists across app restarts.
