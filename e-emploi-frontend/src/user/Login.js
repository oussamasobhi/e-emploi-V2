import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="bg-inherit w-4/12 ">
      <h1 className="text-3xl font-bold pb-6 text-center">
        Se connecter
      </h1>
      <div className="flex flex-col p-6 border rounded-md bg-white">
        <form className="flex flex-col mb-4 rounded-md bg-white">
          
          <label className="font-bold text-gray-800 mb-2">Email</label>
          <input
            className="border border-gray-400 px-5 py-3 rounded-md mb-3 outline-none focus:border-blue-600"
            type="email"
            name="email"
            placeholder='Email'
          />
          <label className="font-bold text-gray-800 mb-2">Mot de passe</label>
          <input
            className="border border-gray-400 px-5 py-3 rounded-md mb-3 outline-none focus:border-blue-600"
            type="password"
            name="password"
          />
          <div className='py-4'>
            <Link to="/forgotten">Mot de passe oublié</Link>
          </div>
          <input
            type="submit"
            value="Se connecter"
            className="text-white rounded-md font-bold py-3 hover:bg-blue-700 bg-blue-600"
          />
        </form>
        <p className="text-center">OR</p>
        <div className="py-10 text-center">
          Se connecter avec google / facebook ...
        </div>
      </div>
    </div>
  )
}

export default Login