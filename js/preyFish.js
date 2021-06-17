import Fish from './fish.js';

export default class Prey extends Fish{
    constructor() {
        super();
        this.state ={
            type: 'prey',
            foodType: 'predator',
            canbeEaten: true
        }
        this.node = document.createElement('div');
        this.node.classList.add('prey');
    }
}