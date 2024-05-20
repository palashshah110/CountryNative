import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/App';

const tree = renderer.create(<App />);
test('snapshot', () => {
  expect(tree).toMatchSnapshot();
});
