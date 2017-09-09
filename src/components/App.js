import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        //getInitialState
        this.state = {
            fishes: {},
            order: {}
        };
    }

    //sync store, runs right before rendering
    componentWillMount() {
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)

        if(localStorageRef) {
            //update order state ('on load')
            this.setState({
                order: JSON.parse(localStorageRef)
            })
        }
    }

    //stop sync store
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    //called everytime props/state changes
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }

    addFish(fish) {
        //update the state
        const fishes = {...this.state.fishes};
        //add in a new fish
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        //set state
        this.setState({ fishes });
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        });
    }

    updateFish(key, updatedFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }

    removeFish(key) {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({ fishes });
    }

    addToOrder(key) {
        //copy of app's state
        const order = {...this.state.order};
        //update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1;
        //state update
        this.setState({ order });

    }

     render() {

         const fishOrder = Object
             .keys(this.state.fishes)
             .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />);

         return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Market" />
                    <ul className="list-of-fish">
                        { fishOrder }
                    </ul>

                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    params={this.props.params}
                />
                <Inventory
                    addFish={this.addFish}
                    loadSamples={this.loadSamples}
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                />
            </div>
        )
    }
}

export default App;
