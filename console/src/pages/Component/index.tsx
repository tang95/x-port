import React from "react";
import {PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import useRequest from "@ahooksjs/use-request";
import {ComponentService} from "@/services";

const ComponentPage: React.FC = () => {
    const columns: ProColumns<API.Component>[] = [
        {
            title: '组件',
            dataIndex: 'name'
        },
        {
            title: '描述',
            dataIndex: 'description',
        },
        {
            title: '等级',
            dataIndex: 'tier',
            width: 100
        },
        {
            title: '代码仓库',
            dataIndex: 'repository',
            width: 200
        },
        {
            title: "团队",
            dataIndex: 'team',
            renderText: (_, record) => {
                return record.owner.name
            },
            width: 200
        }
    ]
    const {data, loading} = useRequest(ComponentService.listComponents)
    return (
        <PageContainer ghost>
            <ProTable columns={columns} rowKey={"id"}
                      pagination={{total: data?.total}} search={false}
                      dataSource={data?.data}/>
        </PageContainer>
    )
}

export default ComponentPage;
