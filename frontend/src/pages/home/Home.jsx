import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg py-5 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-[0.2] w-full sm:w-auto h-screen">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
