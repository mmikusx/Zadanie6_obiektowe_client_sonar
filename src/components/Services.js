import React, { useEffect, useState, useContext } from 'react';
import { OrderContext } from '../OrderContext';

function Services() {
    const [newService, setNewService] = useState({ name: '', price: '' });
    const [orderItems, setOrderItems, , services, setServices] = useContext(OrderContext);

    useEffect(() => {
        fetch('http://localhost:3001/services')
            .then(response => response.json())
            .then(data => {
                setServices(data);
                setNewService({ name: '', price: '' });
            })
            .catch(error => console.error('Error fetching services:', error));
    }, []);

    const handleInputChange = (event) => {
        setNewService({ ...newService, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3001/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newService)
        })
            .then(response => response.json())
            .then(data => {
                setServices(data);
                setNewService({ name: '', price: '' });
            })
            .catch(error => console.error('Error adding service:', error));
    };

    const addToOrder = (service) => {
        const serviceInCart = orderItems.find(item => item.service.id === service.id);
        if (serviceInCart) {
            setOrderItems(orderItems.map(item =>
                item.service.id === service.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setOrderItems([...orderItems, { service, quantity: 1 }]);
        }
    };

    return (
        <div>
            <h1>Usługi</h1>
            <ul>
                {services.map(service => (
                    <li key={service.id}>
                        {service.name} - ${service.price}
                        <button onClick={() => addToOrder(service)}>Dodaj do zamówienia</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" value={newService.name} onChange={handleInputChange}
                       placeholder="Nazwa usługi" required/>
                <input type="number" name="price" value={newService.price} onChange={handleInputChange}
                       placeholder="Cena usługi" required/>
                <button type="submit">Dodaj usługę</button>
            </form>
        </div>
    );
}

export default Services;