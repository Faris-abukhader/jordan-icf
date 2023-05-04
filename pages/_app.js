import { useEffect } from 'react';
import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    const userLang = navigator.language || navigator.userLanguage; 
  },[])
  return (
    <>
      <span className="theme-bejamas" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
