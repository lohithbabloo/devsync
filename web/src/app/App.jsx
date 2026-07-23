import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContextProvider from "../contextApi/UserContextProvider";
import ProtectedRoute from "../common/ProtectedRoute";
import AuthCallback from "../features/auth/AuthCallback";
import CommitPage from "../features/commits/CommitPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<AuthCallback />} />
            <Route
              path="/:repoName/commits"
              element={
                <ProtectedRoute>
                  <CommitPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
