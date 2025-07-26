import {
    getRequest,
    postRequest,
  } from '@/lib/apiService';
  import ApiEndpoints from '@/lib/ApiEndpoints';
  
  class UserService {
    static createUser(data: any) {
      return postRequest(ApiEndpoints.USERS_POST_CREATE, data);
    }
  
    static getAllUsers() {
      return getRequest(ApiEndpoints.USERS_GET_ALL);
    }
  
    static getUserById(id: string) {
      return getRequest(ApiEndpoints.USERS_GET_BY_ID(id));
    }
  }
  
  export default UserService;
  