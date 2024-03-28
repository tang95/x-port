import React, {useEffect} from "react";
import {PageContainer, ProDescriptions} from "@ant-design/pro-components";
import useRequest from "@ahooksjs/use-request";
import {ComponentService} from "@/services";
import {useParams} from "@umijs/max";
import {Button, Space, Tag} from "antd";
import ProCard from "@ant-design/pro-card";

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
            <Button>删除</Button>
            <Button>取消</Button>
        </Space>
    )

    return (
        <PageContainer
            title={data?.name} subTitle={data?.description} tags={tags}
            content={content} loading={loading} extra={extra}
            tabList={[
                {key: "overview", tab: "概要"},
                {key: "config", tab: "配置"},
                {key: "log", tab: "日志"}
            ]}
        >
            <ProCard ghost gutter={[16, 16]}>
                <ProCard
                    style={{marginBlockStart: -8}}
                    gutter={[16, 16]} ghost split={"horizontal"} colSpan={18}>
                    <ProCard title={"记分卡"}>

                    </ProCard>
                    <ProCard title={"最近变更"}>

                    </ProCard>
                </ProCard>
                <ProCard colSpan={6}>
                    <ProDescriptions title={"团队"}/>
                    <ProDescriptions title={"联系"}/>
                    <ProDescriptions title={"监控"}/>
                    <ProDescriptions title={"文档"}/>
                    <ProDescriptions title={"仓库"}/>
                </ProCard>
            </ProCard>
        </PageContainer>
    )
}

export default ComponentDetailPage;
