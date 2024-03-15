import {PageContainer} from '@ant-design/pro-components';
import styles from './index.less';
import React from "react";

const HomePage: React.FC = () => {
    return (
        <PageContainer ghost>
            <div className={styles.container}>
            </div>
        </PageContainer>
    );
};

export default HomePage;
