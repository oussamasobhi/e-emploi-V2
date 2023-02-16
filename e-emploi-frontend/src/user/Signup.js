import React from "react";

const Signup = () => {

    

  return (
    <div className="bg-inherit w-auto">
      <h1 className="text-3xl font-bold pb-6 text-center">
        Créer votre compte
      </h1>
      <div className="flex flex-col p-6 border rounded-md bg-white">
        <form className="flex flex-col mb-4 rounded-md bg-white">
          <div className="flex">
            <div className="flex flex-col pr-5 pb-4">
              <label className="font-bold text-gray-800 mb-2">Nom</label>
              <input
                className="border border-gray-400 px-5 py-3 rounded-md outline-none focus:border-blue-600"
                type="text"
                name="name"
              />
            </div>
            <div className="flex flex-col pb-4">
              <label className="font-bold text-gray-800 mb-2">Nom d'utilisateur</label>
              <input
                className="border border-gray-400 px-5 py-3 rounded-md outline-none focus:border-blue-600"
                type="text"
                name="username"
              />
            </div>
          </div>
          <label className="font-bold text-gray-800 mb-2">Email</label>
          <input
            className="border border-gray-400 px-5 py-3 rounded-md mb-3 outline-none focus:border-blue-600"
            type="email"
            name="email"
          />
          <label className="font-bold text-gray-800 mb-2">Mot de passe</label>
          <input
            className="border border-gray-400 px-5 py-3 rounded-md mb-3 outline-none focus:border-blue-600"
            type="password"
            name="password"
          />
          <p className="mb-3">Critères sur le mot de passe ...</p>
          <button className="text-white rounded-md font-bold py-3 hover:bg-blue-700 bg-blue-600">
            Créer un compte
          </button>

        </form>
        <p className="text-center">OR</p>
        <div className="py-10 text-center">
          Sign up sur google et facebook ...
        </div>
      </div>
    </div>
  );
};

export default Signup;
