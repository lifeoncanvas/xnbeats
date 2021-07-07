import firebase from 'firebase/app';
import 'firebase/auth';

import { usersCollection,reviewsCollection } from '../utils/fbase';

const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const registerUser = async ({email,password,name,lastname}) => {
    try {
        const response = await firebase.auth().createUserWithEmailAndPassword(email,password);
        const {user} = response;

        const userProfile = {
            uid: user.uid,
            email: email,
            name: name,
            lastname: lastname,
            role: 1
        };

        await usersCollection.doc(user.uid).set(userProfile);
        firebase.auth().currentUser.sendEmailVerification(null);
        return { isAuth: true, user: userProfile }
    } catch(error){
        return { error: error.message}
    }
}


export const loginUser = ({email,password}) => (
    firebase
    .auth()
    .signInWithEmailAndPassword(email,password).then( response => {
        return usersCollection.doc(response.user.uid).get().then( snapshot => {
            return { isAuth: true, user: snapshot.data() }
        });
    }).catch( error => {
        return { error: error.message}
    })
)

export const autoSignIn = () => (
    new Promise((resolve,reject)=>{
        firebase.auth().onAuthStateChanged( user => {
            if(user){
                usersCollection.doc(user.uid).get().then( snapshot => {
                    resolve({ isAuth: true, user: snapshot.data() })
                })
            } else {
                resolve({ isAuth: false, user: null })
            }
        })
    })
)

export const logoutUser = () => (
    firebase.auth().signOut()
)


export const updateProfile = (formdata, isEmailChanged) => {
    const collection = usersCollection.doc(formdata.uid);
    const updateDocument = () =>
      collection.update(formdata).then(() => (
          collection.get().then(snapshot => (
            { isAuth: true, user: snapshot.data() }
          ))
      ))

    if(isEmailChanged){
        let getUser = firebase.auth().currentUser;
        getUser.updateEmail(formdata.email)

        return updateDocument()
    }else{
        return updateDocument();
    }
}


export const addReview = (data,user) => (
    reviewsCollection.add({
        ...data,
        createdAt: serverTimestamp(),
        rating:parseInt(data.rating),
        public:parseInt(data.public),
        ownerData:{
            ownerId:user.uid,
            name:`${user.name} ${user.lastname}`,
        }

    }).then(docRef => {
        return docRef.id
    })

)