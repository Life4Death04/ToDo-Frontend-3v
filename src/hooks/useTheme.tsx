import { useEffect } from 'react';
import { useFetchUserSettings } from './useTasks';

export function useTheme(){
    const { data } = useFetchUserSettings();

    useEffect(() => {
        const theme = data?.theme;
        localStorage.setItem('theme', theme!); // persist theme choice
    }, [data?.theme]);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if(storedTheme === 'DARK') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        console.log("Theme set to", storedTheme);
    }, [data?.theme]);
}