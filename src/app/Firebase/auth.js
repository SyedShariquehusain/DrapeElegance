import {
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    GithubAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
  } from "firebase/auth"
  import { auth } from "./config"
  
  // Initialize providers
  const googleProvider = new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()
  const twitterProvider = new TwitterAuthProvider()
  const githubProvider = new GithubAuthProvider()
  
  // Sign in with Google
  export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      return { user: result.user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  }
  
  // Sign in with Facebook
  export const signInWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider)
      return { user: result.user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  }
  
  // Sign in with Twitter
  export const signInWithTwitter = async () => {
    try {
      const result = await signInWithPopup(auth, twitterProvider)
      return { user: result.user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  }
  
  // Sign in with GitHub
  export const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider)
      return { user: result.user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  }
  
  // Sign in with email and password
  export const loginWithEmailAndPassword = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return { user: result.user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  }
  
  // Create a new user with email and password
  export const registerWithEmailAndPassword = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
  
      // Update the user profile with display name if provided
      if (displayName) {
        await updateProfile(result.user, { displayName })
      }
  
      return { user: result.user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  }
  
  // Sign out
  export const logoutUser = async () => {
    try {
      await signOut(auth)
      return { success: true, error: null }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  
  // Reset password
  export const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      return { success: true, error: null }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  
  