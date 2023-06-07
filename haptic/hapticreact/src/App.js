import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dao from './components/Dao';
import Swap from './components/Swap';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import MainPage from './components/MainPage';
import Truflation from './components/Truflation';

// import Marketplace from './components/Marketplace';
// import Send from './components/Send';


function App() {
  return (
    <div >
      <Router>
       <Navbar />
        <Routes>
            {/* <Route  path="/send" exact element={<Send/>} /> */}
            <Route  path="/"  exact element={<Home/>} />
            <Route path="/dao" exact element={<Dao/>} />
            <Route path="/swap" exact element={<Swap/>} /> //DEX
            {/* <Route path="/marketplace" exact element={<Marketplace/>} /> */}
            <Route path="/dashboard" exact element={<Dashboard/>} />
            <Route path="/main" exact element={<MainPage/>} />
            <Route path="/truflation" exact element={<Truflation/>} />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
