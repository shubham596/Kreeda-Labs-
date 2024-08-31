import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EntrancePage from './EntrancePage';
import ExitPage from './ExitPage';

function App() {
  const [parkingSlots, setParkingSlots] = useState({
    P1: { bikes: 0, cars: 0, capacity: { bikes: 2, cars: 1 } },
    P2: { bikes: 0, cars: 0, capacity: { bikes: 2, cars: 1 } },
    P3: { bikes: 0, cars: 0, capacity: { bikes: 2, cars: 1 } },
    P4: { bikes: 0, cars: 0, suvs: 0, capacity: { bikes: 3, cars: 1, suvs: 1 } },
    P5: { bikes: 0, cars: 0, suvs: 0, capacity: { bikes: 3, cars: 1, suvs: 1 } },
  });
  const [parkingRecords, setParkingRecords] = useState({});

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <EntrancePage 
              parkingSlots={parkingSlots}
              setParkingSlots={setParkingSlots}
              parkingRecords={parkingRecords}
              setParkingRecords={setParkingRecords}
            />
          } 
        />
        <Route 
          path="/exit" 
          element={
            <ExitPage 
              parkingRecords={parkingRecords} 
              setParkingSlots={setParkingSlots} 
              parkingSlots={parkingSlots}
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
