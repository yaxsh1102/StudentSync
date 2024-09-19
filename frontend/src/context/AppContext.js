import { createContext, useState } from "react";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRoom, setCurrentRoom] = useState();
  const [currentDormitory, setCurrentDormitory] = useState();
  const [events,setEvents] = useState({})
  const [refresher,setRefresher]=useState('')

  const showToast = (message, type = "success") => {
    const baseStyle = {
      borderRadius: "8px",
      background: "#1e293b", 
      color: "#f9fafb",
      padding: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
    };

    const customToast = (message, icon) =>
      toast.custom(
        (t) => (
          <div
            style={{
              ...baseStyle,
              borderLeft: `4px solid ${icon.color}`,
            }}
            onClick={() => toast.dismiss(t.id)} 
          >
            <div>{icon.element}</div>
            <div className="ml-4">{message}</div>
          </div>
        ),
        { duration: 1000 } 
      );

    if (type === "success") {
      customToast(message, { element: "✔️", color: "#10b981" });
    } else if (type === "error") {
      customToast(message, { element: "❌", color: "#ef4444" });
    } else if (type === "loading") {
      customToast(message, { element: "⏳", color: "#f59e0b" });
    } else {
      customToast(message, { element: "ℹ️", color: "#3b82f6" });
    }
  };

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    currentRoom,
    setCurrentRoom,
    currentDormitory,
    setCurrentDormitory,
    showToast, 
    events,
    setEvents,
    setRefresher,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
