
import { PrismaClient, Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()


function addHour( date = new Date()) {
    date.setTime(date.getTime() + 1 * 60 * 60 * 1000);
  
    return date;
  }

const doctorList = () => {
  const doctors = []

  return doctors
}



async function main() {
  console.log(`Start seeding ...`)
  const doctorIdList = []
  const patientIdList = []

  for (let x = 0; x <3; x++) {
    patientIdList.push(faker.random.alphaNumeric(15))
  }

  for (let y = 0;y <3; y++) {
    doctorIdList.push(faker.random.alphaNumeric(15))
  }


  for (let i = 0; i < doctorIdList.length; i++) {
    await prisma.doctor.create({
      data: {
          id: doctorIdList[i],
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        }
    })
  }

  
  for (let i = 0; i < patientIdList.length; i++) {
    await prisma.patient.create({
      data: {
          id: patientIdList[i],
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          ssn: Math.random().toString().slice(2, 11),
          dateOfBirth: faker.date.past(),
          city: faker.address.city(),
          state: faker.address.state(),
          weight: Math.floor(Math.random() * (200 - 50) + 50),
          image: faker.image.avatar(),
      },
  })
  }

  for(let i = 0; i < 50; i++) {
    const startDate = faker.date.between('2022-07-15T00:00:00.000Z', '2022-07-19T00:00:00.000Z')
    const endDate = addHour(startDate)

    const patientId = patientIdList[Math.floor(Math.random() * patientIdList.length)]
    const doctorId = doctorIdList[Math.floor(Math.random() * doctorIdList.length)]

    await prisma.appointment.create({
        data: {
            startDate: startDate,
            endDate: endDate,
            
            doctorId: doctorId,
            patientId: patientId,
  
            status: 'pending',
            notes: "",
        }});
      }
    }
  
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })