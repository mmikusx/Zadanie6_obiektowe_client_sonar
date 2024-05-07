import React, { useState, createContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orderItems, setOrderItems] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/services')
            .then(response => response.json())
            .then(data => setServices(data))
            .catch(error => console.error('Error fetching services:', error));
    }, []);

    const removeFromOrder = (service) => {
        const serviceInOrder = orderItems.find(item => item.service.id === service.id);
        if (serviceInOrder.quantity > 1) {
            setOrderItems(orderItems.map(item =>
                item.service.id === service.id ? { ...item, quantity: item.quantity - 1 } : item
            ));
        } else {
            setOrderItems(orderItems.filter(item => item.service.id !== service.id));
        }
    };

    const value = useMemo(() => ({
        orderItems,
        setOrderItems,
        removeFromOrder,
        services,
        setServices
    }), [orderItems, services]);

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};

OrderProvider.propTypes = {
    children: PropTypes.node.isRequired
};
