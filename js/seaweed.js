import Cell from './cell.js';

export default class Seaweed extends Cell{
    constructor() {
        super();
        this.state = {
            type: 'seaweed',
            foodType: 'prey'
        }
        this.energy = 50;
        this.iterationIncreaseEnergy = 10;
        this.node = document.createElement('div');
        this.node.classList.add('seaweed');
    }
    grow(){
        this.energy += this.iterationIncreaseEnergy;
    }
}