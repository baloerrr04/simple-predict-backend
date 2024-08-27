const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
 
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()
 
        const classes = ['Melanocytic nevus', 'Squamous cell carcinoma', 'Vascular lesion'];
 
        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;
 
        const cancerProbability = score[0];
        const label = cancerProbability > 0.5 ? 'Cancer' : 'Non-cancer';
 
        let suggestion;
 
        if(label === "Cancer") {
            suggestion = "Segera periksa ke dokter!"
        } else {
            suggestion = "Anda tidak terkena kanker"
        }
 
        return { confidenceScore, label, suggestion };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan dalam melakukan prediksi ${error.message}`)
    }
}
 
module.exports = predictClassification;