import { lazy } from 'react';

export const PageAsync = lazy(() =>
    import('./page').then((module) => ({ default: module.Page })),
);
