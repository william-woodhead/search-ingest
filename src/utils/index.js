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
