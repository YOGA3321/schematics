import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
            root.classList.add('dark');
        } else {
            setIsDark(false);
            root.classList.remove('dark');
        }
    }, []);

    const toggleTheme = (event) => {
        const root = document.documentElement;
        const newIsDark = !isDark;

        if (!document.startViewTransition) {
            setIsDark(newIsDark);
            if (newIsDark) root.classList.add('dark');
            else root.classList.remove('dark');
            localStorage.theme = newIsDark ? 'dark' : 'light';
            return;
        }

        const x = event?.clientX ?? window.innerWidth / 2;
        const y = event?.clientY ?? window.innerHeight / 2;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            setIsDark(newIsDark);
            if (newIsDark) root.classList.add('dark');
            else root.classList.remove('dark');
            localStorage.theme = newIsDark ? 'dark' : 'light';
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
            ];
            
            document.documentElement.animate(
                {
                    clipPath: newIsDark ? [...clipPath].reverse() : clipPath,
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: newIsDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
                }
            );
        });
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
