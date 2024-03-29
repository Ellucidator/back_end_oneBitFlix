import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";


export interface Category {
    id: number;
    name: string;
    position: number;
};

export interface CategoryCreationAtributes extends Optional<Category, 'id'>{}

export interface CategoryInstance extends Model<Category, CategoryCreationAtributes>, Category{}

export const Category = sequelize.define<CategoryInstance, Category>('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},
{
    tableName: 'categories',
})