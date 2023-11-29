import './App.css';
import { Route, Routes } from 'react-router-dom';
import Todo from './component/Todo';
import Carosal from './component/Carosal';
import { useEffect, useState } from 'react';
import Loader from './component/Loader';
import Navbar from './component/Navbar';

function App() {
  //loader state
  const [loading, setLoading] = useState(true);

  // function for loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    // Clean up timeout to prevent memory leaks
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Todo />}></Route>
            <Route path="/carosal" element={<Carosal />}></Route>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
