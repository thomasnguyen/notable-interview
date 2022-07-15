import { server } from "./config"

export const getDoctors = () => {
  return fetch(`${server}/api/doctor`).then(res => res.json()).then(data => data)
}

export const  getAppointments = ({doctorId, filterDate, selectedStatus}) => {
  let params =  new URLSearchParams({
    doctorId: doctorId,
    filterDate: filterDate,
    selectedStatus: selectedStatus
  })

  if (selectedStatus === 'all'){
    params =  new URLSearchParams({
      doctorId: doctorId,
      filterDate: filterDate,
    })
  }

  return fetch(`${server}/api/appointment?` +  params).then(res => res.json()).then(data => data)
}

export const getPatients = () => {
  return fetch(`${server}/api/patient`).then(res => res.json()).then(data => data)
}
