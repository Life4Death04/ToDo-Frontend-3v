import { Link } from "react-router";

export default function NotFound(){
    return(
        <main className=" h-screen flex items-center justify-center">
            <section className="flex flex-col items-center bg-amber-50 shadow-xl p-8">
                <svg width={150}>
                    <use href="../sprite.svg#icon-warning"></use>
                </svg>
                <h1 className="text-8xl text-orange font-bold mt-4 mb-4">404</h1>
                <h2 className="text-3xl font-bold">Page Not Found</h2>
                <p className="mt-3 mb-7">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
                <Link to={'/'}>
                    <button className="bg-orange text-white font-bold p-3 rounded-xl hover:cursor-pointer">Go to Homepage</button>
                </Link>
            </section>
        </main>
    );
}