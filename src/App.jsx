import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routers/Routes";

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
