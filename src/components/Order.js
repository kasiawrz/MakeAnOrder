import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {
    constructor() {
        super();
        this.renderOrder = this.renderOrder.bind(this);
    }
    renderOrder(key) {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

        if(!fish || fish.status === 'unavialable') {
            return (
                <li key={key}>
                    Sorry, {fish ? fish.name : 'fish'} is no longer available!{removeButton}
                </li>
            );
        }

        return (
            <li key={key}>
                <span>
                    <CSSTransitionGroup
                        component="span"
                        className="count"
                        transitionName="count"
                        transitionEnterTimeout={250}
                        transitionLeaveTimeout={250}
                    >
                        <span key={count}>
                            {count}
                        </span>
                    </CSSTransitionGroup>

                    lbs {fish.name} {removeButton}</span>
                <span className="price">{formatPrice(count * fish.price)}</span>
            </li>
        );
    }

    removeFromOrder(key){
        const order = {...this.state.order}
        delete order[key]
        this.setState({ order })
    }

    render() {
        const orderedMeal = Object.keys(this.props.order);
        const total = orderedMeal.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable) {
                return prevTotal + (count * fish.price || 0)
            }
            return prevTotal;
        }, 0);

        return(
            <div className="order-wrapper">
                <h2>Your Order</h2>
                <CSSTransitionGroup
                    className="order"
                    component="ul"
                    transitionName="order"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {orderedMeal.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total: </strong>
                        {formatPrice(total)}
                    </li>
                </CSSTransitionGroup>
            </div>
        )
    }
}

Order.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    order: React.PropTypes.object.isRequired,
    removeFromOrder: React.PropTypes.func.isRequired,
}

export default Order;