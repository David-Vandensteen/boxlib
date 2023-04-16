import fs from 'fs-extra';
import path from 'path';

const packagePath = path.resolve(process.cwd(), 'package.json');
const pkg = fs.readJSONSync(packagePath);

const {
  name,
  author,
  version,
  license,
} = pkg;

export default pkg;
export {
  pkg,
  name,
  author,
  version,
  license,
};
