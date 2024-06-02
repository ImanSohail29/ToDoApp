import {BrowserRouter,Routes,Route} from "react-router-dom"
import Dashboard from './pages/Dashboard'
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      {/* <Route element={<ProtectedRoutesComponent/>}> */}
        <Route path='/' element={<Dashboard></Dashboard>}></Route>
        {/* </Route> */}
        <Route path="*" element="Page not exists 404" />
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
        
      
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
