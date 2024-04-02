import {Avatar, Button, Descriptions, Space, Tooltip} from "antd";
import {
    AntDesignOutlined,
    EditOutlined,
    GitlabOutlined,
    PlusOutlined,
    UsergroupAddOutlined,
    UserOutlined
} from "@ant-design/icons";
import React from "react";
import {ProDescriptions} from "@ant-design/pro-components";
import {ProDescriptionsItemProps} from "@ant-design/pro-descriptions";

export type Props = {
    data: API.Component
}
export default ({data}: Props) => {
    const columns: ProDescriptionsItemProps[] = [
        {
            title: "类型",
            dataIndex: "type",
        },
        {
            title: "层级",
            dataIndex: "tier",
        },
        {
            title: "团队",
            dataIndex: "owner",
            render: (text, record) => {
                return (
                    <Avatar.Group maxCount={2} maxStyle={{color: '#f56a00', backgroundColor: '#fde3cf'}}>
                        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"/>
                        <Avatar style={{backgroundColor: '#f56a00'}}>K</Avatar>
                        <Tooltip title="Ant User" placement="top">
                            <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                        </Tooltip>
                        <Avatar style={{backgroundColor: '#1677ff'}} icon={<AntDesignOutlined/>}/>
                    </Avatar.Group>
                )
            }
        },
        {
            title: "联系",
            dataIndex: "onCall",
            render: (text, record) => {
                return (
                    <Space direction={"vertical"}>
                        <Button icon={<UsergroupAddOutlined/>} type={"link"}>问题反馈群</Button>
                        <Button icon={<UsergroupAddOutlined/>} type={"link"}>需求群</Button>
                        <Button icon={<UsergroupAddOutlined/>} type={"link"}>值班群</Button>
                    </Space>
                )
            }
        },
        {
            title: "仓库",
            dataIndex: "repository",
            render: (text, record) => {
                return (
                    <Space direction={"vertical"}>
                        <Button icon={<GitlabOutlined/>} type={"link"}>demo-service</Button>
                        <Button icon={<GitlabOutlined/>} type={"link"}>demo-library</Button>
                        <Button icon={<GitlabOutlined/>} type={"link"}>demo-console</Button>
                    </Space>
                )
            }
        }
    ]
    return (
        <ProDescriptions columns={columns} dataSource={data} colon={false}/>
    )
}
