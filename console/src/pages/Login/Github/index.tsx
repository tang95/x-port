import React, {useEffect} from "react";
import {Flex, Spin} from "antd";
import styles from "./index.less";
import {history, useModel, useSearchParams} from "@umijs/max";
import {AuthService} from "@/services";
import {TOKEN_NAME} from "@/constants";

const GithubPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const {setInitialState} = useModel("@@initialState");
    useEffect(() => {
        const code = searchParams.get("code");
        if (code && code.length > 0) {
            AuthService.validate("github", code).then(user => {
                localStorage.setItem(TOKEN_NAME, JSON.stringify(user))
                setInitialState(user)
                history.push("/");
            }).catch(e => {
                history.push("/login");
            })
        }
    }, [searchParams])
    return (
        <Flex align={"center"} justify={"center"} className={styles.container}>
            <Spin size={"large"}/>
        </Flex>
    )
}

export default GithubPage;
