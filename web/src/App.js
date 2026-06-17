import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthCallBack from "./commonComponent/AuthCallBack";
import UserContextProvider from "./contextApi/UserContextProvider";
import Commit from "./commonComponent/Commit";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<AuthCallBack />} />
            <Route path="/:repoName/commits" element={<Commit />} />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
