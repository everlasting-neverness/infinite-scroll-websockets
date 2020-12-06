class State {
    constructor() {
        this.state = {};
    }

    getState() {
        return this.state;
    }

    setState(newState) {
        this.state = newState;
    }
}

export default State;