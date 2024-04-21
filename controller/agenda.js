const { response } = require('express')
const AgendaCalendar = require('../models/AgendaCalendar')


const addEvent = async( req, res = response ) => {

    const event = new AgendaCalendar( req.body )

    try {
        event.user = req.uid;

        const saveEvent = await event.save();

        res.json({
            ok: true,
            message: 'add event success',
            event: saveEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'hable con el administrados',
        })
    }
}

module.exports = {
    addEvent,
}