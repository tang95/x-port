import {Flex, Space} from "antd";
import {GitlabOutlined, UsergroupAddOutlined} from "@ant-design/icons";
import React from "react";
import {ProDescriptions} from "@ant-design/pro-components";
import {ProDescriptionsItemProps} from "@ant-design/pro-descriptions";
import {ComponentType, LifeCycle, Tier} from "@/constants/component";

export type Props = {
    component: API.Component
}
export default ({component}: Props) => {
    const columns: ProDescriptionsItemProps[] = [
        {
            title: "类型",
            dataIndex: "type",
            valueType: "select",
            valueEnum: ComponentType
        },
        {
            title: "生命周期",
            dataIndex: "lifecycle",
            valueType: "select",
            valueEnum: LifeCycle
        },
        {
            title: "层级",
            dataIndex: "tier",
            valueType: "select",
            valueEnum: Tier
        },
        {
            title: "团队",
            dataIndex: "owner",
            render: (text, record) => {
                return (
                    <a>基础设施</a>
                )
            }
        },
        {
            title: "联系",
            dataIndex: "onCall",
            render: (text, record) => {
                return (
                    <Flex vertical gap={5}>
                        <a><Space><UsergroupAddOutlined/>问题反馈群</Space></a>
                        <a><Space><UsergroupAddOutlined/>需求群</Space></a>
                        <a><Space><UsergroupAddOutlined/>值班群</Space></a>
                    </Flex>
                )
            }
        },
        {
            title: "仓库",
            dataIndex: "repository",
            render: (text, record) => {
                return (
                    <Flex vertical gap={5}>
                        <a><Space><GitlabOutlined/>demo-service</Space></a>
                        <a><Space><GitlabOutlined/>demo-library</Space></a>
                        <a><Space><GitlabOutlined/>demo-console</Space></a>
                    </Flex>
                )
            }
        },
        {
            title: "注解",
            dataIndex: "annotations",
            valueType: "jsonCode",
            fieldProps: {
                style: {maxHeight: 75}
            },
            renderText: (text, record) => {
                return JSON.stringify(text)
            }
        }
    ]
    return (
        <ProDescriptions columns={columns} dataSource={component} colon={false}/>
    )
}
