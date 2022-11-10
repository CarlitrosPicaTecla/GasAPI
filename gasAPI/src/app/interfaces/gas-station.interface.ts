export interface GasStation {
    cp: string;
    Direccion: string;
    Horario: string;
    Latitud: string;
    Localidad: string;
    'Longitud (WGS84)': string;
    Margen: string;
    Municipio: string;
    preciobiodiesel: string;
    preciobioetanol: string;
    preciogasnaturalComprimido: string;
    preciogasnaturallicuado: string;
    preciogaseslicuadosdelpetróleo: string;
    preciogasoleoA: string;
    preciogasoleoB: string;
    preciogasoleopremium: string;
    preciogasolina95E10: string;
    preciogasolina95e5: string;
    preciogasolina95e5premium: string;
    precioGasolina98E10: string;
    preciogasolina98e5: string;
    preciohidrogeno: string;
    Provincia: string;
    Remisión: string;
    Rotulo: string;
    tipoventa: string;
    '% BioEtanol': string;
    '% Éster metílico': string;
    'IDEESS': string;
    IDMunicipio: string;
    IDProvincia: string;
    IDCCAA: string;
}

export interface GasStationResponse{
    Fecha : string;
    ListaEESSPrecio: GasStation[];
    Nota : string;
    ResultadoConsola: string;
}