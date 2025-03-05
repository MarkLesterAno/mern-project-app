import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider, rem } from "@mantine/core";
import { theme } from "./theme";
import App from "./App.tsx";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      <Notifications styles={{
        root: {
          width: '300px', // Set your desired width here
          zIndex: 400,    // Set your desired z-index here
          position: 'fixed',
          bottom: 0,
          right: 0,
          margin: '1rem', // Add some margin for better positioning
        },
      }} />
    </MantineProvider>
  </React.StrictMode>
);
