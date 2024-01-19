import React from "react";
import { useGetLeaderDataQuery } from "../Services/quesApi";
import { Table } from "react-bootstrap";
const LeaderBoard = () => {
  //--------------RTK Query Fetching-------------------
  const { data: leaderData } = useGetLeaderDataQuery();
  console.log(leaderData);
  return (
    <div className="table1">
        {leaderData?.length===0 ? <center>No Data Available</center>:(
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sn.</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderData?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      ) }
    </div>
  );
};

export default LeaderBoard;
