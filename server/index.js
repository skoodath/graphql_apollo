const { ApolloServer, UserInputError, gql } = require("apollo-server");
require("dotenv").config();
const typeDefs = require("./schema");
const mongoose = require("mongoose");
const Person = require("./models/person");

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB database");
  })
  .catch((error) => {
    console.log("error connection to MongoDB: ", error.message);
  });

const resolvers = {
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({});
      }

      return Person.find({ phone: { $exists: args.phone === "YES" } });
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
  },
  Mutation: {
    addPerson: async (root, args) => {
      const person = new Person({ ...args });
      try {
        await person.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return person;
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      person.phone = args.phone;
      return person.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
