import AuthProvider from "./Provider/authProvider";
import Routes from "./Routes/index";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
