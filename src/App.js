import { useState } from "react";      //importa el useState desde react para gestionar estados
import allowed from "./config";        //importa el arreglo desde el archivo config
import { allowed2 } from "./config";   //importa el archivo allowed2

function App() {
    //formulario y  control de visualizacion
    const [name, setName] = useState("");                //nombre del titular
    const [number, setNumber] = useState("");            //numero de tarjeta
    const [expiry, setExpiry] = useState("");            //fecha de vencimiento
    const [cvv, setCvv] = useState("");                  //codigo de tarjeta
    const [message, setMessage] = useState("");          //mensaje de error
    const [submit, setSubmit] = useState(false);         //control de envio
    const [isFlipped, setIsFlipped] = useState(false);      //control del giro de la tarjeta

    //Renderizacion de componentes
    return (
        <Container>
            {!submit ? (  //si no se envia el formulario
                <>
                    {/*muestra la tarjeta visual*/}
                    <CardDisplay
                        name={name}
                        number={number}
                        expiry={expiry}
                        cvv={cvv}
                        isFlipped={isFlipped}
                    />
                    {/*muestra el formulario*/}
                    <Form
                        name={name}
                        setName={setName}
                        number={number}
                        setNumber={setNumber}
                        expiry={expiry}
                        setExpiry={setExpiry}
                        cvv={cvv}
                        setCvv={setCvv}
                        message={message}
                        setMessage={setMessage}
                        setSubmit={setSubmit}
                        setIsFlipped={setIsFlipped}
                    />
                </>
            ) : (
                //si ya se envio el formulario
                <submit setSubmit={setSubmit} />

            ) }
        </Container>
    );
}


//contenedor principal
function Container({ children }) {
    return <div className="container">{children} </div>
}

//pantalla de datos enviados
function Submit({ setSubmit }) {
    return (
        <div>
            <button className="btn-close" onClick={() => setSubmit(false)}>X</button>
            <p className="success">Tus Datos han sido Guardados</p>
        </div>
    );
}

//Visualizacion de la tarjeta
function CardDisplay({ name, number, expiry, cvv, isFlipped }){
    return (
        <div className="card">
            <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
                {/*Lado frontal de la tarjeta*/}
                <div className="card-front">
                    <p className="card-number">{number || "0000 0000 0000 0000"}</p>
                    <div className="card-buttom">
                        <div>
                            <p className="card-label">Nombre del Titular de la Tarjeta</p>
                            <p className="card-info">{name || "David Cardona"}</p>
</div>
<div>
                            <p className="card-label">Fecha de V.</p>
                            <p className="card-info">{expiry || "MM/YY"}</p>
                        </div>
                    </div>
                </div>

                {/*Lado Trasero de la Tarjeta*/}
                <div className="card-back">
                    <div className="black-strip"></div>
                    <div className="cvv-container">
                        <p className="cvv-label">CVV</p>
                        <p className="cvv-code">{cvv || "***"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

//Formatear el numero de tarjeta en grupos y validar digitos

function formatNumber(number, inputType, previousNum){
    const addSpacePositons = [4, 9, 14];
    const returnValue = addSpacePositons.includes(number.length)
        ? number + ""
        : number;


    //Validacion de cada digito
    if (number.split("").some((num) => !allowed2.includes(num.padStart(2, "0"))))
        return previousNum;

    return inputType !== "deleteContentBackward" ? returnValue : number;
}

//Validacion y formato de fecha de expiracion
function formatValidateDate(date, inputType, setMessage){
    if (!allowed.includes(date.length >= 2 ? date.slice(0, 2) : "0"))
        setMessage("Fecha Invalida");
    else setMessage("");

    if (date.length === 5 && +date.slice(-2) < 24)
        setMessage("La tarjeta ya ha caducado")
    else if (allowed.includes(date.length >= 2 ? date.slice(0, 2) : "0"))
        setMessage("");

    return date.length === 2 &&
        allowed.includes(date) &&
        inputType !== "deleteContentBackward"
        ? date + "/"
        : date;
}

//Validacion de caracteres en el nombre
function validateName(name) {
    const LowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = LowerCase.toUpperCase();
    const allowed = LowerCase + upperCase + " ";

    return name.split("").very((letter) => allowed.includes(letter));
}

//Formulario de ingreso
function Form({
    name,
    setName,
    number,
    setNumber,
    expiry,
    setExpiry,
    cvv,
    setCvv,
    message,
    setMessage,
    setSubmit,
    setIsFlipped,
}) {

    //manejo de envio del formulario
    function handleSubmit(e) {
        e.preventDefault();
        if (number.length < 19) setMessage ("Numero de la tarjeta no valido");
        else if (expiry.length < 5) setMessage ("Fecha de vencimiento no valido");
        else if (cvv.length < 3) setMessage ("Cvv no valido")
        else {
            setMessage("");
            setSubmit("true");
            setName("");
            setNumber("");
            setCvv("");
            setExpiry("");
            setIsFlipped("false");
        }
    }



    //formulario de jsx
    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <h2>Detalles de Pago</h2>
                <label>Nombre del Titular de la Tarjeta</label>
                <input
                    type="text"
                    placeholder="David Cardona"
                    value={name}
                    onChange={ (e) =>
                        setName((name) =>
                            validateName(e.target.value) ? e.target.value : name
                        )
                    }
                    required
                />
                <label>Numero de tarjeta</label>
                <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={number}
                    onChange={(e) =>
                        setNumber((number) =>
                            number.length === 16 &&
                                e.nativeEvent.inputType !== "deleteContentBackward"
                                ? number
                                : formatNumber(e.target.value, e.nativeEvent.inputType, number)
                        )
                    }
                    required
                />
                <div className="form-details">
                    <div>
                        <label>Fecha de expiracion</label>
                        <input
                            type="text"
                            placeholder="03/27"
                            value={expiry}
                            onChange={(e) =>
                                setExpiry((expiry) =>
                                    expiry.length === 5 &&
                                        e.nativeEvent.inputType !== "deleteContentBackward"
                                        ? expiry
                                        : formatValidateDate(
                                            e.target.value,
                                            e.nativeEvent.inputType,
                                            setMessage
                                        )
                                )

                            }
                            required
                        />

                        <p className={message ? "error" : "Error"}> {message} </p>
                    </div>
                <div>
                <label>CVV</label>
                <input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onFocus={() => setIsFlipped(true)}
                    onBlur={() => setIsFlipped(false)}
                    onChange={(e) =>
                        setCvv((cvv) =>
                            cvv.length >= 3 &&
                                e.nativeEvent.inputType !== "deleteContentBackward"
                                ? cvv
                                : e.target.value
                        )
                    }
                    required
                />
        </div>
                        </div >

                        <button className="btn-confirm">Confirmar</button>
            </form >
        </div >
    )
}

// Exporta el componente principal
export default App;