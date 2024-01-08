import { ResourceOptions } from "adminjs";

export const categoryResourceOptions:ResourceOptions = {
    navigation: 'Catálogos',
    editProperties: ['name', 'position'],
    listProperties: ['id', 'name', 'position'],
    filterProperties: ['name', 'position','createdAt', 'updatedAt'],
    showProperties: ['id', 'name', 'position', 'createdAt', 'updatedAt'],
}