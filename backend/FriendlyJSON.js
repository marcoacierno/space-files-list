const camelcase = require('camelcase');


module.exports = class FriendlyJSON {
  static convert(xml) {
    let res;

    Object.entries(xml)
      .forEach(([key, value]) => {
        if (Array.isArray(value)) {
          res = value.map(item => FriendlyJSON.parseNode(item));
        } else {
          res = FriendlyJSON.parseNode(value);
        }
      });

    return res;
  }

  static parseNode(node) {
    let res;

    if (Array.isArray(node)) {
      res = node.map(item => FriendlyJSON.parseNode(item));
    } else if (typeof node === 'object') {
      res = {};

      // eslint-disable-next-line
      for (const [key, value] of Object.entries(node)) {
        const jsKey = camelcase(key);

        if (typeof value === 'string') {
          res[jsKey] = value;
        } else if (Array.isArray(value)) {
          if (value.length === 1 && typeof value[0] === 'string') {
            res[jsKey] = value[0];
          } else {
            res[jsKey] = FriendlyJSON.parseNode(value);
          }
        } else if (typeof value === 'object') {
          res[jsKey] = FriendlyJSON.parseNode(value);
        }
      }
    }

    return res;
  }
};

