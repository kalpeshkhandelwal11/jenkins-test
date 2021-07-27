const mongoose = require('mongoose');
const detailsSchema = new mongoose.Schema({
    data_3: { type: String, required: false },
    data_4: { type: String, required: false },
    data_5: { type: String, required: false },
    data_6: { type: String, required: false },
    data_7: { type: String, required: true },
    data_8: { type: String, required: true },
    data_9: { type: String, required: true },
    data_10: { type: String, required: true },
    data_11: { type: String, required: true },
    data_12: { type: String, required: true }
})
module.exports = mongoose.model('details', detailsSchema);