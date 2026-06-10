import AuthCallBack from "./commonComponent/AuthCallBack";
import UserContextProvider from "./contextApi/UserContextProvider";
function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <AuthCallBack />
      </UserContextProvider>
    </div>
  );
}

export default App;
