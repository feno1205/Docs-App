import './App.css'
import Docs from './Components/Docs'
import { Routes,Route } from 'react-router-dom';
import { app, database} from './Components/firebaseConfig';
import EditDocs from './Components/EditDocs';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Docs database ={database} />}/>
        <Route path='/editDocs/:id' element={<EditDocs database={database}/>} />
      </Routes>
    </>
  )
}

export default App
