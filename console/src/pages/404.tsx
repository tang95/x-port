import {Button, Result} from 'antd';
import {history} from "@umijs/max";

export default () => (
    <Result
        status="404"
        title="404"
        subTitle={"抱歉，您访问的页面不存在。"}
        extra={
            <Button type="primary" onClick={() => history.push('/')}>返回首页</Button>
        }
    />
);
