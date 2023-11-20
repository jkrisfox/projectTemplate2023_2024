import { db, storage } from '../../firebase/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function uploadImage(userId, image) {
  if (image.size > 5000000) {
    const error = new Error("Image cannot be more than 5 MB large");
    error.code = 413;
    throw error;
  }

  if (!image.name.match(/^[\w -]+.(jpeg|jpg|png)$/i)) {
    const error = new Error("Image has an invalid extension. Allowed: jpg, png");
    error.code = 400;
    throw error;
  }
  
  // Image name is a random 9 digit number
  const imageName = Math.floor(100000000 + Math.random() * 900000000) + '.' + image.name.split('.').pop();
  const filePath = `images/${userId}/${imageName}`;
  const newImageRef = ref(storage, filePath);
  let imageURL;

  await uploadBytes(newImageRef, image).then(async () => {
    await getDownloadURL(newImageRef).then(res => {
      imageURL = res;
    }).catch(err => {
      throw err;
    });
  }).catch(err => {
    throw err;
  });

  return imageURL;
}

export async function createUser(userId, email) {
  const userRef = doc(db, "users", userId);
  return setDoc(userRef, {
    email: email,
    isVerified: false,
    isAdmin: false,
    name: "",
    phoneNumber: "",
    location: "",
    profileImage: "",
    heroImage: "",
    isStudent: false,
    contactInfoVisibility: false,
    favoriteListings: [],
    favoriteUsers: []
  });
}

export async function getUser(userId) {
  const userRef = doc(db, "users", userId);
  let userData;

  await getDoc(userRef).then(userSnapshot => {
    if (userSnapshot.exists()) {
      userData = userSnapshot.data();
    } else {
      userData = null;
    }
  }).catch(err => {
    throw err;
  });

  return userData;
}

export async function updateUser(userId, userData) {
  const userRef = doc(db, "users", userId);
  return updateDoc(userRef, userData);
}
