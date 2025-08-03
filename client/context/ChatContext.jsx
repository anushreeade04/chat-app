// import { createContext, useContext, useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext";
// import toast from "react-hot-toast";

// export const ChatContext = createContext();

// export const ChatProvider = ({ children }) => {

//     const [messages, setMessages] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [unseenMessages, setUnseenMessages] = useState({});

//     const { socket, axios } = useContext(AuthContext);

//     //function to get all users for sidebar

//     const getUsers = async () => {
//         try {
//             const { data } = await axios.get("/api/messages/users");
//             if (data.success) {
//                 setUsers(data.user);
//                 setUnseenMessages(data.unseenMessages)

//             }

//         } catch (error) {
//             toast.error(error.message)

//         }

//     }

//     //Function to get messgaes from selected users

//     const getMessages = async (userId) => {
//         try {
//             const { data } = await axios.get(`/api/messgaes/${userId}`);
//             if (data.success) {
//                 setMessages(data.messages)
//             }
//         } catch (error) {
//             toast.error(error.message);

//         }

//     }

//     //Function to send message from selected user
//     const sendMessage = async (messageData) => {
//         try {
//             const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData)
//             if (data.success) {
//                 setMessages((prevMessages) => [...prevMessages, data.newMessage])
//             }
//         }
//         catch(error){
//             toast.error(error.message)
//         }

//     }

//     //Functiont o subscribe to messages for selected user

//     const subscribeToMessages = async () => {
//         if(!socket) return;
//         socket.on("newMessage", (newMessage)=>{
//             if(selectedUser && newMessage.senderId == selectedUser._id){
//                 newMessage.seen = true ;
//                 setMessages(()=>[...prevMessages, newMessage]);
//                 axios.put(`/api/messages/mark/${newMessage._id}`);


//             }
//             else{
//                 setUnseenMessages((prevUnseenMessages)=>({
//                     ...prevUnseenMessages, {newMessage.senderId} : 
//                     prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1

//                 }))
//             }

//         })

//     }

//     //Function to unsubscribe from messages

//     const unsubscribefromMessages = ()=>{
//         if(socket) socket.off("newMesage");
//     }

//     useEffect(()=>{
//         subscribeToMessages();
//         return ()=>unsubscribefromMessages();
//     },[socket, selectedUser])

//     const value = {
//         messages, users, selectedUser, getUsers, setMessages, sendMessage, setSelectedUser, unseenMessages, setUnseenMessages

//     }


//     return (
//         <ChatContext.Provider value={value}>
//             {children}

//         </ChatContext.Provider>)
// }

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const { socket, axios } = useContext(AuthContext);

    // ✅ 1. Get all users
    const getUsers = async () => {
        try {
            const { data } = await axios.get("/api/messages/users");
            if (data.success) {
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ✅ 2. Get messages from selected user
    const getMessages = async (userId) => {
        try {
            const { data } = await axios.get(`/api/messages/${userId}`); // 🐞 was misspelled "messgaes"
            if (data.success) {
                setMessages(data.messages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ✅ 3. Send a message to selected user
    const sendMessage = async (messageData) => {
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            if (data.success) {
                setMessages((prevMessages) => [...prevMessages, data.newMessage]);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ✅ 4. Subscribe to socket messages
    const subscribeToMessages = () => {
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`);
            } else {
                setUnseenMessages((prevUnseenMessages) => ({
                    ...prevUnseenMessages,
                    [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
                        ? prevUnseenMessages[newMessage.senderId] + 1
                        : 1,
                }));
            }
        });
    };

    // ✅ 5. Unsubscribe on cleanup
    const unsubscribeFromMessages = () => {
        if (socket) socket.off("newMessage"); // 🐞 was "newMesage"
    };

    useEffect(() => {
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [socket, selectedUser]);

    const value = {
        messages,
        users,
        selectedUser,
        getUsers,
        getMessages,
        sendMessage,
        getMessages,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages,
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
