import React from "react";
import {GitlabOutlined} from "@ant-design/icons";
import {Button} from "antd";

const Github: React.FC<{ providers: string[] }> = (props) => {
    const {providers} = props;
    if (!providers.includes("gitlab")) {
        return null;
    }
    return (
        <Button size={"large"} icon={<GitlabOutlined/>}>
            Gitlab
        </Button>
    )
}

export default Github;
