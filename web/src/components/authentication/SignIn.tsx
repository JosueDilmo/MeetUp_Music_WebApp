import * as Dialog from "@radix-ui/react-dialog";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handgleSignIn = (event: any) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("User logged in successfully");
      })
      .catch((error) => {
        alert("Please, check your credentials");
        console.log(error);
      });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger
        type="button"
        className="block py-2 pl-3 pr-4 text-white bg-blue-500 hover:text-white rounded md:bg-transparent md:text-blue-500 md:p-0"
      >
        Login
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className=" bg-black/70 inset-0 fixed" />
        <Dialog.Content className="bg-gray-900 text-white fixed px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
          <div className="flex flex-1 items-center justify-center">
            <div className="rounded-lg px-4 py-16 text-center">
              <form className="text-center" onSubmit={handgleSignIn}>
                <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-white">
                  Sign in
                </h1>
                <div className="py-2 text-left">
                  <input
                    type="email"
                    className="bg-gray-200 border-2 border-gray-100 text-black focus:outline-none block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="py-2 text-left">
                  <input
                    type="password"
                    className="bg-gray-200 border-2 border-gray-100 text-black focus:outline-none block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="py-2">
                  <button
                    type="submit"
                    className="border-2 border-gray-100 focus:outline-none bg-blue-700 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:ring-blue-300 hover:bg-blue-800"
                  >
                    Sign In
                  </button>
                </div>
                <div className="text-center">
                  <a href="#" className="hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="text-center mt-12">
                  <span>Don't have an account? </span>
                  <a
                    href="#"
                    className="text-md text-indigo-600 underline font-semibold hover:text-indigo-800"
                  >
                    Create one
                  </a>
                </div>
              </form>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SignIn;
