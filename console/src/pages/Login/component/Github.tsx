import React, {useState} from "react";
import {GithubOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {AuthService} from "@/services";

const Github: React.FC<{ providers: string[] }> = (props) => {
    const [loading, setLoading] = useState(false)

    const {providers} = props;
    if (!providers.includes("github")) {
        return null;
    }
    return (
        <Button loading={loading} onClick={() => {
            setLoading(true);
            AuthService.getAuthorizeUrl("github").then(({authorizeUrl}) => {
                window.location.href = authorizeUrl
            }).catch(() => {
                setLoading(false)
            })
        }} size={"large"} icon={<GithubOutlined/>}>
            Github
        </Button>
    )
}

export default Github;
