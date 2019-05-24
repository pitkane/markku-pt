import React from "react";

import { Col } from "react-grid-system";

type Props = {
  centered?: boolean;
};

class Column extends React.Component<Props, any> {
  render() {
    return <Col {...this.props} />;
  }
}

export default Column;
