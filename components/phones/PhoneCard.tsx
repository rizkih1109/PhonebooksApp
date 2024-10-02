import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { avatarPhoneAsync, editPhoneAsync } from "@/lib/redux/phonebooks/phonebooksSlice";
import { AppDispatch } from "@/lib/redux/store";
import * as ImagePicker from 'expo-image-picker'

export default function PhoneCard({ user }: { user: User }) {

    const navigation = useNavigation<modalNavigate>()
    const dispatch = useDispatch<AppDispatch>()
    const [newData, setNewData] = useState({ id: user.id, name: user.name, phone: user.phone })
    const [isEdit, setIsEdit] = useState(false)

    const save = () => {
        dispatch(editPhoneAsync(newData)).unwrap()
        setIsEdit(false)
    }

    const image = async () => {

        const media = await ImagePicker.requestMediaLibraryPermissionsAsync()
        const camera = await ImagePicker.requestCameraPermissionsAsync()

        if (media.granted == false || camera.granted == false) {
            Alert.alert('Permission to access camera roll is required')
            return
        }

        Alert.alert(
            'Choose an Option',
            'Select an option to upload your avatar',
            [
                { text: 'Camera', onPress: (() => fromCamera()) },
                { text: 'Media', onPress: (() => fromMedia()) },
                { text: 'Cancel', style: 'cancel' }
            ]
        )
    }

    const fromCamera = async () => {
        const imageResult = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })

        fixImage(imageResult)
    }

    const fromMedia = async () => {
        const imageResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })

        fixImage(imageResult)
    }

    const fixImage = async (imageResult: ImagePicker.ImagePickerResult) => {
        if (!imageResult.canceled) {
            const fileName = imageResult.assets[0].fileName;
            const formData = new FormData()

            formData.append('avatar', {
                uri: imageResult.assets[0].uri,
                name: fileName,
                type: 'image/jpeg'
            } as any)

            dispatch(avatarPhoneAsync({ id: user.id, file: formData }))
        }
    }

    if (isEdit) {
        return (
            <View style={styles.editCard}>
                <View>
                    <Image
                        source={{
                            uri: user.avatar == null
                                ? 'http://192.168.1.3:3000/images/Defaultavatar.png'
                                : `http://192.168.1.3:3000/images/${user.avatar}`,
                        }}
                        style={styles.avatar}
                    />
                </View>
                <View style={styles.editData}>
                    <View>
                        <TextInput
                            style={styles.input}
                            value={newData.name}
                            onChangeText={text => setNewData({ ...newData, name: text })}
                        />
                        <TextInput
                            style={styles.input}
                            value={newData.phone}
                            onChangeText={text => setNewData({ ...newData, phone: text })}
                        />
                    </View>
                    <View style={styles.editBtn} >
                        <Ionicons
                            name="save-sharp"
                            style={styles.icon}
                            onPress={save}
                        />
                    </View>
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.card}>
                <View>
                    <TouchableOpacity onPress={image}>
                        <Image
                            source={{
                                uri: user.avatar == null
                                    ? 'http://192.168.1.3:3000/images/Defaultavatar.png'
                                    : `http://192.168.1.3:3000/images/${user.avatar}`,
                            }}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
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
                            onPress={() => setIsEdit(true)}
                        />
                        <FontAwesome
                            name="trash"
                            style={styles.icon}
                            onPress={() => navigation.navigate('modal', { user })}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        height: 130,
        backgroundColor: '#c3c3c3',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 6,
        marginBottom: 12,
        padding: 8
    },
    editCard: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        height: 150,
        backgroundColor: '#c3c3c3',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 6,
        marginBottom: 12,
        padding: 8
    },
    avatar: {
        width: 110,
        height: 112,
        borderRadius: 50
    },
    listData: {
        marginLeft: 20,
        marginTop: 10
    },
    editData: {
        flex: 1,
        marginTop: 5,
        marginLeft: 20
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
    input: {
        width: '100%',
        padding: 7,
        marginTop: 2,
        marginBottom: 4,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: '#ffffff'
    },
    editBtn: {
        marginTop: 5
    }
})

