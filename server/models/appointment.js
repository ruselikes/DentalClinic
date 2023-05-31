const {Schema,model,Types} = require("mongoose")

const appointmentSchema = new Schema({
    patientId: {
        type: Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: false
    },
    appointmentTime: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: "Предстоит"
    }
});

module.exports =  model('Appointment', appointmentSchema);


