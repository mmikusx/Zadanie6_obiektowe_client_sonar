import React, { useContext } from 'react';
import { OrderContext } from '../OrderContext';

function Order() {
    const { orderItems, removeFromOrder } = useContext(OrderContext);
    const totalCost = orderItems.reduce((total, item) => total + item.service.price * item.quantity, 0);

    return (
        <div>
            <h1>Zamówienie</h1>
            <ul>
                {orderItems.map((item) => (
                    <li key={item.service.id}>
                        {item.service.name} - {item.service.price} x {item.quantity} = {item.service.price * item.quantity}
                        <button onClick={() => removeFromOrder(item.service)}>Usuń z zamówienia</button>
                    </li>
                ))}
            </ul>
            <h2>Całkowity koszt: {totalCost}</h2>
        </div>
    );
}

export default Order;
