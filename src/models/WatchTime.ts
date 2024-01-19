import { DataTypes, Model } from "sequelize"
import { sequelize } from "../database"


export interface WatchTime{
    seconds: number
    episodeId: number
    userId: number
}

export interface WatchTimeInstance extends Model<WatchTime>, WatchTime {}


export const WatchTime = sequelize.define<WatchTimeInstance, WatchTime>('WatchTime', {
    seconds: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    episodeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'episodes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
})