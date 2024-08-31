import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ExitPage({ parkingRecords, setParkingSlots, parkingSlots }) {
  const [exitVehicleNumber, setExitVehicleNumber] = useState('');
  const [exitDetails, setExitDetails] = useState(null);
  const navigate = useNavigate();
  const handleExit = () => {
    const record = parkingRecords[exitVehicleNumber];
    if (record) {
      const exitTime = new Date().getTime();
      const duration = ((exitTime - record.entryTime) / 60000).toFixed(2); // time in minutes

      const slot = record.slot;
      if (record.type === 'bike') {
        setParkingSlots({
          ...parkingSlots,
          [slot]: { ...parkingSlots[slot], bikes: parkingSlots[slot].bikes - 1 },
        });
      } else if (record.type === 'car') {
        setParkingSlots({
          ...parkingSlots,
          [slot]: { ...parkingSlots[slot], cars: parkingSlots[slot].cars - 1 },
        });
      } else if (record.type === 'suv') {
        setParkingSlots({
          ...parkingSlots,
          [slot]: { ...parkingSlots[slot], suvs: parkingSlots[slot].suvs - 1 },
        });
      }

      setExitDetails({
        name: record.name,
        type: record.type,
        timeSpent: duration,
      });

      delete parkingRecords[exitVehicleNumber];
    } else {
      alert('No such vehicle in the parking lot.');
      setExitDetails(null);
    }
  };

  return (
    <div className="App">
      <h2>Parking Slot Exit</h2>
      <label>RegNo:</label>
      <input type='text' value={exitVehicleNumber} onChange={(e) => setExitVehicleNumber(e.target.value)} required />
      <button onClick={handleExit}>Exit</button>
      {exitDetails && (
        <div>
          <p>Name: {exitDetails.name}</p>
          <p>Type: {exitDetails.type}</p>
          <p>Time Spent in Parking Lot: {exitDetails.timeSpent} minutes</p>
        </div>
      )}
      <br></br>
       <button onClick={() => navigate('/')}>Go to First page</button>
    </div>
  );
}

export default ExitPage;
