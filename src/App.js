import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './components/Router/Route';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <RouterProvider router={router}>
      </RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
