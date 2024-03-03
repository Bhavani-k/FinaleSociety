import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ActivityList,
  Activity,
  AdminDashboard,
  Family,
  FamilyList,
  Landing,
  Login,
  Signup,
  Dashboard,
} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id" element={<AdminDashboard />}>
          <Route path="" element={<Dashboard />} />
          <Route path="activityList" element={<ActivityList />} />
          <Route path="activityList/:nestedId" element={<Activity />} />
          <Route path="familyList" element={<FamilyList />} />
          <Route path="familyList/:nestedId" element={<Family />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
