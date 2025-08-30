import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashbord'
import Login from './pages/Login'
import Student_List from './pages/Student_List'
import Summary from './pages/Summary'

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/studentlist' element={<Student_List/>} />
            <Route path='/Summary' element={<Summary/>} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
