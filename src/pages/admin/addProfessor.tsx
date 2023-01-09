import React, { useState } from "react";
import { trpc } from "../../utils/trpc";

const AddProfessor: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [name, setName] = useState<string>('');

  const mutation = trpc.professor.add.useMutation()

  const handleSubmit = async () => {
    mutation.mutate({ name, url })
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900">
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <h1 className="mb-2 text-2xl">I_VOTE_P</h1>
            <span className="text-gray-300 mb-6">Enter Prof Details</span>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-lg w-full">
                <input 
                  className="rounded-3xl border-none bg-slate-700 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="url" 
                  placeholder="Complete URL"
                  name="url"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                />
              </div>
              <input
                className="rounded-3xl border-none bg-slate-700 bg-opacity-50 px-9 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="text"
                placeholder="Full Name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <br />
              <div className="mt-8 flex justify-center text-lg text-black">
                <input type="submit" 
                  className="rounded-3xl bg-slate-500 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                  value="Add" 
                  disabled={!name || !url}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProfessor;