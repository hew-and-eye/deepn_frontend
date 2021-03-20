import components from "../VrmComponents";
import { isObject } from "../VrmFramework/utils";
export function getHydratedConfig(config) {
  const transformer = (key, value) => {
    const transformedValue = components[value];
    return { transformedKey: key, transformedValue };
  };
  const transformChecker = (key) => key === "component";
  const recurseChecker = (key, value) => isObject(value);
  return recursivelyTransformObject({
    object: config,
    transformChecker,
    transformer,
    recurseChecker,
  });
}

export function recursivelyTransformObject({
  object,
  transformChecker,
  transformer,
  recurseChecker,
}) {
  return helper(object, object);
  function helper(object) {
    Object.entries(object).forEach(([k, v]) => {
      if (transformChecker(k, v)) {
        const { transformedKey, transformedValue } = transformer(k, v);
        if (recurseChecker(k, v)) {
          object[transformedKey || k] = helper(object[k], object[k]);
        } else {
          object[transformedKey || k] = transformedValue || v;
        }
      } else {
        if (recurseChecker(k, v)) {
          object[k] = helper(object[k], object[k]);
        }
        object[k] = v;
      }
      return object;
    });
    return object;
  }
}
