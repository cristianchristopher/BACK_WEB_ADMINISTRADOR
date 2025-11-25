import app,{ startServer } from './app';


const PORT = process.env.PORT || 4000;

// Inicializa la base de datos y luego arranca el servidor
startServer()
    .then(() => {
        app.listen(PORT,() =>{
            console.log(`Servidor iniciado en :  http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1);
    })