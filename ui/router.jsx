import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
  } from "react-router-dom";
  import FrontPage from './src/FrontPage.jsx'
import Bookings from "./src/Pages/Bookings.jsx";
import WeekTemplates from "./src/Pages/WeekTemplates.jsx";
import CreateWeekTemplate from "./src/Pages/CreateWeekTemplate.jsx";
import CreateSession from "./src/Pages/CreateSession.jsx";
import CreateWeekSessionsTemplate from "./src/Pages/CreateWeekSessionsTemplate.jsx";
import AddStudent from "./src/Pages/AddStudent/AddStudent.jsx";
  
  export const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<FrontPage />} />
      <Route path="/bookings" element={<Bookings pageName="Bookings" />} />
      <Route path="/add-student" element={<AddStudent pageName="Add Student" />} />
      <Route path="/create-session" element={<CreateSession pageName="Create Session" />} />
      <Route path="/week-templates" element={<WeekTemplates pageName="Week Templates" />} />
      <Route path="/create-week-template" element={<CreateWeekTemplate pageName="Create Week Template" />} />
      <Route path="/create-week-sessions-template" element={<CreateWeekSessionsTemplate pageName="Create Week Sessions Template" />} />

      </>
    )
  );