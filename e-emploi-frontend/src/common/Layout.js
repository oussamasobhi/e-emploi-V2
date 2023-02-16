import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="h-16 min-w-full  flex justify-between items-center border-b px-3">
        <h1 className="text-blue-700 text-2xl font-bold">
        <Link className="h-full" to="/">e-emploi</Link>
        </h1>
        <div className="flex justify-end items-center h-full">
          <div>
            <button className="px-6 py-2 mx-10 bg-blue-500 hover:bg-blue-700 rounded-md text-white">
              <Link className="h-full" to="/pro/signup">Devenir pro</Link>
            </button>
          </div>
          <div className="flex justify-center items-center h-full text-gray-700">
            <button className=" h-full hover:border-b-2 hover:text-black">
              <Link className="px-6 h-full" to="/signup">S'enregistrer</Link>
            </button>
            <button className="h-full hover:border-b-2 hover:text-black">
              <Link className="px-6 h-full" to="/login">Se connecter</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-gray-50 pt-6 ">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
