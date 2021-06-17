import Cell from './cell.js';
import Stone from './stone.js';
import Seaweed from './seaweed.js';
import Prey from './preyFish.js';
import Predator from './predatorFish.js';
import Fish from './fish.js';

export default class Aquarium {
    constructor(parentComponent, cellsNumber, preyNumber, predatorNumber, stonesNumber, seaweedsNumber, cellsArray) {
        this.initializeAquarium = this.initializeAquarium.bind(this);
        this.nextIteration = this.nextIteration.bind(this);
        this.randomSpots = this.randomSpots.bind(this);
        this.inializeStones = this.inializeStones.bind(this);
        this.inializeSeaweeds = this.inializeSeaweeds.bind(this);
        this.inializePreyFishes = this.inializePreyFishes.bind(this);
        this.inializePredatorFishes = this.inializePredatorFishes.bind(this);
        this.parentComponent = parentComponent;
        this.cellsNumber = cellsNumber;
        this.preyNumber = preyNumber;
        this.predatorNumber = predatorNumber;
        this.stonesNumber = stonesNumber;
        this.seaweedsNumber = seaweedsNumber;
        this.cellsArray = cellsArray;
        this.iterationNumber = 1;
    }

    // push to the array 'size' random numbers
    randomSpots(maxValue, size) {
        let resultArray = [];
        for (let i = 0; i < size; i++) {
            resultArray.push({
                x: Math.floor(Math.random() * maxValue),
                y: Math.floor(Math.random() * maxValue)
            });
        }
        return resultArray;
    }

    // swaping existing cells with type cell on stone class unit
    inializeStones() {
        const spots = this.randomSpots(this.cellsNumber, this.stonesNumber);
        spots.forEach((id) => {
            let tmpCellsRow = this.cellsArray[id.x];
            if (tmpCellsRow[id.y].state.type == 'cell') {
                let leftRow = tmpCellsRow.slice(0, id.y);
                leftRow.pop();
                leftRow.push(new Stone);
                let rightRow = tmpCellsRow.slice(id.y);
                tmpCellsRow = leftRow.concat(rightRow);
                this.cellsArray[id.x] = tmpCellsRow;
            }
        });
        console.log('Stones initialized!');
    }
    // swaping existing cells with type cell on prey fish class unit
    inializePreyFishes() {
        const spots = this.randomSpots(this.cellsNumber, this.preyNumber);
        spots.forEach((id) => {
            let tmpCellsRow = this.cellsArray[id.x];
            if (tmpCellsRow[id.y].state.type == 'cell') {
                let leftRow = tmpCellsRow.slice(0, id.y);
                leftRow.pop();
                leftRow.push(new Prey);
                let rightRow = tmpCellsRow.slice(id.y);
                tmpCellsRow = leftRow.concat(rightRow);
                this.cellsArray[id.x] = tmpCellsRow;
            }
        });
        console.log('Stones initialized!');
    }
    // swaping existing cells with type cell on predator fish class unit
    inializePredatorFishes() {
        const spots = this.randomSpots(this.cellsNumber, this.predatorNumber);
        spots.forEach((id) => {
            let tmpCellsRow = this.cellsArray[id.x];
            if (tmpCellsRow[id.y].state.type == 'cell') {
                let leftRow = tmpCellsRow.slice(0, id.y);
                leftRow.pop();
                leftRow.push(new Predator);
                let rightRow = tmpCellsRow.slice(id.y);
                tmpCellsRow = leftRow.concat(rightRow);
                this.cellsArray[id.x] = tmpCellsRow;
            }
        });
        console.log('Stones initialized!');
    }

    // swaping existing cells with type cell on seaweed class unit
    inializeSeaweeds() {
        const spots = this.randomSpots(this.cellsNumber, this.seaweedsNumber);
        spots.forEach((id) => {
            let tmpCellsRow = this.cellsArray[id.x];
            if (tmpCellsRow[id.y].state.type == 'cell') {
                let left = tmpCellsRow.slice(0, id.y);
                left.pop();
                left.push(new Seaweed);
                let right = tmpCellsRow.slice(id.y);
                this.cellsArray[id.x] = left.concat(right);
            }
        });
        console.log('Seaweeds initialized!');
    }

    // the first iteration of eco system where we creating cell and spots for other 
    //units including fishes
    initializeAquarium() {
        for (let j = 0; j < this.cellsNumber; j++) {
            let row = [];
            for (let i = 0; i < this.cellsNumber; i++) {
                let cell = new Cell;
                row.push(cell);
                this.parentComponent.append(cell.node);
            }
            this.cellsArray.push(row)
        }
        this.inializeStones();
        this.inializeSeaweeds();
        this.inializePreyFishes();
        this.inializePredatorFishes();
        console.log('Initializing done!');
    }

    // just one iteration which rebuilt displayed aquarium
    renderAquarium() {
        this.parentComponent.innerHTML = '';
        let spots = this.randomSpots(this.cellsNumber, 5);
        spots.forEach((coords) => {
            if ( this.cellsArray[coords.x][coords.y].state.type == 'seaweed') {
                this.cellsArray[coords.x][coords.y] = new Cell;
            }
        })
        for (let i = 0; i < this.cellsNumber; i++) {
            for (let j = 0; j < this.cellsNumber; j++) {
                if (this.cellsArray[i][j] instanceof Fish) {
                    let newCoords = this.cellsArray[i][j].swim(this.cellsArray[i][j].state.foodType, this.cellsArray, i, j);
                    this.cellsArray[newCoords.x][newCoords.y] = this.cellsArray[i][j];
                    this.cellsArray[i][j] = new Cell;
                }
            }
        }

        this.seaweedsNumber = 1;
        if (this.iterationNumber % 2 == 0) {
            this.inializeSeaweeds();
        }
        
        for (let j = 0; j < this.cellsNumber; j++) {
            for (let i = 0; i < this.cellsNumber; i++) {
                this.parentComponent.append(this.cellsArray[i][j].node);
            }
        }
        this.iterationNumber += 1;
        console.log(`${this.iterationNumber} iteration rendered!`);
    }

    // setInerval function which provide next rebuilds of ecosystem
    nextIteration() {
        setInterval(() => {
            this.renderAquarium();
        }, 1000)
    }
}