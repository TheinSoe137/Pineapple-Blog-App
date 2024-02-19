import { Client, ID, Databases, Query, Storage } from "appwrite";
import config from "../config/config";
export class Service {
  client = new Client();
  database;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ user, post, featuredImage, title, status, slug }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          user,
          post,
          featuredImage,
          title,
          status,
        },
        console.log("post created successfully")
      );
    } catch (error) {
      console.log("Error in" + error);
    }
  }
  async updatePost(slug, { post, featuredImage, title, status }) {
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          post,
          featuredImage,
          title,
          status,
        },
        console.log("post updated successfully")
      );
    } catch (error) {
      console.log("Error in" + error);
    }
  }
  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Error in" + error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Error in" + error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      // console.log("getPosts is being called");
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Error in" + error);
      return false;
    }
  }
  /// uploading files
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("error in upload file" + error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("error in delete file" + error);
      return false;
    }
  }
  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Error in getting file Preview" + error);
    }
  }
}
const appwriteService = new Service();
export default appwriteService;
