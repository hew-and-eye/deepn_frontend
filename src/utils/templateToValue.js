export function templateToValue(suggestion, template = "_") {
  const templatesArray = Object.values(suggestion.templates || []);
  // some garbage tech debt, but whatever.
  const latestTemplate =
    templatesArray[templatesArray.length - 1] || suggestion.template;
  let returnString = latestTemplate || "";
  Object.entries(suggestion.dependencies || {}).forEach(([key, value]) => {
    returnString = returnString.replace(
      new RegExp(`{{${key}}}`, "g"),
      template.replace("_", value)
    );
  });
  return returnString;
}

export function templateToNames(suggestion, template = "_", modules) {
  const templatesArray = Object.values(suggestion.templates || []);
  // some garbage tech debt, but whatever.
  const latestTemplate =
    templatesArray[templatesArray.length - 1] || suggestion.template;
  let returnString = latestTemplate || "";
  modules = modules.reduce((acc, m) => {
    acc[m.id] = m;
    return acc;
  }, {});
  Object.entries(suggestion.dependencies || {}).forEach(([key]) => {
    returnString = returnString.replace(
      new RegExp(`{{${key}}}`, "g"),
      template.replace("_", modules[key.split(":")[0]].name)
    );
  });
  return returnString;
}
