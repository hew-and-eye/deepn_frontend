export function hasSubObject(config) {
  return Array.isArray(config) ? !config[0].component : !config.component
  // return !(config[0] || config).component
}

export function isObject(value) {
  return typeof value === 'object' && value !== null
}