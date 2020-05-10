import React from 'react';
import { render } from '@testing-library/react';
import { Loader } from './index';

describe('Loader tests', () => {
  describe('When loading is false', () => {
    let renderedComponent: any;

    beforeEach(() => {
      renderedComponent = render(<Loader loading={false} />);
    });

    test('should render no children', () => {
      const { container } = renderedComponent;
      expect(container.children.length).toEqual(0);
    });
  });

  describe('When loading is true', () => {
    let renderedComponent: any;

    beforeEach(() => {
      renderedComponent = render(<Loader loading={true} />);
    });

    test('should render 2 children icon components', () => {
      const { container } = renderedComponent;
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toEqual(2);
    });

    test('should render correct svgs', () => {
      const { container } = renderedComponent;
      const svgs = container.querySelectorAll('svg');
      expect(svgs[0].getAttribute('data-icon')).toEqual('spinner');
      expect(svgs[1].getAttribute('data-icon')).toEqual('search-dollar');
    });
  });
});
