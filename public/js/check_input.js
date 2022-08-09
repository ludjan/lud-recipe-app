const isAlphaNumeric = str => /^[\w\-\s]+$/gi.test(str);
const isNumeric = str => isNotBlank(str) && isAlphaNumeric(str) && !isNaN(str);
const isBlank = str => str === "";
const isNotBlank = str => !isBlank(str);
