import Cell from './cell.js';

export default class Stone extends Cell{
    constructor() {
        super();
        this.state = {
            type: 'stone'
        }
        this.node.className ='';
        this.node.classList.add('stone');
    }
}