// 全局共享数据示例
import {useModel} from "@umijs/max";

const useUser = (): [API.AuthUser | null, boolean] => {
    const {initialState, loading} = useModel('@@initialState');
    return [initialState as API.AuthUser | null, loading];
};

export default useUser;
