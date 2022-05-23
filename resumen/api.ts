import { Template } from "./types";

const MOCK = [
    {
        id:'developer',
        title:'You are a developer',
        description:'Resumen for programmers'
    },
    {
        id:'marketing',
        title:'You are marketing',
        description:'Resumen for marketing'
    }
];

const api = {
    list: async(): Promise<Template[]> => MOCK,
    fetch: async(id:string): Promise<Template> => {
        const template = MOCK.find((template) => template.id === id);
        
        if(!template){
            throw new Error('Template not found');
        }
        
        return template;
    }
};

export default api;

