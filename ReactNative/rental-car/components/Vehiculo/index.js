import { useState, useEffect } from 'react';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const colors = {
    card: '#FFFFFF',
    primary: '#000412',
    onSurface: '#191C1E',
    onSurfaceVariant: '#44474D',
    surfaceLow: '#F2F4F6',
    hero: '#F6F7F9',
    footer: '#F7F8FA',
    orange: '#FE6B00',
    onOrange: '#FFFFFF',
    outline: '#75777E',
    badge: '#0F1E36',
    white: '#FFFFFF',
    error: '#BA1A1A',
};

const CATEGORIA_BADGE = {
    medio: 'Sedán',
    economico: 'Económico',
    suv: 'SUV',
    pickup: 'Pickup',
    deportivo: 'Deportivo',
    camioneta: 'Camioneta',
};

const TARIFA_LABEL = {
    flexible: 'Tarifa flexible',
    fija: 'Tarifa fija',
};

function badgeFor(categoria) {
    if (!categoria) {
        return '';
    }
    return CATEGORIA_BADGE[categoria] ?? categoria;
}

function tarifaLabel(tarifa) {
    if (!tarifa) {
        return '';
    }
    return TARIFA_LABEL[tarifa] ?? tarifa;
}

function formatPrecio(precio) {
    const value = Number(precio);
    if (Number.isNaN(value)) {
        return '$0';
    }
    return `$${value.toLocaleString('en-US')}`;
}

function Spec({ icon, label, accent = false }) {
    return (
        <View style={styles.spec}>
            <MaterialIcons
                name={icon}
                size={18}
                color={accent ? colors.orange : colors.outline}
            />
            <Text style={styles.specLabel} numberOfLines={1}>
                {label}
            </Text>
        </View>
    );
}

const Vehiculo = ({ vehiculo }) => {
    const { width } = useWindowDimensions();
    const [favorito, setFavorito] = useState(false);
    const disponible = Boolean(vehiculo.disponible);
    const tarifaFlexible = vehiculo.tarifa === 'flexible';
    const colorHex = vehiculo.color?.hex ?? colors.surfaceLow;
    const colorNombre = vehiculo.color?.nombre ?? '';


    useEffect(() => {
        console.log('Vehiculo renderizado', vehiculo.id);
        return () => {
            console.log('Vehiculo desmontado', vehiculo.id);
        };
    }, []);

    return (
        <View style={[styles.shadow, { width: width - 32 }]}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <View style={styles.identity}>
                        <View style={styles.brandRow}>
                            <Text style={styles.brand}>{vehiculo.marca}</Text>
                            <View style={styles.yearBadge}>
                                <Text style={styles.year}>{vehiculo.anio}</Text>
                            </View>
                        </View>
                        <Text style={styles.model} numberOfLines={2}>
                            {vehiculo.modelo}
                        </Text>
                    </View>
                    <View style={styles.colorChip}>
                        <View style={[styles.colorDot, { backgroundColor: colorHex }]} />
                        <Text style={styles.colorName} numberOfLines={1}>
                            {colorNombre}
                        </Text>
                    </View>
                </View>

                <View style={styles.hero}>
                    <Image
                        source={{ uri: vehiculo.imagen }}
                        style={styles.image}
                        resizeMode="contain"
                        accessibilityLabel={`${vehiculo.marca} ${vehiculo.modelo}`}
                    />
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{badgeFor(vehiculo.categoria)}</Text>
                    </View>
                    <Pressable
                        style={({ pressed }) => [styles.fav, pressed && styles.favPressed]}
                        onPress={() => setFavorito((current) => !current)}
                        accessibilityRole="button"
                        accessibilityLabel={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                        accessibilityState={{ selected: favorito }}
                    >
                        <MaterialIcons
                            name={favorito ? 'favorite' : 'favorite-border'}
                            size={20}
                            color={favorito ? colors.orange : colors.onSurfaceVariant}
                        />
                    </Pressable>
                </View>

                <View style={styles.specs}>
                    <Spec icon="settings" label={vehiculo.transmision} />
                    <Spec icon="airline-seat-recline-normal" label={`${vehiculo.plazas} plazas`} />
                    <Spec icon="bolt" label={`${vehiculo.autonomiaKm} km aut.`} accent />
                </View>

                <View style={styles.footer}>
                    <View style={styles.priceBlock}>
                        <View style={styles.priceRow}>
                            <Text style={styles.price}>{formatPrecio(vehiculo.precio)}</Text>
                            <Text style={styles.perDay}>/día</Text>
                        </View>
                        <Text
                            style={[
                                styles.tarifa,
                                disponible && tarifaFlexible && styles.tarifaAccent,
                                !disponible && styles.tarifaUnavailable,
                            ]}
                            numberOfLines={1}
                        >
                            {disponible ? tarifaLabel(vehiculo.tarifa) : 'No disponible'}
                        </Text>
                    </View>
                    <Pressable
                        style={({ pressed }) => [
                            styles.rent,
                            pressed && disponible && styles.rentPressed,
                            !disponible && styles.rentDisabled,
                        ]}
                        disabled={!disponible}
                        accessibilityRole="button"
                        accessibilityLabel="Rentar ahora"
                        accessibilityState={{ disabled: !disponible }}
                    >
                        <Text style={styles.rentText}>Rentar ahora</Text>
                        <MaterialIcons name="arrow-forward" size={18} color={colors.onOrange} />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    shadow: {
        alignSelf: 'center',
        marginBottom: 16,
        borderRadius: 16,
        backgroundColor: colors.card,
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.06,
        shadowRadius: 24,
        elevation: 3,
    },
    card: {
        backgroundColor: colors.card,
        borderRadius: 16,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    identity: {
        flex: 1,
    },
    brandRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 2,
    },
    brand: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        color: colors.onSurfaceVariant,
    },
    yearBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 999,
        backgroundColor: colors.surfaceLow,
    },
    year: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        color: colors.onSurface,
    },
    model: {
        fontSize: 22,
        lineHeight: 28,
        fontWeight: '600',
        letterSpacing: -0.2,
        color: colors.primary,
    },
    colorChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        maxWidth: 140,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: colors.surfaceLow,
    },
    colorDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.12)',
    },
    colorName: {
        flexShrink: 1,
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '500',
        color: colors.onSurface,
    },
    hero: {
        height: 176,
        marginTop: 8,
        backgroundColor: colors.hero,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    badge: {
        position: 'absolute',
        top: 8,
        left: 16,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        backgroundColor: colors.badge,
    },
    badgeText: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        color: colors.white,
    },
    fav: {
        position: 'absolute',
        top: 8,
        right: 16,
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    favPressed: {
        transform: [{ scale: 0.9 }],
    },
    specs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        paddingHorizontal: 16,
        paddingTop: 4,
        paddingBottom: 8,
    },
    spec: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        flexShrink: 1,
    },
    specLabel: {
        flexShrink: 1,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        letterSpacing: 0.2,
        color: colors.onSurfaceVariant,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: colors.footer,
    },
    priceBlock: {
        flexShrink: 1,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 2,
    },
    price: {
        fontSize: 22,
        lineHeight: 28,
        fontWeight: '700',
        letterSpacing: -0.2,
        color: colors.primary,
    },
    perDay: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '600',
        color: colors.onSurfaceVariant,
    },
    tarifa: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '500',
        color: colors.onSurfaceVariant,
    },
    tarifaAccent: {
        color: colors.orange,
    },
    tarifaUnavailable: {
        color: colors.error,
    },
    rent: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 24,
        borderRadius: 12,
        backgroundColor: colors.orange,
        shadowColor: '#FE6B00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 14,
        elevation: 4,
    },
    rentPressed: {
        transform: [{ scale: 0.95 }],
    },
    rentDisabled: {
        opacity: 0.45,
    },
    rentText: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600',
        letterSpacing: 0.1,
        color: colors.onOrange,
    },
});

export default Vehiculo;
