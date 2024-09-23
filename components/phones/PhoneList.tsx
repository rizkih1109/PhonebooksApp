import { useEffect } from "react";
import { FlatList, View } from "react-native";
import PhoneCard from "./PhoneCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { loadPhoneAsync } from "@/lib/redux/phonebooks/phonebooksSlice";

export default function PhoneList({ keyword, sort }: PhoneListProps) {

    const dispatch: any = useDispatch()
    const { value: users, page, limit, hasMore } = useSelector((state: RootState) => state.users)

    const loadMore = () => {
        if (hasMore) {
            dispatch(loadPhoneAsync({ page: page + 1, limit, keyword, sort }))
        }
    }

    useEffect(() => {
        dispatch(loadPhoneAsync({ keyword, sort, limit, page: 1 }))
    }, [dispatch, keyword, sort, limit])

    return (
        <View>
            <FlatList
                data={users}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <PhoneCard user={item} />}
                onEndReached={loadMore}
            />
        </View>
    )
}