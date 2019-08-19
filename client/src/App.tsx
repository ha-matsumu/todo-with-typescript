import React from 'react';
import SignIn from './components/auth/SignIn';
import { UserProvider } from './store/contexts/userContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <SignIn />
    </UserProvider>
  );
};

export default App;
