import Fish from './fish.js';

export default class Predator extends Fish{
    constructor() {
        super();
        this.state ={
            type: 'predator',
            foodType: 'predator',
            canbeEaten: false
        }
        this.node = document.createElement('div');
        this.node.classList.add('predator');
    }
}