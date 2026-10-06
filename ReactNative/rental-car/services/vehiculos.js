const MAX_VEHICULOS = 5;

const marcas = [
    {
        nombre: 'Toyota',
        modelos: [
            { nombre: 'Corolla', plazas: 5, autonomiaKm: 700, transmision: 'Automático', categoria: 'medio', imagen: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80' },
            { nombre: 'Yaris', plazas: 5, autonomiaKm: 550, transmision: 'Manual', categoria: 'economico', imagen: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80' },
            { nombre: 'RAV4', plazas: 5, autonomiaKm: 800, transmision: 'Automático', categoria: 'suv', imagen: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80' },
            { nombre: 'Highlander', plazas: 7, autonomiaKm: 750, transmision: 'Automático', categoria: 'suv', imagen: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80' },
            { nombre: 'Land Cruiser', plazas: 7, autonomiaKm: 650, transmision: 'Automático', categoria: 'suv', imagen: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80' },
        ],
    },
    {
        nombre: 'Ford',
        modelos: [
            { nombre: 'F150', plazas: 5, autonomiaKm: 700, transmision: 'Automático', categoria: 'pickup', imagen: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80' },
            { nombre: 'Mustang', plazas: 4, autonomiaKm: 450, transmision: 'Automático', categoria: 'deportivo', imagen: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80' },
            { nombre: 'Explorer', plazas: 7, autonomiaKm: 680, transmision: 'Automático', categoria: 'suv', imagen: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80' },
            { nombre: 'Focus', plazas: 5, autonomiaKm: 600, transmision: 'Manual', categoria: 'economico', imagen: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80' },
            { nombre: 'Taurus', plazas: 5, autonomiaKm: 620, transmision: 'Automático', categoria: 'medio', imagen: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80' },
        ],
    },
    {
        nombre: 'Chevrolet',
        modelos: [
            { nombre: 'Camaro', plazas: 4, autonomiaKm: 420, transmision: 'Automático', categoria: 'deportivo', imagen: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80' },
            { nombre: 'Corvette', plazas: 2, autonomiaKm: 380, transmision: 'Automático', categoria: 'deportivo', imagen: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80' },
            { nombre: 'Silverado', plazas: 5, autonomiaKm: 680, transmision: 'Automático', categoria: 'pickup', imagen: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80' },
            { nombre: 'Equinox', plazas: 5, autonomiaKm: 640, transmision: 'Automático', categoria: 'suv', imagen: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80' },
            { nombre: 'Traverse', plazas: 7, autonomiaKm: 700, transmision: 'Automático', categoria: 'suv', imagen: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80' },
        ],
    },
    {
        nombre: 'Honda',
        modelos: [
            { nombre: 'Civic', plazas: 5, autonomiaKm: 620, transmision: 'Automático', categoria: 'medio', imagen: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80' },
            { nombre: 'Accord', plazas: 5, autonomiaKm: 680, transmision: 'Automático', categoria: 'medio', imagen: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80' },
            { nombre: 'CR-V', plazas: 5, autonomiaKm: 720, transmision: 'Automático', categoria: 'suv', imagen: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80' },
            { nombre: 'Odyssey', plazas: 7, autonomiaKm: 600, transmision: 'Automático', categoria: 'camioneta', imagen: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80' },
            { nombre: 'Pilot', plazas: 7, autonomiaKm: 650, transmision: 'Automático', categoria: 'suv', imagen: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80' },
        ],
    },
    {
        nombre: 'Tesla',
        modelos: [
            { nombre: 'Model 3', plazas: 5, autonomiaKm: 513, transmision: 'Automático', categoria: 'deportivo', imagen: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80' },
            { nombre: 'Model Y', plazas: 5, autonomiaKm: 533, transmision: 'Automático', categoria: 'suv', imagen: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80' },
        ],
    },
]

const rentalCompanies = [
    {
        ciudad: 'Buenos Aires, Argentina',
        latitud: -34.603722,
        longitud: -58.381592,
        casa_rental: 'Sixt'
    },
    {
        ciudad: 'Córdoba, Argentina',
        latitud: -31.420083,
        longitud: -64.188776,
        casa_rental: 'Avis'
    },
    {
        ciudad: 'Rosario, Argentina',
        latitud: -32.946819,
        longitud: -60.639320,
        casa_rental: 'Budget'
    },
    {
        ciudad: 'Mendoza, Argentina',
        latitud: -32.889458,
        longitud: -68.845839,
        casa_rental: 'Europcar'
    },
    {
        ciudad: 'San Carlos de Bariloche, Argentina',
        latitud: -41.133472,
        longitud: -71.310278,
        casa_rental: 'Localiza'
    },
    {
        ciudad: 'Mar del Plata, Argentina',
        latitud: -38.005477,
        longitud: -57.542611,
        casa_rental: 'Alamo'
    },
    {
        ciudad: 'Salta, Argentina',
        latitud: -24.785901,
        longitud: -65.411659,
        casa_rental: 'Hertz'
    },
    {
        ciudad: 'Ushuaia, Argentina',
        latitud: -54.801912,
        longitud: -68.302951,
        casa_rental: 'Europcar'
    },
    {
        ciudad: 'Neuquén, Argentina',
        latitud: -38.951611,
        longitud: -68.059097,
        casa_rental: 'Hertz'
    },
    {
        ciudad: 'San Miguel de Tucumán, Argentina',
        latitud: -26.808285,
        longitud: -65.217590,
        casa_rental: 'Avis'
    }
]


const colores = [
    { nombre: 'Blanco Perla', hex: '#F4F1EA' },
    { nombre: 'Negro', hex: '#1C1C1C' },
    { nombre: 'Gris Plata', hex: '#C5C6C8' },
    { nombre: 'Rojo', hex: '#C0392B' },
    { nombre: 'Azul', hex: '#1F4E79' },
    { nombre: 'Verde', hex: '#1E6B45' },
    { nombre: 'Amarillo', hex: '#F1C40F' },
]

const anios = [2022, 2023, 2024, 2025]
const tarifas = ['flexible', 'fija']

const crearVehiculo = (index) => {
    const marca = marcas[index % marcas.length]
    const modelo = marca.modelos[index % marca.modelos.length]
    const rentalCompany = rentalCompanies[index % rentalCompanies.length]
    return {
        id: index + 1,
        marca: marca.nombre,
        modelo: modelo.nombre,
        anio: anios[index % anios.length],
        imagen: modelo.imagen,
        rentalCompany: rentalCompany.casa_rental,
        ciudad: rentalCompany.ciudad,
        latitud: rentalCompany.latitud,
        longitud: rentalCompany.longitud,
        color: colores[index % colores.length],
        categoria: modelo.categoria,
        transmision: modelo.transmision,
        plazas: modelo.plazas,
        autonomiaKm: modelo.autonomiaKm,
        precio: (Math.floor(Math.random() * 16) + 5) * 100,
        tarifa: tarifas[index % tarifas.length],
        disponible: Math.random() < 0.5,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
}

const vehiculos = Array.from({ length: MAX_VEHICULOS }, (_, index) => crearVehiculo(index))
//console.log(vehiculos)

const getVehiculos = () => {
    // TODO: Implementar la logica para obtener los vehiculos desde una API.
    // Por ahora, devolvemos los vehiculos hardcodeados.
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(vehiculos)
        }, 1000)
    })
}

export { getVehiculos }