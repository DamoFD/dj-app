import { AuthProvider } from "@/context/AuthContext";
import router from "@/router";
import { RouterProvider } from "react-router-dom";

const App: React.FC = () => {

  return (
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
