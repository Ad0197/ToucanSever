const faker = require("faker");

exports.mockUserData = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.exampleEmail(),
  country: faker.address.country(),
  city: faker.address.city(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
  address: faker.address.streetAddress(),
  followings: [],
  followers: [],
  albums: Array.from(Array(2), () => this.mockAlbum()),
});

exports.mockResources = () => ({
  type: faker.helpers.randomize(["video", "image"]),
  url: faker.image.nature(),
});

exports.mockAlbum = () => ({
  name: faker.random.uuid(),
  resources: Array.from(Array(5), () => this.mockResources()),
});

exports.mockPublication = (id) => ({
  author: id,
  description: faker.lorem.sentence(
    faker.random.number(15),
    faker.random.number(15)
  ),
  comments: Array.from(Array(5), () => ({
    comment: faker.lorem.words(10),
    author: id,
  })),
});

exports.mockCommentsData = (id) => ({
  comment: faker.lorem.words(10),
  author: id,
});

exports.mockResourceRef = () => ({
  resourceId: faker.random.uuid(),
  parentId: faker.random.uuid(),
  albumId: faker.random.uuid(),
});

exports.mockUserCredentialData = function () {
  this.username = faker.internet.userName();
  this.password = faker.internet.password(8);
};
