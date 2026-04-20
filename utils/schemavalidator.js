import Ajv from 'ajv';

const ajv = new Ajv();

export function validateSchema(schema, data) {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    console.log("Schema errors:", validate.errors);
  }

  return valid;
}