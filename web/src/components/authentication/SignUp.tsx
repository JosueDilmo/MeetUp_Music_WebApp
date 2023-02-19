import * as Dialog from "@radix-ui/react-dialog";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");

  function checkPassword(e: any) {
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      e.preventDefault();
    } else {
      handleSignUp(e);
    }
  }

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        createUserInDatabase(userCredentials.user.uid, event);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createUserInDatabase = async (userId: string, e: any) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:3333/create-user/${userId}`, {
        firstName: firstName,
        lastName: lastName,
        profession: profession,
      })
      .then(() => {
        alert(`User created successfully ${email}`);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-bold rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Sign up
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className=" bg-black/70 inset-0 fixed" />
        <Dialog.Content className="bg-gray-900 text-white fixed px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
          <div className="grid h-[700px] mt-6 place-items-center">
            <span className="text-3xl font-black">Create your account</span>
            <span className="text-xl font-regular ">
              Please fill in your information to continue.
            </span>
            <div className="w-11/12 p-8 bg-white rounded-lg">
              <form className="mt-1" onSubmit={(e) => checkPassword(e)}>
                <div className="flex justify-between gap-3">
                  <span className="w-1/2">
                    <label
                      htmlFor="firstname"
                      className="block text-xs font-semibold text-gray-600 uppercase"
                    >
                      First Name
                    </label>
                    <input
                      id="firstname"
                      type="text"
                      name="firstname"
                      placeholder="John"
                      autoComplete="given-name"
                      className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </span>
                  <span className="w-1/2">
                    <label
                      htmlFor="lastname"
                      className="block text-xs font-semibold text-gray-600 uppercase"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      name="lastname"
                      placeholder="Doe"
                      autoComplete="family-name"
                      className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </span>
                </div>
                <span className="w-full">
                  <label
                    htmlFor="profession"
                    className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                  >
                    Profession
                  </label>
                  <input
                    id="profession"
                    type="text"
                    name="profession"
                    placeholder="Guitarist"
                    autoComplete="profession"
                    className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    required
                    onChange={(e) => setProfession(e.target.value)}
                  />
                </span>
                <label
                  htmlFor="email"
                  className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john.doe@company.com"
                  autoComplete="email"
                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="password"
                  className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="********"
                  autoComplete="new-password"
                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor="password-confirm"
                  className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                >
                  Confirm password
                </label>
                <input
                  id="password-confirm"
                  type="password"
                  name="password-confirm"
                  placeholder="********"
                  autoComplete="new-password"
                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  required
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-blue-700 hover:bg-blue-800 shadow-lg focus:outline-none hover:shadow-none"
                >
                  Sign up
                </button>
                <p className="justify-between inline-block mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">
                  Already registered?
                </p>
              </form>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SignUp;
