import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { addDoc, collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZq76UZIrjhA1z6OGZuwxqyTOxW3jbk1Y",
  authDomain: "dpica-app.firebaseapp.com",
  projectId: "dpica-app",
  storageBucket: "dpica-app.appspot.com",
  messagingSenderId: "441096894984",
  appId: "1:441096894984:web:bbff5320090380cb8f6fbd",
  measurementId: "G-PL32BPCTG9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const passwordReset = async (email:string) => {
  await sendPasswordResetEmail(auth,email);
};

const usersFormsDate = collection(db,"users-emails-date");

export const getUserFormDate = async (userEmail:string) => {
  let data;
  try{
    data = await getDocs(usersFormsDate);
    const filterData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
    const userGotten = filterData.find(item => item.userEmail === userEmail);
    if(userGotten){
      return userGotten;
    }else{
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const postUserFormDate = async (userEmail:string,dateForm:string) => {
  await addDoc(usersFormsDate,{
    userEmail:userEmail,
    userFormDate:dateForm,
    userId: auth?.currentUser?.uid,
  });
};

export const updateUserFormDate =async (id:string,newDateForm:string) => {
  const userForm = doc(db,"users-emails-date",id);
  await updateDoc(userForm, { userFormDate:newDateForm });
};