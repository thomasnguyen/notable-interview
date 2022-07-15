import React, { ReactNode } from "react";
import Header from "./Header";
import styled from "styled-components";
import EventTwoToneIcon from "@mui/icons-material/EventTwoTone";
import { Container, HeaderText, Text } from "./Styles";

type Props = {};

const StatBoxes = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  .stat-box {
    background: white;
    padding: 20px;
    margin-right: 10px;
    flex: 1;

    &[data-attrs-selected="true"] {
      border-bottom: 3px solid #0060f9;
    }
  }

  .stat-box-content {
    margin-top: 20px;
    font-size: 16px;
    color: #0f1b5d;
    cursor: pointer;
  }
`;

const Welcome: React.FC<any> = ({
  selectedDoctorId,
  doctors,
  handleDoctorSelect,
}) => {
  return (
    <Container>
      <HeaderText>Hello, Doctors!</HeaderText>
      <Text>Your daily doctor snapshot</Text>
      <StatBoxes className="stat-boxes">
        {doctors.map((doctor, index) => {
          return (
            <div
              className="stat-box"
              key={index}
              data-attrs-selected={selectedDoctorId === doctor.id}
              onClick={() => handleDoctorSelect(doctor.id)}
            >
              <div className="stat-box-content">
                <span>
                  {doctor.firstName} {doctor.lastName}
                </span>
              </div>
            </div>
          );
        })}
      </StatBoxes>
    </Container>
  );
};

export default Welcome;
