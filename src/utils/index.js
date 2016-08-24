import reduce from 'lodash/reduce';

export function sqsMessageToObj(message = {}) {
  const { city, type, method, slugs } = reduce(message.MessageAttributes, (result, attr, key) => {
    result[key] = attr.StringValue;
    if (key === 'slugs') {
      result[key] = attr.StringValue.split(',');
    }
    return result;
  }, {});

  return {
    index: mapCityIdToIndexName(city),
    type,
    method,
    slugs
  };
}

export function mapCityIdToIndexName(cityId) {
  switch (cityId) {
    case 'pub': return 'public';
    case 'priv': return 'private';
    default: return 'public';
  }
}

export function *iterator(array) {
  for (let i = 0; i < array.length; i++) {
    yield array[i];
  }
}
