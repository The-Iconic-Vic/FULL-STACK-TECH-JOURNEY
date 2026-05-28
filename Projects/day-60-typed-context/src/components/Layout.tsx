import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      {children}
    </div>
  );
};

export default Layout;