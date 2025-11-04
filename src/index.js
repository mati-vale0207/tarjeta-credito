import { StrictMode } from "react"; // ayuda a detectar problemas
import { createRoot } from "react-dom/client"; // usa el create root para mostrar la app

import "./index.css"; // importar los estilos
import App from "./App"; // importa el componenete principal

const root = createRoot(document.getElementById("root")); //busca el div para mostrar el react

root.render(
    <StrictMode>
        <App /> {/*renderiza el componente App dentro de stricmode*/} 
    </StrictMode>
);



