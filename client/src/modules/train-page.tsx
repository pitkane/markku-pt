import React, { useEffect } from "react";
import axios from "axios";

interface Props {}

const TrainPage: React.FC = () => {
  const fetchFolders = async () => {
    const responseData: any = await axios.get("http://localhost:3001/tubs");

    console.log(responseData);
  };

  useEffect(() => {
    console.log("moro");
    fetchFolders();
  });

  return (
    <div>
      <div>TrainPage</div>
    </div>
  );
};

export default TrainPage;
