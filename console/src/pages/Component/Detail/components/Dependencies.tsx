import {ProCard, ProColumnType, ProTable} from "@ant-design/pro-components";
import {Space} from "antd";
import {ComponentType, convertComponentType, LifeCycle, Tier} from "@/constants/component";
import {Link} from "@@/exports";
import React from "react";
import useRequest from "@ahooksjs/use-request";
import {ComponentService} from "@/services";

export type Props = {
    component: API.Component;
};

export default (props: Props) => {

    const {data, loading} = useRequest(
        () => ComponentService.getComponent(
            props.component.id, {page: {page: 1, size: 10}}, {page: {page: 1, size: 10}}
        )
    )

    const columns: ProColumnType<API.Component>[] = [
        {
            title: '组件',
            sorter: true,
            dataIndex: 'name',
            render: (dom, record) => {
                return (
                    <Space>
                        <span>{convertComponentType(record.type as keyof typeof ComponentType).icon}</span>
                        <Link to={`/component/detail/${record.id}`}>
                            {dom}
                        </Link>
                    </Space>
                )
            },
            width: "20%"
        },
        {
            title: '描述',
            dataIndex: 'description',
            ellipsis: true,
        },
        {
            title: '层级',
            dataIndex: 'tier',
            valueType: "select",
            valueEnum: Tier,
            width: 100
        },
        {
            title: '生命周期',
            dataIndex: 'lifecycle',
            valueEnum: LifeCycle,
            width: 100
        },
        {
            title: "团队",
            dataIndex: 'team',
            render: (_, record) => {
                return <Link to={"/team"}>
                    {record.owner.name}
                </Link>
            },
            width: 200
        }
    ]
    return (
        <ProCard ghost wrap gutter={[16, 16]}>
            <ProCard title={"依赖"} colSpan={24}>
                <ProTable dataSource={data?.dependency?.data || []} loading={loading}
                          search={false} options={false} pagination={false} columns={columns}/>
            </ProCard>
            <ProCard title={"被依赖"} colSpan={24}>
                <ProTable dataSource={data?.dependents?.data || []} loading={loading}
                          search={false} options={false} pagination={false} columns={columns}/>
            </ProCard>
        </ProCard>
    )
}
