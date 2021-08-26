const { app } = require("../src/server");
const { db } = require('../src/models/index');
const supertest = require('supertest');

const mockRequest = supertest(app);

beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});

describe("Web server", () => {
    it("should be able to sign up", async () => {
        const response = await mockRequest.post("/signup").send({ username: "test", password: "password", role: "admin" });
        expect(response.status).toBe(201)
    })

    it("should be able to sign in", async () => {
        const response = await mockRequest.post("/signin").set({ Authorization: "Basic dGVzdDpwYXNzd29yZA==" })
        expect(response.status).toBe(200)
    })

    it("should be able to create a food", async () => {
        const response = await mockRequest.post("/api/v1/foods").send({ name: "swaga", calories: 10, type: "vegetable" });
        expect(response.status).toBe(201)
    })

    it("should be able to get foods", async () => {
        const response = await mockRequest.get("/api/v1/foods")
        expect(response.status).toBe(200);
    })
})