import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import UserContextProvider from "../contextApi/UserContextProvider";
import ProtectedRoute from "../common/ProtectedRoute";
import AuthCallback from "../features/auth/AuthCallback";
import CommitPage from "../features/commits/CommitPage";
import CommitDetails from "../features/commits/CommitDetails";

function App() {
  return (
    <div className="App">
      <Toaster theme="dark" position="top-right" richColors />
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
            <Route
              path="/:repoName/commits/:sha"
              element={
                <ProtectedRoute>
                  <CommitDetails />
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
