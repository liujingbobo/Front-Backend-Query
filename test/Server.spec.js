"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("../src/rest/Server");
const InsightFacade_1 = require("../src/controller/InsightFacade");
const chai = require("chai");
const chaiHttp = require("chai-http");
const chai_1 = require("chai");
const fs = require("fs");
const Util_1 = require("../src/Util");
describe("Facade D3", function () {
    let facade = null;
    let server = null;
    let SERVER_URL = "http://localhost:4321";
    chai.use(chaiHttp);
    before(function () {
        facade = new InsightFacade_1.default();
        server = new Server_1.default(4321);
        server.start();
    });
    after(function () {
        server.stop();
    });
    beforeEach(function () {
    });
    afterEach(function () {
    });
    let ZIP_FILE_DATA = fs.readFileSync("./test/data/courses.zip");
    it("PUT test for courses dataset", function () {
        let ENDPOINT_URL = ("/dataset/courses/courses");
        try {
            return chai.request(SERVER_URL)
                .put(ENDPOINT_URL)
                .send(ZIP_FILE_DATA)
                .set("Content-Type", "application/x-zip-compressed")
                .then(function (res) {
                chai_1.expect(res.status).to.be.equal(200);
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect.fail();
            });
        }
        catch (err) {
        }
    });
    it("PUT test for courses dataset invalid", function () {
        let ENDPOINT_URL = ("/dataset/course_s/courses");
        try {
            return chai.request(SERVER_URL)
                .put(ENDPOINT_URL)
                .send(ZIP_FILE_DATA)
                .set("Content-Type", "application/x-zip-compressed")
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect(err.status).to.be.equal(400);
            });
        }
        catch (err) {
        }
    });
    it("Delete test for courses dataset", function () {
        let ENDPOINT_URL = ("/dataset/courses");
        try {
            return chai.request(SERVER_URL)
                .del(ENDPOINT_URL)
                .send(ZIP_FILE_DATA)
                .set("Content-Type", "application/x-zip-compressed")
                .then(function (res) {
                chai_1.expect(res.status).to.be.equal(200);
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect.fail();
            });
        }
        catch (err) {
        }
    });
    it("Delete test for courses dataset invalid 404", function () {
        let ENDPOINT_URL = ("/dataset/courses");
        try {
            return chai.request(SERVER_URL)
                .del(ENDPOINT_URL)
                .send(ZIP_FILE_DATA)
                .set("Content-Type", "application/x-zip-compressed")
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect(err.status).to.be.equal(404);
            });
        }
        catch (err) {
        }
    });
    it("Delete test for courses dataset invalid 404", function () {
        let ENDPOINT_URL = ("/dataset/cour_ses");
        try {
            return chai.request(SERVER_URL)
                .del(ENDPOINT_URL)
                .send(ZIP_FILE_DATA)
                .set("Content-Type", "application/x-zip-compressed")
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect(err.status).to.be.equal(400);
            });
        }
        catch (err) {
        }
    });
    it("PUT test for courses dataset", function () {
        let ENDPOINT_URL = ("/dataset/courses/courses");
        try {
            return chai.request(SERVER_URL)
                .put(ENDPOINT_URL)
                .send(ZIP_FILE_DATA)
                .set("Content-Type", "application/x-zip-compressed")
                .then(function (res) {
                chai_1.expect(res.status).to.be.equal(200);
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect.fail();
            });
        }
        catch (err) {
        }
    });
    it("post 200", function () {
        let myquery = {
            WHERE: {
                EQ: {
                    courses_avg: 97
                }
            },
            OPTIONS: {
                COLUMNS: [
                    "courses_dept",
                    "courses_pass"
                ]
            }
        };
        try {
            return chai.request(SERVER_URL)
                .post("/query")
                .send(myquery)
                .set("Content-Type", "application/json")
                .then(function (res) {
                chai_1.expect(res.status).to.be.equal(200);
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect.fail();
            });
        }
        catch (err) {
        }
    });
    it("post 400", function () {
        let otherquery = {
            WHERE: {
                GT: {
                    courses_avg: true
                }
            },
            OPTIONS: {
                COLUMNS: [
                    "courses_dept",
                    "courses_pass"
                ]
            }
        };
        try {
            return chai.request(SERVER_URL)
                .post("/query")
                .send(otherquery)
                .set("Content-Type", "application/json")
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect(err.status).to.be.equal(400);
            });
        }
        catch (err) {
        }
    });
    it("get 200", function () {
        let ENDPOINT_URL = ("/datasets");
        try {
            return chai.request(SERVER_URL)
                .get(ENDPOINT_URL)
                .send(ZIP_FILE_DATA)
                .set("Content-Type", "application/x-zip-compressed")
                .then(function (res) {
                chai_1.expect(res.status).to.be.equal(200);
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect.fail();
            });
        }
        catch (err) {
        }
    });
});
//# sourceMappingURL=Server.spec.js.map