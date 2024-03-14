import {LoginForm} from '@ant-design/pro-components';
import React from "react";
import styles from './index.less';
import {Helmet, useQuery} from '@umijs/max';
import {Divider, Flex, Spin} from 'antd';
import {AuthService} from "@/services";
import Github from "./component/Github";
import Gitlab from "./component/Gitlab";

const LoginPage: React.FC = () => {
    const {data, isLoading} = useQuery({ queryKey: ['auth', 'providers'], queryFn: AuthService.providers });

    const methods = () => {
        if (isLoading) {
            return (
                <Flex justify={"center"} align={"center"} gap={"middle"}>
                    <Spin/>
                </Flex>
            )
        }
        if (!data) {
            return null
        }
        return (
            <Flex justify={"center"} align={"center"} gap={"middle"}>
                <Github providers={data}/>
                <Gitlab providers={data}/>
            </Flex>
        )
    }
    return (
        <div className={styles.container}>
            <Helmet><title>登录 - X-Port</title></Helmet>
            <LoginForm
                logo="/favicon.png"
                title="X-Port"
                subTitle="改善开发者体验，提升工作效率"
                contentStyle={{
                    minWidth: 280,
                    justifyContent: "center",
                    maxWidth: '75vw',
                }}
                containerStyle={{justifyContent: "center"}}
                submitter={false}
                actions={[
                    <div>
                        <Divider plain>
                            登录方式
                        </Divider>
                        {methods()}
                    </div>
                ]}
            >
            </LoginForm>
        </div>
    );
};

export default LoginPage;
