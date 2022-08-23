class Utils {
    // TODO generalize
    static appendOptionsToSelect(optionsArray, select) {
    for (let i = 0; i < optionsArray.length; i++) {
      var newOption = document.createElement('option');
      // console.log(`ingredient ${ingredients[i].name}`);
      newOption.value = optionsArray[i];
      newOption.innerHTML = optionsArray[i];
      select.appendChild(newOption);
    }
  }

    static appendIngredientsToSelect(ingredients, select) {
        const ingredientNames = getArrayOfProperty(ingredients, 'name');
        appendOptionsToSelect(ingredientNames, select);
    }

    static appendUnitsToSelect(units, select) {
    const unitNames = getArrayOfProperty(units, 'name');
    appendOptionsToSelect(unitNames, select);
    }

    static setValueInSelectorIfExists(selector, value) {
    var element = 0;
    // console.log(`This selector has ${selector.options.length} options`);
    for (let i = 0; i < selector.options.length; i++) {
        if (selector.options[i].value == value) {
        element = i;
        // console.log(`Value in selector was found`);
        break;
        }
    }
    selector.selectedIndex = element;
    }

    static clearElement(element) {
        while (element.firstChild) {
        element.removeChild(element.firstChild);
        }
    }

    static removeElementOnIndex(array, index) {
    if (!isIndexInsideBounds(array, index)) return -1;
    array.splice(index, 1);
    }

    static isIndexInsideBounds(arr, index) {
    if (index < 0) return 0;
    if (index > arr.length-1) return 0;
    return 1;
    }

    static swapElementsOnIndexes(array, x, y) {
    if (!isIndexInsideBounds(array, x)) return -1;
    if (!isIndexInsideBounds(array, y)) return -1;
        
    const tmp = array[x];
    array[x] = array[y];
    array[y] = tmp;
    }

    static getArrayOfProperty(array, property) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element[property] != null) {
        newArray.push(element[property]);
        }
    }
    return newArray;
    }

    static reduceStringArray(strArr) {
    var str = "";
    for (let i = 0; i < strArr.length; i++) {
        str += strArr[i];
    }
    return str;
    }

    static copyArray(array) {
        var newArray = [];
        for (let i = 0; i < array.length; i++) {
            newArray.push(array[i]);
        }
        return newArray;
    }

    static strMatchesStr(firstStr, secondStr) {
  
        const firstStrToUpper = firstStr.toUpperCase();
        const secondStrToUpper = secondStr.toUpperCase();
        const len = secondStr.length;
        
        if (firstStrToUpper.substr(0, len) == secondStrToUpper) return true;
        return false;
    }

    static isCompleteMatch(firstStr, secondStr) {
        if (firstStr == secondStr) return true;
        return false;
    }
}

export { Utils };