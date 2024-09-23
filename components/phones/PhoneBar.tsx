import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PhoneBar({ keyword, setKeyword, sort, setSort }: PhoneBarProps) {

    const navigation = useNavigation<addNavigate>();
    const sorting = () => {
        const newSort = sort === 'asc' ? 'desc' : 'asc'
        setSort(newSort)
    }

    return (
        <View style={styles.titleContainer}>
            <TouchableOpacity style={styles.button} onPress={sorting}>
                <FontAwesome
                    name={sort == 'asc' ? "sort-alpha-desc" : "sort-alpha-asc"}
                    style={styles.fontButton}
                />
            </TouchableOpacity>
            <View style={styles.searchContainer}>
                <FontAwesome
                    name="search"
                    style={styles.search}
                />
                <TextInput
                    style={styles.input}
                    value={keyword}
                    onChangeText={setKeyword}
                />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('add')}
            >
                <FontAwesome5
                    name="user-plus"
                    style={styles.fontButton}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        marginBottom: 12
    },
    button: {
        padding: 15,
        backgroundColor: '#ad793e',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 0
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        paddingHorizontal: 10,
        height: 40,
        width: '75%',
        marginLeft: 10,
        marginRight: 10
    },
    input: {
        flex: 1,
        paddingVertical: 8,
    },
    fontButton: {
        fontSize: 10,
        color: 'black'
    },
    search: {
        marginRight: 10,
        color: 'black',
        fontSize: 15
    },

});
