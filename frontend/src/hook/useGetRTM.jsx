import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/chatSlice";
import { useEffect } from "react";

const useGetRTM = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((store) => store.socketio);
  const { messages } = useSelector((store) => store.chat);
  useEffect(() => {
    if (!socket) return;
    socket?.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [messages, setMessages, dispatch]);
};
export default useGetRTM;
