import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const baseURl = "https://chat-app-cs92.onrender.com/login";

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseURl}/api/users`);
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
