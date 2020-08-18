import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../Home';

describe('The home page', () => {
  let div;
  beforeEach(() => {
    div = document.createElement('div');
  });
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });
  it('shows a welcome message', () => {
    ReactDOM.render(<Home />, div);
    expect(div.innerHTML).toContain('Welcome to');
  });
});
