import React, { ReactElement } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from './css/layout.module.css';

export interface LayoutProps {
  children: ReactElement
  sidebarContent: ReactElement
};

function Layout(props: LayoutProps) {
  return (
    <Grid fluid>
      <Row>
        <Col sm={12} md={3}>
          <Row center="xs" middle="md">
            <div className={styles.sidebar}>
              {props.sidebarContent}
            </div>
          </Row>
        </Col>
        <Col sm={12} md={9}>
          {props.children}
        </Col>
      </Row>
    </Grid>
  );
}

export default Layout;
