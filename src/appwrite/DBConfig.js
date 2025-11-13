import conf from "../config/config";

import { Client, ID, Databases, Storage, Query, ImageFormat } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket
 
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client)
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId
        }

      )
    } catch (error) {
      console.log("Appwrite service :: create Account :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        }

      )
    } catch (error) {
      console.log("Appwrite service :: update post :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug

      )
      return true;
    } catch (error) {
      console.log("Appwrite service :: Delete Post :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug


      )

    } catch (error) {
      console.log("Appwrite service :: get post :: error", error);
      return false
    }
  }

  async listPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries

      )
    } catch (error) {
      console.log("Appwrite service :: list post :: error", error);
      return false;
    }
  }

  //file uploade services

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        console.log(file)

      )
    } catch (error) {
      console.log("Appwrite service :: create file :: error", error);
      return false
    }
  }


  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId

      )
      return true
    } catch (error) {
      console.log("Appwrite service :: Update file :: error", error);
      return false
    }
  }

  getFilePreview(fileId) {
    try {
      const image = this.bucket.getFileView(
        conf.appwriteBucketId,
        fileId,
    
      )
      return image
    } catch (error) {
      console.log("Appwrite service ::getPriviewFile :: error", error);
    }
  }
}


const dbService = new Service()

export default dbService