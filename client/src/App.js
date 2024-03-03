import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Activity,
  AdminDashboard,
  Family,
  Landing,
  Login,
  Signup,
} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id" element={<AdminDashboard />}>
          <Route path="activity" element={<Activity />} />
          <Route path="family" element={<Family />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
