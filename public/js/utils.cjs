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
    // console.log(`Set values to ingredients selector`);
    for (let i = 0; i < ingredients.length; i++) {
      var option = document.createElement('option');
      // console.log(`ingredient ${ingredients[i].name}`);
      option.value = ingredients[i].name;
      option.innerHTML = ingredients[i].name;
      select.appendChild(option);
    }
  }


  function appendUnitsToSelect(units, select) {
    for (let i = 0; i < units.length; i++) {
      // new select element
      var option = document.createElement('option');
      // console.log(`Unit: ${units[i].name}`);
      option.value = units[i].name;
      option.innerHTML = units[i].name;
      select.appendChild(option);
    }
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