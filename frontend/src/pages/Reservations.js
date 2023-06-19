import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import '../css/style.css';

const Reservations = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [equipment, setEquipment] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [reservedQuantity, setReservedQuantity] = useState([]);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [nameOfSelectedEquipment, setNameOfSelectedEquipment] = useState('');
  

  const { activeUser } = useContext(UserContext);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      getEquipmentByCategory(selectedCategory);
    } else {
      setEquipment([]);
    }
  }, [selectedCategory]);

  const getCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories/');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Request failed with error:', error);
    }
  };

  const getEquipmentByCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/categories/${categoryId}/equipment/`);
      if (response.ok) {
        const data = await response.json();
        setEquipment(data);
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Request failed with error:', error);
    }
  };

  const getCurrentlyReservedQuantity = async (choosenDate, choosenCategory) => {
    if (choosenDate && choosenCategory){
      try {
        const response = await fetch(`http://localhost:8000/api/categories/equipment/${choosenCategory}/${choosenDate}/`);
        if (response.ok) {
          const data = await response.json();
          setReservedQuantity(data);
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Request failed with error:', error);
      }
    }
  };
  

  const postReservation = async () => {
    let response = await fetch(`http://localhost:8000/api/categories/equipment/reservation/`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'user_id': activeUser.id,
                'selected_category': selectedCategory,
                'selected_equipment': nameOfSelectedEquipment,
                'reservation_date': reservationDate,
                'reservation_qantity': quantity
            })
        })
  };

  const makeReservation = () => {
    if (quantity > 0) {
        postReservation();
        setSelectedCategory('');
        setSelectedEquipment('');
        setReservationDate('');
        setQuantity(0);
    } else {
        window.alert("Nie można dokonać rezerwacji!");
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    getCurrentlyReservedQuantity(reservationDate, event.target.value);
    setQuantity(0);
    setSelectedEquipment('');
  };

  const handleEquipmentChange = (event) => {
    const equipmentValue = event.target.value;
    const equipmentName = equipmentValue.split(':')[0];
    setSelectedEquipment(event.target.value);
    setMaxQuantityOfItem(equipmentName);
    setQuantity(0);
  };

  const setMaxQuantityOfItem = (equipmentName) => {
    reservedQuantity.forEach((element) => {
      if (element['equipmentName'] == equipmentName){
        setMaxQuantity(element['quantityLeft']);
        setNameOfSelectedEquipment(element['equipmentId']);
      }
    });

  }

  const handleReservationDateChange = (event) => {
    const currentDate = new Date();
    const selectedDate = new Date(event.target.value);

    if (selectedDate >= currentDate) {
        setReservationDate(event.target.value);
        getCurrentlyReservedQuantity(event.target.value, selectedCategory);
    } else {
        window.alert("Nieprawidłowa data");
    }
    setQuantity(0);
    setSelectedEquipment('');
  };

  const handleQuantityChange = (event) => {
    const quantityValue = event.target.value;
    if (quantityValue >= 0 && quantityValue <= maxQuantity) {
      setQuantity(quantityValue);
    }
  };

  return (
    <div>
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h1 className="display-4">Witaj w panelu rezerwacji!</h1>
        </div>
      </div>
      <div className="d-flex justify-content-center" style={{ height: '350px' }}>
        <div className="w-50">
        <div className="mt-3 mx-auto">
              <div>Wybierz datę rezerwacji:</div>
              <input type="date" className="form-control" value={reservationDate} onChange={handleReservationDateChange} />
            </div>
            <br></br>
          <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
            <option disabled value="">
              Wybierz kategorię
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>

          {equipment.length > 0 && reservationDate && (
            <select className="form-select mt-3 mx-auto" value={selectedEquipment} onChange={(event) => handleEquipmentChange(event)}>
              <option disabled value="">
                Wybierz przyrząd
              </option>
              {reservedQuantity.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                  className={item.quantityLeft === 0 ? 'out-of-stock' : item.quantityLeft <= 2 ? 'few-left' : ''}
                  disabled={item.quantityLeft === 0}
                >
                  {item.equipmentName + ": " + item.quantityLeft}
                </option>
              ))}
            </select>
          )}

          {selectedEquipment && (
            <div className="mt-3 mx-auto">
              <div>Wybierz ilość:</div>
              <input
                type="number"
                className="form-control mt-3"
                min={0}
                max={maxQuantity}
                value={quantity}
                onChange={handleQuantityChange}
              />
              <br></br>
              <button className="btn btn-primary" type="submit" onClick={() => makeReservation()}>
                Dokonaj rezerwacji
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservations;
