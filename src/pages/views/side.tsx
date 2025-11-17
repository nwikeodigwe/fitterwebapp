import { Link } from "react-router";

const Side = () => {
  return (
    <div className="side relative h-screen">
      <div className=" top-0 left-0 w-full">
        <ul className="flex flex-col items-ends">
          <li className="text-right">
            <Link to="#" className="hover:underline">
              Popular
            </Link>
          </li>
          <li className="text-right">
            <Link to="#" className="hover:underline">
              Recent releases
            </Link>
          </li>
          <li className="text-right">
            <Link to="#" className="hover:underline">
              New In
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col items-ends mt-5">
          <li className="text-right">
            <Link to="#" className="hover:underline">
              Brand
            </Link>
          </li>
          <li className="text-right">
            <Link to="#" className="hover:underline">
              Bape
            </Link>
          </li>
          <li className="text-right">
            <Link to="#" className="hover:underline">
              Lemaire
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col items-ends mt-5">
          <li className="text-right">
            <Link to="#" className="hover:underline">
              Category
            </Link>
          </li>
          <li className="text-right">
            <Link to="#" className="hover:underline">
              Gender
            </Link>
          </li>
          <li className="text-right">
            <Link to="#" className="hover:underline">
              Color
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Side;
