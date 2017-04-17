const parser = module.exports = {};

const STATUSES = ['done', 'queued', 'succeed', 'failed'];
const TYPES = ['event', 'action'];

parser.hasNoSpaces = org => !String(org).match(/[\s]+/);
parser.isNumber = num => String(num).match(/^[\d]+$/);
parser.isValidOrg = org => parser.hasNoSpaces(org);
parser.isValidService = service => parser.hasNoSpaces(service);
parser.isValidMajorVersion = version => parser.isNumber(version);
parser.isValidMinorVersion = version => parser.isNumber(version);
parser.isValidType = type => TYPES.includes(type.toLowerCase());
parser.isValidResources = res => res.reduce((acc, val) => parser.hasNoSpaces(val));
parser.isValidOperation = op => parser.hasNoSpaces(op);
parser.isValidStatus = status => status === undefined || STATUSES.includes(status.toLowerCase());

parser.validate = parsed => {
  let valid;

  valid = parser.isValidOrg(parsed.org);
  if (!valid) throw new Error(`${parsed.org} is not a valid value for org.`);

  valid = parser.isValidService(parsed.service);
  if (!valid) throw new Error(`${parsed.service} is not a valid value for service.`);

  valid = parser.isValidMajorVersion(parsed.versions.major);
  if (!valid) throw new Error(`${parsed.versions.major} is not a valid value for major version.`);

  valid = parser.isValidMinorVersion(parsed.versions.minor);
  if (!valid) throw new Error(`${parsed.versions.minor} is not a valid value for minor version.`);

  valid = parser.isValidType(parsed.type);
  if (!valid) throw new Error(`${parsed.type} is not a valid value for type.`);

  valid = parser.isValidResources(parsed.resources);
  if (!valid) throw new Error(`${parsed.resources} is not a valid value for resources.`);

  valid = parser.isValidOperation(parsed.operation);
  if (!valid) throw new Error(`${parsed.operation} is not a valid value for operation.`);

  valid = parser.isValidStatus(parsed.status);
  if (!valid) throw new Error(`${parsed.status} is not a valid value for status.`);

  return true;
};

parser.parse = topic => {
  const parts = topic.split('.');
  let resource, resources, subresources, operation, status;

  if (parser.isValidStatus(parts.slice(-1)[0])) {
    resources = parts.slice(5, parts.length-2);
    resource = resources.join('.');
    subresource = resources.length > 1 ? resources.slice(1).join('.') : undefined;
    subresources = resources.length > 1 ? resources.slice(1) : undefined;
    operation = parts.slice(-2)[0];
    status = parts.slice(-1)[0];
  } else {
    resources = parts.slice(5, parts.length-1);
    resource = resources.join('.');
    subresource = resources.length > 1 ? resources.slice(1).join('.') : undefined;
    subresources = resources.length > 1 ? resources.slice(1) : undefined;
    operation = parts.slice(-1)[0];
  }

  const obj = {
    org: parts[0],
    service: parts[1],
    version: `${parts[2]}.${parts[3]}`,
    versions: {
      major: parts[2],
      minor: parts[3]
    },
    type: parts[4],
    resource,
    resources,
    subresource,
    subresources,
    operation,
    status
  };

  parser.validate(obj);

  return obj;
};

parser.stringify = parsed => {
  parser.validate(parsed);

  let topic;

  topic = `${parsed.org}.${parsed.service}.${parsed.versions.major}.${parsed.versions.minor}.${parsed.type}.${parsed.resources.join('.')}.${parsed.operation}`;
  if (parsed.status) topic = `${topic}.${parsed.status}`;

  return topic;
};
