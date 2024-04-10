import {Button, Divider, Flex, Typography} from "antd";
import React from "react";
import {DashboardOutlined, LinkOutlined} from "@ant-design/icons";

export type Props = {
    component: API.Component
}
export default (props: Props) => {
    return (
        <Flex wrap="wrap" gap="small">
            <Divider orientation={"left"} style={{marginTop: "0", marginBottom: "8px"}} orientationMargin={0}>
                <Typography.Text type={"secondary"}>Dashboard</Typography.Text>
            </Divider>
            <Button icon={<DashboardOutlined/>}>
                Dashboard
            </Button>
            <Button icon={<LinkOutlined/>}>
                Service Logs
            </Button>
            <Button icon={<LinkOutlined/>}>
                Tracing
            </Button>
            <Button icon={<LinkOutlined/>}>
                On-Call
            </Button>
            <Divider orientation={"left"} style={{marginTop: "0", marginBottom: "8px"}}  orientationMargin={0}>
                <Typography.Text type={"secondary"}>Document</Typography.Text>
            </Divider>
            <Button icon={<LinkOutlined/>}>
                设计文档
            </Button>
            <Button icon={<LinkOutlined/>}>
                使用手册
            </Button>
            <Button icon={<LinkOutlined/>}>
                Runbook
            </Button>
            <Divider orientation={"left"} style={{marginTop: "0", marginBottom: "8px"}}  orientationMargin={0}>
                <Typography.Text type={"secondary"}>Other</Typography.Text>
            </Divider>
            <Button icon={<LinkOutlined/>}>
                Jira issues
            </Button>
        </Flex>
    )
}
