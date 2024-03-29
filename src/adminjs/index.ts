import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { Category, Course, Episode, User } from "../models";
import bcrypt from "bcrypt";
import { locale } from "./locale";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
    databases: [sequelize],
    rootPath: "/admin",
    resources: adminJsResources,
    locale:locale,
    dashboard: {
        component: AdminJS.bundle('./components/Dashboard'),
        handler: async (req,res,context) => {
            const courses = await Course.count();
            const episodes = await Episode.count();
            const users = await User.count({where:{role:'user'}});
            const categories = await Category.count();

            res.json({
                'Cursos': courses,
                'Episodios': episodes,
                'Usários': users,
                'Categorias': categories
            })
        }
    },
    branding: {
        companyName: "OneBitFlix",
        logo: "/logoOnebitflix.svg",
        theme: {
            colors: {
                primary100: "#ff0043",
                primary80: "#ff1a57",
                primary60: "#ff3369",
                primary40: "#ff4d7c",
                primary20: "#ff668f",
                grey100: "#151515",
                grey80: "#333333",
                grey60: "#4d4d4d",
                grey40: "#666666",
                grey20: "#dddddd",
                filterBg: "#333333",
                accent: "#151515",
                hoverBg: "#151515",
            },
        },
    },
});

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs,{
    authenticate: async (email, password) => {
        const user = await User.findOne({ where: { email } })

        if(user && user.role === 'admin'){
            const passwordMatch = await bcrypt.compare(password,user.password)
            if(passwordMatch){
                return user
            }
        }

        return false
    },
    cookiePassword: 'some-secret-password-used-to-secure-cookie'

},null,{
    resave: false,
    saveUninitialized: false
})
