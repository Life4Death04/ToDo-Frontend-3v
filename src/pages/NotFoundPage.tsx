import {Link} from 'react-router';
import { Button } from '../components/Common/CommonComponents';

export default function NotFoundPage() {
    return (
        <main className="h-screen flex items-center justify-center">
            <section className="flex flex-col items-center bg-amber-50 shadow-xl xsm:max-w-80 rounded-xl sm:max-w-[400px] xsm:p-4 xsm:mx-3 lg:p-8 lg:max-w-fit dark:bg-background-dark">
                <svg className="xsm:w-20 xsm:h-20 sm:w-30 sm:h-30 lg:w-40 lg:h-40">
                <use href="../sprite.svg#icon-warning"></use>
            </svg>
            <h1 className="xsm:text-5xl lg:text-7xl text-orange font-bold xsm:mt-4 xsm:mb-1 lg:my-4">404</h1>
            <h2 className="xsm:text-2xl sm:text-3xl lg:text-3xl font-bold dark:text-text-dark-white">Page Not Found</h2>
            <p className="xsm:text-sm sm:text-lg text-center my-4 dark:text-text-dark">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
            <Link to={'/'}>
                <Button textButton="Go to Homepage" />
            </Link>
        </section>
    </main>
    );
}