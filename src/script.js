import State from './State';
import Scroller from './Scroller';

const state = new State();

const initApp = () => {
    const list = document.querySelector('.list');
    const resetBtn = document.querySelector('.js-reset');

    resetBtn.addEventListener('click', () => loadInititalData());

    const scroller = new Scroller({
        listEl: list,
        limit: 20,
        loadMoreHandler: () => {
            state.setState({ ...state.getState(), append: true });
            socket.send('getMoreData');
        },
    });

    const socket = new WebSocket('ws://localhost:8999');

    const loadInititalData = () => {
        state.setState({ ...state.getState(), append: false });
        socket.send('getData');
    }; 

    socket.addEventListener('open', function (event) {
        loadInititalData();
    });

    socket.addEventListener('message', function (event) {
        const newData = JSON.parse(event.data);
        const currentState = state.getState();
        state.setState({ ...currentState, data: newData });
        scroller.render(newData, currentState.append);
    });
}

window.onload = initApp;