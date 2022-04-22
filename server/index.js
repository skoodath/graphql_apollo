const { ApolloServer, UserInputError, gql } = require("apollo-server");
const typeDefs = require("./schema");
const { v1: uuid } = require("uuid");

let persons = [
  {
    name: "Shiju Nambiar",
    phone: "040-12345",
    street: "Golden Mile Road",
    city: "Hyderabad",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Rama Deepti",
    phone: "040-56789",
    street: "Golden Mile Road",
    city: "Hyderabad",

    id: "3d599470-3436-11e9-bc57-8b80ba54c431",
  },
];

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
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) {
        return persons;
      }
      const byPhone = (person) =>
        args.phone === "YES" ? person.phone : !person.phone;
      return persons.filter(byPhone);
    },
    findPerson: (root, args) => persons.find((p) => p.name === args.name),
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find((p) => p.name === args.name)) {
        throw new UserInputError("Name must be unique", {
          invalidArgs: args.name,
        });
      }
      const person = { ...args, id: uuid() };
      persons = persons.concat(person);
      return person;
    },
    editNumber: (root, args) => {
      const person = persons.find((p) => p.name === args.name);
      if (!person) {
        return null;
      }
      const updatePerson = { ...person, phone: args.phone };
      persons = persons.map((p) => (p.name === args.name ? updatePerson : p));
      return updatePerson;
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
