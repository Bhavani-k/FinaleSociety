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
  InvoiceList,
  Invoices,
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
          <Route path="activityList/:activityId" element={<Activity />} />
          <Route path="familyList" element={<FamilyList />} />
          <Route path="familyList/:familyId" element={<Family />} />
          <Route path="invoices" element={<InvoiceList />} />
          <Route path="invoices/:invoiceId" element={<Invoices />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
