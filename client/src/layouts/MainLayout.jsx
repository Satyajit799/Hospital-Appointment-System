import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <div
        className="
min-h-screen

bg-gray-100

dark:bg-gray-900

text-black

dark:text-white

transition-all

duration-300
"
      >
        {children}
      </div>
    </>
  );
};

export default MainLayout;
