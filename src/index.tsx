import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import FiltersProvider from "./components/FiltersProvider";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <FiltersProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </FiltersProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
