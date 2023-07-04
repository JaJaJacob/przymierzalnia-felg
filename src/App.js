import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import { NavigationBar } from './Components/Navbar/navbar';
import { FooterBar } from './Components/Navbar/footer';
import { StartPage } from './Pages/StartPage'
import { AlloysPageConstExp } from './Pages/AlloysPage'
import { CalendarPageConstExp } from './Pages/CalendarPage'
import { CreateAppointmentFormPageConstExp } from './Pages/CreateAppointmentFormPage'
import { DeleteAppointmentFormPageExp } from './Pages/DeleteAppointmentPage'
import { FittingRoomPageConstExp } from './Pages/FittingRoomPage'
import { AddNewManufacturerPageConstExp } from './Pages/AddManufacturersPage'
import { AddNewCarModelPageConsExp } from './Pages/AddCarModelsPage'
import { AddNewAlloyPageConsExp } from './Pages/AddAlloysPage';

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar/>
        <Routes>
          <Route exact path='/' element={<StartPage/>}/> 
        </Routes> 
        <Routes>
          <Route exact path='/przymierzalnia-felg' element={<FittingRoomPageConstExp/>}/> 
        </Routes>
        <Routes>
          <Route exact path='/add-car-manufacturer-16782648965927349587367' element={<AddNewManufacturerPageConstExp/>}/> 
        </Routes>
        <Routes>
          <Route exact path='/add-car-model-12436732342345228724584652' element={<AddNewCarModelPageConsExp/>}/>
        </Routes>
        <Routes>
          <Route exact path='/add-alloy-348968392197572812234' element={<AddNewAlloyPageConsExp/>}/>
        </Routes>
        <Routes>
          <Route exact path='/katalog-felg' element={<AlloysPageConstExp/>}/> 
        </Routes> 
        <Routes>
          <Route exact path='/umow-wizyte' element={<CalendarPageConstExp/>}/> 
        </Routes> 
        <Routes>
          <Route exact path='/umow-wizyte/:appointment_date' element={<CreateAppointmentFormPageConstExp/>}/> 
        </Routes>
        <Routes>
          <Route exact path='/odwolaj-wizyte' element={<DeleteAppointmentFormPageExp/>}/> 
        </Routes> 
        <FooterBar/>  
      </Router>
    </div>
  )
}

export default App;
