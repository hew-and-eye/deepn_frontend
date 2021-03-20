export function templateToValue(module, template = "_") {
  const templatesArray = Object.values(module.templates || []);
  // some garbage tech debt, but whatever.
  const latestTemplate =
    templatesArray[templatesArray.length - 1] || module.template;
  let returnString = latestTemplate || "";
  console.log(module.dependencies);
  Object.entries(module.dependencies || {}).forEach(([key, value]) => {
    returnString = returnString.replace(
      new RegExp(`{{${key}}}`, "g"),
      template.replace("_", value)
    );
    console.log(returnString, key, value);
  });
  return returnString;
}

export function templateToNames(module, template = "_", modules) {
  const templatesArray = Object.values(module.templates || []);
  // some garbage tech debt, but whatever.
  const latestTemplate =
    templatesArray[templatesArray.length - 1] || module.template;
  let returnString = latestTemplate || "";
  modules = modules.reduce((acc, m) => {
    acc[m.id] = m;
    return acc;
  }, {});
  Object.entries(module.dependencies || {}).forEach(([key]) => {
    returnString = returnString.replace(
      new RegExp(`{{${key}}}`, "g"),
      template.replace("_", modules[key.split(":")[0]].name)
    );
  });
  return returnString;
}
