# Note @ Ease

**Note @ Ease** is a secure, professional, and strictly light-themed note-taking application designed for simplicity and efficiency. Built with the **MERN Stack** (MongoDB, Express, React, Node.js).


## 🚀 Features

- **Authentication**: Secure Login and Signup functionality using JWT (HttpOnly Cookies).
- **Note Management**:
  - **`Create new`** notes easily.
  - **`Update`** existing notes via a dedicated.
  - **`Delete`** unwanted notes.
  - **`Read`** all notes in a responsive grid.
  - **`Timestamps`** (Ist / DD-MM-YYYY format).
- **Profile Management**:
  - Update personal information (Name, Email).
  - "Danger Zone" to permanently delete your account.
  - Custom Avatar generation based on initials.
- **Strict Light Theme**: A professional, clean, and distraction-free white/gray/blue color palette.
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), React Router DOM, Axios, React Hot Toast.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Authentication**: JSON Web Tokens (JWT), BcryptJS.
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, Grid).

## ⚙️ Installation & Setup

### Prerequisites

- Node.js installed.
- MongoDB installed locally or a MongoDB Atlas URI.

### 1. Clone the Repository

```bash
git clone <repository_url>
cd code-at-3
```

### 2. Backend Setup

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

Start the backend server:

```bash
npm start
```

_Server runs on http://localhost:5000_

### 3. Frontend Setup

Open a new terminal, navigate to the frontend folder, and install dependencies:

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm run dev
```

_App runs on http://localhost:5173_

## 📝 Usage

1.  Open the app in your browser.
2.  **Sign Up** for a new account.
3.  **Login** to access your dashboard.
4.  Click **"+ New Note"** to write something down.
5.  Use the **Edit** or **Delete** buttons on note cards to manage your content.
6.  Visit **Profile** via the top Navbar to update settings or logout.
