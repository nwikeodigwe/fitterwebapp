import Newsletter from "./newsletter";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 px-5 py-4 ">
      <div className="flex items-start justify-between">
        <ul className="flex gap-4 text-gray-700">
          <li>About</li>
          <li>help</li>
          <li>Privacy</li>
          <li>Terms</li>
          <li>Cookies Settings</li>
          <li>Location Preferences</li>
          <li>Accessibility</li>
        </ul>
        <Newsletter />
      </div>
      <p className="mt-10 text-gray-400">
        © 2025 fitter, Inc. All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
