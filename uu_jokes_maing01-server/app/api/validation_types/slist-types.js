/* eslint-disable */

const slistCreateDtoInType = shape({
  name: uu5String(3, 100).isRequired(),
  notes: string(0, 4000).isRequired()
});
