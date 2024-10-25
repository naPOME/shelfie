import NavBar from './components/common/navBar';  // Path to NavBar component
import '../styles/globals.css';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />  
        <main>{children}</main>  
      </body>
    </html>
  );
}
