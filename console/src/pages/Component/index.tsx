import React from "react";
import {LightFilter, PageContainer, ProColumnType, ProFormSelect, ProTable} from "@ant-design/pro-components";
import useRequest from "@ahooksjs/use-request";
import {ComponentService} from "@/services";
import {Button, Card, Col, Input, Row, Space} from "antd";
import styles from "./index.less";
import {Link} from "@umijs/max";
import {LinkOutlined} from "@ant-design/icons";

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
            valueEnum: {
                "tier1": {
                    text: "第一层",
                    color: "rgba(94,0,150,0.9)"
                },
                "tier2": {
                    text: "第二层",
                    color: "rgba(94,0,150,0.6)"
                },
                "tier3": {
                    text: "第三层",
                    color: "rgba(94,0,150,0.30)"
                },
                "tier4": {
                    text: "第四层",
                    color: "rgba(94,0,150,0.10)"
                }
            },
            width: 100
        },
        {
            title: '生命周期',
            dataIndex: 'lifecycle',
            valueEnum: {
                "stabled": {
                    text: "稳定",
                    color: "green"
                },
                "alpha": {
                    text: "实验",
                    color: "blue"
                },
                "destroy": {
                    text: "销毁",
                    color: "grey"
                },
            },
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
    const {data, loading} = useRequest(ComponentService.listComponents, {
        defaultParams: [{
            page: {size: 10, page: 1}
        }]
    })
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
                <Row justify={"center"} gutter={[12, 24]}>
                    <Col span={18}>
                        <Input.Search placeholder={"搜索组件"} size={"large"}/>
                    </Col>
                    <Col span={18}>
                        <LightFilter bordered>
                            <ProFormSelect placeholder={"类型"}/>
                            <ProFormSelect placeholder={"层级"}/>
                            <ProFormSelect placeholder={"负责团队"}/>
                            <ProFormSelect placeholder={"生命周期"}/>
                            <ProFormSelect placeholder={"标签"}/>
                        </LightFilter>
                    </Col>
                </Row>
                <ProTable columns={columns} rowKey={"id"} className={styles.tableContainer}
                          dataSource={data?.data} pagination={{total: 200}} search={false}
                          options={false}/>
            </Card>
        </PageContainer>
    )
}

export default ComponentPage;
