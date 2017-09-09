import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
    constructor() {
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, key) {
        console.log(e);
        console.log(key);
        const fish = this.props.fishes[key];
        const updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        }
        this.props.updateFish(key, updatedFish);
    }

    renderInventory(key) {
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={key}>
                <input value={fish.name} type="text" name="name" onChange={(e) => this.handleChange(e, key)} />
                <input  value={fish.price} type="text" name="price" onChange={(e) => this.handleChange(e, key)} />
                <select  value={fish.status} name="status fish" name="status" onChange={(e) => this.handleChange(e, key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out</option>
                </select>
                <textarea value={fish.desc} name="desc" onChange={(e) => this.handleChange(e, key)}></textarea>
                <input  value={fish.image} type="text" name="image" onChange={(e) => this.handleChange(e, key)} />
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }

    render() {
        // const logout = <button>Log Out!</button>;
        //
        // //check if the user is logged in
        // if(!this.state.uid) {
        //     return <div>{this.renderLogin()}</div>
        // }
        // //check if they are the owner of the current store
        // if(this.state.uid != this.state.owner) {
        //     return (
        //         <div>
        //             <p>Sorry, you aren't the owner of this store</p>
        //         </div>
        //     )
        // }
        return(
            <div>
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load samples</button>
            </div>
        )
    }
}

Inventory.propTypes = {
    addFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    updateFish: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    fishes: React.PropTypes.object.isRequired,
}

export default Inventory;