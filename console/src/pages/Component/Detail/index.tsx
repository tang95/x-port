import React, {useEffect} from "react";
import {ModalForm, PageContainer, ProFormSelect, ProFormText, ProFormTextArea} from "@ant-design/pro-components";
import useRequest from "@ahooksjs/use-request";
import {ComponentService} from "@/services";
import {useParams} from "@umijs/max";
import {Button, Space, Tag, Typography} from "antd";
import ProCard from "@ant-design/pro-card";
import {EditOutlined} from "@ant-design/icons";
import Basic from "./components/Basic";
import Tools from "./components/Tools";
import Activity from "./components/Activity";
import Scorecard from "./components/Scorecard";

const EditBasicInfo = (props: API.Component) => {
    return (
        <ModalForm
            width={500} title={"基本信息"}
            trigger={<Button type={"text"} size={"small"} icon={<EditOutlined/>}/>}
            initialValues={props}
        >
            <ProFormSelect name={"type"} label={"类型"}/>
            <ProFormSelect name={"lifecycle"} label={"生命周期"}/>
            <ProFormSelect name={"tier"} label={"层级"}/>
            <ProFormSelect name={"team"} label={"团队"}/>
            <ProFormSelect name={"repos"} label={"仓库"}/>
            <ProFormSelect name={"chats"} label={"联系"}/>
            <ProFormTextArea name={"annotation"} label={"注解"}/>
        </ModalForm>
    )
}

const Overview = (props: API.Component) => {
    return (
        <ProCard ghost gutter={[16, 16]} wrap>
            <ProCard colSpan={12} title={"基础信息"} extra={<EditBasicInfo  {...props}/>}>
                <Basic component={props}/>
            </ProCard>
            <ProCard colSpan={12} title={"工具"}
                     extra={<Button type={"text"} size={"small"} icon={<EditOutlined/>}/>}>
                <Tools component={props}/>
            </ProCard>
            <ProCard colSpan={24} title={"记分卡"}
                     extra={<Button type={"link"} size={"small"}>查看更多</Button>}>
                <Scorecard component={props}/>
            </ProCard>
            <ProCard colSpan={24} title={"最近变更"}
                     extra={<Button type={"link"} size={"small"}>查看更多</Button>}>
                <Activity component={props}/>
            </ProCard>
        </ProCard>
    )
}

const EditMainInfo = (props: API.Component) => {
    return (
        <ModalForm
            width={500} title={"主要信息"}
            trigger={<Button>编辑</Button>}
            initialValues={props}
        >
            <ProFormText name={"name"} label={"名称"}/>
            <ProFormTextArea name={"description"} label={"描述"}/>
            <ProFormSelect name={"tags"} label={"标签"} fieldProps={{mode: "tags"}}/>
        </ModalForm>
    )
}

const ComponentDetailPage: React.FC = () => {
    const params = useParams();
    const [tabActive, setTabActive] = React.useState("overview")
    const {data, loading, run} = useRequest((id: string) => ComponentService.getComponent(id), {
        manual: true
    })

    useEffect(() => {
        if (params.id) {
            run(params.id)
        }
    }, [params])

    if (!data) {
        return null;
    }

    const tags = data?.tags?.map((tag) => <Tag color={"blue"}>{tag}</Tag>)

    const extra = (
        <Space>
            <EditMainInfo {...data}/>
            <Button type={"link"} danger>下线</Button>
        </Space>
    )

    return (
        <PageContainer
            title={data?.name} tags={tags}
            header={{style: {backgroundColor: "white"}}}
            content={<Typography.Text type={"secondary"}>{data?.description}</Typography.Text>}
            loading={loading} extra={extra} tabActiveKey={tabActive} onTabChange={setTabActive}
            tabList={[
                {key: "overview", tab: "概要"},
                {key: "scorecard", tab: "记分卡"},
                {key: "dependencies", tab: "依赖组件"},
                {key: "activity", tab: "最近变更"},
            ]}
        >
            {tabActive === "overview" && <Overview {...data}/>}
        </PageContainer>
    )
}

export default ComponentDetailPage;
