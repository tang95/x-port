import {useSearchParams} from "@@/exports";
import ProCard, {StatisticCard} from "@ant-design/pro-card";
import {Button, Divider, Flex, Modal, Progress, Space, Typography} from "antd";
import {
    EditableProTable,
    ProDescriptions,
    ProForm,
    ProFormSelect,
    ProFormTextArea,
    StepsForm
} from "@ant-design/pro-components";
import React, {useEffect, useRef} from "react";
import {
    DashboardOutlined,
    DeleteOutlined,
    EditOutlined,
    GitlabOutlined,
    LinkOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons";
import {ComponentType, LifeCycle, Tier} from "@/constants/component";
import {ProDescriptionsItemProps} from "@ant-design/pro-descriptions";
import {blue, green, red, yellow} from "@ant-design/colors";
import {Timeline} from "vis-timeline/standalone";
import {DataGroupCollectionType, DataItemCollectionType, TimelineOptions} from "vis-timeline";
import moment from "moment/moment";

const {Statistic} = StatisticCard

const Activity = (props: API.Component) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const timelineRef = useRef<Timeline | null>(null);

    const items: DataItemCollectionType = [
        {
            id: 1, start: "2024-04-08T12:20:00", group: 2, className: "error", title: `
            <div>
             <div>2024-04-08 12:20:00</div>
             <div>Prod 环境部署</div>
             <div><a>点击查看</a></div>
           </div>`
        },
        {id: 2, start: "2024-04-08T13:30:00", group: 3},
        {id: 3, start: "2024-04-08T14:10:00", group: 2, className: "error"},
        {id: 4, start: "2024-04-08T15:30:00", group: 3, className: "warn"},
        {id: 5, start: "2024-04-08T16:40:00", group: 2},
        {id: 6, start: "2024-04-08T17:50:00", group: 4, className: "warn"},
        {id: 7, start: "2024-04-08T13:40:00", group: 2},
        {id: 8, start: "2024-04-08T17:20:00", group: 4},
    ];
    const groups: DataGroupCollectionType = [
        {id: 1, content: "demo-service", nestedGroups: [2, 3, 4]},
        {id: 2, content: "部署"},
        {id: 3, content: "事件"},
        {id: 4, content: "告警"},
        {id: 10, content: "依赖组件", nestedGroups: [11, 12]},
        {id: 11, content: "demo-library", nestedGroups: [22, 23, 24], showNested: false},
        {id: 12, content: "demo-database"},
        {id: 22, content: "部署"},
        {id: 23, content: "事件"},
        {id: 24, content: "告警"},
    ]

    const options: TimelineOptions = {
        width: '100%',
        minHeight: '300px',
        orientation: "top",
        zoomable: false,
        horizontalScroll: true,
        showCurrentTime: true,
        cluster: {
            showStipes: true,
        },
        max: moment().add(4, 'hour').toDate(),
        format: {
            minorLabels: {
                millisecond: 'SSS',
                second: 's',
                minute: 'HH:mm',
                hour: 'HH:mm',
                weekday: 'ddd D',
                day: 'D',
                week: 'w',
                month: 'MMM',
                year: 'YYYY'
            },
            majorLabels: {
                millisecond: 'HH:mm:ss',
                second: 'YYYY-MM-D HH:mm',
                minute: 'YYYY-MM-D',
                hour: 'YYYY-MM-D',
                weekday: 'YYYY-MM',
                day: 'YYYY-MM',
                week: 'YYYY-MM',
                month: 'YYYY',
                year: ''
            }
        },
    }

    useEffect(() => {
        if (!containerRef.current) return;
        timelineRef.current = new Timeline(containerRef.current, items, groups, options)
        timelineRef.current.setWindow(moment().subtract(12, 'hour'), moment().add(1, 'hour'));
    }, [containerRef]);

    return <div ref={containerRef}/>
}

const Scorecard = (props: { title: string, description: string, value: number }) => {
    const color = props.value > 90 ? green[6] : props.value > 70 ? blue[6] : props.value > 50 ? yellow[6] : red[6];
    return (
        <StatisticCard
            style={{width: "310px"}}
            bordered
            statistic={{
                title: props.title,
                description: <Space>
                    <Statistic title="昨日" value="7.60%" trend="up"/>
                    <Statistic title="上周" value="7.60%" trend="down"/>
                </Space>,
                valueStyle: {fontSize: "12px", color: "#999"},
                valueRender: () => <span>{props.description}</span>,
            }}
            chart={
                <Progress
                    type="circle"
                    format={(percent) => percent}
                    size={70}
                    strokeColor={color}
                    strokeLinecap={"butt"}
                    percent={props.value}
                    strokeWidth={10}
                />
            }
            chartPlacement="left"
        />
    )
}

const ScoreCardList = (props: API.Component) => {

    return (
        <Flex gap={"middle"} wrap={"wrap"}>
            <Scorecard title={"信息完整度"} description={"组件基本信息完整度"} value={100}/>
            <Scorecard title={"DevOps 健康度"} description={"CI / CD 持续集成与交付健康度"} value={85}/>
            <Scorecard title={"质量健康度"} description={"测试覆盖率、代码质量等"} value={63}/>
            <Scorecard title={"成本健康度"} description={"成本中心服务的资源利用率"} value={46}/>
        </Flex>
    )
}

const EditTools = (props: API.Component) => {
    const [visible, setVisible] = React.useState(false);
    return (
        <>
            <Button type={"text"} size={"small"} icon={<EditOutlined/>} onClick={() => setVisible(true)}/>
            <StepsForm
                stepsFormRender={(dom, submitter) => {
                    return (
                        <Modal
                            title="相关工具" width={600} destroyOnClose
                            onCancel={() => setVisible(false)} open={visible} footer={submitter}>
                            <div style={{marginTop: "20px"}}>
                                {dom}
                            </div>
                        </Modal>
                    );
                }}
            >
                <StepsForm.StepForm title={"Dashboard"}>
                    <ProForm.Item name="dashboard">
                        <EditableProTable value={[{
                            id: 1,
                            name: "GitHub",
                            url: "https://github.com/",
                        }, {
                            id: 2,
                            name: "GitLab",
                            url: "https://gitlab.com/",
                        }, {
                            id: 3,
                            name: "Gitee",
                            url: "https://gitee.com/",
                        }]} columns={[
                            {title: "名称", dataIndex: "name"},
                            {title: "URL", dataIndex: "url", width: "200px"},
                            {
                                title: "操作", dataIndex: "option", width: "50px", render: () => {
                                    return <Button type={"link"} size={"small"} icon={<DeleteOutlined/>}/>
                                }
                            },
                        ]} rowKey="id" toolBarRender={false}/>
                    </ProForm.Item>
                </StepsForm.StepForm>
                <StepsForm.StepForm title={"Document"}>
                    <ProForm.Item name="document">
                        <EditableProTable value={[{
                            id: 1,
                            name: "GitHub",
                            url: "https://github.com/",
                        }, {
                            id: 2,
                            name: "GitLab",
                            url: "https://gitlab.com/",
                        }, {
                            id: 3,
                            name: "Gitee",
                            url: "https://gitee.com/",
                        }]} columns={[
                            {title: "名称", dataIndex: "name"},
                            {title: "URL", dataIndex: "url", width: "200px"},
                            {
                                title: "操作", dataIndex: "option", width: "50px", render: () => {
                                    return <Button type={"link"} size={"small"} icon={<DeleteOutlined/>}/>
                                }
                            },
                        ]} rowKey="id" toolBarRender={false}/>
                    </ProForm.Item>
                </StepsForm.StepForm>
                <StepsForm.StepForm title={"Other"}>
                    <ProForm.Item name="other">
                        <EditableProTable value={[{
                            id: 1,
                            name: "GitHub",
                            url: "https://github.com/",
                        }, {
                            id: 2,
                            name: "GitLab",
                            url: "https://gitlab.com/",
                        }, {
                            id: 3,
                            name: "Gitee",
                            url: "https://gitee.com/",
                        }]} columns={[
                            {title: "名称", dataIndex: "name"},
                            {title: "URL", dataIndex: "url", width: "200px"},
                            {
                                title: "操作", dataIndex: "option", width: "50px", render: () => {
                                    return <Button type={"link"} size={"small"} icon={<DeleteOutlined/>}/>
                                }
                            },
                        ]} rowKey="id" toolBarRender={false}/>
                    </ProForm.Item>
                </StepsForm.StepForm>
            </StepsForm>
        </>
    );
};

const Tools = (props: API.Component) => {
    return (
        <Flex wrap="wrap" gap="small">
            <Divider orientation={"left"} style={{marginTop: "0", marginBottom: "8px"}} orientationMargin={0}>
                <Typography.Text type={"secondary"}>Dashboard</Typography.Text>
            </Divider>
            <Button icon={<DashboardOutlined/>}>
                Dashboard
            </Button>
            <Button icon={<LinkOutlined/>}>
                Service Logs
            </Button>
            <Button icon={<LinkOutlined/>}>
                Tracing
            </Button>
            <Button icon={<LinkOutlined/>}>
                On-Call
            </Button>
            <Divider orientation={"left"} style={{marginTop: "0", marginBottom: "8px"}} orientationMargin={0}>
                <Typography.Text type={"secondary"}>Document</Typography.Text>
            </Divider>
            <Button icon={<LinkOutlined/>}>
                设计文档
            </Button>
            <Button icon={<LinkOutlined/>}>
                使用手册
            </Button>
            <Button icon={<LinkOutlined/>}>
                Runbook
            </Button>
            <Divider orientation={"left"} style={{marginTop: "0", marginBottom: "8px"}} orientationMargin={0}>
                <Typography.Text type={"secondary"}>Other</Typography.Text>
            </Divider>
            <Button icon={<LinkOutlined/>}>
                Jira issues
            </Button>
        </Flex>
    )
}

const EditBasicInfo = (props: API.Component) => {
    const [visible, setVisible] = React.useState(false);
    return (
        <>
            <Button type={"text"} size={"small"} icon={<EditOutlined/>} onClick={() => setVisible(true)}/>
            <StepsForm
                stepsFormRender={(dom, submitter) => {
                    return (
                        <Modal
                            title="基本信息" width={600} destroyOnClose
                            onCancel={() => setVisible(false)} open={visible} footer={submitter}>
                            <div style={{marginTop: "20px"}}>
                                {dom}
                            </div>
                        </Modal>
                    );
                }}
            >
                <StepsForm.StepForm title={"基础"} grid>
                    <ProFormSelect name={"team"} label={"团队"} colProps={{span: 24}}/>
                    <ProFormSelect name={"type"} label={"类型"} valueEnum={ComponentType} colProps={{span: 12}}/>
                    <ProFormSelect name={"tier"} label={"层级"} valueEnum={Tier} colProps={{span: 12}}/>
                    <ProFormTextArea name={"annotations"} label={"注解"} colProps={{span: 24}}/>
                </StepsForm.StepForm>
                <StepsForm.StepForm title={"仓库"}>
                    <ProForm.Item name="repos">
                        <EditableProTable value={[{
                            id: 1,
                            name: "GitHub",
                            url: "https://github.com/",
                        }, {
                            id: 2,
                            name: "GitLab",
                            url: "https://gitlab.com/",
                        }, {
                            id: 3,
                            name: "Gitee",
                            url: "https://gitee.com/",
                        }]} columns={[
                            {title: "名称", dataIndex: "name"},
                            {title: "URL", dataIndex: "url", width: "200px"},
                            {
                                title: "操作", dataIndex: "option", width: "50px", render: () => {
                                    return <Button type={"link"} size={"small"} icon={<DeleteOutlined/>}/>
                                }
                            },
                        ]} rowKey="id" toolBarRender={false}/>
                    </ProForm.Item>
                </StepsForm.StepForm>
                <StepsForm.StepForm title={"联系"}>
                    <ProForm.Item name="chats">
                        <EditableProTable columns={[
                            {title: "名称", dataIndex: "name"},
                            {title: "URL", dataIndex: "url"},
                            {title: "操作", dataIndex: "option"},
                        ]} rowKey="id" editable={{
                            type: 'multiple',
                            actionRender: (row, _, dom) => {
                                return [dom.delete];
                            },
                        }} toolBarRender={false}/>
                    </ProForm.Item>
                </StepsForm.StepForm>
            </StepsForm>
        </>
    )
}

export type Props = {
    component: API.Component;
}

export default (props: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const columns: ProDescriptionsItemProps[] = [
        {
            title: "类型",
            dataIndex: "type",
            valueType: "select",
            valueEnum: ComponentType
        },
        {
            title: "生命周期",
            dataIndex: "lifecycle",
            valueType: "select",
            valueEnum: LifeCycle
        },
        {
            title: "层级",
            dataIndex: "tier",
            valueType: "select",
            valueEnum: Tier
        },
        {
            title: "团队",
            dataIndex: "owner",
            render: (text, record) => {
                return (
                    <a>基础设施</a>
                )
            }
        },
        {
            title: "联系",
            dataIndex: "onCall",
            render: (text, record) => {
                return (
                    <Flex vertical gap={5}>
                        <a><Space><UsergroupAddOutlined/>问题反馈群</Space></a>
                        <a><Space><UsergroupAddOutlined/>需求群</Space></a>
                        <a><Space><UsergroupAddOutlined/>值班群</Space></a>
                    </Flex>
                )
            }
        },
        {
            title: "仓库",
            dataIndex: "repository",
            render: (text, record) => {
                return (
                    <Flex vertical gap={5}>
                        <a><Space><GitlabOutlined/>demo-service</Space></a>
                        <a><Space><GitlabOutlined/>demo-library</Space></a>
                        <a><Space><GitlabOutlined/>demo-console</Space></a>
                    </Flex>
                )
            }
        },
        {
            title: "注解",
            dataIndex: "annotations",
            valueType: "jsonCode",
            fieldProps: {
                style: {maxHeight: 75}
            },
            renderText: (text, record) => {
                return JSON.stringify(text)
            }
        }
    ]

    return (
        <ProCard ghost gutter={[16, 16]} wrap>
            <ProCard colSpan={12} title={"基础信息"} extra={<EditBasicInfo  {...props.component}/>}>
                <ProDescriptions columns={columns} dataSource={props} colon={false}/>
            </ProCard>
            <ProCard colSpan={12} title={"工具"}
                     extra={<Button type={"text"} size={"small"} icon={<EditTools {...props.component}/>}/>}>
                <Tools {...props.component}/>
            </ProCard>
            <ProCard
                colSpan={24} title={"记分卡"}
                extra={
                    <Button type={"link"} size={"small"} onClick={() => {
                        setSearchParams({...searchParams, tab: "scorecard"})
                    }}>查看更多</Button>
                }>
                <ScoreCardList {...props.component}/>
            </ProCard>
            <ProCard colSpan={24} title={"最近变更"}
                     extra={
                         <Button type={"link"} size={"small"} onClick={() => {
                             setSearchParams({...searchParams, tab: "activity"})
                         }}>查看更多</Button>
                     }>
                <Activity {...props.component}/>
            </ProCard>
        </ProCard>
    )
}
