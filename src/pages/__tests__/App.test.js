import React from 'react';
import { shallow } from 'enzyme';
import App from '../../App';
import Routing from '../../components/Routing';

describe('The App component', () => {
  let wrapped;
  beforeEach(() => {
    wrapped = shallow(<App />);
  });
  it('renders Routing', () => {
    expect(wrapped.find(Routing).length).toEqual(1);
  });
});
