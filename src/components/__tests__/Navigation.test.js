import React from 'react';
import { mount } from 'enzyme';
import App from '../../App';

describe('The App component', () => {
  let wrapped;
  beforeEach(() => {
    wrapped = mount(<App />);
  });
  afterEach(() => {
    wrapped.unmount();
  });
  it('renders Navigation', () => {
    expect(wrapped.find('ul').length).toEqual(1);
  });
});
