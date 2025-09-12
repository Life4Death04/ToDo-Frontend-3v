export function getTheme(theme: string){
    localStorage.setItem('theme', theme);
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && storedTheme.toUpperCase() === 'DARK') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
}