import lodash from 'lodash';
const { cloneDeep } = lodash;

const getMethods = (object) => {
  const properties = new Set();

  let currentObject = object;
  while (currentObject) {
    Object.getOwnPropertyNames(currentObject).forEach((item) => {
      properties.add(item);
    });
    currentObject = Object.getPrototypeOf(currentObject);
  }
  return [...properties].filter((item) => typeof object[item] === 'function');
};

export default (parentObject, ...objects) => {
  const mergedObject = cloneDeep(parentObject);
  mergedObject.mixin = objects;
  mergedObject.mixin.forEach((object) => {
    getMethods(object).forEach((item) => {
      if (!parentObject[item]) mergedObject[item] = object[item].bind(object);
    });
  });
  return mergedObject;
};
