import { PersonModel } from "../../models";

const queries = {
    hello: async () => {
        return "World!";
    },
    people: async () => {
        return await PersonModel.find();
    },
    person: async (args) => {
        return await PersonModel.findOne({ _id: args.id });
    },
};

export default queries;
