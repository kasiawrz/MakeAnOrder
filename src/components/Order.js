import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
    constructor() {
        super();
        this.renderOrder = this.renderOrder.bind(this);
    }
    renderOrder(key) {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];

        if(!fish || fish.status === 'unavialable') {
            return <li key={key}> Sorry, {fish ? fish.name : 'fish'} is no longer available</li>
        }

        return (
            <li key={key}>
                <span>{count} x {fish.name}</span>
                <span className="price">{formatPrice(count * fish.price)}</span>
            </li>
        );

    }
    render() {
        const orderedMeal = Object.keys(this.props.order);
        const total = orderedMeal.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            console.log(fish, count);
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable) {
                return prevTotal + (count * fish.price || 0)
            }
            return prevTotal;
        }, 0);

        return(
            <div className="order-wrapper">
                <h2>Your Order</h2>
                <ul className="order">
                    {orderedMeal.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total: </strong>
                        {formatPrice(total)}
                    </li>
                </ul>
            </div>
        )
    }
}

export default Order;