import {
    UserService,
    type UserPayload,
    type UserTokenPayload,
} from "../../services/user.js";

const queriesResolver = {
    getUserToken: async (_: any, payload: UserTokenPayload) => {
        const token = await UserService.getUserToken(payload);
        
        return token;
    },
    getCurrentUser: async (_: any, params:any, context: any) => {
        const { token }: {token: string}= context;
        
        try {
            const user: any = UserService.decodeToken(token);
            if(!user) throw new Error("Incorrect Token")
            
            const User = await UserService.getUserById(user.id)
            if(!User) throw new Error("Internal Server Error")

            return User;
        } catch (error) {
            throw new Error("Error")
        }
    }
};

const mutationsResolver = {
    createUser: async (_: any, payload: UserPayload) => {
        const response = await UserService.createUser(payload);

        return response.id;
    },
};

export const resolver = {
    queriesResolver,
    mutationsResolver,
};
