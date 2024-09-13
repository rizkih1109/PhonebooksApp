// import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { useState } from "react";

// export default function AddPhone() {

//     const [data, setData] = useState({ name: '', phone: '' })

//     const add = (data: { name: string, phone: string }) => {
//         const id = Date.now().toString()
//         setUsers([
//             {
//                 id,
//                 name: data.name,
//                 phone: data.phone
//             },
//             ...users,])
//     }

//     const submit = () => {
//         add(data)
//         setData({ name: '', phone: '' })
//     }

//     return (
//         <View>
//             <View style={styles.addContainer}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="name"
//                     onChangeText={value => setData({ ...data, name: value })}
//                     defaultValue={data.name}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="phone"
//                     onChangeText={value => setData({ ...data, phone: value })}
//                     defaultValue={data.phone}
//                 />
//                 <TouchableOpacity
//                     style={styles.inputButton}
//                     onPress={submit}
//                 >
//                     <Text>Add</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }




// const styles = StyleSheet.create({
//     card: {
//         flexDirection: 'row',
//         width: '100%',
//         alignSelf: 'center',
//         height: 120,
//         backgroundColor: '#c3c3c3',
//         borderWidth: 1,
//         borderColor: 'black',
//         borderRadius: 6,
//         marginBottom: 12,
//         padding: 8
//     },
//     avatar: {
//         width: 110,
//         height: '100%'
//     },
//     listData: {
//         marginLeft: 20,
//         marginTop: 10
//     },
//     text: {
//         fontSize: 15,
//         lineHeight: 25
//     },
//     listBtn: {
//         flexDirection: 'row',
//         marginTop: 15,
//     },
//     icon: {
//         fontSize: 20,
//         color: 'black',
//         marginRight: 5,
//     },
//     addContainer: {
//         width: '100%',
//         alignItems: 'center',
//         marginBottom: 8
//     },
//     input: {
//         flexDirection: 'row',
//         width: '100%',
//         padding: 12,
//         marginTop: 8,
//         marginBottom: 8,
//         marginRight: 0,
//         marginLeft: 0,
//         borderStyle: 'solid',
//         borderColor: 'black',
//         borderRadius: 6,
//         borderWidth: 1
//     },
//     inputButton: {
//         backgroundColor: '#ad793e',
//         color: '#fff',
//         padding: 14,
//         width: '100%',
//     }
// })