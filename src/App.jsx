import { RouterProvider } from 'react-router-dom';

import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';
import { routes } from 'routes/MainRoutes';
import { AuthProvider } from 'contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <ThemeCustomization>
        <ScrollTop>
          <RouterProvider router={routes} />
        </ScrollTop>
      </ThemeCustomization>
    </AuthProvider>
  );
}
