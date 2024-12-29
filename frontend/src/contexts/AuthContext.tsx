import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from 'react';
import { getToken, removeToken } from '../service/authService';
import { jwtDecode } from 'jwt-decode'; // Correctly imported as default export
import { Order } from '../types';

// Define the structure of the JWT payload
interface DecodedToken {
  sub: string;
  roles: string[];
  email: string;
  userId: string;
}

// Define the structure of the user data
interface UserData {
  username: string;
  roles: string[];
  email: string;
  id: string;
  orders: Order[];
}

// Define the AuthContext value type
interface AuthContextValue {
  isAuthenticated: boolean;
  userData: UserData | null;
  login: (token: string) => void;
  handleLogout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Initialize authentication state
  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setIsAuthenticated(true);
        setUserData({
          username: decodedToken.sub,
          roles: decodedToken.roles,
          email: decodedToken.email,
          id: decodedToken.userId,
          orders: [],
        });
        console.log(decodedToken);
      } catch (error) {
        console.error('Invalid token:', error);
        handleLogout();
      }
    }
  }, []);

  const login = (token: string): void => {
    try {
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode<DecodedToken>(token);
      setIsAuthenticated(true);
      setUserData({
        username: decodedToken.sub,
        roles: decodedToken.roles,
        email: decodedToken.email,
        id: decodedToken.userId,
        orders: [],
      });
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = (): void => {
    removeToken();
    setIsAuthenticated(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userData, login, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
