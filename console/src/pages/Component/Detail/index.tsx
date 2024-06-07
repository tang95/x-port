import React, {useEffect} from "react";
import {PageContainer} from "@ant-design/pro-components";
import useRequest from "@ahooksjs/use-request";
import {ComponentService} from "@/services";
import {useParams, useSearchParams} from "@umijs/max";
import {Spin, Tag} from "antd";
import Overview from "./components/Overview";
import Scorecard from "./components/Scorecard";
import Dependencies from "./components/Dependencies";
import Activity from "./components/Activity";

export default () => {
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [tabActive, setTabActive] = React.useState("overview")
    const {data, loading, run, refresh} = useRequest((id: string) => ComponentService.getComponent(id), {
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
    }, [params.id])

    if (!data || loading) {
        return <PageContainer loading={true}/>;
    }

    const tags = data?.tags?.map((tag) => <Tag color={"blue"}>{tag}</Tag>)

    return (
        <PageContainer
            title={data?.name} tags={tags} header={{style: {backgroundColor: "white"}}}
            loading={loading} tabActiveKey={tabActive} subTitle={data?.description}
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
