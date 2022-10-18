

interface Checkin {
   data: [{
    id: string,
    hrEntrada: string,
    hrSaida: string,
    isParking: boolean,
    emailFuncionario: string,
    valorFinal: number
    car: {
        placa: string,
        modelo: string,
        cor: string
    }
    }]
    status: number
}

export default Checkin
