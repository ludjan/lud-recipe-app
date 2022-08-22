import assert from 'assert';
import rewire from 'rewire';
import { JSDOM } from 'jsdom';

const file = rewire('./public/js/utils.cjs');

function getSetBasicJSDOMDocument() {
    const dom = new JSDOM(`<!DOCTYPE html>`);
    const document = dom.window.document;
    global.document = document;
    return document;
}

describe('test-utils.js', () => {
    
    const isIndexInsideBounds = file.__get__('isIndexInsideBounds');
    describe('#isIndexInsideBounds()', function () {
        it('should not allow index to be too small', () => {
            const arr = [1,2,3];
            assert.ok(!isIndexInsideBounds(arr, -1));
        });
        
        it('should not allow index to be to great', () => {
            const arr = [1,2,3];
            assert.ok(!isIndexInsideBounds(arr, 3));
        });
        it('should return true on valid index', () => {
            const arr = [1,2,3];
            assert.ok(isIndexInsideBounds(arr, 0));
            assert.ok(isIndexInsideBounds(arr, 1));
            assert.ok(isIndexInsideBounds(arr, 2));
        });
    });

    const removeElementOnIndex = file.__get__('removeElementOnIndex');
    describe('#removeElementOnIndex()', function () {
        it('should return -1 when index is smaller than 0', function () {
            assert.equal(removeElementOnIndex([1, 2, 3], -1), -1);
        });
        it('should return -1 when index out of array bounds', function () {
            assert.equal(removeElementOnIndex([1, 2, 3], 3), -1);
        });
        it('should be one element shorter if supplied index is within array', () => {
            const arr = [1,2,3];
            removeElementOnIndex(arr, 2);
            assert.equal(arr.length, 2);
        });
        it('should have next element on removed position', () => {
            const arr = [1,2,3];
            removeElementOnIndex(arr, 0);
            assert.equal(arr[0], 2);
        });
    });

    const swapElementsOnIndexes = file.__get__('swapElementsOnIndexes');
    describe('#swapElementsOnIndexes()', function () {
        it('should not allow first argument to be to be out of bounds', () => {
            const arr = [1,2,3];
            var res = swapElementsOnIndexes(arr, -1, 2);
            assert.equal(res, -1);
            res = swapElementsOnIndexes(arr, 3, 2);
            assert.equal(res, -1);
        });
        
        it('should not allow second argument to be out of bounds', () => {
            let arr = [1,2,3];
            var res = swapElementsOnIndexes(arr, 2, -1);
            assert.equal(res, -1);
            res = swapElementsOnIndexes(arr, 2, 3);
            assert.equal(res, -1);
        });
    });

    const appendUnitsToSelect = file.__get__('appendUnitsToSelect');
    describe('#appendUnitsToSelect()', function () {
        it('should append supplied units to select', () => {

            const units = [
                { name: 'deciliter'},
                { name: 'centiliter'}
            ];
            const document = getSetBasicJSDOMDocument();
            const select = document.createElement('select');

            // apply function
            appendUnitsToSelect(units, select);

            // check
            assert.equal(select.children[0].innerHTML, 'deciliter');
            assert.equal(select.children[1].innerHTML, 'centiliter');
        });

        it('should allow no ingredients', () => {

            const units = [];
            const document = getSetBasicJSDOMDocument();
            const select = document.createElement('select');

            // apply function
            appendUnitsToSelect(units, select);

            // check
            assert.ok(select.children.length == 0);
        });

    });

    const appendIngredientsToSelect = file.__get__('appendIngredientsToSelect');
    describe('#appendIngredientsToSelect()', function () {
        it('should append supplied ingredients to select', () => {

            const ingredients = [
                { name: 'vatten'},
                { name: 'melk'}
            ];
            const document = getSetBasicJSDOMDocument();
            const select = document.createElement('select');

            // apply function
            appendIngredientsToSelect(ingredients, select);

            // check
            assert.equal(select.children[0].innerHTML, 'vatten');
            assert.equal(select.children[1].innerHTML, 'melk');
        });

        it('should allow no ingredients', () => {

            const ingredients = [];
            const document = getSetBasicJSDOMDocument();
            const select = document.createElement('select');

            // apply function
            appendIngredientsToSelect(ingredients, select);

            // check
            assert.ok(select.children.length == 0);
        });
    });

    const setValueInSelectorIfExists = file.__get__('setValueInSelectorIfExists');
    describe('#setValueInSelectorIfExists()', function () {
        it('should set value if it exists', () => {

            // setup
            const units = [
                { name: 'deciliter'},
                { name: 'centiliter'}
            ];
            const document = getSetBasicJSDOMDocument();
            const select = document.createElement('select');
            appendUnitsToSelect(units, select);

            setValueInSelectorIfExists(select, 'centiliter');

            // check
            assert.equal(select.selectedIndex, 1);
        });

        it('should set value 0 if value does not exist', () => {

            // setup
            const units = [
                { name: 'deciliter'},
                { name: 'centiliter'}
            ];
            const document = getSetBasicJSDOMDocument();
            const select = document.createElement('select');
            appendUnitsToSelect(units, select);

            setValueInSelectorIfExists(select, 'milliliter');

            // check
            assert.equal(select.selectedIndex, 0);
        });
    });

    const clearElement = file.__get__('clearElement');
    describe('#clearElement()', function () {
        it('should no longer have children', () => {

            const document = getSetBasicJSDOMDocument();
            const parent = document.createElement('div');
            const firstChild = document.createElement('div');
            const secondChild = document.createElement('div');
            parent.appendChild(firstChild);
            parent.appendChild(secondChild);

            clearElement(parent);

            assert.equal(parent.childNodes.length, 0);
        });
    });

    const getArrayOfProperty = file.__get__('getArrayOfProperty');
    describe('#getArrayOfProperty()', function () {
        it('should get array when string property exists', () => {

            const h1 = { name: 'h1', age: 4 }
            const h2 = { name: 'h2', age: 6 }
            const h3 = { name: 'h3', age: 5 }
            const fullArray = [h1, h2, h3];

            const nameArray = getArrayOfProperty(fullArray, 'name');
            
            assert.equal(nameArray[0], 'h1');
            assert.equal(nameArray[1], 'h2');
            assert.equal(nameArray[2], 'h3');
        });

        it('should get array when int property exists', () => {

            const h1 = { name: 'h1', age: 4 }
            const h2 = { name: 'h2', age: 6 }
            const h3 = { name: 'h3', age: 5 }
            const fullArray = [h1, h2, h3];

            const numberArray = getArrayOfProperty(fullArray, 'age');

            assert.equal(numberArray[0], 4);
            assert.equal(numberArray[1], 6);
            assert.equal(numberArray[2], 5);  
        });

        it('should return empty array if property does not exist', () => {
            const h1 = { name: 'h1', age: 4 }
            const h2 = { name: 'h2', age: 6 }
            const h3 = { name: 'h3', age: 5 }
            const fullArray = [h1, h2, h3];

            const horseArray = getArrayOfProperty(fullArray, 'horse');
            assert.equal(horseArray.length, 0)

        });

        it('should return empty array if input array is empty', () => {
            const fullArray = [];

            const emptyArray = getArrayOfProperty(fullArray, 'property');
            assert.equal(fullArray.length, 0);

        });
    });
});