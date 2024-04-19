import React, {useEffect} from "react";
import {PageContainer} from "@ant-design/pro-components";
import useRequest from "@ahooksjs/use-request";
import {ComponentService} from "@/services";
import {useParams, useSearchParams} from "@umijs/max";
import {Tag, Typography} from "antd";
import Overview from "./components/Overview";
import Scorecard from "./components/Scorecard";
import Dependencies from "./components/Dependencies";
import Activity from "./components/Activity";

export default () => {
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [tabActive, setTabActive] = React.useState("overview")
    const {data, loading, run, refresh, mutate} = useRequest((id: string) => ComponentService.getComponent(id), {
        manual: true
    })

    useEffect(() => {
        if (searchParams.get("tab")) {
            setTabActive(searchParams.get("tab") as string)
        }
    }, [searchParams])

    useEffect(() => {
        if (params.id) {
            run(params.id)
        }
    }, [params])

    if (!data) {
        return null;
    }

    const tags = data?.tags?.map((tag) => <Tag color={"blue"}>{tag}</Tag>)

    return (
        <PageContainer
            title={data?.name} tags={tags} header={{style: {backgroundColor: "white"}}}
            content={<Typography.Text type={"secondary"}>{data?.description}</Typography.Text>}
            loading={loading} tabActiveKey={tabActive}
            onTabChange={(value) => {
                setTabActive(value)
                setSearchParams({...searchParams, tab: value})
            }}
            tabList={[
                {key: "overview", tab: "概要"},
                {key: "scorecard", tab: "记分卡"},
                {key: "dependencies", tab: "依赖组件"},
                {key: "activity", tab: "最近变更"},
            ]}
        >
            {tabActive === "overview" && <Overview component={data} callback={refresh}/>}
            {tabActive === "scorecard" && <Scorecard component={data}/>}
            {tabActive === "dependencies" && <Dependencies component={data}/>}
            {tabActive === "activity" && <Activity component={data}/>}
        </PageContainer>
    )
};
