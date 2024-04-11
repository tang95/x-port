import React from "react";
import {PageContainer, ProColumnType, ProTable} from "@ant-design/pro-components";
import {Link} from "@@/exports";
import {TeamService} from "@/services";
import {TableSortToApiSort} from "@/utils/sort";
import {Card, Col, Input, Row} from "antd";
import styles from "@/pages/Team/index.less";

const TeamPage: React.FC = () => {
    const [filter, setFilter] = React.useState<{ keywords?: string }>()

    const columns: ProColumnType<API.Team>[] = [
        {
            title: '团队',
            sorter: true,
            dataIndex: 'name',
            render: (dom, record) => {
                return <Link to={`/team/detail/${record.id}`}>
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
            title: '成员',
            dataIndex: 'members',
            ellipsis: true,
        }
    ]
    return (
        <PageContainer>
            <Card>
                <Row justify={"center"} gutter={[10, 10]}>
                    <Col span={18}>
                        <Input.Search onChange={(event) => {
                            setFilter({
                                keywords: event.currentTarget.value
                            });
                        }} placeholder={"搜索团队"} size={"large"}/>
                    </Col>
                </Row>
                <ProTable columns={columns} rowKey={"id"} params={filter} search={false}
                          className={styles.tableContainer}
                          debounceTime={500} options={false} pagination={{pageSize: 10}}
                          request={(params, sort) => {
                              return TeamService.queryTeams({
                                  page: params.current ? params.current : 1,
                                  size: params.pageSize ? params.pageSize : 10,
                              }, TableSortToApiSort(sort))
                          }}/>
            </Card>
        </PageContainer>
    )
}

export default TeamPage;
