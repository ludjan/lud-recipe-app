// TODO generalize
function appendOptionsToSelect(optionsArray, select) {
    for (let i = 0; i < optionsArray.length; i++) {
      var newOption = document.createElement('option');
      // console.log(`ingredient ${ingredients[i].name}`);
      newOption.value = optionsArray[i];
      newOption.innerHTML = optionsArray[i];
      select.appendChild(newOption);
    }
  }

function appendIngredientsToSelect(ingredients, select) {
  const ingredientNames = getArrayOfProperty(ingredients, 'name');
  appendOptionsToSelect(ingredientNames, select);

}

function appendUnitsToSelect(units, select) {
  const unitNames = getArrayOfProperty(units, 'name');
  appendOptionsToSelect(unitNames, select);
}

function setValueInSelectorIfExists(selector, value) {
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

function clearElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
}

function removeElementOnIndex(array, index) {
  if (!isIndexInsideBounds(array, index)) return -1;
  array.splice(index, 1);
}

function isIndexInsideBounds(arr, index) {
  if (index < 0) return 0;
  if (index > arr.length-1) return 0;
  return 1;
}

function swapElementsOnIndexes(array, x, y) {
  if (!isIndexInsideBounds(array, x)) return -1;
  if (!isIndexInsideBounds(array, y)) return -1;
      
  const tmp = array[x];
  array[x] = array[y];
  array[y] = tmp;
}

function getArrayOfProperty(array, property) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element[property] != null) {
      newArray.push(element[property]);
    }
  }
  return newArray;
}

function reduceStringArray(strArr) {
  var str = "";
  for (let i = 0; i < strArr.length; i++) {
    str += strArr[i];
  }
  return str;
}

