const { Schema, model } = require("mongoose");

const AgendaCalendarSchema = Schema({
    title:{
        type: String,
        required: true
    },
    nameArtist: {
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    dateInit:{
        type: Date,
        required: true,
    },
    dateEnd:{
        type: Date,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

})

AgendaCalendarSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = model('AgendaCalendar', AgendaCalendarSchema);