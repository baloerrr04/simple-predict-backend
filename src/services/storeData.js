const { Firestore } = require('@google-cloud/firestore');
 
async function storeData(id, data) {
  const db = new Firestore({
    projectId: "submissionmlgc-adityah",
  });
 
  try {
    const predictCollection = db.collection('predictions');
    return predictCollection.doc(id).set(data);
  } catch (error) {
    console.log(error.message);
    throw new InputError(`${error.message}`)
  }
  
}

module.exports = storeData;