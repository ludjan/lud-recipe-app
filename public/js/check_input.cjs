const bannedCharacters = ['"', "'", '`', '\\', '/'];

function allRecipeInputsAreValid() {

  if (!isInputFieldValidText(recipeNameInput.name, recipeNameInput.value)) return false;

  if (!isInputFieldValidText(recipeDescriptionInput.name, recipeDescriptionInput.value)) return false;

  if (!isInputFieldValidNumberGreaterThanZero(recipePortionsInput.name, recipePortionsInput.value)) return false;

  var validRecipeIngredientCount = 0;
  
  for (let i = 0; i < recipeIngredientArray.length; i++) {
    const { quantity } = recipeIngredientArray[i];
    if (!isInputFieldValidNumberGreaterThanZero(`Ingredient input ${i+1}`, quantity)) {
      // remove this row ?
      return false;
    } else {
      validRecipeIngredientCount++;
    }
  }
  if (validRecipeIngredientCount <= 0) {
    inputError(`Must have at least 1 valid ingredients`);
    return false;
  }

  // validate ingredients
  var validStepCount = 0;
  // console.log(`RecipeStepArray length = ${recipeStepArray.length}`);
  for (let i = 0; i < recipeStepArray.length; i++) {
    const description = recipeStepArray[i];
    if (isBlank(description)) {
      // remove this ?
      console.log(`Description cannot be blank`);
    } else {
      validStepCount++;
    }
  }
  if (validStepCount <= 0) {
    inputError(`Must have at least 1 valid step`);
    return false;
  }

  return true;
}

function isInputFieldValidNumberGreaterThanZero(fieldName, value) {
  if (isBlank(value)) {
    inputError(`${fieldName} is blank`);
    return false;
  }
  if (!isNumeric(value)) {
    inputError(`${fieldName} is not an whole number`);
    return false;
  }

  if (parseInt(value) <= 0) {
    inputError(`${fieldName} must be greater than 0`);
    return false;
  }

  return true;
}

function isInputFieldValidText(fieldName, value) {
  if (isBlank(value)) {
    inputError(`${fieldName} is blank`);
    return false;
  }
  if (containsBannedCharachters(value)) {
    inputError(`${fieldName} contains banned characters ${formattedBannedCharacters()}`);
    return false;
  }
  return true;
}

const isAlphaNumeric = str => /^[\w\-\s]+$/gi.test(str);
const isNumeric = str => isNotBlank(str) && isAlphaNumeric(str) && !isNaN(str);
const isBlank = str => str === "";
const isNotBlank = str => !isBlank(str);

const containsSymbols = (str, symbols) => {
  for (let i = 0; i < str.length; i++) {
    const character = str.substr(i, 1);
    for (let j = 0; j < symbols.length; j++) {
      if (character == symbols[j]) {
        return true;
      }
    }
  }
  return false;
}

function inputError(str) {
  alert(str);
}

function formattedBannedCharacters() {
  return `(${reduceStringArray(bannedCharacters)})`
}

const containsBannedCharachters = (str) => {
  return containsSymbols(str, bannedCharacters);
}