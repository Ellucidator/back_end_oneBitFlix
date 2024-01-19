import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";
import { Favorite } from "./Favorite";
import { Like } from "./Like";
import { WatchTime } from "./WatchTime";

Category.hasMany(Course, {as:'courses'})

Course.belongsTo(Category)
Course.hasMany(Episode, {as:'episodes'})
Course.belongsToMany(User, {through:Favorite, foreignKey:'course_id'})
Course.hasMany(Favorite, {as:'FavoritesUsers', foreignKey:'course_id'})
Course.belongsToMany(User, {through: Like})

User.belongsToMany(Course, {through:Favorite, foreignKey:'user_id'})
User.hasMany(Favorite, {as:'FavoritesCourses', foreignKey:'user_id'})
User.belongsToMany(Course, {through: Like})
User.belongsToMany(Episode,{through:WatchTime})

Favorite.belongsTo(Course)
Favorite.belongsTo(User)


Episode.belongsTo(Course)
Episode.belongsToMany(User,{through:WatchTime})


export { 
    Category,
    Course,
    Episode,
    User,
    Favorite,
    Like,
    WatchTime
}