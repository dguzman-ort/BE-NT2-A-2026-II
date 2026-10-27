import { useRef, useState } from 'react';
import { Alert, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import { combinar, diasDeAlquiler, editarIntervalo, etiqueta, intervaloInicial } from './alquiler';

const MINUTO = 60 * 1000;

function medianocheLocal(instante) {
    const fecha = new Date(instante);
    return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
}

function minimoAndroid(campo, vigente) {
    switch (campo) {
        case 'recogida':
            return medianocheLocal(Date.now());
        case 'devolucion':
            return medianocheLocal(vigente.recogida);
        default: {
            const _exhaustive = campo;
            throw new Error(_exhaustive);
        }
    }
}

function minimoIos(campo, vigente) {
    switch (campo) {
        case 'recogida':
            return medianocheLocal(Date.now());
        case 'devolucion':
            // The iOS bound is inclusive, so this sits one minute after pickup.
            return new Date(vigente.recogida + MINUTO);
        default: {
            const _exhaustive = campo;
            throw new Error(_exhaustive);
        }
    }
}

function tituloDe(campo) {
    switch (campo) {
        case 'recogida':
            return 'Recogida';
        case 'devolucion':
            return 'Devolución';
        default: {
            const _exhaustive = campo;
            throw new Error(_exhaustive);
        }
    }
}

// open() calls presentPicker() and returns undefined, so this Promise is the completion signal.
function abrirDialogo(opciones) {
    return new Promise((resolve) => {
        let settled = false;
        const finish = (resultado) => {
            if (settled) return;
            settled = true;
            resolve(resultado);
        };
        try {
            DateTimePickerAndroid.open({
                ...opciones,
                onValueChange: (_evento, fecha) => {
                    finish(
                        fecha
                            ? { tipo: 'valor', instante: fecha.getTime() }
                            : { tipo: 'cancelado' },
                    );
                },
                onDismiss: () => finish({ tipo: 'cancelado' }),
                onNeutralButtonPress: () => finish({ tipo: 'cancelado' }),
                onError: () => finish({ tipo: 'error' }),
            });
        } catch {
            finish({ tipo: 'error' });
        }
    });
}

function SelectorIos({ campo, borrador, minimo, onBorrador, onCancelar, onListo }) {
    return (
        <Modal
            animationType="slide"
            presentationStyle="pageSheet"
            transparent={false}
            visible
            onRequestClose={onCancelar}
        >
            <View style={styles.hoja}>
                <View style={styles.barra}>
                    <TouchableOpacity onPress={onCancelar} accessibilityRole="button" style={styles.lado}>
                        <Text style={styles.cancelar}>Cancelar</Text>
                    </TouchableOpacity>
                    <Text style={styles.titulo}>{tituloDe(campo)}</Text>
                    <TouchableOpacity onPress={onListo} accessibilityRole="button" style={styles.ladoFin}>
                        <Text style={styles.listo}>Listo</Text>
                    </TouchableOpacity>
                </View>
                <DateTimePicker
                    mode="datetime"
                    display="inline"
                    locale="es-ES"
                    themeVariant="light"
                    accentColor="#FE6B00"
                    value={new Date(borrador)}
                    minimumDate={minimo}
                    onValueChange={(_evento, fecha) => {
                        if (fecha) onBorrador(fecha.getTime());
                    }}
                />
            </View>
        </Modal>
    );
}

export function useFechasAlquiler() {
    const [intervalo, setIntervalo] = useState(() => {
        const manana = new Date();
        manana.setDate(manana.getDate() + 1);
        return intervaloInicial(manana.getTime());
    });
    const intervaloRef = useRef(intervalo);
    const bloqueado = useRef(false);
    const [hoja, setHoja] = useState(null);

    intervaloRef.current = intervalo;

    function aplicar(campo, instante) {
        const edicion = editarIntervalo(intervaloRef.current, campo, instante);
        switch (edicion.tipo) {
            case 'ok':
                intervaloRef.current = edicion.intervalo;
                setIntervalo(edicion.intervalo);
                break;
            case 'rechazado':
                Alert.alert('Devolución', 'La devolución tiene que ser posterior a la recogida.');
                break;
            default: {
                const _exhaustive = edicion.tipo;
                throw new Error(_exhaustive);
            }
        }
    }

    async function editarEnAndroid(campo) {
        const vigente = intervaloRef.current;
        const actual = vigente[campo];
        const dia = await abrirDialogo({
            value: new Date(actual),
            mode: 'date',
            is24Hour: false,
            minimumDate: minimoAndroid(campo, vigente),
        });
        if (dia.tipo !== 'valor') return;

        const conReloj = combinar(dia.instante, actual);
        const hora = await abrirDialogo({
            value: new Date(conReloj),
            mode: 'time',
            is24Hour: false,
        });
        if (hora.tipo !== 'valor') return;

        aplicar(campo, combinar(conReloj, hora.instante));
    }

    function cerrarHoja() {
        bloqueado.current = false;
        setHoja(null);
    }

    function editar(campo) {
        if (bloqueado.current) return;
        switch (Platform.OS) {
            case 'android':
                bloqueado.current = true;
                editarEnAndroid(campo).finally(() => {
                    bloqueado.current = false;
                });
                return;
            case 'ios':
                bloqueado.current = true;
                setHoja({
                    campo,
                    borrador: intervaloRef.current[campo],
                });
                return;
            default:
                return;
        }
    }

    const selector = hoja
        ? (
            <SelectorIos
                campo={hoja.campo}
                borrador={hoja.borrador}
                minimo={minimoIos(hoja.campo, intervalo)}
                onBorrador={(instante) => {
                    setHoja((actual) => (actual ? { campo: actual.campo, borrador: instante } : actual));
                }}
                onCancelar={cerrarHoja}
                onListo={() => {
                    aplicar(hoja.campo, hoja.borrador);
                    cerrarHoja();
                }}
            />
        )
        : null;

    return {
        recogida: etiqueta(intervalo.recogida),
        devolucion: etiqueta(intervalo.devolucion),
        dias: diasDeAlquiler(intervalo),
        editar,
        selector,
    };
}

const styles = StyleSheet.create({
    hoja: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    barra: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    lado: {
        minWidth: 80,
    },
    ladoFin: {
        minWidth: 80,
        alignItems: 'flex-end',
    },
    titulo: {
        flex: 1,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '600',
        color: '#000412',
    },
    cancelar: {
        fontSize: 16,
        color: '#44474D',
    },
    listo: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FE6B00',
    },
});
