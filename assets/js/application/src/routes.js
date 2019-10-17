import React from 'react';

import LandingPage from './components/landingPage/Index';
import Todos from './components/todos/Index';
import UnderConstruction from './components/underConstruction/Index';

const ensureNamePathTextAreUniq = (routes) => {
  const uName = {};
  const uPath = {};
  const uText = {};
  routes.forEach(([name, path, text]) => {
    [
      ['name', uName[name]],
      ['path', uPath[path]],
      ['text', uText[text]]
    ].forEach(([key, exists]) => {
      if (exists) {
        throw Error(`... ERROR: route '${key}' '${name}' not unique.`);
      }
      uName[name] = true;
      uPath[path] = true;
      uText[text] = true;
    });
  });

  return routes;
};

const left = [
  /* eslint-disable no-multi-spaces, key-spacing */
  ['root',    '/',        'Home',    <LandingPage />,                       true],
  ['work',    '/work',    'Work',    <Todos />,                             false],
  ['company', '/company', 'Company', <UnderConstruction title="Company" />, false],
  ['careers', '/careers', 'Careers', <UnderConstruction title="Careers" />, false]
  /* eslint-enable */
];

const right = [
  /* eslint-disable no-multi-spaces, key-spacing */
  ['login',  '/login',  'Log in',  <UnderConstruction title="Log in" />, false],
  ['signup', '/signup', 'Sign Up', <UnderConstruction title="Sign up" />, false]
  /* eslint-enable */
];

const validatedAll = ensureNamePathTextAreUniq([...left, ...right]);

const byPath = validatedAll.reduce(
  (memo, [name, path, text, Component, defaultIsActive]) => ({
    ...memo,
    [path]: {
      name, path, text, Component, defaultIsActive
    }
  }),
  {}
);

const toListOfObjects = (routes) => routes.map(
  ([name, path, text, Component, defaultIsActive]) => ({
    name, path, text, Component, defaultIsActive
  })
);

const exp = {
  left: toListOfObjects(left),
  right: toListOfObjects(right),
  all: toListOfObjects(validatedAll),
  byPath
};

export default exp;
