import React, { useState, createContext, useEffect } from 'react';

export const OrderContext = React.createContext([[], () => {}, () => {}, [], () => {}]);

export const OrderProvider = (props) => { // Zmieniono nazwę na OrderProvider
    const [orderItems, setOrderItems] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/services')
            .then(response => response.json())
            .then(data => setServices(data))
            .catch(error => console.error('Error fetching services:', error));
    }, []);

    const removeFromOrder = (service) => { // Zmieniono nazwę na removeFromOrder
        const serviceInOrder = orderItems.find(item => item.service.id === service.id);
        if (serviceInOrder.quantity > 1) {
            setOrderItems(orderItems.map(item =>
                item.service.id === service.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ));
        } else {
            setOrderItems(orderItems.filter(item => item.service.id !== service.id));
        }
    };

    return (
        <OrderContext.Provider value={[orderItems, setOrderItems, removeFromOrder, services, setServices]}> {/* Zmieniono na OrderContext.Provider */}
            {props.children}
        </OrderContext.Provider>
    );
};