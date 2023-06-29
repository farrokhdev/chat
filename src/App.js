import { useEffect, useMemo, useState } from "react";
import { ChatBox } from "./components/ChatBox";
import { ChatForm } from "./components/ChatForm";
import io from "socket.io-client";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useTheme,
} from "@mui/material";

import { themeSettings } from "./theme";
import { Header } from "./components/Header";

// const socket = io.connect("http://localhost:3001");
const socket = io.connect("http://chat-app-server-xnij.onrender.com");
function App() {
  const [isChat, setIsChat] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const theme = useMemo(() => createTheme(themeSettings(isDark)), [isDark]);

  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <>
        <Header isDark={isDark} setIsDark={setIsDark} />
        <Box className="flex justify-center items-center p-4 w-full h-screen">
          {isChat ? (
            <>
              <ChatBox socket={socket} />
            </>
          ) : (
            <>
              <ChatForm socket={socket} setIsChat={setIsChat} />
            </>
          )}
        </Box>
      </>
    </ThemeProvider>
  );
}

export default App;
