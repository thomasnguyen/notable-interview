import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import Welcome from "../components/Welcome";
import Appointments from "../components/Appointments";
import { prisma } from "@prisma/client";
import { useQuery } from "react-query";
import { server } from "../utils/config";
import { getDoctors, getPatients } from "../utils/queries";

export const getStaticProps: GetStaticProps = async () => {
  const feed = [
    {
      id: "1",
      title: "Prisma is the perfect ORM for Next.js",
      content:
        "[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!",
      published: false,
      author: {
        name: "Nikolas Burk",
        email: "burk@prisma.io",
      },
    },
  ];
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const MainPage: React.FC<Props> = (props) => {
  const [doctors, setDoctors] = React.useState<any[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = React.useState<any>();
  const [patientMap, setPatientMap] = React.useState<any>({});
  const loadDoctors = async () => {
    const docs = await getDoctors();
    setDoctors(docs);
    setSelectedDoctorId(docs[0].id);
  };

  const loadPatients = async () => {
    const patients = await getPatients();
    const patientMap = {};
    for (const patient of patients) {
      patientMap[patient.id] = patient;
    }
    setPatientMap(patientMap);
  };


  const handleDoctorSelect = (doctorId) => {
    setSelectedDoctorId(doctorId);
  }

  useEffect(() => {
    loadDoctors();
    loadPatients()
  }, []);

  return (
    <Layout>
      <Welcome doctors={doctors} selectedDoctorId={selectedDoctorId} handleDoctorSelect={handleDoctorSelect} />
      <Appointments selectedDoctorId={selectedDoctorId} patientMap={patientMap}/>
    </Layout>
  );
};

export default MainPage;
