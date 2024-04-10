import React from "react";
import {LightFilter, PageContainer, ProColumnType, ProFormSelect, ProTable} from "@ant-design/pro-components";
import {Button, Card, Col, Input, Row, Space} from "antd";
import styles from "./index.less";
import {Link} from "@umijs/max";
import {LinkOutlined} from "@ant-design/icons";
import {ComponentType, LifeCycle, Tier} from "@/constants/component";
import {ComponentService, TeamService} from "@/services";
import {TableSortToApiSort} from "@/utils/sort";

const ComponentPage: React.FC = () => {
    const columns: ProColumnType<API.Component>[] = [
        {
            title: '组件',
            sorter: true,
            dataIndex: 'name',
            render: (dom, record) => {
                return <Link to={`/component/detail/${record.id}`}>
                    {dom}
                </Link>
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
        }
    ]

    const [filter, setFilter] = React.useState<API.ComponentFilter>({})
    const fetchTeams = async () => {
        const response = await TeamService.queryTeams({page: 1, size: 5});
        return response.data.map(team => ({
            label: team.name,
            value: team.id,
        }));
    }
    const fetchTags = async () => {
        const response = await ComponentService.queryTags();
        return response.map(tag => ({
            label: tag,
            value: tag,
        }));
    }

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
                                ...filter,
                                keywords: event.currentTarget.value
                            });
                        }} placeholder={"搜索组件"} size={"large"}/>
                    </Col>
                    <Col span={18}>
                        <LightFilter onFinish={async (formData) => {
                            setFilter({
                                ...filter,
                                type: formData.type,
                                tags: formData.tags,
                                owner: formData.owner,
                                lifecycle: formData.lifecycle,
                                tier: formData.tier
                            });
                        }}>
                            <ProFormSelect placeholder={"类型"} name={"type"} valueEnum={ComponentType}/>
                            <ProFormSelect placeholder={"层级"} name={"tier"} valueEnum={Tier}/>
                            <ProFormSelect placeholder={"生命周期"} name={"lifecycle"} valueEnum={LifeCycle}/>
                            <ProFormSelect placeholder={"负责团队"} name={"owner"} showSearch request={fetchTeams}/>
                            <ProFormSelect placeholder={"标签"} name={"tags"} mode={"multiple"} showSearch
                                           request={fetchTags}/>
                        </LightFilter>
                    </Col>
                </Row>
                <ProTable columns={columns} rowKey={"id"} className={styles.tableContainer} search={false}
                          params={filter} debounceTime={500} options={false} pagination={{pageSize: 10}}
                          request={(params, sort) => {
                              return ComponentService.queryComponents({
                                  page: params.current ? params.current : 1,
                                  size: params.pageSize ? params.pageSize : 10,
                              }, {
                                  keywords: params.keywords,
                                  type: params.type,
                                  tier: params.tier,
                                  tags: params.tags,
                                  owner: params.owner,
                                  lifecycle: params.lifecycle,
                              }, TableSortToApiSort(sort))
                          }}/>
            </Card>
        </PageContainer>
    )
}

export default ComponentPage;
