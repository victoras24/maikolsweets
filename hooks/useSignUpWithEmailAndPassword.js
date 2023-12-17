import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../data/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { firestore } from '../data/firebase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';

const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth)
    const navigate = useNavigate()
    const toast = useToast()

    const signup = async (inputs) => {
        const usersRef = collection(firestore, "users")
        const q = query(usersRef, where("username", "==", inputs.username))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
            toast.openUsernameExistsError()
            return
        }

        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
            if (!newUser && error) {
                toast.firebaseError(error.message.replace("Firebase:", ""))
                return
            }
            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    fullName: inputs.fullName,
                    bio: "",
                    profilePicURL: "",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc)
                localStorage.setItem("user-info", JSON.stringify(userDoc))
                navigate("/")
            }
        } catch (error) {
            toast.firebaseError(error.message.replace("Firebase:", ""))
        }
    }

    return { loading, error, signup }
}

export default useSignUpWithEmailAndPassword;
