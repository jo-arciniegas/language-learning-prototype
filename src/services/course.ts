import AppService from "./api";

const CourseService = {
    getCourses: () => {
        return AppService.get('courses')
    }
}

export default CourseService;
