import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    goToStore(e) {
        e.preventDefault();

        const storeId = this.storeInput.value;
        this.context.router.transitionTo(`/store/${storeId}`)
        // const value = $('input').val();
    }

    render() {
        return (
            <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
                <h2>Enter a store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input }} />
                <button type="submit">go for it</button>
            </form>
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
}


export default StorePicker;