import React from 'react';
import { mount } from 'enzyme';
import Search from '../Search';

describe('The App component', () => {
  let wrapped;
  beforeEach(() => {
    wrapped = mount(<Search />);
  });
  afterEach(() => {
    wrapped.unmount();
  });
  it('renders Navigation', () => {
    expect(wrapped.find('form').length).toEqual(1);
  });
});
