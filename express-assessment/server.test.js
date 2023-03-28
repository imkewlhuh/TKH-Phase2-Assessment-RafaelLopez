import request from "supertest";
import createServer from "./server.js";

const server = createServer();

describe("Test User Management System", () => {
  it("Should be able to get all active users", (done) => {
    request(server)
      .get("/users")
      .expect(200)
      .end((err, resp) => {
        if (err) {
          done(err);
        } else {
          expect(resp.body).toHaveProperty("success", true);
          expect(resp.body).toHaveProperty("users");
          expect(resp.body.users).toBeInstanceOf(Array);
          expect(resp.body.users).toBeGreaterThanOrEqual(1);
          done();
        }
      });
  });

  it("Should be able to get only admins", (done) => {
    request(server)
      .get("/users/admins")
      .expect(200)
      .end((err, resp) => {
        if (err) {
          done(err);
        } else {
          expect(resp.body).toHaveProperty("success", true);
          expect(resp.body).toHaveProperty("users");
          expect(resp.body.users).toBeInstanceOf(Array);
          expect(resp.body.users).toBeGreaterThanOrEqual(1);
          done();
        }
      });
  });

  it("Should be able to create a user", (done) => {
    request(server)
      .post("/users")
      .expect(201)
      .send({
        firstName: "James",
        lastName: "Smith",
      })
      .end((err, resp) => {
        if (err) {
          done(err);
        } else {
          expect(resp.body).toHaveProperty("success", true);
          done();
        }
      });
  });

  it("Should be able to edit a user", (done) => {
    request(server)
      .put("/users/1")
      .expect(200)
      .send({
        firstName: "Jameson",
      })
      .end((err, resp) => {
        if (err) {
          done(err);
        } else {
          expect(resp.body).toHaveProperty("success", true);
          done();
        }
      });
  });

  it("Should be able to delete a user", (done) => {
    request(server)
      .delete("/users/1")
      .expect(200)
      .end((err, resp) => {
        if (err) {
          done(err);
        } else {
          expect(resp.body).toHaveProperty("success", true);
          done();
        }
      });
  });
});
