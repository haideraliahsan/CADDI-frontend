import {
    getRequest,
    postRequest,
} from '@/lib/apiService';
import ApiEndpoints from '@/lib/ApiEndpoints';

class AnnotationService {


    static createAnnotation(data: any) {
        return postRequest(ApiEndpoints.ANNOTATIONS_POST_CREATE, data);
    }


    static getAnnotationsByImageId(imageId: string) {
        return getRequest(ApiEndpoints.ANNOTATIONS_GET_BY_IMAGE_ID(imageId));
    }


    static getAnnotationById(id: string) {
        return getRequest(ApiEndpoints.ANNOTATIONS_GET_BY_ID(id));
    }
}

export default AnnotationService;
