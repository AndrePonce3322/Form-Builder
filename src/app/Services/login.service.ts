import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth: Auth) { }

  registrar({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  } 

  async login({ email, password }: any) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  GoogleLogin() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  FacebookLogin(){
    return signInWithPopup(this.auth, new FacebookAuthProvider());
  }

  salir() {
    signOut(this.auth);
  }

}