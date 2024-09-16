import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import PhoneCard from "./PhoneCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { loadPhoneAsync } from "@/lib/redux/phonebooks/phonebooksSlice";

export default function PhoneList() {
    
    const dispatch: any = useDispatch()
    const users = useSelector((state: RootState) => state.users.value)
    
    useEffect(() => {
        dispatch(loadPhoneAsync())
    }, [dispatch])
    
    return (
        <View>
            <FlatList
                data={users}
                renderItem={({ item }) => <PhoneCard user={item} key={item.id} />}
            />
        </View>
    )
}