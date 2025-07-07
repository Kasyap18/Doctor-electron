# 🩺 Doctor Appointment Manager (Electron App)

A modern, cross-platform desktop application built with Electron for managing doctor appointments. This user-friendly app allows you to create, view, edit, delete, and filter appointments — all with persistent local storage.

---

## ✨ Features

### 📝 Create Appointment
- Fill out a form with:
  - Name
  - Phone Number
  - Date
  - Time
  - Symptoms
- On submission:
  - Checks for existing appointments within ±15 minutes on the same date.
  - Displays an error if a conflict exists.
  - Saves the appointment and shows a success message if no conflict is found.

### 📋 View Appointments
- Scrollable and responsive list of all appointments.
- Real-time updates when appointments are added, edited, or deleted.

### ✏️ Edit Appointment
- Each appointment has an **Edit** button.
- Opens a modal with pre-filled fields.
- Enforces the 15-minute conflict rule on update.

### ❌ Delete Appointment
- Each appointment has a **Delete** button.
- Prompts for confirmation before deletion.
- Removes the appointment from the list and disk.

### 🔍 Search & Filter
- Real-time filtering by:
  - Name
  - Date
  - Symptoms

### 💾 Persistent Storage
- Appointments are stored in a local `appointments.json` file.
- Data is retained across sessions.

---

## ⚙️ Tech Stack

| Technology     | Purpose                                         |
|----------------|-------------------------------------------------|
| Electron       | Cross-platform desktop app framework            |
| HTML           | Frontend structure                              |
| CSS            | Responsive and modern UI styling                |
| JavaScript     | Core logic and interactivity                    |
| Node.js        | Backend logic within Electron's main process    |
| Electron IPC   | Secure communication between frontend and backend |
| JSON File      | Persistent local storage for appointments       |

---

## 🧠 Conflict Handling Logic

- No two appointments are allowed within **15 minutes** (before or after) on the same date.
- This rule is enforced during both:
  - Appointment creation
  - Appointment editing

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Installation

```bash
git clone https://github.com/your-username/doctor-appointment-manager.git
cd doctor-appointment-manager
npm install
