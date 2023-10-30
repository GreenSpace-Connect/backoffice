// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeUndefinedProperties = (obj: Record<any, any>) => {
  // Get an array of property names in the object
  const keys = Object.keys(obj);

  // Iterate through the property names
  keys.forEach((key) => {
    if (obj[key] === undefined || obj[key] === '') {
      // Use the delete operator to remove the property
      delete obj[key];
    }
  });

  return obj;
};
