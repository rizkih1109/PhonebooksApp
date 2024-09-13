import PhoneBar from "@/components/phones/PhoneBar";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import PhoneList from "./PhoneList";

export default function PhoneBox() {
    const [users, setUsers] = useState<User[]>([])



    return (
        <View style={styles.mainContainer}>
            <View>
                <PhoneBar />
            </View>
                <PhoneList />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        gap: 40,
        marginTop: 70,
        marginRight: 15,
        marginLeft: 15
    }
})