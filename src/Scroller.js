export const createItem = (data) => {
    return `<li class="list-item">
        <a href="javascript:void(0);" class="list-link">
            <strong>${data.id}</strong>
            <span> ${data.content}</span>
            <span> ${data.count}</span>
        </a>
    </li>`;
}

class Scroller {
    constructor(opts) {
        const { listEl, limit, loadMoreHandler } = opts;
        this.listEl = listEl;
        this.limit = limit;
        this.loadMoreHandler = loadMoreHandler;
        this.listEl.addEventListener('scroll', this.loadMoreListener.bind(this));
    }

    loadMoreListener() {
        if (this.listEl.scrollTop + this.listEl.clientHeight >= this.listEl.scrollHeight) {
            this.loadMore();
        }
    }

    loadMore() {
        this.loadMoreHandler();
    }

    render(newData, append = false) {
        const listItems = newData.map(createItem);
        if (append) {
            this.listEl.insertAdjacentHTML('beforeend', listItems.join(''));
        } else {
            this.listEl.scrollTo({
                top: 0,
                behaviour: 'smooth'
            })
            this.listEl.innerHTML = listItems.join('');
        }
    }
}

export default Scroller;