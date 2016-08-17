import reduce from 'lodash/reduce';

export function sqsMessageToObj(message = {}) {
  return reduce(message.MessageAttributes, (result, attr, key) => {
    result[key] = attr.StringValue;
    if (key === 'slugs') {
      result[key] = attr.StringValue.split(',');
    }
    return result;
  }, {});
}

export function mapCityIdToIndexName(cityId) {
  switch (cityId) {
    case 'LON': return 'london';
    case 'PAR': return 'paris';
    default: return 'london';
  }
}
