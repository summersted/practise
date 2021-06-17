export default class Cell {
    constructor() {
        this.state = {
            type: 'cell'
        }
        this.node = document.createElement('div');
        this.node.classList.add('cell');
    }
}