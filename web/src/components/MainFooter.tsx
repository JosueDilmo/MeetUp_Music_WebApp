import "../styles/main.css";
import intmusLogo from "../assets/logo.svg";

function MainFooter() {
  return (
    <footer className="p-4 bg-gray-900 md:px-6 md:py-8 ">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a href="#" className="flex items-center mb-4 sm:mb-0">
          <img src={intmusLogo} className="h-40 mr-3" alt="IntmUS Logo" />
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-400 sm:mb-0 ">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Learn more
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Login
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Sign up
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              FAQ
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              About us
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <span className="block text-sm text-gray-400 sm:text-center">
        © 2023{" "}
        <a href="#" className="hover:underline">
          IntMus Web App
        </a>
        ™ .{" "}
        <a href="#" className="hover:underline">
          Terms of Service
        </a>{" "}
        ·{" "}
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
      </span>
    </footer>
  );
}

export default MainFooter;
