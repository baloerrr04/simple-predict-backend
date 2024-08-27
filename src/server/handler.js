const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const getAllData = require('../services/getAllData');
 
async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;
 
  const { confidenceScore, label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
 
  const data = {
    "id": id,
    "result": label,
    "suggestion": suggestion,
    "createdAt": createdAt
  }
  
  await storeData(id, data);
  
  const response = h.response({
    status: 'success',
    message: confidenceScore > 99 ? 'Model is predicted successfully' : 'Model is predicted successfully but under threshold. Please use the correct picture',
    data
  })

  response.code(201);
  return response;

}

async function getPredictHistoriesHandler(request, h) {
  try {
    const histories = await getAllData();

    const response = h.response({
        status: 'success',
        data: histories
    });

    response.code(200);
    return response;
} catch (error) {
    console.error("Error fetching histories:", error);
    return h.response({
        status: 'fail',
        message: error.message 
    }).code(500);
}
}
 
module.exports = {
  postPredictHandler, 
  getPredictHistoriesHandler
}