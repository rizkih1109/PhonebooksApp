declare type RootStackParamList = {
    (tabs): undefined;
    add: undefined;
};

declare interface User {
    id: string;
    name: string;
    phone: string;
    avatar: string;
    sent?: boolean
}

declare interface NewUser {
    id: string;
    name: string;
    phone: string
}

declare interface Avatar {
    id: string,
    file: FormData
}

declare interface FormResponse {
    id: string;
    user: User
}

declare interface PhoneBarProps {
    keyword: string;
    setKeyword: (keyword: string) => void;
    sort: string;
    setSort: (sort: string) => void;
}

declare interface PhoneListProps {
    keyword: string;
    sort: string;
}

declare type RootStackParamList = {
    add: undefined;
    modal: undefined
};

type addNavigate = NativeStackNavigationProp<RootStackParamList, 'add'>;
type modalNavigate = NativeStackNavigationProp<RootStackParamList, 'modal'>;
