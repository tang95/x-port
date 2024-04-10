import {StatisticCard} from "@ant-design/pro-card";
import {Flex, Progress, Space} from "antd";
import {blue, green, red, yellow} from "@ant-design/colors";

export type Props = {
    component: API.Component
};

const {Statistic} = StatisticCard

export default (props: Props) => {

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

    return (
        <Flex gap={"middle"} wrap={"wrap"}>
            <Scorecard title={"信息完整度"} description={"组件基本信息完整度"} value={100}/>
            <Scorecard title={"DevOps 健康度"} description={"CI / CD 持续集成与交付健康度"} value={85}/>
            <Scorecard title={"质量健康度"} description={"测试覆盖率、代码质量等"} value={63}/>
            <Scorecard title={"成本健康度"} description={"成本中心服务的资源利用率"} value={46}/>
        </Flex>
    )
}
