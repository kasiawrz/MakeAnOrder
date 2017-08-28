import React from 'react';

class AddFishForm extends React.Component {
    createFish(e) {
        e.preventDefault();
        const fish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            desc: this.description.value,
            image: this.image.value
        }
        console.log(fish);
        this.props.addFish(fish);
        this.fishForm.reset();

    }

    render() {
        return(
            <form ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={(e) => this.createFish(e)}>
                <input ref={(input) => this.name = input} type="text" placeholder="name fish" />
                <input ref={(input) => this.price = input} type="text" placeholder="price fish" />
                <select ref={(input) => this.status = input} name="status fish">
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out</option>
                </select>
                <textarea ref={(input) => this.description = input} placeholder="desc fish"></textarea>
                <input ref={(input) => this.image = input} type="text" placeholder="image fish" />
                <button type="submin">Add Meal</button>
            </form>

        )
    }
}

export default AddFishForm;