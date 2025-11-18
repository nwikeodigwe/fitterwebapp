import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-center scale-200">404</h1>
        <p className="text-lg tracking-wide text-center">Page not found</p>
        <Link to="/" className="flex mt-2 uppercase">
          <span className="flex items-center justify-center gap-2 text-white p-2 bg-black">
            <IoHomeOutline size={20} />
          </span>
          <span className="flex items-center justify-start gap-2 text-white px-5 py-3 bg-black">
            Home
          </span>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
