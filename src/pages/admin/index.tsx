import { useRouter } from "next/router";
import React, { useState } from "react";

const Admin = () => {

  const router = useRouter()

  const [ username, setUsername ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')

  const handleAuth = () => {
    if (username === "ESLint" && password === "4013110907") {
      router.replace("admin/dashboad")
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900">
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <h1 className="mb-2 text-2xl">I_VOTE_P</h1>
            <span className="text-gray-300 mb-6">Authorize</span>
            <form onSubmit={handleAuth}>
              <div className="mb-4 text-lg w-full">
              <input
                className="rounded-3xl border-none bg-slate-700 bg-opacity-50 px-9 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              </div>
              <div className="mb-4 text-lg w-full">
                <input 
                  className="rounded-3xl border-none bg-slate-700 bg-opacity-50 px-9 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="password" 
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <input type="submit" 
                  className="rounded-3xl bg-slate-500 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                  value="Add" 
                  disabled={!username || !password}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
