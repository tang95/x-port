import React from "react";
import {LightFilter, PageContainer, ProColumnType, ProFormSelect, ProTable} from "@ant-design/pro-components";
import useRequest from "@ahooksjs/use-request";
import {ComponentService} from "@/services";
import {Button, Card, Col, Input, Row, Space} from "antd";
import styles from "./index.less";
import {Link} from "@umijs/max";
import {LinkOutlined} from "@ant-design/icons";
import {ComponentType, LifeCycle, Tier} from "@/constants/component";

const ComponentPage: React.FC = () => {
    const columns: ProColumnType<API.Component>[] = [
        {
            title: '组件',
            dataIndex: 'name',
            render: (dom, record) => {
                return <Link to={"/"}>
                    {dom}
                </Link>
            },
            width: "30%"
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
            title: '代码仓库',
            dataIndex: 'repository',
            render: (_, record) => {
                return <Link to={"/repository"}>
                    <Space>
                        <LinkOutlined/>
                        <span>demo.git</span>
                    </Space>
                </Link>
            },
            width: 200
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
        },
        {
            title: '描述',
            dataIndex: 'description',
        },
    ]

    const [page, setPage] = React.useState<API.PageInput>({page: 1, size: 10})
    const [fitter, setFilter] = React.useState<API.ComponentFilter>({})

    const {data, loading} = useRequest(
        () => ComponentService.listComponents(page, fitter),
        {refreshDeps: [page, fitter], debounceInterval: 500}
    )
    return (
        <PageContainer
            subTitle={"搜索发现组织内部所有软件组件"}
            extra={
                <>
                    <Button type={"primary"}>创建</Button>
                    <Button>导入</Button>
                </>
            }
        >
            <Card>
                <Row justify={"center"} gutter={[10, 10]}>
                    <Col span={18}>
                        <Input.Search onChange={(event) => {
                            setFilter({
                                ...fitter,
                                keywords: event.currentTarget.value
                            });
                        }} placeholder={"搜索组件"} size={"large"}/>
                    </Col>
                    <Col span={18}>
                        <LightFilter onFinish={async (formData) => {
                            setFilter({
                                ...fitter,
                                type: formData.type,
                                tags: formData.tags,
                                owner: formData.owner,
                                lifecycle: formData.lifecycle,
                                tier: formData.tier
                            });
                        }}>
                            <ProFormSelect placeholder={"类型"} name={"type"} valueEnum={ComponentType}/>
                            <ProFormSelect placeholder={"层级"} name={"tier"} valueEnum={Tier}/>
                            <ProFormSelect placeholder={"负责团队"} name={"owner"} showSearch/>
                            <ProFormSelect placeholder={"生命周期"} name={"lifecycle"} valueEnum={LifeCycle}/>
                            <ProFormSelect placeholder={"标签"} name={"tags"} mode={"multiple"} showSearch/>
                        </LightFilter>
                    </Col>
                </Row>
                <ProTable columns={columns} rowKey={"id"} className={styles.tableContainer}
                          dataSource={data?.data} pagination={{total: 200}} search={false}
                          options={false} loading={loading}/>
            </Card>
        </PageContainer>
    )
}

export default ComponentPage;
