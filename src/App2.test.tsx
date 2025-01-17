import React from 'react'

import {render, screen} from '@testing-library/react'

import App2 from './App2'
import * as sample from './sample'

it('should work', () => {
    render(<App2 />)

    screen.getByText((content, node) => {
        const hasText = (node: any) => node.textContent === "hell";
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children).every(
          (child) => !hasText(child)
        );
    
        return nodeHasText && childrenDontHaveText;
      });

    screen.debug()
})

it.only('aha', () => {
  const spiedHello = jest.spyOn(sample, 'hello')
  expect(sample.hello()).toBe(10)
  expect(spiedHello).toHaveBeenCalledTimes(1)
})