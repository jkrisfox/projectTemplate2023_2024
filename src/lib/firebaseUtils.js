import { db, storage } from "../../firebase/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadImage(userId, image) {
  if (image.size > 5000000) {
    throw new Error("Image cannot be more than 5 MB large");
  }

  if (!/\.(jpeg|jpg|png)$/i.test(image.name)) {
    throw new Error("Image has an invalid extension. Allowed: jpg, png");
  }

  // Image name is a random 9 digit number
  const imageName = `${Math.floor(100000000 + Math.random() * 900000000)}.${image.name.split(".").pop()}`;
  const filePath = `images/${userId}/${imageName}`;
  const newImageRef = ref(storage, filePath);

  try {
    await uploadBytes(newImageRef, image);
    const imageURL = await getDownloadURL(newImageRef);
    return imageURL;
  } catch (err) {
    // Handle or rethrow the error as appropriate
    console.error("Error uploading image:", err);
    throw err;
  }
}
export async function createUser(userId, email) {
  const userRef = doc(db, "users", userId);
  const contactRef = doc(db, "users", userId, "private", "contact");
  const favoritesRef = doc(db, "users", userId, "private", "favorites");

  await setDoc(userRef, {
    isAdmin: false,
    isStudent: false,
    isVerified: false,
    name: "",
    profileImage: "",
    heroImage: "",
    contactInfoVisibility: false,
  }).catch((err) => {
    throw err;
  });

  await setDoc(contactRef, {
    email: email,
    phoneNumber: "",
    location: "",
  }).catch((err) => {
    throw err;
  });

  await setDoc(favoritesRef, {
    favoriteListings: [],
    favoriteUsers: [],
  }).catch((err) => {
    throw err;
  });
}

export async function getUser(userId) {
  const userRef = doc(db, "users", userId);
  const contactRef = doc(db, "users", userId, "private", "contact");
  const favoritesRef = doc(db, "users", userId, "private", "favorites");

  let userData = null;
  let contactData = null;
  let favoritesData = null;

  await getDoc(userRef)
    .then((userSnapshot) => {
      if (userSnapshot.exists()) {
        userData = userSnapshot.data();
      }
    })
    .catch((err) => {
      throw err;
    });

  // If there is no user data, there can't be anything else
  if (!userData) {
    return null;
  }

  await getDoc(contactRef)
    .then((contactSnapshot) => {
      if (contactSnapshot.exists()) {
        contactData = contactSnapshot.data();
      }
    })
    .catch(() => {
      // User probably doesn't have permission to view document, don't do anything.
    });

  await getDoc(favoritesRef)
    .then((favoritesSnapshot) => {
      if (favoritesSnapshot.exists()) {
        favoritesData = favoritesSnapshot.data();
      }
    })
    .catch(() => {
      // User probably doesn't have permission to view document, don't do anything.
    });

  // Merge results
  return { ...userData, ...contactData, ...favoritesData };
}

export async function updateUser(userId, data) {
  const {
    email,
    isVerified,
    isAdmin,
    name,
    phoneNumber,
    location,
    profileImage,
    heroImage,
    isStudent,
    contactInfoVisibility,
    favoriteListings,
    favoriteUsers,
  } = data;

  const userData = {
    isAdmin,
    isStudent,
    isVerified,
    name,
    profileImage,
    heroImage,
    contactInfoVisibility,
  };
  const contactData = { email, phoneNumber, location };
  const favoritesData = { favoriteListings, favoriteUsers };

  // Remove undefined fields
  Object.keys(userData).forEach(
    (key) => userData[key] === undefined && delete userData[key]
  );
  Object.keys(contactData).forEach(
    (key) => contactData[key] === undefined && delete contactData[key]
  );
  Object.keys(favoritesData).forEach(
    (key) => favoritesData[key] === undefined && delete favoritesData[key]
  );

  const userRef = doc(db, "users", userId);
  const contactRef = doc(db, "users", userId, "private", "contact");
  const favoritesRef = doc(db, "users", userId, "private", "favorites");

  if (userData) {
    await updateDoc(userRef, userData);
  }

  if (contactData) {
    await updateDoc(contactRef, contactData);
  }

  if (favoritesData) {
    await updateDoc(favoritesRef, favoritesData);
  }
}
