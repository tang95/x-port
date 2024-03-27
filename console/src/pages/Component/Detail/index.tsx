import React from "react";
import {PageContainer} from "@ant-design/pro-components";
import {Outlet} from "@umijs/max";

const ComponentDetailPage: React.FC = () => {
    return (
        <PageContainer>
            <Outlet/>
        </PageContainer>
    )
}

export default ComponentDetailPage;
