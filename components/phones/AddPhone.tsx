import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addPhoneAsync } from "@/lib/redux/phonebooks/phonebooksSlice";
import { AppDispatch } from "@/lib/redux/store";

export default function AddPhone() {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const navigation = useNavigation()

    const submit = () => {
        const id = Date.now().toString()
        dispatch(addPhoneAsync({ id, name, phone })).unwrap()
            .then(() => navigation.goBack()
            ).catch((error: any) => console.error('Failed to add user', error))
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.addContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={value => setName(value)}

                />
                <TextInput
                    style={styles.input}
                    onChangeText={value => setPhone(value)}

                />
                <View style={styles.conBtn}>
                    <TouchableOpacity
                        style={styles.inputButton}
                        onPress={submit}
                    >
                        <Text style={styles.textBtn}>save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.inputButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.textBtn}>cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        gap: 40,
        marginTop: 70,
        marginRight: 15,
        marginLeft: 15
    },
    card: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        height: 120,
        backgroundColor: '#c3c3c3',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 6,
        marginBottom: 12,
        padding: 8
    },
    avatar: {
        width: 110,
        height: '100%'
    },
    listData: {
        marginLeft: 20,
        marginTop: 10
    },
    text: {
        fontSize: 15,
        lineHeight: 25
    },
    listBtn: {
        flexDirection: 'row',
        marginTop: 15,
    },
    icon: {
        fontSize: 20,
        color: 'black',
        marginRight: 5,
    },
    addContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 8
    },
    input: {
        flexDirection: 'row',
        width: '100%',
        padding: 12,
        marginTop: 8,
        marginBottom: 8,
        marginRight: 0,
        marginLeft: 0,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 6,
        borderWidth: 1
    },
    conBtn: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 5,
        width: '100%'
    },
    inputButton: {
        backgroundColor: '#ad793e',
        color: '#fff',
        padding: 14,
        width: '48%',
        marginBottom: 10,
        borderRadius: 4
    },
    textBtn: {
        color: '#fff',
        textAlign: 'center'
    }
})