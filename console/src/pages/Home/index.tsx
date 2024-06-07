import {PageContainer, ProCard, StatisticCard} from '@ant-design/pro-components';
import React from "react";
import {Avatar, Col, Empty, Row, Space, Typography} from "antd";
import useUser from "@/models/global";
import useRequest from "@ahooksjs/use-request";
import {HomeService} from "@/services";

const PageHeaderContent: React.FC<{
    user: Partial<API.AuthUser>;
}> = ({user}) => {
    return (
        <Space>
            <Avatar size={80} src={user.avatar}/>
            <div>
                <Typography.Title level={4}>
                    Hi，{user.name}
                </Typography.Title>
                <Typography.Text type={"secondary"}>
                    {user.description}
                </Typography.Text>
            </div>
        </Space>
    );
};

const ExtraContent: React.FC<Record<string, any>> = () => {
    const {data} = useRequest(HomeService.getHomeMetrics,)
    return (
        <StatisticCard.Group ghost>
            <StatisticCard ghost statistic={{title: "我的组件", value: data?.myComponentCount}}/>
            <StatisticCard.Divider/>
            <StatisticCard ghost statistic={{title: "组件", value: data?.componentCount}}/>
            <StatisticCard.Divider/>
            <StatisticCard ghost statistic={{title: "团队", value: data?.teamCount}}/>
        </StatisticCard.Group>
    );
};

const HomePage: React.FC = () => {
    const [user, loading] = useUser();
    const projectNotice = [
        {
            "id": "xxx1",
            "title": "Alipay",
            "logo": "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
            "description": "那是一种内在的东西，他们到达不了，也无法触及的",
            "updatedAt": "2024-04-11T03:21:39.588Z",
            "member": "科学搬砖组",
            "href": "",
            "memberLink": ""
        },
        {
            "id": "xxx2",
            "title": "Angular",
            "logo": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
            "description": "希望是一个好东西，也许是最好的，好东西是不会消亡的",
            "updatedAt": "2017-07-24T00:00:00.000Z",
            "member": "全组都是吴彦祖",
            "href": "",
            "memberLink": ""
        },
        {
            "id": "xxx3",
            "title": "Ant Design",
            "logo": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
            "description": "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
            "updatedAt": "2024-04-11T03:21:39.588Z",
            "member": "中二少女团",
            "href": "",
            "memberLink": ""
        },
        {
            "id": "xxx4",
            "title": "Ant Design Pro",
            "logo": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
            "description": "那时候我只会想自己想要什么，从不想自己拥有什么",
            "updatedAt": "2017-07-23T00:00:00.000Z",
            "member": "程序员日常",
            "href": "",
            "memberLink": ""
        },
        {
            "id": "xxx5",
            "title": "Bootstrap",
            "logo": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
            "description": "凛冬将至",
            "updatedAt": "2017-07-23T00:00:00.000Z",
            "member": "高逼格设计天团",
            "href": "",
            "memberLink": ""
        },
        {
            "id": "xxx6",
            "title": "React",
            "logo": "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
            "description": "生命就像一盒巧克力，结果往往出人意料",
            "updatedAt": "2017-07-23T00:00:00.000Z",
            "member": "骗你来学计算机",
            "href": "",
            "memberLink": ""
        }
    ]

    return (
        <PageContainer
            ghost extraContent={<ExtraContent/>}
            content={user && <PageHeaderContent user={user}/>}
        >
            <ProCard ghost gutter={[16, 16]} wrap>
                <ProCard title={"需要关注的事情"} colSpan={16}>
                    <Empty/>
                </ProCard>
                <ProCard colSpan={8} title={"便捷导航"}>
                    <Row gutter={[16, 16]}>
                        {projectNotice.map((item) => {
                            return (
                                <Col span={24} key={`item-${item.id}`}>
                                    <a>
                                        <Space>
                                            <Avatar src={item.logo}/>
                                            <div>
                                                {item.member}
                                                <div>
                                                    <Typography.Text type={"secondary"}>
                                                        {item.description}
                                                    </Typography.Text>
                                                </div>
                                            </div>
                                        </Space>
                                    </a>
                                </Col>
                            );
                        })}
                    </Row>
                </ProCard>
            </ProCard>
        </PageContainer>
    );
};

export default HomePage;
