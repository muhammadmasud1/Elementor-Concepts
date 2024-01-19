import { useState } from "react";
import { Link } from "react-router-dom";
import style from "../Styles/Background.module.css";
import { FaGoogle, FaFacebook } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  TwitterAuthProvider,
  signInWithEmailAndPassword
} from "firebase/auth";
import { authentication } from "../../twitterFirebase";
import { githubAuth } from "../../githubFirebase";
import { facebookAuth } from "../../fbFirebase";
import { googleAuth } from "../../googleFirebase";
import Swal from "sweetalert2";

const Login = () => {

  // State for user
  const [user, setUser] = useState(null);
  /* console.log(user); */

// Google Login Funciton
  const googleLogin = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(googleAuth, provider)
    .then(result => {
      console.log(result.user)
      setUser(result.user)
    }).catch((error) => {
      console.log(error.message)
    })
  }
  
  // facebook Login Function
   const facebookLogin = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(facebookAuth, provider)
    .then(result => {
      console.log(result.user)
      setUser(result.user)
    }).catch((error) => {
      console.log(error.message)
    })
   }
  // GitHub login function
  const githubLogin = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(githubAuth , provider)
    .then(result => {
      console.log(result.user)
      setUser(result.user)
    }).catch((result) => {
      console.log(result.message)
    })
  }
 // Twitter Login Function
 const twitterLogin = () => {
  const provider = new TwitterAuthProvider();
  signInWithPopup(authentication,provider)
  .then(result => {
    console.log(result.user)
    setUser(result.user)
  }).catch((result) => {
    console.log(result.message)
  })
 }
 // 4 way function firebase

// form onSubmit Function 

const handleForm = (event) => {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  signInWithEmailAndPassword(authentication,email,password)
  .then(result => {
    console.log(result.user)
     setUser(result.user);
     Swal.fire({
       position: "center",
       icon: "success",
       title: "Your Login Successfully",
       showConfirmButton: false,
       timer: 1500,
     });
  }).catch((error) => {
    console.log(error.message)

  })
  
};

// Login Function Firebase



  return (
    <div className={style.background}>
      <div className=" h-screen w-full flex justify-center items-center">
        <div className="bg-[#e31414] w-full sm:w-1/2 md:w-9/12 lg:w-1/2 shadow-md flex flex-col md:flex-row items-center mx-5 sm:m-0 rounded">
          <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-center text-white">
            <div className="text-center">
              {user ? (
                <>
                  <img
                    className="text-center max-w-28 inline-flex justify-center items-center rounded-full my-3"
                    src={user.photoURL}
                    alt=""
                  />
                  <h1 className="text-2xl"> {user.displayName}</h1>
                  <p className="text-5xl font-extrabold">Welcome!</p>
                </>
              ) : (
                <>
                  <h1 className="text-3xl">User Name</h1>
                  <p className="text-5xl font-extrabold">Welcome!</p>
                </>
              )}
            </div>
          </div>
          <div className="bg-white w-full md:w-1/2 flex flex-col items-center py-16 px-8">
            <h3 className="text-3xl font-bold text-[#e31414] mb-4">LOGIN</h3>
            <form
              onSubmit={handleForm}
              action="#"
              className="w-full flex flex-col justify-center form-control"
            >
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  
                  className="required appearance-none w-full p-3 rounded border placeholder-black focus:outline-none text-black focus:border-red-600"
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                 
                  className="required appearance-none w-full p-3 rounded border placeholder-black focus:outline-none text-black focus:border-red-600"
                />
                <Link>
                  <p className="text-red-600 px-1">Forget Password</p>
                </Link>
              </div>
             
                <div className="flex mb-5 justify-center items-center text-red-600">
                  <button
                    
                    type="submit" className={style.originalButton1}
                  >
                    Submit
                  </button>
                </div>
             
              <div className="text-center">
                <div className="flex items-center gap-4 justify-center">
                  <div className="w-full h-1 bg-red-800"></div>
                  <h4 className="text-red-500">OR</h4>
                  <div className="w-full h-1 bg-red-800"></div>
                </div>
                <div className="flex items-center justify-center gap-4 my-5 ">
                  <button
                    onClick={googleLogin}
                    className="text-red-600 text-[25px] hover:scale-105 transition-all hover:text-fuchsia-500"
                  >
                    <span>
                      <FaGoogle></FaGoogle>
                    </span>
                  </button>
                  <button
                    onClick={facebookLogin}
                    className="text-red-600 text-[25px] hover:scale-105 transition-all hover:text-fuchsia-500"
                  >
                    <span>
                      <FaFacebook></FaFacebook>
                    </span>
                  </button>
                  <button
                    onClick={githubLogin}
                    className="text-red-600 text-[25px] hover:scale-105 transition-all hover:text-fuchsia-500"
                  >
                    <span>
                      <FaGithub></FaGithub>
                    </span>
                  </button>
                  <button
                    onClick={twitterLogin}
                    className="text-red-600 text-[25px] hover:scale-105 transition-all hover:text-fuchsia-500"
                  >
                    <span>
                      <FaTwitter></FaTwitter>
                    </span>
                  </button>
                </div>
              </div>
              <div>
                <p className="text-black text-center ">
                  Not a member?{" "}
                  <Link className="text-red-600 font-semibold" to="/register">
                    {" "}
                    SignUp Now
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
