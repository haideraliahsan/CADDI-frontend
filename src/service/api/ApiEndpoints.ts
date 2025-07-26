const ApiEndpoints = Object.freeze({
  // User Endpoints
  USERS_POST_CREATE: '/users/',
  USERS_GET_ALL: '/users/',
  USERS_GET_BY_ID: (id: string) => `/users/${id}`,

  // Annotation Endpoints
  ANNOTATIONS_POST_CREATE: '/annotations',
  ANNOTATIONS_GET_BY_IMAGE_ID: (imageId: string) => `/annotations/image/${imageId}`,
  ANNOTATIONS_GET_BY_ID: (id: string) => `/annotations/${id}`,

  // ... add others here
});

export default ApiEndpoints;
