import { Router } from "express";
import { startOfHour, parseISO, isEqual } from 'date-fns'
import Appointment from "../models/Appointments";

const appointmentsRouter = Router()

const appointments: Appointment[] = []

appointmentsRouter.post('/', (request, response) => {
   const { provider, date }  = request.body

   const parsedDate = startOfHour(parseISO(date))

   const findAppointmentInSameDate = appointments.find(appointment => isEqual(parsedDate, appointment.date))

   if(findAppointmentInSameDate) {
      return response.status(400).json({ message: 'This appointments is already boocked' })
   }

   const appointment = new Appointment(provider, parsedDate)

   appointments.push(appointment)

   return response.json(appointment)
})

export default appointmentsRouter
