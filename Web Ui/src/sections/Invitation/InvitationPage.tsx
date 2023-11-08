import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import firebase from "../../firebaseConfig";
import SuccessfulSignUpPopUp from "./components/SuccessfulSignUpPopUp";
import SuccessfulEnrollmentPopUp from "./components/SuccessfulEnrollmentPopUp";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import { GithubAuthPort } from "../../modules/Auth/application/GithubAuthPort";
import { RegisterPort } from "../../modules/Auth/application/RegisterPort";
import UserOnDb from "../../modules/Auth/domain/userOnDb.interface";


function AuthComponent(){
  const [user, setUser] = useState<User | null>(null);
  const githubAuthPort = new GithubAuthPort();
  const dbAuthPort = new RegisterPort();
  useEffect(() => {
    const auth = getAuth(firebase);
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const [showPopUp, setShowPopUp] = useState(false);

  const handleSignUp = async () => {
    let userData = await githubAuthPort.handleSignInWithGitHub();
    if (userData) {
      setUser(userData);
    }
  };
  const handleAcceptInvitation = async () => {
    if (user?.email) {
      let userObj: UserOnDb = { email: user.email, course: "mainCourse" };
      await dbAuthPort.register(userObj);
      setShowPopUp(true);
    }
  };
  return (
    <div>
      {user ? (
        <div>
          <p>Bienvenido, {user.displayName}</p>
          <img
            src={user.photoURL ?? "URL_POR_DEFECTO"}
            alt={user.displayName ?? "Usuario"}
          />
          <Button onClick={githubAuthPort.handleSignOut}>Cerrar sesión</Button>
          <Button onClick={handleAcceptInvitation}>
            Aceptar invitación al curso
          </Button>
          {showPopUp && <SuccessfulEnrollmentPopUp></SuccessfulEnrollmentPopUp>}
        </div>
      ) : (
        <Button color="primary" aria-label="GitHub" onClick={handleSignUp}>
          <GitHubIcon></GitHubIcon>
          Registrarse
        </Button>
      )}

      {user && (
        <SuccessfulSignUpPopUp
          photoAccount={user.photoURL}
          nameAccount={user.displayName}
        ></SuccessfulSignUpPopUp>
      )}
    </div>
  );
};

export default AuthComponent;
