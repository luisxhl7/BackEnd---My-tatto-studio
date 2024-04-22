const { response } = require('express')
const AgendaCalendar = require('../models/AgendaCalendar')

const createAppointment = async( req, res = response ) => {

    const appointment = new AgendaCalendar( req.body )

    try {
        appointment.user = req.uid;

        const saveAppointment = await appointment.save();

        res.status(200).json({
            status: 200,
            message: 'Cita agendada con éxito.',
            Appointment: saveAppointment
        })

    } catch (error) {
        console.error('Error al agendar la cita:', error);
        res.status(500).json({
            status: 500,
            message: 'Ocurrió un error al agendar la cita. Por favor, contacte al administrador para más ayuda.',
            error: error.message
        })
    }
}

const getAppointments = async (req, res = response) => {
    try {
        const Appointments = await AgendaCalendar.find().populate('user', 'name');

        res.status(200).json({
            status: 200,
            message: 'Lista de citas obtenida exitosamente',
            Appointments: Appointments
        });
    } catch (error) {
        console.error('Error al obtener la lista de citas:', error);
        res.status(500).json({
            status: 500,
            message: 'Ocurrió un error al obtener la lista de citas. Por favor, contacte al administrador para más ayuda.',
            error: error.message
        });
    }
};

const deleteAppointment = async( req, res = response ) => {

    const appointmentId = req.params.id

    try {

        const appointment = await AgendaCalendar.findById(appointmentId)

        if (!appointment) {
            return res.status(404).json({
                status: 404,
                message: 'No existe una cita registrada con este Id',
            }) 
        }

        if (appointment.user.toString() !== req.uid) {
            return res.status(401).json({
                status: 401,
                message: 'No tienes permisos para eliminar esta cita',
            })
        }

        await AgendaCalendar.findByIdAndDelete(appointmentId)

        res.json({
            status: 200,
            message: 'Cita eliminada con éxito',
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Ocurrió un error al eliminar la cita. Por favor, contacte al administrador para más ayuda.',
            error: error.message
        })
    }
}

const updateAppointment = async( req, res = response ) => {
    const appointmentId = req.params.id

    try {

        const Appointment = await AgendaCalendar.findById(appointmentId)

        if (!Appointment) {
            return res.status(404).json({
                status: 404,
                message: 'No existe una cita agendada con este Id',
            }) 
        }

        if (Appointment.user.toString() !== req.uid) {
            return res.status(401).json({
                status: 401,
                message: 'No tienes permisos para modificar esta cita',
            })
        }

        const newAppointment = { 
            ...req.body, 
            user: req.uid
        }

        const AppointmentUpdated = await AgendaCalendar.findByIdAndUpdate(appointmentId, newAppointment, {new: true})

        res.status(200).json({
            status: 200,
            message: 'Cita modificada exitosamente',
            Appointment: AppointmentUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Ocurrió un error al modificar la cita. Por favor, contacte al administrador para más ayuda.',
            error: error.message
        })
    }

}

module.exports = {
    createAppointment,
    getAppointments,
    deleteAppointment,
    updateAppointment
}