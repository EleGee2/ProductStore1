/* eslint-disable no-undef */
const chai = require("chai");

const chaiHttp = require("chai-http");

const should = chai.should();

chai.use(chaiHttp);

describe("Store API", () => {
  /**
   * Test the GET route
   */
  describe("GET /api/v1/products/all", async function () {
    it("It should GET all the products", function (done) {
      chai
        .request("127.0.0.1:8000/api/v1/products")
        .get("/all")
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.be.a("object");
          //res.body.results.should.be.eql(1);
          done();
        });
    });

    it("It should NOT GET all the products", function (done) {
      chai
        .request("127.0.0.1:8000/api/v1/products")
        .get("/")
        .end((err, res) => {
          //should.equal(err, null);
          res.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GETONE route
   */
  describe("GET /api/v1/products/one/:id", async function () {
    it("It should GET a product by the given id", function (done) {
      const productId = "5fad4d537b685157dcc0cfae";
      chai
        .request("127.0.0.1:8000/api/v1/products")
        .get(`/one/${productId}`)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.data.data.should.have.property("_id").eql(productId);
          res.body.data.data.should.have.property("name");
          res.body.data.data.should.have.property("description");
          res.body.data.data.should.have.property("price");
          res.body.data.data.should.have.property("slug");
          done();
        });
    });
    it("It should NOT GET a product by the given id", function (done) {
      const productId = "5fad4d537b685157dcc0cfad";
      chai
        .request("127.0.0.1:8000/api/v1/products")
        .get(`/one/${productId}`)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(404);
          res.body.message.should.be.eq("No document found with that ID");
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  describe("POST /api/v1/products", async function () {
    it("It should POST a new product ", function (done) {
      const product = {
        name: "Bicycle",
        description: "Olympic Biycle",
        price: 2000,
        slug: "bicycle",
      };
      chai
        .request("127.0.0.1:8000/api/v1/products")
        .post("/create")
        .send(product)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("status").eql("success");
          res.body.data.data.should.have.property("name").eql("Bicycle");
          res.body.data.data.should.have
            .property("description")
            .eql("Olympic Biycle");
          res.body.data.data.should.have.property("price").eql(2000);
          res.body.data.data.should.have.property("slug").eql("bicycle");
          done();
        });
    });
    it("It should NOT POST a new product without Price Property", function (done) {
      const product = {
        name: "Bicycle",
        description: "Olympic Biycle",
        slug: "bicycle",
      };
      chai
        .request("127.0.0.1:8000/api/v1/products")
        .post("/create")
        .send(product)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(500);
          res.body.message.should.be.eq(
            "Product validation failed: price: A product must have a price"
          );
          done();
        });
    });
  });
  /**
   * Test the PATCH route
   */
  describe("PATCH /api/v1/products", async function () {
    let token;
    before(function (done) {
      chai
        .request("127.0.0.1:8000/api/v1/users")
        .post("/login")
        .send({
          email: "j@gmail.com",
          password: "default123",
        })
        .end(function (err, res) {
          if (err) throw err;
          // eslint-disable-next-line prefer-destructuring
          token = { access_token: res.body.token };
          done();
        });
    });
    it("It should UPDATE a new product ", function (done) {
      const product = {
        price: 1000,
      };
      const productId = "5fad4d537b685157dcc0cfae";
      chai
        .request("127.0.0.1:8000/api/v1/products")
        .patch(`/one/${productId}`)
        .send(product)
        .set("Authorization", `Bearer ${token.access_token}`)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status").eql("success");
          res.body.data.data.should.have.property("price").eql(1000);
          done();
        });
    });
    it("It should NOT UPDATE a new product ", function (done) {
      const product = {
        price: 1000,
      };
      const productId = "5fad4d537b685157dcc0cfae";
      chai
        .request("127.0.0.1:8000/api/v1/products")
        .patch(`/one/${productId}`)
        .send(product)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(401);
          done();
        });
    });
  });

  /**
   * Test the DELETE route
   */
  describe("DELETE /api/v1/products", async function () {
    let token;
    before(function (done) {
      chai
        .request("127.0.0.1:8000/api/v1/users")
        .post("/login")
        .send({
          email: "j@gmail.com",
          password: "default123",
        })
        .end(function (err, res) {
          if (err) throw err;
          // eslint-disable-next-line prefer-destructuring
          token = { access_token: res.body.token };
          done();
        });
    });
    it("It should DELETE a product ", function (done) {
      const product = {
        price: 1000,
      };
      const productId = "5fae8d5684a7b543a8a522ca";
      chai
        .request("127.0.0.1:8000/api/v1/products")
        .delete(`/one/${productId}`)
        .send(product)
        .set("Authorization", `Bearer ${token.access_token}`)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(204);
          done();
        });
    });
    it("It should NOT DELETE a product ", function (done) {
      const product = {
        price: 1000,
      };
      const productId = "5fae8d5684a7b543a8a522ca";
      chai
        .request("127.0.0.1:8000/api/v1/products")
        .delete(`/one/${productId}`)
        .send(product)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(401);
          done();
        });
    });
  });

  /**
   * Test the SIGNUP route
   */
  describe("POST /api/v1/users", async function () {
    it("It should CREATE a new user ", function (done) {
      const user = {
        name: "Papi Jay",
        email: "wunna@gmail.com",
        password: "default123",
        passwordConfirm: "default123",
      };
      chai
        .request("127.0.0.1:8000/api/v1/users")
        .post("/signup")
        .send(user)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(201);
          res.body.should.have.property("token");
          res.body.should.be.a("object");
          res.body.data.user.should.have.property("name").eql("Papi Jay");
          res.body.data.user.should.have
            .property("email")
            .eql("wunna@gmail.com");
          done();
        });
    });
    it("It should NOT CREATE a new user without the NAME property", function (done) {
      const user = {
        email: "wunna@gmail.com",
        password: "default123",
        passwordConfirm: "default123",
      };
      chai
        .request("127.0.0.1:8000/api/v1/users")
        .post("/signup")
        .send(user)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(500);
          res.body.message.should.be.eq(
            "User validation failed: name: Please tell us your name!"
          );
          done();
        });
    });
  });

  /**
   * Test the LOGIN route
   */
  describe("POST /api/v1/users", async function () {
    it("It should LOGIN a user ", function (done) {
      const user = {
        email: "j@gmail.com",
        password: "default123",
      };
      chai
        .request("127.0.0.1:8000/api/v1/users")
        .post("/login")
        .send(user)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(201);
          res.body.should.have.property("token");
          res.body.should.be.a("object");
          res.body.data.user.should.have.property("email").eql("j@gmail.com");
          done();
        });
    });
    it("It should NOT LOGIN a user without the RIGHT password", function (done) {
      const user = {
        email: "j@gmail.com",
        password: "default1234",
      };
      chai
        .request("127.0.0.1:8000/api/v1/users")
        .post("/login")
        .send(user)
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(401);
          res.body.message.should.be.eq("Incorrect email or password");
          done();
        });
    });
  });
});
