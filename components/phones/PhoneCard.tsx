import { Image, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from "react-redux";

export default function PhoneCard({ user }: { user: User }) {

    const dispatch: any = useDispatch()

    return (
        <View style={styles.card}>
            <View>
                <Image
                    source={require('../../assets/images/Defaultavatar.png')}
                    style={styles.avatar}
                />
            </View>
            <View style={styles.listData}>
                <View>
                    <Text style={styles.text} >{user.name}</Text>
                    <Text style={styles.text}>{user.phone}</Text>
                </View>
                <View style={styles.listBtn} >
                    <FontAwesome
                        name="pencil-square-o"
                        style={styles.icon}
                    />
                    <FontAwesome
                        name="trash"
                        style={styles.icon}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    }
})

