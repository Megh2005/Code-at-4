import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="/edit-note/:id" element={<EditNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
