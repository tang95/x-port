import {useSearchParams} from "@@/exports";
import ProCard, {StatisticCard} from "@ant-design/pro-card";
import {Button, Divider, Flex, FormInstance, Modal, Popconfirm, Progress, Space, Typography} from "antd";
import {
    ModalForm,
    ProColumnType,
    ProDescriptions,
    ProForm,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProTable,
    StepsForm
} from "@ant-design/pro-components";
import React, {useEffect, useRef} from "react";
import {
    CodeOutlined,
    DashboardOutlined,
    DeleteOutlined,
    EditOutlined,
    GitlabOutlined,
    LinkOutlined,
    PlusOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons";
import {ComponentType, LifeCycle, LinkType, Tier} from "@/constants/component";
import {ProDescriptionsItemProps} from "@ant-design/pro-descriptions";
import {blue, green, red, yellow} from "@ant-design/colors";
import {Timeline} from "vis-timeline/standalone";
import {DataGroupCollectionType, DataItemCollectionType, TimelineOptions} from "vis-timeline";
import moment from "moment/moment";
import {ComponentService, TeamService} from "@/services";

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
            <Scorecard title={"信息合规性"} description={"组件基本信息完整度"} value={100}/>
            <Scorecard title={"DevOps 健康度"} description={"CI / CD 持续集成与交付健康度"} value={85}/>
            <Scorecard title={"质量健康度"} description={"测试覆盖率、代码质量等"} value={63}/>
            <Scorecard title={"成本健康度"} description={"成本中心服务的资源利用率"} value={46}/>
        </Flex>
    )
}

const EditTools = (props: { component: API.Component, callback: () => void }) => {
    const [visible, setVisible] = React.useState(false);
    const [dashboards, setDashboards] = React.useState<API.Link[]>([]);
    const [docs, setDocs] = React.useState<API.Link[]>([]);
    const [others, setOthers] = React.useState<API.Link[]>([]);

    const deleteLocalLink = (link: API.Link) => {
        setDashboards(dashboards.filter(item => item !== link))
        setDocs(docs.filter(item => item !== link))
        setOthers(others.filter(item => item !== link))
    }

    useEffect(() => {
        setDashboards(props.component.links?.filter(link => link.type === LinkType.dashboard.value) || [])
        setDocs(props.component.links?.filter(link => link.type === LinkType.doc.value) || [])
        setOthers(props.component.links?.filter(link => link.type === LinkType.other.value) || [])
    }, []);

    const addLink = (link: API.Link) => {
        switch (link.type) {
            case LinkType.dashboard.value:
                setDashboards([...dashboards, link])
                break
            case LinkType.doc.value:
                setDocs([...docs, link])
                break
            case LinkType.other.value:
                setOthers([...others, link])
                break
        }
        return true;
    }

    const columns: ProColumnType<API.Link>[] = [
        {
            title: "名称",
            dataIndex: "title",
            width: "200px",
            ellipsis: true,
        },
        {
            title: "URL",
            dataIndex: "url",
            width: "200px",
            ellipsis: true,
        },
        {
            title: "操作",
            dataIndex: "option",
            width: "50px",
            render: (_, entity) => {
                return <Popconfirm
                    title="确认删除吗?"
                    onConfirm={() => {
                        ComponentService.removeLink({
                            component_id: props.component.id,
                            title: entity.title,
                            url: entity.url,
                            type: entity.type,
                        }).then(() => deleteLocalLink(entity))
                    }}
                    okText="是"
                    cancelText="否"
                >
                    <Button type={"link"} size={"small"} icon={<DeleteOutlined/>}/>
                </Popconfirm>
            }
        }
    ]
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
                onFinish={async (values) => {
                    return props.callback();
                }}
            >
                <StepsForm.StepForm title={"Dashboard"}>
                    <ProForm.Item name="dashboard">
                        <ProTable
                            dataSource={dashboards} columns={columns} toolBarRender={false} search={false}
                            options={false} pagination={false} tableLayout={"fixed"}
                            tableViewRender={(_, dom) => {
                                return (
                                    <>
                                        {dom}
                                        <AddLink type={LinkType.dashboard.value} component={props.component}
                                                 callback={addLink}/>
                                    </>
                                )
                            }}
                        />
                    </ProForm.Item>
                </StepsForm.StepForm>
                <StepsForm.StepForm title={"Document"}>
                    <ProForm.Item name="document">
                        <ProTable
                            dataSource={docs} columns={columns} toolBarRender={false} search={false}
                            options={false} pagination={false} tableLayout={"fixed"}
                            tableViewRender={(_, dom) => {
                                return (
                                    <>
                                        {dom}
                                        <AddLink type={LinkType.doc.value} component={props.component}
                                                 callback={addLink}/>
                                    </>
                                )
                            }}
                        />
                    </ProForm.Item>
                </StepsForm.StepForm>
                <StepsForm.StepForm title={"Other"}>
                    <ProForm.Item name="other">
                        <ProTable
                            dataSource={others} columns={columns} toolBarRender={false} search={false}
                            options={false} pagination={false} tableLayout={"fixed"}
                            tableViewRender={(_, dom) => {
                                return (
                                    <>
                                        {dom}
                                        <AddLink type={LinkType.other.value} component={props.component}
                                                 callback={addLink}/>
                                    </>
                                )
                            }}
                        />
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
            {
                props.links?.filter(
                    (link) => link.type === LinkType.dashboard.value
                ).map(
                    (link, i) => (
                        <Button key={`links-dashboard${i}`} target={"_blank"} href={link.url} icon={<LinkOutlined/>}>
                            {link.title}
                        </Button>
                    ))
            }
            <Divider orientation={"left"} style={{marginTop: "0", marginBottom: "8px"}} orientationMargin={0}>
                <Typography.Text type={"secondary"}>Document</Typography.Text>
            </Divider>
            {
                props.links?.filter(
                    (link) => link.type === LinkType.doc.value
                ).map(
                    (link, i) => (
                        <Button key={`links-doc${i}`} target={"_blank"} href={link.url} icon={<LinkOutlined/>}>
                            {link.title}
                        </Button>
                    ))
            }
            <Divider orientation={"left"} style={{marginTop: "0", marginBottom: "8px"}} orientationMargin={0}>
                <Typography.Text type={"secondary"}>Other</Typography.Text>
            </Divider>
            {
                props.links?.filter(
                    (link) => link.type === LinkType.other.value
                ).map(
                    (link, i) => (
                        <Button key={`links-other${i}`} target={"_blank"} href={link.url} icon={<LinkOutlined/>}>
                            {link.title}
                        </Button>
                    ))
            }

        </Flex>
    )
}

const AddLink = (props: { component: API.Component, callback: (link: API.Link) => boolean, type: string }) => {
    const formRef = React.useRef<FormInstance>();

    return (
        <ModalForm
            width={600} formRef={formRef}
            trigger={<Button type="dashed" block style={{margin: '10px 0',}} icon={<PlusOutlined/>}>添加</Button>}
            onFinish={async (values) => {
                await ComponentService.addLink({
                    component_id: props.component.id,
                    type: props.type,
                    title: values.title,
                    url: values.url
                })
                props.callback({
                    type: props.type,
                    title: values.title,
                    url: values.url
                })
                formRef.current?.resetFields()
                return true
            }}
        >
            <ProFormText name={"title"} label={"标题"} required rules={[{required: true, message: "请输入标题"}]}/>
            <ProFormTextArea name={"url"} label={"URL"} required rules={[{required: true, message: "请输入URL"}]}/>
        </ModalForm>
    )
}

const EditBasicInfo = (props: { component: API.Component, callback: () => void }) => {
    const [visible, setVisible] = React.useState(false);
    const [repositories, setRepositories] = React.useState<API.Link[]>([]);
    const [chats, setChats] = React.useState<API.Link[]>([]);

    const deleteLocalLink = (link: API.Link) => {
        setRepositories(repositories.filter(item => item !== link))
        setChats(chats.filter(item => item !== link))
    }

    const addLink = (link: API.Link) => {
        switch (link.type) {
            case LinkType.repository.value:
                setRepositories([...repositories, link])
                break
            case LinkType.chat.value:
                setChats([...chats, link])
                break
        }
        return true;
    }

    const columns: ProColumnType<API.Link>[] = [
        {
            title: "名称",
            dataIndex: "title",
            width: "200px",
            ellipsis: true,
        },
        {
            title: "URL",
            dataIndex: "url",
            width: "200px",
            ellipsis: true,
        },
        {
            title: "操作",
            dataIndex: "option",
            width: "50px",
            render: (_, entity) => {
                return <Popconfirm
                    title="确认删除吗?"
                    onConfirm={() => {
                        ComponentService.removeLink({
                            component_id: props.component.id,
                            title: entity.title,
                            url: entity.url,
                            type: entity.type,
                        }).then(() => deleteLocalLink(entity))
                    }}
                    okText="是"
                    cancelText="否"
                >
                    <Button type={"link"} size={"small"} icon={<DeleteOutlined/>}/>
                </Popconfirm>
            }
        }
    ]
    const fetchTeams = async () => {
        const response = await TeamService.queryTeams({page: 1, size: 5});
        return response.data.map(team => ({
            label: team.name,
            value: team.id,
        }));
    }

    useEffect(() => {
        setRepositories(props.component.links?.filter(link => link.type === LinkType.repository.value) || [])
        setChats(props.component.links?.filter(link => link.type === LinkType.chat.value) || [])
    }, []);

    return (
        <>
            <Button type={"text"} size={"small"} icon={<EditOutlined/>} onClick={() => setVisible(true)}/>
            <StepsForm
                stepsFormRender={(dom, submitter) => {
                    return (
                        <Modal
                            title="基本信息" width={600} destroyOnClose open={visible} footer={submitter}
                            onCancel={() => setVisible(false)}>
                            <div style={{marginTop: "20px"}}>
                                {dom}
                            </div>
                        </Modal>
                    );
                }}
                onFinish={async (values) => {
                    return props.callback();
                }}
            >
                <StepsForm.StepForm
                    title={"基础"} grid initialValues={props.component}
                    onFinish={async (values) => {
                        return ComponentService.updateComponent({id: props.component.id, ...values});
                    }}>
                    <ProFormText
                        name={"name"} label={"名称"} allowClear={false} colProps={{span: 16}}
                        required rules={[{required: true, message: "名称不能为空"}]}/>
                    <ProFormSelect
                        name={"type"} label={"类型"} valueEnum={ComponentType} colProps={{span: 8}}
                        required rules={[{required: true, message: "类型不能为空"}]}
                    />
                    <ProFormSelect name={"tags"} label={"标签"} fieldProps={{mode: "tags"}}/>
                    <ProFormSelect
                        name={"owner_id"} initialValue={props.component.owner.id} label={"团队"}
                        colProps={{span: 8}} request={fetchTeams} showSearch
                        required rules={[{required: true, message: "团队不能为空"}]}
                    />
                    <ProFormSelect
                        name={"lifecycle"} label={"生命周期"} valueEnum={LifeCycle} colProps={{span: 8}}
                        required rules={[{required: true, message: "生命周期不能为空"}]}
                    />
                    <ProFormSelect
                        name={"tier"} label={"层级"} valueEnum={Tier} colProps={{span: 8}}
                        required rules={[{required: true, message: "层级不能为空"}]}
                    />
                    <ProFormTextArea name={"description"} label={"描述"}/>
                </StepsForm.StepForm>
                <StepsForm.StepForm title={"仓库"}>
                    <ProForm.Item name="repos">
                        <ProTable
                            dataSource={repositories} columns={columns} toolBarRender={false} search={false}
                            options={false} pagination={false} tableLayout={"fixed"}
                            tableViewRender={(_, dom) => {
                                return (
                                    <>
                                        {dom}
                                        <AddLink type={LinkType.repository.value} component={props.component}
                                                 callback={addLink}/>
                                    </>
                                )
                            }}
                        />
                    </ProForm.Item>
                </StepsForm.StepForm>
                <StepsForm.StepForm title={"联系"}>
                    <ProForm.Item name="chats">
                        <ProTable
                            dataSource={chats} columns={columns} toolBarRender={false} search={false}
                            options={false} pagination={false} tableLayout={"fixed"}
                            tableViewRender={(_, dom) => {
                                return (
                                    <>
                                        {dom}
                                        <AddLink type={LinkType.chat.value} component={props.component}
                                                 callback={addLink}/>
                                    </>
                                )
                            }}
                        />
                    </ProForm.Item>
                </StepsForm.StepForm>
            </StepsForm>
        </>
    )
}

export type Props = {
    component: API.Component;
    callback: () => void;
}

export default (props: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const columns: ProDescriptionsItemProps<API.Component>[] = [
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
            title: "聊天",
            dataIndex: "chat",
            render: (_, record) => {
                return (
                    <Flex vertical gap={5}>
                        {
                            record.links?.filter(
                                (link) => link.type === LinkType.chat.value
                            ).map(
                                (link, i) => (
                                    <a key={`links-chat${i}`} href={link.url} target={"_blank"}>
                                        <Space><UsergroupAddOutlined/>{link.title}</Space>
                                    </a>
                                )
                            )
                        }
                    </Flex>
                )
            }
        },
        {
            title: "仓库",
            dataIndex: "repository",
            render: (_, record) => {
                return (
                    <Flex vertical gap={5}>
                        {
                            record.links?.filter(
                                (link) => link.type === LinkType.repository.value
                            ).map(
                                (link, i) => (
                                    <a key={`links-repository${i}`} href={link.url} target={"_blank"}>
                                        <Space><CodeOutlined />{link.title}</Space>
                                    </a>
                                )
                            )
                        }
                    </Flex>
                )
            }
        },
        {
            title: "注解",
            dataIndex: "annotations",
            valueType: "jsonCode",
            fieldProps: {
                style: {maxHeight: 100}
            },
            renderText: (text, record) => {
                return JSON.stringify(text)
            }
        }
    ]

    return (
        <ProCard ghost gutter={[16, 16]} wrap>
            <ProCard colSpan={12} title={"基础信息"}
                     extra={<EditBasicInfo component={props.component} callback={props.callback}/>}>
                <ProDescriptions columns={columns} dataSource={props.component} colon={false}/>
            </ProCard>
            <ProCard colSpan={12} title={"工具"}
                     extra={<Button type={"text"} size={"small"}
                                    icon={<EditTools component={props.component} callback={props.callback}/>}/>}>
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
