import Server from "../src/rest/Server";

import InsightFacade from "../src/controller/InsightFacade";
import chai = require("chai");
import chaiHttp = require("chai-http");
import Response = ChaiHttp.Response;
import {expect} from "chai";
import * as fs from "fs";
import Log from "../src/Util";

describe("Facade D3", function () {

    let facade: InsightFacade = null;
    let server: Server = null;
    let SERVER_URL: string = "http://localhost:4321";

    chai.use(chaiHttp);


    before(function () {
        facade = new InsightFacade();
        server = new Server(4321);
        // TODO: start server here once and handle errors properly
        server.start();
    });

    after(function () {
        // TODO: stop server here once!
        server.stop();
    });


    beforeEach(function () {
        // might want to add some process logging here to keep track of what"s going on
    });

    afterEach(function () {
        // might want to add some process logging here to keep track of what"s going on
    });

    // TODO: read your courses and rooms datasets here once!
    let ZIP_FILE_DATA = fs.readFileSync("./test/data/courses.zip");

    // Sample on how to format PUT requests
    it("PUT test for courses dataset", function () {
        let ENDPOINT_URL = ("/dataset/courses/courses");
        try {
            return chai.request(SERVER_URL)
                .put(ENDPOINT_URL)
                .send(ZIP_FILE_DATA)
                .set("Content-Type", "application/x-zip-compressed")
                .then(function (res: Response) {
                    // some logging here please!
                    expect(res.status).to.be.equal(200);
                })
                .catch(function (err) {
                    Log.trace(err);
                    expect.fail();
                });
        } catch (err) {
            // and some more logging here!
        }
    });

    it("PUT test for courses dataset invalid", function () {
        let ENDPOINT_URL = ("/dataset/course_s/courses");
        try {
            return chai.request(SERVER_URL)
                .put(ENDPOINT_URL)
                .send(ZIP_FILE_DATA)
                .set("Content-Type", "application/x-zip-compressed")
                .then(function (res: Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err) {
                    Log.trace(err);
                    expect(err.status).to.be.equal(400);
                });
        } catch (err) {
            // and some more logging here!
        }
    });

    it("Delete test for courses dataset", function () {
        let ENDPOINT_URL = ("/dataset/courses");
        try {
            return chai.request(SERVER_URL)
                .del(ENDPOINT_URL)
                .send(ZIP_FILE_DATA)
                .set("Content-Type", "application/x-zip-compressed")
                .then(function (res: Response) {
                    // some logging here please!
                    expect(res.status).to.be.equal(200);
                })
                .catch(function (err) {
                    Log.trace(err);
                    expect.fail();
                });
        } catch (err) {
            // and some more logging here!
        }
    });

    it("Delete test for courses dataset invalid 404", function () {
        let ENDPOINT_URL = ("/dataset/courses");
        try {
            return chai.request(SERVER_URL)
                .del(ENDPOINT_URL)
                .send(ZIP_FILE_DATA)
                .set("Content-Type", "application/x-zip-compressed")
                .then(function (res: Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err) {
                    Log.trace(err);
                    expect(err.status).to.be.equal(404);
                });
        } catch (err) {
            // and some more logging here!
        }
    });

    it("Delete test for courses dataset invalid 404", function () {
        let ENDPOINT_URL = ("/dataset/cour_ses");
        try {
            return chai.request(SERVER_URL)
                .del(ENDPOINT_URL)
                .send(ZIP_FILE_DATA)
                .set("Content-Type", "application/x-zip-compressed")
                .then(function (res: Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err) {
                    Log.trace(err);
                    expect(err.status).to.be.equal(400);
                });
        } catch (err) {
            // and some more logging here!
        }
    });

    it("PUT test for courses dataset", function () {
        let ENDPOINT_URL = ("/dataset/courses/courses");
        try {
            return chai.request(SERVER_URL)
                .put(ENDPOINT_URL)
                .send(ZIP_FILE_DATA)
                .set("Content-Type", "application/x-zip-compressed")
                .then(function (res: Response) {
                    // some logging here please!
                    expect(res.status).to.be.equal(200);
                })
                .catch(function (err) {
                    Log.trace(err);
                    expect.fail();
                });
        } catch (err) {
            // and some more logging here!
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
                .then(function (res: Response) {
                    // some logging here please!
                    expect(res.status).to.be.equal(200);
                })
                .catch(function (err) {
                    Log.trace(err);
                    expect.fail();
                });
        } catch (err) {
            // and some more logging here!
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
                .then(function (res: Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err) {
                    Log.trace(err);
                    expect(err.status).to.be.equal(400);
                });
        } catch (err) {
            // and some more logging here!
        }
    });

    it("get 200", function () {
        let ENDPOINT_URL = ("/datasets");
        try {
            return chai.request(SERVER_URL)
                .get(ENDPOINT_URL)
                .send(ZIP_FILE_DATA)
                .set("Content-Type", "application/x-zip-compressed")
                .then(function (res: Response) {
                    // some logging here please!
                    expect(res.status).to.be.equal(200);
                })
                .catch(function (err) {
                    Log.trace(err);
                    expect.fail();
                });
        } catch (err) {
            // and some more logging here!
        }
    });

    // The other endpoints work similarly. You should be able to find all instructions at the chai-http documentation
});
