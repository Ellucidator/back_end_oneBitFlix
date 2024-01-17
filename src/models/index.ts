import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";
import { Favorite } from "./Favorite";
import { Like } from "./Like";

Category.hasMany(Course, {as:'courses'})

Course.belongsTo(Category)
Course.hasMany(Episode, {as:'episodes'})
Course.belongsToMany(User, {through:Favorite, as:'users', foreignKey:'course_id'})
Course.hasMany(Favorite, {as:'FavoritesUsers', foreignKey:'course_id'})
Course.belongsToMany(Like, {through: Like, as:'users', foreignKey:'course_id'})
Course.hasMany(Like, {as:'LikesUsers', foreignKey:'course_id'})

User.belongsToMany(Course, {through:Favorite, as:'courses', foreignKey:'user_id'})
User.hasMany(Favorite, {as:'FavoritesCourses', foreignKey:'user_id'})
User.belongsToMany(Like, {through: Like, as:'courses', foreignKey:'user_id'})
User.hasMany(Like, {as:'LikesCourses', foreignKey:'user_id'})

Favorite.belongsTo(Course)
Favorite.belongsTo(User)

Like.belongsTo(User)
Like.belongsTo(Course)

Episode.belongsTo(Course)


export { 
    Category,
    Course,
    Episode,
    User,
    Favorite,
    Like
}