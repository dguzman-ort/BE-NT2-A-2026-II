import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const colors = {
    surface: '#F7F9FB',
    white: '#FFFFFF',
    primary: '#000412',
    primaryContainer: '#0F1E36',
    onSurface: '#191C1E',
    onSurfaceVariant: '#44474D',
    surfaceLow: '#F2F4F6',
    surfaceHigh: '#E6E8EA',
    outlineVariant: '#C5C6CE',
    secondary: '#A04100',
    secondaryContainer: '#FE6B00',
    onSecondary: '#FFFFFF',
    secondaryFixed: '#FFDBCC',
    onSecondaryFixed: '#351000',
    onTertiaryContainer: '#0090C2',
    banner: 'rgba(0, 144, 194, 0.10)',
    primaryFixedDim: '#B8C7E6',
};

const FALLBACK_IMAGE =
    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80';

function formatPrecio(precio) {
    const value = Number(precio);
    if (Number.isNaN(value)) {
        return '$0';
    }
    return `$${value.toLocaleString('en-US')}`;
}

function motorDe(marca) {
    return marca === 'Tesla' ? 'Eléctrico' : 'Combustión';
}

function SeccionTitulo({ icon, titulo, trailing }) {
    return (
        <View style={styles.seccionHeader}>
            <View style={styles.seccionTituloRow}>
                {icon ? (
                    <MaterialIcons name={icon} size={20} color={colors.secondary} />
                ) : null}
                <Text style={styles.seccionTitulo}>{titulo}</Text>
            </View>
            {trailing}
        </View>
    );
}

function Spec({ icon, label, value }) {
    return (
        <View style={styles.spec}>
            <MaterialIcons name={icon} size={18} color={colors.primaryContainer} />
            <View style={styles.specText}>
                <Text style={styles.specLabel}>{label}</Text>
                <Text style={styles.specValue} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.75}>
                    {value}
                </Text>
            </View>
        </View>
    );
}

function ProteccionOpcion({ titulo, precio, detalle, seleccionada, recomendada }) {
    return (
        <View style={[styles.opcion, seleccionada && styles.opcionSeleccionada]}>
            {recomendada ? (
                <View style={styles.recomendada}>
                    <Text style={styles.recomendadaText}>Recomendada</Text>
                </View>
            ) : null}
            <View style={[styles.radio, seleccionada && styles.radioSeleccionada]}>
                {seleccionada ? <View style={styles.radioPunto} /> : null}
            </View>
            <View style={styles.opcionBody}>
                <View style={styles.opcionTopline}>
                    <Text style={[styles.opcionTitulo, seleccionada && styles.opcionTituloOn]}>
                        {titulo}
                    </Text>
                    <Text style={[styles.opcionPrecio, seleccionada && styles.opcionPrecioOn]}>
                        {precio}
                    </Text>
                </View>
                <Text style={[styles.opcionDetalle, seleccionada && styles.opcionDetalleOn]}>
                    {detalle}
                </Text>
            </View>
        </View>
    );
}

function FilaPago({ label, value }) {
    return (
        <View style={styles.fila}>
            <Text style={styles.filaLabel}>{label}</Text>
            <Text style={styles.filaValor}>{value}</Text>
        </View>
    );
}

const Reserva = ({ vehiculo }) => {
    const marca = vehiculo?.marca ?? 'Tesla';
    const modelo = vehiculo?.modelo ?? 'Model 3';
    const anio = vehiculo?.anio ?? 2024;
    const rental = vehiculo?.rentalCompany ?? 'Veloce Premier';
    const colorHex = vehiculo?.color?.hex ?? '#F4F1EA';
    const colorNombre = vehiculo?.color?.nombre || 'Blanco Perla Multicapa';
    const plazas = vehiculo?.plazas ?? 5;
    const transmision = vehiculo?.transmision ?? 'Automático';
    const imagen = vehiculo?.imagen ?? FALLBACK_IMAGE;
    const precio = vehiculo?.precio ?? 1000;
    const disponible = vehiculo ? Boolean(vehiculo.disponible) : true;
    const ciudad = vehiculo?.ciudad?.split(',')[0] ?? 'Madrid';

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <View style={styles.headerIdentity}>
                    <View style={styles.iconButton}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.onSurface} />
                    </View>
                    <View>
                        <Text style={styles.headerTitle}>Reservar Vehículo</Text>
                        <Text style={styles.headerSubtitle}>Paso de confirmación</Text>
                    </View>
                </View>
                <View style={styles.iconButton}>
                    <MaterialIcons name="help-outline" size={22} color={colors.onSurfaceVariant} />
                </View>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.banner}>
                    <View style={styles.liveDotWrap}>
                        <View style={styles.liveDotHalo} />
                        <View style={styles.liveDot} />
                    </View>
                    <Text style={styles.bannerText} numberOfLines={1}>
                        Vehículo de alta demanda en {ciudad} · Reservado 3 veces hoy
                    </Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.heroTop}>
                        <View style={styles.heroIdentity}>
                            <View style={styles.brandRow}>
                                <Text style={styles.brand}>{rental}</Text>
                                <View style={styles.brandDot} />
                                <Text style={styles.brand}>{anio}</Text>
                            </View>
                            <Text style={styles.model} numberOfLines={2}>
                                {marca} {modelo}
                            </Text>
                            <View style={styles.colorRow}>
                                <View style={[styles.colorDot, { backgroundColor: colorHex }]} />
                                <Text style={styles.colorName} numberOfLines={1}>
                                    {colorNombre}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.heroPrice}>
                            <View style={styles.available}>
                                {disponible ? (
                                    <MaterialIcons name="bolt" size={13} color={colors.secondaryContainer} />
                                ) : null}
                                <Text style={styles.availableText}>
                                    {disponible ? 'Disponible ahora' : 'No disponible'}
                                </Text>
                            </View>
                            <View style={styles.priceRow}>
                                <Text style={styles.price}>{formatPrecio(precio)}</Text>
                                <Text style={styles.perDay}>/día</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.imageWrap}>
                        <Image
                            source={{ uri: imagen }}
                            style={styles.image}
                            resizeMode="cover"
                            accessibilityLabel={`${marca} ${modelo}`}
                        />
                    </View>

                    <View style={styles.specs}>
                        <Spec icon="electric-bolt" label="Motor" value={motorDe(marca)} />
                        <Spec icon="airline-seat-recline-normal" label="Plazas" value={`${plazas} Adultos`} />
                        <Spec icon="speed" label="Caja" value={transmision} />
                    </View>
                </View>

                <View style={styles.card}>
                    <SeccionTitulo
                        icon="calendar-month"
                        titulo="Fechas del alquiler"
                        trailing={
                            <View style={styles.diasBadge}>
                                <MaterialIcons name="timelapse" size={14} color={colors.onSecondaryFixed} />
                                <Text style={styles.diasText}>3 días</Text>
                            </View>
                        }
                    />
                    <View style={styles.fechas}>
                        <View style={styles.fecha}>
                            <Text style={styles.fechaLabel}>Recogida</Text>
                            <Text style={styles.fechaDia}>Lun 14 Oct</Text>
                            <Text style={styles.fechaHora}>10:00 AM</Text>
                        </View>
                        <View style={styles.fecha}>
                            <Text style={styles.fechaLabel}>Devolución</Text>
                            <Text style={styles.fechaDia}>Jue 17 Oct</Text>
                            <Text style={styles.fechaHora}>10:00 AM</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <SeccionTitulo icon="place" titulo="Ubicación" />
                    <View style={styles.field}>
                        <Text style={styles.fieldLabel}>Lugar de recogida</Text>
                        <View style={styles.lugar}>
                            <MaterialIcons name="flight-takeoff" size={20} color={colors.primary} />
                            <View style={styles.lugarText}>
                                <Text style={styles.lugarTitulo} numberOfLines={1}>
                                    Aeropuerto Adolfo Suárez Madrid-Barajas
                                </Text>
                                <Text style={styles.lugarDetalle} numberOfLines={1}>
                                    Terminal T4 · Parking VIP Sala Veloce
                                </Text>
                            </View>
                            <MaterialIcons name="expand-more" size={20} color={colors.outlineVariant} />
                        </View>
                    </View>
                    <View style={styles.toggleRow}>
                        <View style={styles.toggleLabel}>
                            <MaterialIcons name="sync-alt" size={20} color={colors.onSurfaceVariant} />
                            <Text style={styles.toggleText}>Entregar en la misma ubicación</Text>
                        </View>
                        <View style={styles.switchTrack}>
                            <View style={styles.switchThumb} />
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <SeccionTitulo
                        icon="security"
                        titulo="Opciones de Protección"
                        trailing={<Text style={styles.garantia}>Garantía Veloce</Text>}
                    />
                    <View style={styles.opciones}>
                        <ProteccionOpcion
                            titulo="Protección Básica"
                            precio="Incluida"
                            detalle="Deducible estándar de $1,500 en daños de colisión y robo."
                        />
                        <ProteccionOpcion
                            titulo="Cobertura Completa"
                            precio="+$45 / día"
                            detalle="Deducible $0, protección total para cristales, neumáticos y asistencia en carretera 24/7 sin esperas."
                            seleccionada
                            recomendada
                        />
                        <ProteccionOpcion
                            titulo="Protección Confort"
                            precio="+$75 / día"
                            detalle="Todo lo anterior + conductor adicional gratuito y seguro total de equipaje hasta $2,000."
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <SeccionTitulo
                        titulo="Desglose de Pago"
                        trailing={<Text style={styles.impuestos}>Impuestos incluidos</Text>}
                    />
                    <View style={styles.filas}>
                        <FilaPago label="Tarifa base (3 días × $1,000)" value="$3,000" />
                        <FilaPago label="Cobertura Completa (3 días × $45)" value="$135" />
                        <FilaPago label="Tasas de aeropuerto y gestión" value="$65" />
                        <View style={styles.deposito}>
                            <View style={styles.depositoInfo}>
                                <MaterialIcons name="info" size={16} color={colors.onSurfaceVariant} />
                                <Text style={styles.depositoLabel}>Depósito de garantía</Text>
                                <View style={styles.reembolsable}>
                                    <Text style={styles.reembolsableText}>Reembolsable</Text>
                                </View>
                            </View>
                            <Text style={styles.filaValor}>$300</Text>
                        </View>
                    </View>
                    <View style={styles.totalRow}>
                        <View>
                            <Text style={styles.totalLabel}>Monto Final</Text>
                            <Text style={styles.totalValor}>$3,200</Text>
                        </View>
                        <View style={styles.sinCargos}>
                            <MaterialIcons name="verified-user" size={15} color={colors.secondary} />
                            <Text style={styles.sinCargosText}>Sin cargos ocultos</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.assurance}>
                    <MaterialIcons name="event-available" size={22} color={colors.secondary} />
                    <Text style={styles.assuranceText}>
                        <Text style={styles.assuranceStrong}>Cancelación gratuita</Text>
                        {' '}hasta 24h antes del viaje sin comisiones adicionales.
                    </Text>
                </View>

                <View style={styles.cta}>
                    <View style={styles.payButton}>
                        <MaterialIcons name="lock" size={20} color={colors.onSecondary} />
                        <Text style={styles.payText}>Confirmar y Pagar $3,200</Text>
                    </View>
                    <View style={styles.ssl}>
                        <MaterialIcons name="shield" size={14} color={colors.onSurfaceVariant} />
                        <Text style={styles.sslText}>
                            Transacción encriptada de grado bancario SSL 256-bit
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignSelf: 'stretch',
        width: '100%',
        backgroundColor: colors.surface,
    },
    header: {
        minHeight: 64,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.surface,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
        zIndex: 1,
    },
    headerIdentity: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        flexShrink: 1,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600',
        color: colors.primary,
    },
    headerSubtitle: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        letterSpacing: 0.4,
        color: colors.onSurfaceVariant,
    },
    scroll: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 32,
        gap: 12,
    },
    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: colors.banner,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    liveDotWrap: {
        width: 8,
        height: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    liveDotHalo: {
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.secondaryContainer,
        opacity: 0.35,
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.secondaryContainer,
    },
    bannerText: {
        flex: 1,
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        letterSpacing: 0.3,
        color: colors.onTertiaryContainer,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 16,
        gap: 12,
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    heroTop: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
    },
    heroIdentity: {
        flex: 1,
    },
    brandRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    brand: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        color: colors.onSurfaceVariant,
    },
    brandDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.outlineVariant,
    },
    model: {
        fontSize: 22,
        lineHeight: 28,
        fontWeight: '700',
        letterSpacing: -0.2,
        color: colors.primary,
    },
    colorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 2,
    },
    colorDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.12)',
    },
    colorName: {
        flexShrink: 1,
        fontSize: 12,
        lineHeight: 16,
        color: colors.onSurfaceVariant,
    },
    heroPrice: {
        alignItems: 'flex-end',
    },
    available: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 999,
        backgroundColor: colors.surfaceLow,
    },
    availableText: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        color: colors.primary,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 8,
    },
    price: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '800',
        color: colors.primary,
    },
    perDay: {
        fontSize: 12,
        lineHeight: 16,
        color: colors.onSurfaceVariant,
    },
    imageWrap: {
        height: 144,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: colors.surfaceLow,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    specs: {
        flexDirection: 'row',
        gap: 8,
    },
    spec: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: colors.surfaceLow,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 8,
    },
    specText: {
        flex: 1,
    },
    specLabel: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        color: colors.onSurfaceVariant,
    },
    specValue: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        color: colors.primary,
    },
    seccionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    seccionTituloRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flexShrink: 1,
    },
    seccionTitulo: {
        flexShrink: 1,
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600',
        color: colors.primary,
    },
    diasBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 999,
        backgroundColor: colors.secondaryFixed,
    },
    diasText: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        color: colors.onSecondaryFixed,
    },
    fechas: {
        flexDirection: 'row',
        gap: 8,
        backgroundColor: colors.surfaceLow,
        borderRadius: 12,
        padding: 8,
    },
    fecha: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 10,
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    fechaLabel: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        color: colors.onSurfaceVariant,
    },
    fechaDia: {
        marginTop: 2,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '700',
        color: colors.primary,
    },
    fechaHora: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500',
        color: colors.secondaryContainer,
    },
    field: {
        gap: 4,
    },
    fieldLabel: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        color: colors.onSurfaceVariant,
    },
    lugar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: colors.surfaceLow,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    lugarText: {
        flex: 1,
    },
    lugarTitulo: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        color: colors.primary,
    },
    lugarDetalle: {
        fontSize: 12,
        lineHeight: 16,
        color: colors.onSurfaceVariant,
    },
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        paddingTop: 4,
    },
    toggleLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    toggleText: {
        flexShrink: 1,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        color: colors.primary,
    },
    switchTrack: {
        width: 44,
        height: 24,
        borderRadius: 999,
        backgroundColor: colors.primary,
        padding: 2,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    switchThumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.white,
    },
    garantia: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        color: colors.secondaryContainer,
    },
    opciones: {
        gap: 14,
    },
    opcion: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        backgroundColor: colors.surfaceLow,
        borderRadius: 12,
        padding: 14,
    },
    opcionSeleccionada: {
        backgroundColor: colors.primary,
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 8,
        elevation: 4,
    },
    recomendada: {
        position: 'absolute',
        top: -9,
        right: 16,
        backgroundColor: colors.secondaryContainer,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 999,
        zIndex: 1,
    },
    recomendadaText: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        color: colors.onSecondary,
    },
    radio: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: colors.primary,
        marginTop: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSeleccionada: {
        borderColor: colors.secondaryFixed,
    },
    radioPunto: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.secondaryContainer,
    },
    opcionBody: {
        flex: 1,
        gap: 2,
    },
    opcionTopline: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 8,
    },
    opcionTitulo: {
        flexShrink: 1,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '700',
        color: colors.primary,
    },
    opcionTituloOn: {
        color: colors.white,
    },
    opcionPrecio: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        color: colors.onSurfaceVariant,
    },
    opcionPrecioOn: {
        fontWeight: '700',
        color: colors.secondaryFixed,
    },
    opcionDetalle: {
        fontSize: 12,
        lineHeight: 16,
        color: colors.onSurfaceVariant,
    },
    opcionDetalleOn: {
        color: colors.primaryFixedDim,
    },
    impuestos: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        color: colors.onSurfaceVariant,
    },
    filas: {
        gap: 8,
    },
    fila: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    filaLabel: {
        flex: 1,
        fontSize: 12,
        lineHeight: 16,
        color: colors.onSurface,
    },
    filaValor: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        color: colors.primary,
    },
    deposito: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        backgroundColor: colors.surfaceLow,
        borderRadius: 8,
        padding: 8,
        marginTop: 4,
    },
    depositoInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    depositoLabel: {
        flexShrink: 1,
        fontSize: 12,
        lineHeight: 16,
        color: colors.onSurfaceVariant,
    },
    reembolsable: {
        backgroundColor: colors.surfaceHigh,
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 1,
    },
    reembolsableText: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        color: colors.primary,
    },
    totalRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 12,
        paddingTop: 4,
    },
    totalLabel: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        color: colors.onSurfaceVariant,
    },
    totalValor: {
        fontSize: 26,
        lineHeight: 34,
        fontWeight: '800',
        letterSpacing: -0.5,
        color: colors.primary,
    },
    sinCargos: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingBottom: 4,
    },
    sinCargosText: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        color: colors.onSurfaceVariant,
    },
    assurance: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: colors.surfaceHigh,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    assuranceText: {
        flex: 1,
        fontSize: 12,
        lineHeight: 16,
        color: colors.onSurfaceVariant,
    },
    assuranceStrong: {
        fontWeight: '600',
        color: colors.primary,
    },
    cta: {
        gap: 8,
        paddingTop: 4,
    },
    payButton: {
        height: 56,
        borderRadius: 12,
        backgroundColor: colors.secondaryContainer,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: '#FE6B00',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 4,
    },
    payText: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '700',
        letterSpacing: 0.1,
        color: colors.onSecondary,
    },
    ssl: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    sslText: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        color: colors.onSurfaceVariant,
    },
});

export default Reserva;
