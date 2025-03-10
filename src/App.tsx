import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./context/AuthContext/AuthContext";
import { routes } from "./routes/routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path={routes.home.dynamic} element={<>Home</>} />
            <Route path={routes.auth.dynamic} element={<>Auth</>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
