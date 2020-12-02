import {auth} from './database';

class AuthenticationApi {
    static logIn({email, password}){
        return auth.signInWithEmailAndPassword(email, password);
    }
    static register({email, password}){
        return auth.createUserWithEmailAndPassword(email, password);
    }
    static logOut() {
        return auth.signOut();
    }
}

export default AuthenticationApi;