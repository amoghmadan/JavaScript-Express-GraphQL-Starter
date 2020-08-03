import { PersonModel } from '../../models/person';

const mutations = {
    createPerson: async (args) => {
        let newPerson = new PersonModel(args);
        return await newPerson.save();
    },
    updatePerson: async (args) => {
        return await PersonModel.findByIdAndUpdate({ _id: args.id }, args);
    },
    deletePerson: async (args) => {
        return await PersonModel.findByIdAndDelete({ _id: args.id }, args);
    },
};

export default mutations;
