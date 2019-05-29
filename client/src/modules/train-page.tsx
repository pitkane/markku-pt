import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

interface Props {}

const StyledHeader = styled.h2`
  text-align: center;
`;
const StyledDirectories = styled.div``;
const StyledDirectory = styled.div``;

const TrainPage: React.FC = () => {
  useEffect(() => {
    const fetchFolders = async () => {
      const responseData: any = await axios.get("http://localhost:3001/tubs");

      console.log(responseData);
    };
    fetchFolders();
  }, []);

  return (
    <div>
      <StyledHeader>Select data</StyledHeader>

      <StyledDirectories>
        <StyledDirectory />
      </StyledDirectories>
    </div>
  );
};

export default TrainPage;
