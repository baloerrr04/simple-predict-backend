const { Firestore } = require('@google-cloud/firestore');

async function getAllData() {
    const db = new Firestore(
        {
            projectId: "submissionmlgc-adityah",
        }
    );

    try {
        const predictCollection = db.collection('predictions');
        const snapshot = await predictCollection.get();

        const histories = snapshot.docs.map(doc => ({
            id: doc.id,
            history: doc.data()
        }));

        return histories
    } catch {
        console.log(error.message);
        throw new InputError(`${error.message}`)
    }
}

module.exports = getAllData