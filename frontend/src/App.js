import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// // Simulating authentication state (You can store JWT in localStorage, etc.)
// const isAuthenticated = localStorage.getItem('authToken'); // Check if the user is logged in

function App() {

  // Simulating authentication state (You can store JWT in localStorage, etc.)
const isAuthenticated = localStorage.getItem('authToken'); // Check if the user is logged in

  return (
    <Router>
      <Routes>
        {/* Redirect to sign-up if user is not authenticated */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/signup" />} />
        
        {/* Sign-up route */}
        <Route path="/signup" element={<SignUp />} />
        
        {/* Login route */}
        <Route path="/login" element={<Login />} />
        
        {/* Home route, only accessible after successful login */}
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        
        {/* Fallback for unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;





// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignUp from './pages/SignUp';
// import Login from './pages/Login';
// import Home from './pages/Home';
// import NotFound from './pages/NotFound'; // Optional: for handling undefined routes

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Define routes */}
//         <Route path="/" element={<Home />} />      {/* This is for the root route */}
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />

//         {/* Fallback route for undefined paths */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;







// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
   
//         <h1 className="text-3xl font-bold underline ml-[20px]">
//           Hello world!
//         </h1>
//       )
//     }

// export default App;
