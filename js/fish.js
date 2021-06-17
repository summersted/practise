import Cell from './cell.js';

export default class Fish extends Cell {
    constructor(cellsArray, x, y) {
        super();
        this.swim = this.swim.bind(this);
        this.randomDirection = this.randomDirection.bind(this);
        this.checkFood = this.checkFood.bind(this);
        this.weight = 100;
        this.age = 1;
        this.iterationIncreaseWeight = -5;
        this.cellsArray = cellsArray;
        this.x = x;
        this.y = y;
    }
    randomDirection() {
        const direction = Math.floor(Math.random() * 4);
        switch (direction) {
            case 0:
                return {
                    x: 0, y: 1
                };
            case 1:
                return {
                    x: 1, y: 0
                };
            case 2:
                return {
                    x: 0, y: -1
                };
            case 3:
                return {
                    x: -1, y: 0
                };
            default:
                break;
        }
    }
    checkFood(foodType, cellsArray, curX, curY) {
        let x = curX,
            y = curY;
        try {
            if (cellsArray[x + 1][y] !== NaN) {
                if (cellsArray[x + 1][y] !== undefined) {
                    if (cellsArray[x + 1][y].state.type == foodType) {
                        return {
                            toX: x + 1,
                            toY: y
                        };
                    }
                }
            } 
        } catch (error) {}
        try {
            if (cellsArray[x][y + 1] !== NaN) {
                if (cellsArray[x][y + 1] !== undefined) {
                    if (cellsArray[x][y + 1].state.type == foodType) {
                        return {
                            toX: x,
                            toY: y + 1
                        };
                    }
                }
            } 
        } catch (error) {}
        try {
            if (cellsArray[x - 1][y]!== NaN) {
                if (cellsArray[x - 1][y]!== undefined) {
                    if (cellsArray[x - 1][y].state.type == foodType) {
                        return {
                            toX: x - 1,
                            toY: y
                        };
                    }
                }
            }
        } catch (error) { }
        try {
            if (cellsArray[x][y - 1] !== NaN) {
                if (cellsArray[x][y - 1] !== undefined) {
                    if (cellsArray[x][y - 1].state.type == foodType) {
                        return {
                            toX: x,
                            toY: y - 1
                        };
                    }
                }
            }
        } catch (error) {}
    }
    swim(foodType, array, x, y) {
        let toX, toY;
        if (this.checkFood(foodType, array, x, y)) {
            const newCoords = this.checkFood(foodType, array, x, y);
            console.log('seaweed was eaten');
            return {
                x: newCoords.toX,
                y: newCoords.toy
            };
        }
        while (true) {
            let direction = this.randomDirection();
            try {
                if (array[x + direction.x][y + direction.y] !== undefined) {
                    if (array[x + direction.x][y + direction.y].state.type == 'cell') {
                        toX = x + direction.x;
                        toY = y + direction.y;
                        return {
                            x: toX,
                            y: toY
                        };
                    }
                }
            } catch (error) {}
        }
    }
}