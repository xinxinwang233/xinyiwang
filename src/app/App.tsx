import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return (
    <div className="antialiased font-sans selection:bg-blue-500/30 selection:text-blue-900 dark:selection:text-blue-100">
      <RouterProvider router={router} />
    </div>
  );
}
