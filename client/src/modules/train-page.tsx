import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import randomWords from "random-words";
import _ from "lodash";

import { Container, Row, Col } from "src/components";

interface DataDirectory {
  name: string;
  lastModificationTime: string;
  numberOfFiles: number;
}

const StyledHeader = styled.h2`
  text-align: center;
`;
const StyledDirectory = styled.div`
  cursor: pointer;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(28, 42, 59, 0.16);
`;

interface DataDirectoryProps {
  directory: DataDirectory;
}

const DataDirectory = ({ directory }: DataDirectoryProps) => {
  return (
    <StyledDirectory>
      <div>{directory.name}</div>
      <div>{directory.lastModificationTime}</div>
      <div>{directory.numberOfFiles}</div>
    </StyledDirectory>
  );
};

const TrainPage: React.FC = () => {
  const [dataDirectories, setDataDirectories] = useState([]);
  const [modelName, setModelName] = useState(
    randomWords({ exactly: 1, wordsPerString: 2, separator: "-" })[0]
  );

  console.log(modelName);

  useEffect(() => {
    const fetchFolders = async () => {
      const responseData: any = await axios.get("http://localhost:3001/tubs");

      console.log(responseData);

      setDataDirectories(responseData.data);
    };
    fetchFolders();
  }, []);

  const handleModelNameChange = event => {
    setModelName(event.target.value);
  };

  const chunkedDataDirectories = _.chunk(dataDirectories, 3);

  return (
    <div>
      <StyledHeader>Select data</StyledHeader>

      <Container>
        <Row>
          <Col>Name your model: </Col>
          <Col>
            <input
              value={modelName}
              onChange={event => handleModelNameChange(event)}
            />
          </Col>
        </Row>

        {_.map(chunkedDataDirectories, (rowOfDirectories, index) => (
          <Row key={`directory-row-${index}`}>
            {_.map(rowOfDirectories, (dataDirectory: DataDirectory) => {
              return (
                <Col md={4} key={`directory-${dataDirectory.name}`}>
                  <DataDirectory directory={dataDirectory} />
                </Col>
              );
            })}
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default TrainPage;
