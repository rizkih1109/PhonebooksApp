import PhoneBar from "@/components/phones/PhoneBar";
import { StyleSheet, View } from "react-native";
import PhoneList from "./PhoneList";
import { useState } from "react";
import { ThemedView } from "../ThemedView";

export default function PhoneBox() {

    const [keyword, setKeyword] = useState<string>('')
    const [sort, setSort] = useState<string>('asc')

    return (
        <ThemedView>
            <View style={styles.mainContainer}>
                <View>
                    <PhoneBar keyword={keyword} setKeyword={setKeyword} sort={sort} setSort={setSort} />
                </View>
                <PhoneList keyword={keyword} sort={sort} />
            </View>
        </ThemedView>
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