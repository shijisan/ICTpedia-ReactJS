import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import Header from '../components/Header.jsx';

function Homepage() {
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    style.innerHTML = `
      nav {
        position: absolute !important;
        width: 100% !important;
        background-color: transparent !important;
      }
      main {
        height: 100vh !important;
      }
    `;

    // Append the style element to the head
    document.head.appendChild(style);

    // Cleanup: Remove the style element when the component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <Nav />
      <Header />
    </>
  );
}

export default Homepage;
