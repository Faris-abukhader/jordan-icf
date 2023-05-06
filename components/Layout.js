import classNames from 'classnames';
import { useEffect } from 'react';
import styles from './Layout.module.css';
import Footer, { ThemeSwitcher } from './Footer';
import Link from 'next/link';
export function GradientBackground({ variant, className }) {
  const classes = classNames(
    {
      [styles.colorBackground]: variant === 'large',
      [styles.colorBackgroundBottom]: variant === 'small',
    },
    className
  );

  return <div className={classes} />;
}

export default function Layout({ children,animation }) {
  const setAppTheme = () => {
    const darkMode = localStorage.getItem('theme') === 'dark';
    const lightMode = localStorage.getItem('theme') === 'light';

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else if (lightMode) {
      document.documentElement.classList.remove('dark');
    }
    return;
  };

  const handleSystemThemeChange = () => {
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    darkQuery.onchange = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'dark');
      }
    };
  };

  useEffect(() => {
    setAppTheme();
  }, []);

  useEffect(() => {
    handleSystemThemeChange();
  }, []);

  useEffect(()=>{
    console.log(animation)
  },[animation])

  return (
    <div className="relative pb-24 overflow-hidden">
    <div className="py-16- absolute top-0 left-0 z-50 max-w-sm flex items-center animate__animated animate__slow animate__fadeInDown">
            <div className='scale-50'><ThemeSwitcher/></div> 
            <ul className='flex gap-4 font-bold mt-2 text-xs dark:text-gray-200 light:text-gray-700 '>
        <li><Link href={`/`}><a className='hover:text-blue-300'>Home</a></Link></li>
        <li><Link href={`/name-card`}><a className='hover:text-blue-300'>Name card</a></Link></li>
      </ul>

            </div>
      <div className={`flex flex-col items-center max-w-2xl w-full mx-auto animate__animated animate__${animation}`}>
        {children}
      </div>
    </div>
  );
}
