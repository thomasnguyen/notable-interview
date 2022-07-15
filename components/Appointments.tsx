import React, { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import styled from "styled-components";
import EventTwoToneIcon from "@mui/icons-material/EventTwoTone";
import { Container, HeaderText, Pill, Text } from "./Styles";
import moment from "moment";
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { DatePicker } from "@blueprintjs/datetime";
import { getAppointments } from "../utils/queries";
type Props = {
};

const AppointmentFilterContainer = styled.div`
  display: flex;
  flex-direction: columns;
  align-items: end;
  justify-content: space-between;

  width: 100%;
  height: 65px;
  border-bottom: 1px solid #d8d9e1;

  .date-filter {
    cursor: pointer;
    margin-bottom: 10px;
    color: #0060f9;
    font-weight: 600;
    padding: 10px;
    background: #d6e5fd;
    position: relative;


    .date-picker-wrapper {
        position: absolute;
    }
}
  }

  .status-filters {
    display: flex;

    .status-filter {
      margin-bottom: -1px;
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 10px;
      cursor: pointer;
      color: #707396;

      &[data-attr-selected="true"] { {
        font-weight: 600;
        color: #000000;
        border-bottom: 3px solid #0060f9;
      }
    }

  }

`;

const AppointmentListContainer = styled.div``;
const AppointmentListItem = styled.div`
  display: flex;
  flex-direction: rows;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: white;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.03);

  .meta-data {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .times {
    display: flex;
    flex-direction: row;
    align-items: center;

    color: #707396;
    font-size: 14px;
    margin-right: 25px;
    * {
      margin-right: 5px;
      margin-left: 5px;
    }
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .patient-name {
    color: #0f1b5d;
    font-wieght: 600;
  }
`;
const AppointmentList: React.FC<any> = ({appointments, patientMap}) => {
  return (
    <AppointmentListContainer>
      {appointments.map((appointment, index) => {
        const patient = patientMap[appointment.patientId]
        return (
          <AppointmentListItem key={appointment.id}>
        <div className="meta-data">
          <div className="times">
            <div className="start-time">{moment(appointment.startDate).format("MM/DD/YY h:mm a")}</div>
          </div>
          <img className="avatar" src={patient.image} alt="" />
          <div className="patient-name">
             {(patientMap) && patient.firstName + " " + patient.lastName}
          </div>
        </div>
        <Pill className="upcoming">{appointment.status}</Pill>
      </AppointmentListItem>
        )
      })}
      

    </AppointmentListContainer>
  );
};



const Appointments: React.FC<any> = ({selectedDoctorId, patientMap}) => {
  console.log({selectedDoctorId})
  const [selectedStatus, setSelectedStatus] = useState("all");
  const handleStatusFilterClick = (status: string) => {
    setSelectedStatus(status);
  };

  const todaysDate = new Date().toISOString();
  const [filterDate, setFilterDate] = useState(todaysDate);
  const [appointments, setAppointments] = useState([]);
  const loadAppointments = async () => {
    const appointments = await getAppointments({doctorId: selectedDoctorId, filterDate: filterDate, selectedStatus: selectedStatus});
    setAppointments(appointments);
  };



  useEffect(() => {
    if (selectedDoctorId) {
      loadAppointments();
    }
  }, [selectedDoctorId, selectedStatus]);

  return (
    <Container style={{ marginTop: "50px" }}>
      <HeaderText>Appointments</HeaderText>
      <AppointmentFilterContainer>
        <div className="status-filters">
          <div
            className="status-filter"
            onClick={() => handleStatusFilterClick("all")}
            data-attr-selected={selectedStatus === "all"}
          >
            <span>All</span>
          </div>
          <div
            className="status-filter"
            onClick={() => handleStatusFilterClick("pending")}
            data-attr-selected={selectedStatus === "pending"}
          >
            <span>Pending</span>
          </div>
          <div
            className="status-filter"
            onClick={() => handleStatusFilterClick("completed")}
            data-attr-selected={selectedStatus === "completed"}
          >
            <span>Completed</span>
          </div>
          <div
            className="status-filter"
            onClick={() => handleStatusFilterClick("cancelled")}
            data-attr-selected={selectedStatus === "cancelled"}
          >
            <span>Cancelled</span>
          </div>
        </div>
      </AppointmentFilterContainer>
      <AppointmentList appointments={appointments} patientMap={patientMap}/>
    </Container>
  )
};

export default Appointments;
