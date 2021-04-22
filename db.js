const firebase = require('firebase')
require('firebase/firestore')

firebase.initializeApp({
    apiKey: 'AIzaSyCc9Nq5_hO5k5B0NJh772x4M4KA3EcdoP4',
    authDomain: 'inter-com-bot.firebaseapp.com',
    projectId: 'inter-com-bot',
    storageBucket: 'inter-com-bot.appspot.com',
    messagingSenderId: '435931175067',
    appId: '1:435931175067:web:2672116d6d95e5f1424e3e',
})

const db = firebase.firestore()

const addUserToDb = ({ userId, channelId, timezone, currency }) => {
    // will be used to get the currency or timezone of the user who SENDS the message (translate FROM these)
    db.collection('users').doc(userId).set({
        userId,
        timezone,
        currency,
    })
    // will be used to get the currencies or timezones of the rest of the channel (translate TO these)
    db.collection('channels')
        .doc(channelId)
        .set({
            channelId,
            timezones: firebase.firestore.FieldValue.arrayUnion(timezone),
            currencies: firebase.firestore.FieldValue.arrayUnion(currency),
        })
}

const getUserFromMessage = async (msg) => {
    try {
        const doc = await db.collection('users').doc(msg.member.user.tag).get()
        if (doc.exists) {
            return doc.data()
        } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
        }
    } catch (error) {
        console.log('Error getting document:', error)
    }
}

module.exports = {
    db,
    addUserToDb,
    getUserFromMessage,
}
