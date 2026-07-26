import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { ReactElement } from 'react';
import { ProgressProvider } from '../state/ProgressContext';

export function renderRoute(element: ReactElement, route = '/', path = '*') {
  return render(<ProgressProvider><MemoryRouter initialEntries={[route]}><Routes><Route path={path} element={element} /></Routes></MemoryRouter></ProgressProvider>);
}
