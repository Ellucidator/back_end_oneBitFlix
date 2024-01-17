import { Model } from "sequelize"
import { UserInstance } from "./User"
import { CourseInstance } from "./Course"
import { DataTypes } from "sequelize"
import { sequelize } from "../database"


export interface Like{
    userId: number
    courseId: number
}

export interface LikeInstance extends Model<Like>,Like{
    User?:UserInstance
    Course?:CourseInstance
}

export const Like = sequelize.define<LikeInstance, Like>('Like', {
    userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    courseId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: 'courses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
})