const {Schema,model,Types} = require("mongoose")

const appointmentSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: false
    },
    appointmentTime: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: "Предстоит"
    }
});

module.exports =  model('Appointment', appointmentSchema);


