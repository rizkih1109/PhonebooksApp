import { removePhoneAsync } from "@/lib/redux/phonebooks/phonebooksSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

export default function modal() {

    const route = useRoute()
    const navigation = useNavigation<modalNavigate>()
    const { user } = route.params as { user: User }

    const dispatch: any = useDispatch()
    const deletePhone = () => {
        dispatch(removePhoneAsync(user.id)).unwrap().then(() => {
            navigation.goBack()
        })
    }

    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
                <View style={styles.conAlert}>
                    <Text style={styles.confirmText}>Delete Confirmation</Text>
                    <Text style={styles.mainText}>Apakah anda yakin menghapus data ini?</Text>
                </View>
                <View style={styles.conBtn}>
                    <TouchableOpacity
                        onPress={deletePhone}
                    >
                        <Text style={styles.btnText}>Ya</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.btnText}>Tidak</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 30
    },
    modalCard: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#bebebe',
        paddingTop: 20,
        paddingBottom: 20,
        width: '100%'
    },
    conAlert: {
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#bebebe',
        paddingBottom: 30,
        paddingTop: 10
    },
    conBtn: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
        paddingRight: 60,
        paddingLeft: 60
    },
    confirmText: {
        fontSize: 20,
        lineHeight: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    mainText: {
        fontSize: 15,
        lineHeight: 30,
        textAlign: 'center'
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5da2f5'
    }
})