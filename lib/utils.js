var _ = require('lodash');

/**
 * Replace given object keys recursively
 * @param {Object} object Object to change keys of
 * @param {Function} transformer A callback which receives a key
 * @returns Copy of the object with `transformer` applied to each key
 */
function mapKeysDeep(object, transformer) {
  return _.transform(object, function (result, value, key) {
    if (_.isFunction(value)) return;
    result[transformer(key)] = _.isObject(value) ? mapKeysDeep(value, transformer) : value;
  });
}

module.exports = { mapKeysDeep };
