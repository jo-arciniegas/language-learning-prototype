import AppService from "./api";

const QaService = {
    getQas: () => {
        return AppService.get('qas?populate=*');
    }
}

export default QaService;