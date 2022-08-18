import assert from 'assert';
import rewire from 'rewire';
import { JSDOM } from 'jsdom';

const utils = rewire('./public/js/utils.cjs');

function getSetBasicJSDOMDocument() {
    const dom = new JSDOM(`<!DOCTYPE html>`);
    const document = dom.window.document;
    global.document = document;
    return document;
}

describe('test-utils.js', () => {
    
    const isIndexInsideBounds = utils.__get__('isIndexInsideBounds');
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

    const removeElementOnIndex = utils.__get__('removeElementOnIndex');
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

    const swapElementsOnIndexes = utils.__get__('swapElementsOnIndexes');
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

    const appendUnitsToSelect = utils.__get__('appendUnitsToSelect');
    describe('#appendUnitsToSelect()', function () {
        it('appends supplied units to select', () => {

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
    });

    const setValueInSelectorIfExists = utils.__get__('setValueInSelectorIfExists');
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
});