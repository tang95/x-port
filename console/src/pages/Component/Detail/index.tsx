import React, {useEffect} from "react";
import {PageContainer, ProDescriptions} from "@ant-design/pro-components";
import useRequest from "@ahooksjs/use-request";
import {ComponentService} from "@/services";
import {useParams} from "@umijs/max";
import {Button, Space, Tag, Typography} from "antd";
import ProCard from "@ant-design/pro-card";
import {EditOutlined} from "@ant-design/icons";
import Basic from "./components/Basic";
import Tools from "@/pages/Component/Detail/components/Tools";
import Activity from "@/pages/Component/Detail/components/Activity";
import Scorecard from "@/pages/Component/Detail/components/Scorecard";

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
            <Button type={"link"} danger>下线</Button>
        </Space>
    )

    return (
        <PageContainer title={data?.name} tags={tags}
                       header={{style: {backgroundColor: "white"}}}
                       content={<Typography.Text type={"secondary"}>{data?.description}</Typography.Text>}
                       loading={loading} extra={extra}
                       tabList={[
                           {key: "overview", tab: "概要"},
                           {key: "scorecard", tab: "记分卡"},
                           {key: "dependencies", tab: "依赖组件"},
                           {key: "activity", tab: "最近变更"},
                       ]}
        >
            <ProCard ghost gutter={[16, 16]} wrap>
                <ProCard colSpan={12} title={"基础信息"}
                         extra={<Button type={"text"} size={"small"} icon={<EditOutlined/>}/>}>
                    {data && <Basic component={data}/>}
                </ProCard>
                <ProCard colSpan={12} title={"工具"}
                         extra={<Button type={"text"} size={"small"} icon={<EditOutlined/>}/>}>
                    {data && <Tools component={data}/>}
                </ProCard>
                <ProCard colSpan={24} title={"记分卡"}
                         extra={<Button type={"link"} size={"small"}>查看更多</Button>}>
                    {data && <Scorecard component={data}/>}
                </ProCard>
                <ProCard colSpan={24} title={"最近变更"}
                         extra={<Button type={"link"} size={"small"}>查看更多</Button>}>
                    {data && <Activity component={data}/>}
                </ProCard>
            </ProCard>
        </PageContainer>
    )
}

export default ComponentDetailPage;
