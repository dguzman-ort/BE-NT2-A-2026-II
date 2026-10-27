import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { diasDeAlquiler, etiqueta } from '../Reserva/alquiler';
import { getBookings } from '../../services/vehiculos';
import { useFocusEffect } from 'expo-router';

/** @typedef {'activas' | 'pasadas' | 'canceladas'} Pestana */
/** @typedef {'en-curso' | 'proximo'} Fase */

const colors = {
    surface: '#F7F9FB',
    card: '#FFFFFF',
    primary: '#000412',
    primaryContainer: '#0F1E36',
    onPrimary: '#FFFFFF',
    onSurface: '#191C1E',
    onSurfaceVariant: '#44474D',
    surfaceLow: '#F2F4F6',
    surfaceContainer: '#ECEEF0',
    surfaceHigh: '#E6E8EA',
    outline: '#75777E',
    outlineVariant: '#C5C6CE',
    orange: '#FE6B00',
    onOrange: '#FFFFFF',
    secondary: '#A04100',
    error: '#93000A',
    errorContainer: '#FFDAD6',
};

const HORA_MS = 60 * 60 * 1000;

function instante(iso) {
    const valor = new Date(iso).getTime();
    return Number.isNaN(valor) ? null : valor;
}

function formatPrecio(precio) {
    const value = Number(precio);
    if (Number.isNaN(value)) {
        return '$0';
    }
    return `$${value.toLocaleString('en-US')}`;
}

function localizador(id) {
    const limpio = String(id ?? '').replace(/^bkg_/i, '');
    const corto = (limpio || String(id ?? '')).slice(0, 6).toUpperCase();
    return `#${corto}`;
}

function fechaLarga(iso) {
    const marca = instante(iso);
    if (marca === null) {
        return '—';
    }
    const { dia, hora } = etiqueta(marca);
    return `${dia}, ${hora}`;
}

function fechaCorta(iso) {
    const marca = instante(iso);
    if (marca === null) {
        return '—';
    }
    const partes = etiqueta(marca).dia.split(' ');
    return `${partes[1]} ${partes[2]}`;
}

function textoDias(cantidad) {
    return cantidad === 1 ? '1 día' : `${cantidad} días`;
}

function diasDe(reserva) {
    const recogida = instante(reserva.start_date);
    const devolucion = instante(reserva.end_date);
    if (recogida === null || devolucion === null) {
        return null;
    }
    return diasDeAlquiler({ recogida, devolucion });
}

function enCuanto(iso, ahora) {
    const marca = instante(iso);
    if (marca === null) {
        return null;
    }
    const diff = marca - ahora;
    if (diff <= 0) {
        return null;
    }
    const horas = Math.round(diff / HORA_MS);
    if (horas < 1) {
        const minutos = Math.max(1, Math.round(diff / 60000));
        return `En ${minutos} min`;
    }
    if (horas < 48) {
        return `En ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
    }
    const dias = Math.round(horas / 24);
    return `En ${dias} ${dias === 1 ? 'día' : 'días'}`;
}

function etiquetaEstado(status) {
    switch (String(status || '').toLowerCase()) {
        case 'confirmed':
        case 'confirmada':
            return 'Confirmada';
        case 'completed':
        case 'completada':
        case 'finished':
            return 'Completado';
        case 'cancelled':
        case 'canceled':
        case 'cancelada':
            return 'Cancelada';
        case 'pending':
        case 'pendiente':
            return 'Pendiente';
        default:
            return status ? String(status) : 'Reserva';
    }
}

/** @returns {Pestana} */
function clasificar(reserva, ahora) {
    const status = String(reserva.status || '').toLowerCase();
    if (status === 'cancelled' || status === 'canceled' || status === 'cancelada') {
        return 'canceladas';
    }
    const fin = instante(reserva.end_date);
    if (
        status === 'completed' ||
        status === 'completada' ||
        status === 'finished' ||
        (fin !== null && fin < ahora)
    ) {
        return 'pasadas';
    }
    return 'activas';
}

/** @returns {Fase} */
function faseDe(reserva, ahora) {
    const inicio = instante(reserva.start_date);
    const fin = instante(reserva.end_date);
    if (inicio !== null && fin !== null && ahora >= inicio && ahora <= fin) {
        return 'en-curso';
    }
    return 'proximo';
}

function etiquetaFase(fase) {
    switch (fase) {
        case 'en-curso':
            return 'En curso';
        case 'proximo':
            return 'Próximo viaje';
        default: {
            const _nunca = fase;
            throw new Error(_nunca);
        }
    }
}

function agrupar(reservas, ahora) {
    /** @type {object[]} */
    const activas = [];
    /** @type {object[]} */
    const pasadas = [];
    /** @type {object[]} */
    const canceladas = [];

    for (const reserva of reservas) {
        const grupo = clasificar(reserva, ahora);
        switch (grupo) {
            case 'activas':
                activas.push(reserva);
                break;
            case 'pasadas':
                pasadas.push(reserva);
                break;
            case 'canceladas':
                canceladas.push(reserva);
                break;
            default: {
                const _nunca = grupo;
                throw new Error(_nunca);
            }
        }
    }

    activas.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    pasadas.sort((a, b) => new Date(b.end_date) - new Date(a.end_date));
    canceladas.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return { activas, pasadas, canceladas };
}

function textoResumen(activas, pasadas, ahora) {
    const enCurso = activas.filter((reserva) => faseDe(reserva, ahora) === 'en-curso').length;
    const proximas = activas.length - enCurso;
    const partes = [];
    if (enCurso > 0) {
        partes.push(`${enCurso} en curso`);
    }
    if (proximas > 0) {
        partes.push(`${proximas} ${proximas === 1 ? 'próxima' : 'próximas'}`);
    }
    const completadas = pasadas.length;
    partes.push(`${completadas} ${completadas === 1 ? 'completada' : 'completadas'}`);
    return partes.join(' · ');
}

function lugarDeRecogida(reserva) {
    return reserva.lugarRecogida || reserva.location || 'Recogida';
}

function lugarDeDevolucion(reserva) {
    if (reserva.entregarEnLaMismaUbicacion) {
        const lugar = reserva.lugarRecogida || reserva.lugarDevolucion;
        return lugar ? `Misma ubicación (${lugar})` : 'Misma ubicación';
    }
    return reserva.lugarDevolucion || reserva.location || 'Devolución';
}

function detalleRecogida(reserva) {
    if (reserva.location && reserva.location !== reserva.lugarRecogida) {
        return reserva.location;
    }
    return '';
}

function PuntoPulso() {
    const opacidad = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(opacidad, {
                    toValue: 0.35,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(opacidad, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ]),
        );
        loop.start();
        return () => loop.stop();
    }, [opacidad]);

    return <Animated.View style={[styles.puntoPulso, { opacity: opacidad }]} />;
}

function IconoRedondo({ name }) {
    return (
        <View style={styles.iconoRedondo}>
            <MaterialIcons name={name} size={20} color={colors.onSurface} />
        </View>
    );
}

function Vacio({ icon, titulo, detalle }) {
    return (
        <View style={styles.vacio}>
            <View style={styles.vacioIcono}>
                <MaterialIcons name={icon} size={28} color={colors.outline} />
            </View>
            <Text style={styles.vacioTitulo}>{titulo}</Text>
            <Text style={styles.vacioDetalle}>{detalle}</Text>
        </View>
    );
}

function Pestanas({ actual, conteos, onChange }) {
    const items = [
        { id: 'activas', label: 'Activas' },
        { id: 'pasadas', label: 'Pasadas' },
        { id: 'canceladas', label: 'Canceladas' },
    ];

    return (
        <View style={styles.segmento}>
            {items.map((item) => {
                const activo = item.id === actual;
                return (
                    <Pressable
                        key={item.id}
                        style={[styles.pestana, activo && styles.pestanaActiva]}
                        accessibilityRole="tab"
                        accessibilityState={{ selected: activo }}
                        onPress={() => onChange(item.id)}
                    >
                        <Text style={[styles.pestanaTexto, activo && styles.pestanaTextoActivo]} numberOfLines={1}>
                            {item.label}
                        </Text>
                        <View style={[styles.conteo, activo ? styles.conteoActivo : styles.conteoInactivo]}>
                            <Text style={[styles.conteoTexto, activo ? styles.conteoTextoActivo : styles.conteoTextoInactivo]}>
                                {conteos[item.id]}
                            </Text>
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
}

function TarjetaActiva({ reserva, ahora }) {
    const fase = faseDe(reserva, ahora);
    const cuentaAtras = fase === 'proximo' ? enCuanto(reserva.start_date, ahora) : null;
    const dias = diasDe(reserva);
    const detalle = detalleRecogida(reserva);
    const notas = typeof reserva.notas === 'string' ? reserva.notas.trim() : '';

    return (
        <View style={styles.sombraActiva}>
            <View style={styles.tarjeta}>
                <View style={styles.franja}>
                    <View style={[styles.franjaParte, styles.franjaNaranja]} />
                    <View style={[styles.franjaParte, styles.franjaCentro]} />
                    <View style={[styles.franjaParte, styles.franjaNaranja]} />
                </View>
                <View style={styles.cuerpo}>
                    <View style={styles.badges}>
                        <View style={styles.badgesIzquierda}>
                            <View style={styles.badgeProximo}>
                                <PuntoPulso />
                                <Text style={styles.badgeProximoTexto}>{etiquetaFase(fase)}</Text>
                            </View>
                            {cuentaAtras ? (
                                <View style={styles.badgeTiempo}>
                                    <Text style={styles.badgeTiempoTexto}>{cuentaAtras}</Text>
                                </View>
                            ) : null}
                        </View>
                        <View style={styles.localizador}>
                            <Text style={styles.localizadorTexto}>{localizador(reserva.id)}</Text>
                        </View>
                    </View>

                    <View style={styles.vehiculo}>
                        <View style={styles.foto}>
                            <MaterialIcons name="directions-car" size={28} color={colors.primaryContainer} />
                        </View>
                        <View style={styles.vehiculoTexto}>
                            <Text style={styles.vehiculoNombre} numberOfLines={1}>
                                {reserva.vehicle_label || 'Vehículo'}
                            </Text>
                            {reserva.location ? (
                                <Text style={styles.vehiculoLugar} numberOfLines={1}>
                                    {reserva.location}
                                </Text>
                            ) : null}
                        </View>
                    </View>

                    <View style={styles.timeline}>
                        <View style={styles.hito}>
                            <View style={styles.hitoCol}>
                                <View style={[styles.punto, styles.puntoNaranja]}>
                                    <MaterialIcons name="flight-land" size={14} color={colors.onOrange} />
                                </View>
                                <View style={styles.conector} />
                            </View>
                            <View style={styles.hitoTexto}>
                                <View style={styles.hitoFila}>
                                    <Text style={styles.kicker}>Recogida</Text>
                                    <Text style={styles.fechaRecogida} numberOfLines={1}>
                                        {fechaLarga(reserva.start_date)}
                                    </Text>
                                </View>
                                <Text style={styles.lugar} numberOfLines={1}>
                                    {lugarDeRecogida(reserva)}
                                </Text>
                                {detalle ? (
                                    <Text style={styles.detalle} numberOfLines={1}>
                                        {detalle}
                                    </Text>
                                ) : null}
                            </View>
                        </View>
                        <View style={styles.hito}>
                            <View style={[styles.punto, styles.puntoNavy]}>
                                <MaterialIcons name="flight-takeoff" size={14} color={colors.onPrimary} />
                            </View>
                            <View style={styles.hitoTexto}>
                                <View style={styles.hitoFila}>
                                    <Text style={styles.kicker}>Devolución</Text>
                                    <Text style={styles.fechaDevolucion} numberOfLines={1}>
                                        {fechaLarga(reserva.end_date)}
                                    </Text>
                                </View>
                                <Text style={styles.lugar} numberOfLines={1}>
                                    {lugarDeDevolucion(reserva)}
                                </Text>
                                {dias !== null ? (
                                    <Text style={styles.detalle}>Duración: {textoDias(dias)}</Text>
                                ) : null}
                            </View>
                        </View>
                        {notas ? <Text style={styles.notas}>{notas}</Text> : null}
                    </View>

                    <View style={styles.precioFila}>
                        <View style={styles.precioIzquierda}>
                            <MaterialIcons name="verified" size={18} color={colors.secondary} />
                            <Text style={styles.precioTotal} numberOfLines={1}>
                                {formatPrecio(reserva.total_price)} {reserva.currency || 'USD'}
                            </Text>
                            <View style={styles.chipEstado}>
                                <Text style={styles.chipEstadoTexto}>{etiquetaEstado(reserva.status)}</Text>
                            </View>
                        </View>
                        {reserva.price_per_day != null ? (
                            <Text style={styles.precioDia}>{formatPrecio(reserva.price_per_day)}/día</Text>
                        ) : null}
                    </View>

                    <View style={styles.acciones}>
                        <View style={[styles.boton, styles.botonNaranja]}>
                            <MaterialIcons name="qr-code-2" size={20} color={colors.onOrange} />
                            <Text style={styles.botonClaroTexto}>Llave digital</Text>
                        </View>
                        <View style={[styles.boton, styles.botonSuave]}>
                            <MaterialIcons name="receipt-long" size={18} color={colors.onSurface} />
                            <Text style={styles.botonOscuroTexto}>Detalles</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.pie}>
                    <View style={styles.enlace}>
                        <MaterialIcons name="navigation" size={16} color={colors.orange} />
                        <Text style={styles.enlaceTexto} numberOfLines={1}>
                            Cómo llegar
                        </Text>
                    </View>
                    <View style={styles.enlace}>
                        <MaterialIcons name="edit-calendar" size={16} color={colors.onSurfaceVariant} />
                        <Text style={styles.enlaceTexto} numberOfLines={1}>
                            Modificar fechas
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

function TarjetaHistorial({ reserva, variante }) {
    const dias = diasDe(reserva);
    const cancelada = variante === 'cancelada';
    const lugar = reserva.location || reserva.lugarRecogida || '';
    const rango = dias === null
        ? `${fechaCorta(reserva.start_date)} - ${fechaCorta(reserva.end_date)}`
        : `${fechaCorta(reserva.start_date)} - ${fechaCorta(reserva.end_date)} (${textoDias(dias)})`;

    return (
        <View style={styles.sombraHistorial}>
            <View style={styles.tarjetaHistorial}>
                <View style={styles.historialTope}>
                    <View style={styles.historialIdentidad}>
                        <View style={styles.fotoChica}>
                            <MaterialIcons name="directions-car" size={22} color={colors.primaryContainer} />
                        </View>
                        <View style={styles.historialTexto}>
                            <Text style={styles.historialNombre} numberOfLines={1}>
                                {reserva.vehicle_label || 'Vehículo'}
                            </Text>
                            {lugar ? (
                                <Text style={styles.historialLugar} numberOfLines={1}>
                                    {lugar}
                                </Text>
                            ) : null}
                        </View>
                    </View>
                    <View style={[styles.badgeCompletado, cancelada && styles.badgeCancelada]}>
                        <MaterialIcons
                            name={cancelada ? 'event-busy' : 'check-circle'}
                            size={13}
                            color={cancelada ? colors.error : colors.onSurfaceVariant}
                        />
                        <Text style={[styles.badgeCompletadoTexto, cancelada && styles.badgeCanceladaTexto]}>
                            {cancelada ? 'Cancelada' : 'Completado'}
                        </Text>
                    </View>
                </View>

                <View style={styles.agenda}>
                    <View style={styles.agendaIzquierda}>
                        <MaterialIcons name="calendar-month" size={18} color={colors.onSurfaceVariant} />
                        <View style={styles.agendaTexto}>
                            <Text style={styles.agendaRango} numberOfLines={1}>
                                {rango}
                            </Text>
                            <Text style={styles.agendaRef} numberOfLines={1}>
                                Reserva {localizador(reserva.id)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.agendaPrecio}>
                        <Text style={styles.precioGrande}>{formatPrecio(reserva.total_price)}</Text>
                        <Text style={styles.moneda}>{reserva.currency || 'USD'}</Text>
                    </View>
                </View>

                {cancelada ? null : (
                    <View style={styles.accionesHistorial}>
                        <View style={styles.enlace}>
                            <MaterialIcons name="download" size={16} color={colors.onSurfaceVariant} />
                            <Text style={styles.enlaceTexto}>Descargar factura</Text>
                        </View>
                        <View style={styles.botonReplay}>
                            <MaterialIcons name="replay" size={15} color={colors.orange} />
                            <Text style={styles.botonReplayTexto}>Rentar de nuevo</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

function Historial({ reservas }) {
    const viajes = reservas.length === 1 ? '1 viaje' : `${reservas.length} viajes`;

    return (
        <View style={styles.historial}>
            <View style={styles.historialCabeza}>
                <Text style={styles.historialTitulo}>Historial reciente</Text>
                <View style={styles.chipConteo}>
                    <Text style={styles.chipConteoTexto}>{viajes}</Text>
                </View>
            </View>
            {reservas.map((reserva) => (
                <TarjetaHistorial key={reserva.id} reserva={reserva} variante="completada" />
            ))}
        </View>
    );
}

function Contenido({ pestana, grupos, ahora }) {
    switch (pestana) {
        case 'activas':
            return (
                <View style={styles.seccion}>
                    {grupos.activas.length === 0 ? (
                        <Vacio
                            icon="calendar-today"
                            titulo="No tienes reservas activas"
                            detalle="Cuando confirmes un vehículo, va a aparecer acá."
                        />
                    ) : (
                        grupos.activas.map((reserva) => (
                            <TarjetaActiva key={reserva.id} reserva={reserva} ahora={ahora} />
                        ))
                    )}
                    {grupos.pasadas.length > 0 ? <Historial reservas={grupos.pasadas} /> : null}
                </View>
            );
        case 'pasadas':
            return grupos.pasadas.length === 0 ? (
                <Vacio
                    icon="history"
                    titulo="Todavía no hay viajes anteriores"
                    detalle="Cuando termine una reserva, va a quedar en tu historial."
                />
            ) : (
                <Historial reservas={grupos.pasadas} />
            );
        case 'canceladas':
            return grupos.canceladas.length === 0 ? (
                <Vacio
                    icon="event-busy"
                    titulo="No tienes cancelaciones"
                    detalle="Tus viajes planificados siguen su curso regular sin modificaciones."
                />
            ) : (
                <View style={styles.seccion}>
                    {grupos.canceladas.map((reserva) => (
                        <TarjetaHistorial key={reserva.id} reserva={reserva} variante="cancelada" />
                    ))}
                </View>
            );
        default: {
            const _nunca = pestana;
            throw new Error(_nunca);
        }
    }
}

const Reservas = () => {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    /** @type {[Pestana, function]} */
    const [pestana, setPestana] = useState('activas');
    const scrollRef = useRef(null);

    useFocusEffect(useCallback(() => {
        let vivo = true;
        getBookings()
            .then((respuesta) => {
                if (!vivo) {
                    return;
                }
                setReservas(Array.isArray(respuesta?.data) ? respuesta.data : []);
            })
            .catch(() => {
                if (vivo) {
                    setError(true);
                }
            })
            .finally(() => {
                if (vivo) {
                    setCargando(false);
                }
            });
        return () => {
            vivo = false;
        };
    }, []));

    const ahora = useMemo(() => Date.now(), [reservas]);
    const grupos = useMemo(() => agrupar(reservas, ahora), [reservas, ahora]);

    function cambiarPestana(siguiente) {
        setPestana(siguiente);
        scrollRef.current?.scrollTo({ y: 0, animated: true });
    }

    return (
        <ScrollView
            ref={scrollRef}
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.encabezado}>
                <View style={styles.encabezadoTexto}>
                    <Text style={styles.titulo}>Mis Reservas</Text>
                    <View style={styles.resumenFila}>
                        <View style={[styles.resumenPunto, grupos.activas.length === 0 && styles.resumenPuntoVacio]} />
                        <Text style={styles.resumen}>
                            {cargando ? 'Cargando reservas' : textoResumen(grupos.activas, grupos.pasadas, ahora)}
                        </Text>
                    </View>
                </View>
                <View style={styles.encabezadoAcciones}>
                    <IconoRedondo name="tune" />
                    <IconoRedondo name="help-outline" />
                </View>
            </View>

            <Pestanas
                actual={pestana}
                conteos={{
                    activas: grupos.activas.length,
                    pasadas: grupos.pasadas.length,
                    canceladas: grupos.canceladas.length,
                }}
                onChange={cambiarPestana}
            />

            {cargando ? (
                <View style={styles.estado}>
                    <ActivityIndicator color={colors.primaryContainer} />
                </View>
            ) : null}

            {error ? (
                <Vacio
                    icon="cloud-off"
                    titulo="No se pudieron cargar las reservas"
                    detalle="Revisá la conexión e intentá de nuevo."
                />
            ) : null}

            {!cargando && !error ? (
                <Contenido pestana={pestana} grupos={grupos} ahora={ahora} />
            ) : null}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 28,
        gap: 20,
    },
    encabezado: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    encabezadoTexto: {
        flex: 1,
    },
    titulo: {
        fontSize: 26,
        lineHeight: 34,
        fontWeight: '700',
        letterSpacing: -0.5,
        color: colors.primary,
    },
    resumenFila: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 2,
    },
    resumenPunto: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.orange,
    },
    resumenPuntoVacio: {
        backgroundColor: colors.outlineVariant,
    },
    resumen: {
        flexShrink: 1,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        letterSpacing: 0.2,
        color: colors.onSurfaceVariant,
    },
    encabezadoAcciones: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconoRedondo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.card,
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    segmento: {
        flexDirection: 'row',
        gap: 4,
        padding: 4,
        borderRadius: 999,
        backgroundColor: colors.surfaceLow,
    },
    pestana: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 999,
    },
    pestanaActiva: {
        backgroundColor: colors.primaryContainer,
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 3,
        elevation: 2,
    },
    pestanaTexto: {
        flexShrink: 1,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        letterSpacing: 0.2,
        color: colors.onSurfaceVariant,
    },
    pestanaTextoActivo: {
        color: colors.onPrimary,
    },
    conteo: {
        minWidth: 20,
        height: 20,
        paddingHorizontal: 4,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    conteoActivo: {
        backgroundColor: colors.orange,
    },
    conteoInactivo: {
        backgroundColor: colors.surfaceHigh,
    },
    conteoTexto: {
        fontSize: 11,
        lineHeight: 14,
        fontWeight: '700',
    },
    conteoTextoActivo: {
        color: colors.onOrange,
    },
    conteoTextoInactivo: {
        color: colors.onSurfaceVariant,
    },
    estado: {
        paddingVertical: 48,
        alignItems: 'center',
    },
    seccion: {
        gap: 16,
    },
    sombraActiva: {
        borderRadius: 16,
        backgroundColor: colors.card,
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 3,
    },
    tarjeta: {
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: colors.card,
    },
    franja: {
        flexDirection: 'row',
        height: 6,
    },
    franjaParte: {
        flex: 1,
    },
    franjaCentro: {
        flex: 2,
        backgroundColor: colors.primaryContainer,
    },
    franjaNaranja: {
        backgroundColor: colors.orange,
    },
    cuerpo: {
        padding: 16,
        paddingTop: 12,
        gap: 12,
    },
    badges: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    badgesIzquierda: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
    },
    badgeProximo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: 'rgba(254, 107, 0, 0.10)',
    },
    puntoPulso: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.orange,
    },
    badgeProximoTexto: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        color: colors.orange,
    },
    badgeTiempo: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 999,
        backgroundColor: colors.surfaceContainer,
    },
    badgeTiempoTexto: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        color: colors.onSurfaceVariant,
    },
    localizador: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: colors.surfaceLow,
    },
    localizadorTexto: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        letterSpacing: 0.4,
        color: colors.onSurfaceVariant,
    },
    vehiculo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        borderRadius: 12,
        backgroundColor: 'rgba(242, 244, 246, 0.7)',
    },
    foto: {
        width: 96,
        height: 64,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surfaceContainer,
    },
    vehiculoTexto: {
        flex: 1,
        minWidth: 0,
    },
    vehiculoNombre: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600',
        color: colors.primary,
    },
    vehiculoLugar: {
        marginTop: 2,
        fontSize: 12,
        lineHeight: 16,
        color: colors.onSurfaceVariant,
    },
    timeline: {
        gap: 4,
        padding: 12,
        borderRadius: 12,
        backgroundColor: 'rgba(242, 244, 246, 0.45)',
    },
    hito: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    hitoCol: {
        width: 24,
        alignItems: 'center',
    },
    punto: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    puntoNaranja: {
        backgroundColor: colors.orange,
    },
    puntoNavy: {
        backgroundColor: colors.primaryContainer,
    },
    conector: {
        width: 2,
        height: 28,
        marginVertical: 2,
        backgroundColor: 'rgba(197, 198, 206, 0.8)',
    },
    hitoTexto: {
        flex: 1,
        minWidth: 0,
        paddingBottom: 8,
    },
    hitoFila: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    kicker: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        color: colors.onSurfaceVariant,
    },
    fechaRecogida: {
        flexShrink: 1,
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        color: colors.secondary,
        textAlign: 'right',
    },
    fechaDevolucion: {
        flexShrink: 1,
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '600',
        color: colors.onSurface,
        textAlign: 'right',
    },
    lugar: {
        marginTop: 2,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600',
        color: colors.onSurface,
    },
    detalle: {
        fontSize: 12,
        lineHeight: 16,
        color: colors.onSurfaceVariant,
    },
    notas: {
        fontSize: 12,
        lineHeight: 16,
        color: colors.onSurfaceVariant,
    },
    precioFila: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        paddingHorizontal: 4,
    },
    precioIzquierda: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 6,
    },
    precioTotal: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        letterSpacing: 0.2,
        color: colors.onSurface,
    },
    chipEstado: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        backgroundColor: colors.surfaceContainer,
    },
    chipEstadoTexto: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        color: colors.onSurfaceVariant,
    },
    precioDia: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '600',
        color: colors.onSurfaceVariant,
    },
    acciones: {
        flexDirection: 'row',
        gap: 8,
    },
    boton: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    botonNaranja: {
        backgroundColor: colors.orange,
        shadowColor: '#FE6B00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 3,
    },
    botonSuave: {
        backgroundColor: colors.surfaceContainer,
    },
    botonClaroTexto: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600',
        color: colors.onOrange,
    },
    botonOscuroTexto: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600',
        color: colors.onSurface,
    },
    pie: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'rgba(242, 244, 246, 0.7)',
    },
    enlace: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        flexShrink: 1,
    },
    enlaceTexto: {
        flexShrink: 1,
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '600',
        color: colors.onSurfaceVariant,
    },
    historial: {
        gap: 12,
    },
    historialCabeza: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingTop: 4,
    },
    historialTitulo: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600',
        color: colors.primary,
    },
    chipConteo: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 999,
        backgroundColor: colors.surfaceContainer,
    },
    chipConteoTexto: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        color: colors.onSurfaceVariant,
    },
    sombraHistorial: {
        borderRadius: 16,
        backgroundColor: colors.card,
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 2,
    },
    tarjetaHistorial: {
        gap: 12,
        padding: 16,
        borderRadius: 16,
        backgroundColor: colors.card,
    },
    historialTope: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 8,
    },
    historialIdentidad: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    fotoChica: {
        width: 56,
        height: 56,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surfaceContainer,
    },
    historialTexto: {
        flex: 1,
        minWidth: 0,
    },
    historialNombre: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
        color: colors.primary,
    },
    historialLugar: {
        fontSize: 12,
        lineHeight: 16,
        color: colors.onSurfaceVariant,
    },
    badgeCompletado: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: colors.surfaceLow,
    },
    badgeCompletadoTexto: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        color: colors.onSurfaceVariant,
    },
    badgeCancelada: {
        backgroundColor: colors.errorContainer,
    },
    badgeCanceladaTexto: {
        color: colors.error,
    },
    agenda: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: colors.surfaceLow,
    },
    agendaIzquierda: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    agendaTexto: {
        flex: 1,
        minWidth: 0,
    },
    agendaRango: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        letterSpacing: 0.2,
        color: colors.onSurface,
    },
    agendaRef: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '600',
        color: colors.onSurfaceVariant,
    },
    agendaPrecio: {
        alignItems: 'flex-end',
    },
    precioGrande: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600',
        color: colors.primary,
    },
    moneda: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '600',
        color: colors.onSurfaceVariant,
    },
    accionesHistorial: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    botonReplay: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: colors.primaryContainer,
    },
    botonReplayTexto: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        color: colors.onPrimary,
    },
    vacio: {
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 32,
        borderRadius: 16,
        backgroundColor: colors.card,
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    vacioIcono: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        backgroundColor: colors.surfaceLow,
    },
    vacioTitulo: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600',
        color: colors.primary,
        textAlign: 'center',
    },
    vacioDetalle: {
        marginTop: 4,
        fontSize: 14,
        lineHeight: 20,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
    },
});

export default Reservas;
