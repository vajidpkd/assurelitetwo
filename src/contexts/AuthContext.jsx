import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [companyDetails, setCompanyDetails] = useState(() => {
    const storedDetails = sessionStorage.getItem('companyDetails');
    return storedDetails ? JSON.parse(storedDetails) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedStatus = sessionStorage.getItem('isAuthenticated');
    return storedStatus === 'true';
  });

  useEffect(() => {
    const storedDetails = sessionStorage.getItem('companyDetails');
    if (storedDetails) {
      setCompanyDetails(JSON.parse(storedDetails));
    }
  }, []);

  const login = (response) => {
    console.log(response, 'response from login');
    setCompanyDetails(response);
    sessionStorage.setItem('companyDetails', JSON.stringify(response));
    sessionStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('companyDetails');
    setIsAuthenticated(false);
    setCompanyDetails(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        companyDetails
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
