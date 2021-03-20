export default function templateToValue(suggestion) {
  const templatesArray = Object.values(suggestion.templates || []);
  const latestTemplate = templatesArray[templatesArray.length - 1];
  let returnString = latestTemplate;
  Object.entries(suggestion.dependencies || {}).forEach(([key, value]) => {
    returnString = returnString.replace(new RegExp(`{{${key}}}`, "g"), value);
  });
  return returnString;
}
