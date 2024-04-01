import React, {useEffect} from "react";
import {PageContainer, ProDescriptions} from "@ant-design/pro-components";
import useRequest from "@ahooksjs/use-request";
import {ComponentService} from "@/services";
import {useParams} from "@umijs/max";
import {Avatar, Button, Space, Tag, Tooltip} from "antd";
import ProCard from "@ant-design/pro-card";
import {AntDesignOutlined, GitlabOutlined, PlusOutlined, UsergroupAddOutlined, UserOutlined} from "@ant-design/icons";

const ComponentDetailPage: React.FC = () => {
    const params = useParams();
    const {data, loading, run} = useRequest((id: string) => ComponentService.getComponent(id), {
        manual: true
    })

    useEffect(() => {
        if (params.id) {
            run(params.id)
        }
    }, [params])

    const content = (
        <ProDescriptions/>
    )

    const tags = data?.tags?.map((tag) => <Tag color={"blue"}>{tag}</Tag>)

    const extra = (
        <Space>
            <Button>编辑</Button>
            <Button type={"link"} danger>删除</Button>
        </Space>
    )

    return (
        <div style={{background: '#ffffff'}}>
            <PageContainer fixedHeader
                title={data?.name} subTitle={data?.description} tags={tags}
                content={content} loading={loading} extra={extra}
                tabList={[
                    {key: "overview", tab: "概要"},
                    {key: "dependencies", tab: "依赖"},
                    {key: "activity", tab: "活动"},
                    {key: "scorecard", tab: "记分卡"}
                ]}
            >
                <ProCard ghost gutter={[16, 16]} wrap>
                    <ProCard colSpan={12}>
                        <ProDescriptions title={"团队"}>
                            <Avatar.Group maxCount={2} maxStyle={{color: '#f56a00', backgroundColor: '#fde3cf'}}>
                                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"/>
                                <Avatar style={{backgroundColor: '#f56a00'}}>K</Avatar>
                                <Tooltip title="Ant User" placement="top">
                                    <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                                </Tooltip>
                                <Avatar style={{backgroundColor: '#1677ff'}} icon={<AntDesignOutlined/>}/>
                            </Avatar.Group>
                        </ProDescriptions>
                        <ProDescriptions title={"联系"}
                                         extra={<Button type={"text"} size={"small"} icon={<PlusOutlined/>}/>}>
                            <Space direction={"vertical"}>
                                <Button icon={<UsergroupAddOutlined/>} type={"link"}>问题反馈群</Button>
                                <Button icon={<UsergroupAddOutlined/>} type={"link"}>需求群</Button>
                                <Button icon={<UsergroupAddOutlined/>} type={"link"}>值班群</Button>
                            </Space>
                        </ProDescriptions>
                        <ProDescriptions title={"仓库"}
                                         extra={<Button type={"text"} size={"small"} icon={<PlusOutlined/>}/>}>
                            <Space direction={"vertical"}>
                                <Button icon={<GitlabOutlined/>} type={"link"}>demo-service</Button>
                                <Button icon={<GitlabOutlined/>} type={"link"}>demo-library</Button>
                                <Button icon={<GitlabOutlined/>} type={"link"}>demo-console</Button>
                            </Space>
                        </ProDescriptions>
                    </ProCard>
                    <ProCard colSpan={12} title={"工具"}
                             extra={<Button type={"text"} size={"small"} icon={<PlusOutlined/>}/>}>

                    </ProCard>
                    <ProCard colSpan={24} title={"记分卡"}>
                    </ProCard>
                    <ProCard colSpan={24} title={"最近活动"}>

                    </ProCard>
                </ProCard>
            </PageContainer>
        </div>
    )
}

export default ComponentDetailPage;
