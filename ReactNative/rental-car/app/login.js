import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { login } from '../services/authentication';
import { useAuth } from '../hooks/useAuth';

const colors = {
    surface: '#F7F9FB',
    surfaceLow: '#F2F4F6',
    surfaceHigh: '#E6E8EA',
    surfaceContainer: '#ECEEF0',
    surfaceHighest: '#E0E3E5',
    surfaceLowest: '#FFFFFF',
    primary: '#000412',
    primaryContainer: '#0F1E36',
    onPrimary: '#FFFFFF',
    onSurface: '#191C1E',
    onSurfaceVariant: '#44474D',
    outline: '#75777E',
    outlineVariant: '#C5C6CE',
    secondary: '#A04100',
    secondaryContainer: '#FE6B00',
    secondaryFixed: '#FFDBCC',
    onSecondaryFixed: '#351000',
};

function Emblem() {
    return (
        <View style={styles.emblem}>
            <View style={styles.emblemGlyph}>
                <View style={styles.emblemChevron} />
                <View style={styles.emblemNotch} />
                <View style={styles.emblemDot} />
            </View>
        </View>
    );
}

function Field({
    label,
    hint,
    icon,
    value,
    onChangeText,
    placeholder,
    focused,
    onFocus,
    onBlur,
    secureTextEntry,
    onToggleSecure,
    passwordVisible,
    inputRef,
    returnKeyType,
    onSubmitEditing,
    textContentType,
    autoComplete,
    keyboardType,
}) {
    return (
        <View style={styles.fieldBlock}>
            <View style={styles.labelRow}>
                <Text style={styles.label}>{label}</Text>
                {hint ? <Text style={styles.hint}>{hint}</Text> : null}
            </View>
            <View style={[styles.inputShell, focused && styles.inputShellFocused]}>
                <View style={styles.inputIcon} pointerEvents="none">
                    <MaterialIcons name={icon} size={20} color={colors.outline} />
                </View>
                <TextInput
                    ref={inputRef}
                    style={[styles.input, onToggleSecure && styles.inputWithAction]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="rgba(117, 119, 126, 0.6)"
                    selectionColor={colors.primaryContainer}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={secureTextEntry}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    textContentType={textContentType}
                    autoComplete={autoComplete}
                    keyboardType={keyboardType}
                    underlineColorAndroid="transparent"
                />
                {onToggleSecure ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Mostrar u ocultar contraseña"
                        onPress={onToggleSecure}
                        hitSlop={8}
                        style={({ pressed }) => [styles.eyeButton, pressed && styles.eyePressed]}
                    >
                        <MaterialIcons
                            name={passwordVisible ? 'visibility-off' : 'visibility'}
                            size={20}
                            color={colors.outline}
                        />
                    </Pressable>
                ) : null}
            </View>
        </View>
    );
}

function SocialButton({ name, label, accessibilityLabel, color, onPress }) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            onPress={onPress}
            style={({ pressed }) => [styles.socialButton, pressed && styles.socialPressed]}
        >
            <FontAwesome name={name} size={20} color={color} />
            <Text style={styles.socialLabel}>{label}</Text>
        </Pressable>
    );
}

const Login = () => {
    const { setAuth } = useAuth();
    const insets = useSafeAreaInsets();
    const passwordRef = useRef(null);
    const pulse = useRef(new Animated.Value(1)).current;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [remember, setRemember] = useState(true);
    const [focused, setFocused] = useState(null);

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, {
                    toValue: 0.35,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulse, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
        );
        animation.start();
        return () => animation.stop();
    }, [pulse]);

    // La autenticación se conecta en estos handlers.
    const handleIniciarSesion = () => {
        console.log('Iniciar sesión');
        console.log(email, password);
        login(email, password)
            .then((response) => {
                console.log(response);
                setAuth(response);                
            })
            .catch((error) => {
                console.log(error);
                Alert.alert('Error', error.error);
            });

    };
    const handleOlvideContrasena = () => {};
    const handleBiometria = () => {};
    const handleApple = () => {};
    const handleGoogle = () => {};
    const handleRegistro = () => {};

    return (
        <View style={styles.screen}>
            <StatusBar style="dark" />
            <View style={[styles.header, { paddingTop: insets.top }]}>
                {/* <View style={styles.headerBar}>
                    <View style={styles.headerLeft}>
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Go back"
                            onPress={() => {
                                if (router.canGoBack()) {
                                    router.back();
                                }
                            }}
                            style={({ pressed }) => [
                                styles.backButton,
                                pressed && styles.backPressed,
                            ]}
                        >
                            <MaterialIcons name="arrow-back" size={20} color={colors.onSurface} />
                        </Pressable>
                        <View style={styles.headerTitleRow}>
                            <View style={styles.headerDot} />
                            <Text style={styles.headerTitle}>Member Login</Text>
                        </View>
                    </View>
                    <View style={styles.avatar}>
                        <MaterialIcons name="person" size={18} color={colors.onPrimary} />
                    </View>
                </View> */}
            </View>

            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    style={styles.flex}
                    contentContainerStyle={[
                        styles.content,
                        { paddingBottom: 32 + insets.bottom },
                    ]}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.hero}>
                        <View style={styles.glowOrange} pointerEvents="none" />
                        <View style={styles.glowBlue} pointerEvents="none" />

                        <View style={styles.brandRow}>
                            <Emblem />
                            <View style={styles.brandText}>
                                <View style={styles.brandNameRow}>
                                    <Text style={styles.brandName}>VELOCE</Text>
                                    <View style={styles.driveChip}>
                                        <Text style={styles.driveChipText}>Drive</Text>
                                    </View>
                                </View>
                                <Text style={styles.brandTag}>Mobility & Prestige</Text>
                            </View>
                        </View>

                        <View style={styles.accessPill}>
                            <Animated.View style={[styles.accessDot, { opacity: pulse }]} />
                            <Text style={styles.accessText}>Acceso Clientes Clave</Text>
                            <MaterialIcons name="verified-user" size={14} color={colors.secondary} />
                        </View>

                        <Text style={styles.heading}>Bienvenido de nuevo</Text>
                        <Text style={styles.subtitle}>
                            Inicia sesión para gestionar tus reservas y acceder a tu llave digital de vehículo.
                        </Text>
                    </View>

                    {/* <View style={styles.keyCard}>
                        <View style={styles.keyIdentity}>
                            <View style={styles.keyIcon}>
                                <MaterialIcons name="key" size={22} color={colors.secondaryContainer} />
                            </View>
                            <View style={styles.keyCopy}>
                                <Text style={styles.keyTitle}>Veloce Digital Key v4.2</Text>
                                <Text style={styles.keySubtitle}>Listo para sincronizar con tu flota</Text>
                            </View>
                        </View>
                        <View style={styles.keyStatus} />
                    </View> */}

                    <View style={styles.formCard}>
                        <Field
                            label="Correo electrónico o número móvil"
                            hint="Requerido"
                            icon="mail"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="ejemplo@veloce.com"
                            focused={focused === 'email'}
                            onFocus={() => setFocused('email')}
                            onBlur={() => setFocused(null)}
                            returnKeyType="next"
                            onSubmitEditing={() => passwordRef.current?.focus()}
                            textContentType="username"
                            autoComplete="username"
                            keyboardType="email-address"
                        />
                        <Field
                            label="Contraseña"
                            icon="lock"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="••••••••••••"
                            focused={focused === 'password'}
                            onFocus={() => setFocused('password')}
                            onBlur={() => setFocused(null)}
                            secureTextEntry={!passwordVisible}
                            passwordVisible={passwordVisible}
                            onToggleSecure={() => setPasswordVisible((visible) => !visible)}
                            inputRef={passwordRef}
                            returnKeyType="done"
                            onSubmitEditing={handleIniciarSesion}
                            textContentType="password"
                            autoComplete="password"
                        />

                        <View style={styles.utilityRow}>
                            <Pressable
                                accessibilityRole="checkbox"
                                accessibilityState={{ checked: remember }}
                                onPress={() => setRemember((value) => !value)}
                                style={styles.remember}
                            >
                                <View style={[styles.checkbox, remember && styles.checkboxOn]}>
                                    {remember ? (
                                        <MaterialIcons name="check" size={16} color={colors.onPrimary} />
                                    ) : null}
                                </View>
                                <Text style={styles.rememberText}>Recordarme en este dispositivo</Text>
                            </Pressable>
                            <Pressable
                                accessibilityRole="button"
                                onPress={handleOlvideContrasena}
                                hitSlop={8}
                            >
                                <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
                            </Pressable>
                        </View>

                        <Pressable
                            accessibilityRole="button"
                            onPress={handleIniciarSesion}
                            style={({ pressed }) => [
                                styles.loginButton,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text style={styles.loginLabel}>Iniciar Sesión</Text>
                            <MaterialIcons name="arrow-forward" size={20} color={colors.onPrimary} />
                        </Pressable>
                    </View>

                    <Pressable
                        accessibilityRole="button"
                        onPress={handleBiometria}
                        style={({ pressed }) => [
                            styles.faceButton,
                            pressed && styles.pressedSoft,
                        ]}
                    >
                        <View style={styles.faceIcon}>
                            <MaterialIcons name="face" size={18} color={colors.primaryContainer} />
                        </View>
                        <Text style={styles.faceLabel}>Ingresar con Face ID / Huella</Text>
                        <MaterialIcons name="fingerprint" size={18} color={colors.outline} />
                    </Pressable>

                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>O continúa con</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.socialRow}>
                        <SocialButton
                            name="apple"
                            label="Apple"
                            accessibilityLabel="Continuar con Apple"
                            color={colors.primary}
                            onPress={handleApple}
                        />
                        <SocialButton
                            name="google"
                            label="Google"
                            accessibilityLabel="Continuar con Google"
                            color="#4285F4"
                            onPress={handleGoogle}
                        />
                    </View>

                    <Text style={styles.signup}>
                        ¿No tienes una cuenta aún?{' '}
                        <Text style={styles.signupLink} onPress={handleRegistro} suppressHighlighting>
                            Registrarse
                        </Text>
                    </Text>

                    <View style={styles.seal}>
                        <MaterialIcons name="lock" size={15} color={colors.outline} />
                        <Text style={styles.sealText}>
                            Conexión encriptada de 256 bits · Veloce Mobility Security
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    flex: {
        flex: 1,
    },
    header: {
        backgroundColor: colors.surface,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
        zIndex: 1,
    },
    headerBar: {
        height: 64,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surfaceLow,
    },
    backPressed: {
        backgroundColor: colors.surfaceHigh,
        transform: [{ scale: 0.95 }],
    },
    headerTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        flexShrink: 1,
    },
    headerDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.secondaryContainer,
    },
    headerTitle: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600',
        letterSpacing: -0.3,
        color: colors.onSurface,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
    },
    content: {
        paddingHorizontal: 16,
    },
    hero: {
        paddingTop: 16,
        paddingBottom: 24,
        alignItems: 'center',
        overflow: 'hidden',
    },
    glowOrange: {
        position: 'absolute',
        top: -48,
        left: '50%',
        marginLeft: -96,
        width: 192,
        height: 192,
        borderRadius: 96,
        backgroundColor: 'rgba(254, 107, 0, 0.10)',
    },
    glowBlue: {
        position: 'absolute',
        top: 40,
        right: 8,
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: 'rgba(184, 199, 230, 0.35)',
    },
    brandRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 8,
    },
    emblem: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: colors.primaryContainer,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primaryContainer,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    emblemGlyph: {
        width: 26,
        height: 26,
        alignItems: 'center',
    },
    emblemChevron: {
        position: 'absolute',
        bottom: 0,
        width: 0,
        height: 0,
        borderLeftWidth: 13,
        borderRightWidth: 13,
        borderTopWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: colors.secondaryContainer,
    },
    emblemNotch: {
        position: 'absolute',
        bottom: 7,
        width: 0,
        height: 0,
        borderLeftWidth: 7,
        borderRightWidth: 7,
        borderTopWidth: 11,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: colors.primaryContainer,
    },
    emblemDot: {
        position: 'absolute',
        top: 0,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.onPrimary,
    },
    brandText: {
        paddingLeft: 4,
    },
    brandNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    brandName: {
        fontSize: 18,
        lineHeight: 20,
        fontWeight: '600',
        letterSpacing: -0.3,
        color: colors.primaryContainer,
    },
    driveChip: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 999,
        backgroundColor: colors.secondaryFixed,
    },
    driveChipText: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        color: colors.onSecondaryFixed,
    },
    brandTag: {
        marginTop: 2,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500',
        letterSpacing: 0.4,
        color: colors.onSurfaceVariant,
    },
    accessPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: colors.surfaceHigh,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    accessDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.secondaryContainer,
    },
    accessText: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        color: colors.onSurface,
    },
    heading: {
        fontSize: 26,
        lineHeight: 34,
        fontWeight: '800',
        letterSpacing: -0.5,
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 4,
    },
    subtitle: {
        maxWidth: 280,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
        color: colors.onSurfaceVariant,
        textAlign: 'center',
    },
    keyCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        backgroundColor: colors.surfaceLowest,
        borderRadius: 12,
        padding: 14,
        marginBottom: 24,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
        elevation: 1,
    },
    keyIdentity: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    keyIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surfaceLow,
    },
    keyCopy: {
        flex: 1,
    },
    keyTitle: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        letterSpacing: 0.2,
        color: colors.onSurface,
    },
    keySubtitle: {
        fontSize: 12,
        lineHeight: 16,
        color: colors.outline,
    },
    keyStatus: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.secondaryContainer,
        shadowColor: colors.secondaryContainer,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 3,
    },
    formCard: {
        backgroundColor: colors.surfaceLowest,
        borderRadius: 16,
        padding: 16,
        gap: 16,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
        elevation: 1,
    },
    fieldBlock: {
        gap: 6,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    label: {
        flexShrink: 1,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        letterSpacing: 0.2,
        color: colors.onSurface,
    },
    hint: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400',
        color: colors.outlineVariant,
    },
    inputShell: {
        height: 48,
        borderRadius: 12,
        backgroundColor: colors.surfaceLowest,
        borderWidth: 1.5,
        borderColor: 'rgba(117, 119, 126, 0.25)',
        justifyContent: 'center',
    },
    inputShellFocused: {
        backgroundColor: colors.surfaceLow,
        borderColor: colors.primaryContainer,
    },
    inputIcon: {
        position: 'absolute',
        left: 14,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    input: {
        paddingLeft: 44,
        paddingRight: 16,
        paddingVertical: 0,
        fontSize: 14,
        color: colors.onSurface,
        textAlignVertical: 'center',
    },
    inputWithAction: {
        paddingRight: 44,
    },
    eyeButton: {
        position: 'absolute',
        right: 8,
        top: '50%',
        marginTop: -16,
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    eyePressed: {
        transform: [{ scale: 0.95 }],
    },
    utilityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        paddingTop: 4,
    },
    remember: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surfaceContainer,
    },
    checkboxOn: {
        backgroundColor: colors.primaryContainer,
    },
    rememberText: {
        flexShrink: 1,
        fontSize: 12,
        lineHeight: 16,
        color: colors.onSurfaceVariant,
    },
    forgot: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        letterSpacing: 0.2,
        color: colors.secondary,
    },
    loginButton: {
        height: 52,
        marginTop: 4,
        borderRadius: 12,
        backgroundColor: colors.secondaryContainer,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: colors.secondaryContainer,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 4,
    },
    loginLabel: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600',
        color: colors.onPrimary,
    },
    pressed: {
        transform: [{ scale: 0.98 }],
    },
    pressedSoft: {
        transform: [{ scale: 0.99 }],
        backgroundColor: colors.surfaceContainer,
    },
    socialPressed: {
        transform: [{ scale: 0.98 }],
        backgroundColor: colors.surfaceLow,
    },
    faceButton: {
        height: 48,
        marginTop: 16,
        borderRadius: 12,
        backgroundColor: colors.surfaceLow,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    faceIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(15, 30, 54, 0.10)',
    },
    faceLabel: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600',
        letterSpacing: 0.1,
        color: colors.onSurface,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.surfaceHighest,
    },
    dividerText: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        color: colors.outline,
    },
    socialRow: {
        flexDirection: 'row',
        gap: 8,
    },
    socialButton: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        backgroundColor: colors.surfaceLowest,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
        elevation: 1,
    },
    socialLabel: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600',
        letterSpacing: 0.1,
        color: colors.onSurface,
    },
    signup: {
        marginTop: 24,
        marginBottom: 8,
        fontSize: 14,
        lineHeight: 20,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
    },
    signupLink: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '700',
        letterSpacing: 0.1,
        color: colors.secondary,
    },
    seal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingTop: 4,
        opacity: 0.8,
    },
    sealText: {
        flexShrink: 1,
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '500',
        letterSpacing: 0.4,
        color: colors.outline,
    },
});
