import conf from "../config/config";

import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            console.log("userAccount : " ,userAccount);
            
            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount
            }

        } catch (error) {
            console.log("Appwrite service :: create Account :: error", error);

        }
    }

    async login({ email, password }) {
        try {
            const isLogged = await this.account.createEmailPasswordSession(email, password)
            console.log("islogged",isLogged);
            return isLogged

        } catch (error) {
            console.log("Appwrite service :: Login :: error", error);
            throw error
        }
    }

    async getCurrentUser() {
        try {
            const user = this.account.get()
            // console.log(user);
            return user
        } catch (error) {
            console.log("Appwrite service :: Get Current User :: error", error);
            return null
        }
    }

    async logout() {
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: create Account :: error", error);
        }
    }
}

const authService = new AuthService()

export default authService; 