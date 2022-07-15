import { server } from "./config"

export const getDoctors = () => {
  return fetch(`${server}/api/doctor`).then(res => res.json()).then(data => data)
}

export const getAppointments = ({doctorId, filterDate}) => {
  return fetch(`${server}/api/appointment?` +  new URLSearchParams({
    doctorId: doctorId,
    filterDate: filterDate
})).then(res => res.json()).then(data => data)
}

export const getPatients = () => {
  return fetch(`${server}/api/patient`).then(res => res.json()).then(data => data)
}
