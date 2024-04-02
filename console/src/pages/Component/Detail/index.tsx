import React, {useEffect} from "react";
import {PageContainer, ProDescriptions} from "@ant-design/pro-components";
import useRequest from "@ahooksjs/use-request";
import {ComponentService} from "@/services";
import {useParams} from "@umijs/max";
import {Button, Space, Tag} from "antd";
import ProCard from "@ant-design/pro-card";
import {PlusOutlined} from "@ant-design/icons";
import Basic from "./components/Basic";

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
        <PageContainer title={data?.name} subTitle={data?.description} tags={tags}
                       content={content} loading={loading} extra={extra} fixedHeader
                       tabList={[
                           {key: "overview", tab: "概要"},
                           {key: "dependencies", tab: "依赖"},
                           {key: "activity", tab: "活动"},
                           {key: "scorecard", tab: "记分卡"}
                       ]}
        >
            <ProCard ghost gutter={[16, 16]} wrap>
                <ProCard colSpan={12} title={"基础信息"}>
                    {data && <Basic data={data}/>}
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
    )
}

export default ComponentDetailPage;
