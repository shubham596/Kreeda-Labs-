import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EntrancePage({ parkingSlots, setParkingSlots, parkingRecords, setParkingRecords }) {
  const [name, setName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [type, setType] = useState('');
  const [allocatedSlot, setAllocatedSlot] = useState(null);
  const navigate = useNavigate();

  const allocateSlot = () => {
    if (parkingRecords[vehicleNumber] && parkingRecords[vehicleNumber].type === type) {
      alert('This vehicle is already parked.');
      return;
    }
    const slot = allocateParkingSlot(type);
    if (slot) {
      const entryTime = new Date().getTime();
      setParkingRecords({
        ...parkingRecords,
        [vehicleNumber]: { name, type, slot, entryTime },
      });
      setAllocatedSlot(slot);
    } else {
      alert('No available parking slots.');
    }
  };

  const allocateParkingSlot = (vehicleType) => {
    for (const slot in parkingSlots) {
      if (vehicleType === 'bike' && parkingSlots[slot].bikes < parkingSlots[slot].capacity.bikes) {
        setParkingSlots({
          ...parkingSlots,
          [slot]: { ...parkingSlots[slot], bikes: parkingSlots[slot].bikes + 1 },
        });
        return slot;
      } else if (vehicleType === 'car' && parkingSlots[slot].cars < parkingSlots[slot].capacity.cars) {
        setParkingSlots({
          ...parkingSlots,
          [slot]: { ...parkingSlots[slot], cars: parkingSlots[slot].cars + 1 },
        });
        return slot;
      } else if (vehicleType === 'suv' && parkingSlots[slot].suvs < parkingSlots[slot].capacity.suvs) {
        setParkingSlots({
          ...parkingSlots,
          [slot]: { ...parkingSlots[slot], suvs: parkingSlots[slot].suvs + 1 },
        });
        return slot;
      }
    }
    return null;
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    allocateSlot();
  };

  return (
    <div className="App">
      <h2>Parking Slot Entrance</h2>
      <form onSubmit={handlesubmit}>
        <label>Name:</label>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
        <label>RegNo:</label>
        <input type='text' value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} required />
        <label>Vehicle Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">Select Vehicle</option>
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="suv">SUV</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
      {allocatedSlot && <p>Allocated Slot: {allocatedSlot}</p>}
      <button onClick={() => navigate('/exit')}>Go to Exit Page</button>
    </div>
  );
}

export default EntrancePage;
