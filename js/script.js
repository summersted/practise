import Aquarium from './aquarium.js';
const aquariumNode = document.getElementById('aquarium');
const forms = {
    cells: document.querySelector('[name = number_of_cells]'),
    prey: document.querySelector('[name = number_of_prey]'),
    predator: document.querySelector('[name = number_of_predator]'),
    stones: document.querySelector('[name = number_of_stones]'),
    seaweeds: document.querySelector('[name = number_of_seaweeds]')
}

forms.cells.addEventListener('change', () => {
    const AquariumObject = new Aquarium(
        aquariumNode, forms.cells.value,forms.prey.value,forms.predator.value,
        forms.stones.value,forms.seaweeds.value, [],
    );
    
    AquariumObject.initializeAquarium();
    AquariumObject.nextIteration();
});