/* eslint-disable no-undef */
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

global.__root = __dirname;

const packageJsonPath = path.resolve(global.__root, '../', 'package.json');
const packageJsonContent = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
global.__app = _.pick(packageJsonContent, 'name', 'version');
