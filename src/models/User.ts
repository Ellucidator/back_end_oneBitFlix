import { Model, Optional } from "sequelize"
import { sequelize } from "../database"
import { DataTypes } from "sequelize"

export interface User{
    id: number
    first_name: string
    last_name: string
    phone: string
    birth: Date
    email: string
    password: string
    role: 'admin'|'user'
}

export interface UserCreationAttributes extends Optional<User, 'id'>{}

export interface UserInstance extends Model<User,UserCreationAttributes >, User{ }

export const User = sequelize.define<UserInstance, User>('User', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    first_name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    last_name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING
    },
    birth: {
        allowNull: false,
        type: DataTypes.DATE
    },
    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING
    }
},
{
    tableName: 'users'
})