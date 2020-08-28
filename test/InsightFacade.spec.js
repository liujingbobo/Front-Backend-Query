"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const fs = require("fs-extra");
const IInsightFacade_1 = require("../src/controller/IInsightFacade");
const InsightFacade_1 = require("../src/controller/InsightFacade");
const Util_1 = require("../src/Util");
const TestUtil_1 = require("./TestUtil");
describe("InsightFacade Add/Remove Dataset", function () {
    const datasetsToLoad = {
        courses: "./test/data/courses.zip",
        courses1: "./test/data/courses1.zip", courses2: "./test/data/courses2.zip",
        courses3: "./test/data/courses3.zip", courses4: "./test/data/courses4.zip",
        courses5: "./test/data/courses5.zip", courses6courses6: "./test/data/courses6.zip",
        empty: "./test/data/empty.zip", courses7: "./test/data/courses7.zip", courses8: "./test/data/courses8.zip",
        courses9: "./test/data/courses9.zip", courses10: "./test/data/10.zip",
        courses11: "./test/data/courses11.zip", courses12: "./test/data/courses12.zip",
        Resume: "./test/data/Resume.docx", courses14: "./test/data/courses14.zip",
        courses13: "./test/data/courses13.zip", courses15: "./test/data/coureses15.zip",
        rooms: "./test/data/rooms.zip", rooms1: "./test/data/rooms1.zip",
        resume: "./test/data/Resume.docx",
    };
    let datasets = {};
    let insightFacade;
    const cacheDir = __dirname + "/../data";
    before(function () {
        Util_1.default.test(`Before all`);
        for (const id of Object.keys(datasetsToLoad)) {
            datasets[id] = fs.readFileSync(datasetsToLoad[id]).toString("base64");
        }
    });
    beforeEach(function () {
        Util_1.default.test(`BeforeTest: ${this.currentTest.title}`);
        try {
            fs.removeSync(cacheDir);
            fs.mkdirSync(cacheDir);
            insightFacade = new InsightFacade_1.default();
        }
        catch (err) {
            Util_1.default.error(err);
        }
    });
    after(function () {
        Util_1.default.test(`After: ${this.test.parent.title}`);
    });
    afterEach(function () {
        Util_1.default.test(`AfterTest: ${this.currentTest.title}`);
    });
    it("Should add a valid room dataset", function () {
        const id = "rooms1";
        const expected = [id];
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Rooms).then((result) => {
            chai_1.expect(result).to.deep.equal(expected);
        }).catch((err) => {
            chai_1.expect.fail(err, expected, "Should not have rejected");
        });
    });
    it("Should add a valid dataset", function () {
        const id = "courses";
        const expected = [id];
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect(result).to.deep.equal(expected);
        }).catch((err) => {
            chai_1.expect.fail(err, expected, "Should not have rejected");
        });
    });
    it("Should add a valid dataset5", function () {
        const id = "courses5";
        const expected = [id];
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect(result).to.deep.equal(expected);
        }).catch((err) => {
            chai_1.expect.fail(err, expected, "Should not have rejected");
        });
    });
    it("Should add a valid dataset10", function () {
        const id = "courses10";
        const expected = [id];
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect(result).to.deep.equal(expected);
        }).catch((err) => {
            chai_1.expect.fail(err, expected, "Should not have rejected");
        });
    });
    it("Should add a valid dataset3", function () {
        const id = "courses3";
        const expected = [id];
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect(result).to.deep.equal(expected);
        }).catch((err) => {
            chai_1.expect.fail(err, expected, "Should not have rejected");
        });
    });
    it("Should add a valid dataset4", function () {
        const id = "courses4";
        const expected = [id];
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect(result).to.deep.equal(expected);
        }).catch((err) => {
            chai_1.expect.fail(err, expected, "Should not have rejected");
        });
    });
    it("Should add a valid dataset for courses1", function () {
        const id = "courses1";
        const expected = [id];
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect(result).to.deep.equal(expected);
        }).catch((err) => {
            chai_1.expect.fail(err, expected, "Should not have rejected");
        });
    });
    it("Should add a valid dataset for courses8", function () {
        const id = "courses8";
        const expected = [id];
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect(result).to.deep.equal(expected);
        }).catch((err) => {
            chai_1.expect.fail(err, expected, "Should not have rejected");
        });
    });
    it("Should add a valid dataset for courses2", function () {
        const id = "courses2";
        const expected = [id];
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect(result).to.deep.equal(expected);
        }).catch((err) => {
            chai_1.expect.fail(err, expected, "Should not have rejected");
        });
    });
    it("should not add a invalid dataset with invalid input id(underscore)", function () {
        const id = "cour_ses";
        return insightFacade.addDataset(id, datasets["courses"], IInsightFacade_1.InsightDatasetKind.Courses).
            then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "invalid id with underscore");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add a invalid dataset with invalid input id(whitespace)", function () {
        const id = " ";
        return insightFacade.addDataset(id, datasets["courses"], IInsightFacade_1.InsightDatasetKind.Courses)
            .then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "invalid id whitespace");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add a invalid dataset with no valid course section", function () {
        const id = " ";
        return insightFacade.addDataset(id, datasets["courses"], IInsightFacade_1.InsightDatasetKind.Courses)
            .then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "invalid id whitespace");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add a invalid dataset with no valid course section empty json", function () {
        const id = "courses15";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses)
            .then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add a not exist id dataset", function () {
        const id = "sdjkfskd";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "dataset not exist");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add add an empty dataset", function () {
        const id = "empty";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "dataset empty");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add add a non zip file", function () {
        const id = "Resume";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "dataset empty");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add add an dataset with no courses folder", function () {
        const id = "courses12";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "no course");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add add an dataset with invalid json", function () {
        const id = "courses13";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "no course");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add add a dataset with no course", function () {
        const id = "courses11";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "dataset empty");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add add a dataset with invalid course section", function () {
        const id = "courses6";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "dataset has no invalid course section");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add add a dataset with invalid course section missing field", function () {
        const id = "courses7";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "dataset has no invalid course section");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add add a dataset with undefined id", function () {
        const id = undefined;
        return insightFacade.addDataset(id, datasets["courses"], IInsightFacade_1.InsightDatasetKind.Courses).
            then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "dataset has no invalid course section");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add add a dataset with null id", function () {
        const id = null;
        return insightFacade.addDataset(id, datasets["courses"], IInsightFacade_1.InsightDatasetKind.Courses).
            then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "dataset has no invalid course section");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add add a dataset with empty id", function () {
        const id = "";
        return insightFacade.addDataset(id, datasets["courses"], IInsightFacade_1.InsightDatasetKind.Courses).
            then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "dataset has no invalid course section");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add add a dataset with not empty json", function () {
        const id = "courses14";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "dataset has no invalid course section");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add add a dataset with text file", function () {
        const id = "courses9";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "dataset has no invalid course section");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("Should not add a repeated dataset", function () {
        const id = "courses";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result1) => {
            return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result) => {
                chai_1.expect.fail(result, IInsightFacade_1.InsightError, "should not accept repeated dataset");
            }).catch((err) => {
                chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
            });
        });
    });
    it("Should add two valid dataset", function () {
        const id = "courses2";
        const id2 = "courses1";
        const expected2 = [id, id2];
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result1) => {
            return insightFacade.addDataset(id2, datasets[id2], IInsightFacade_1.InsightDatasetKind.Courses)
                .then((result) => {
                chai_1.expect(result).to.deep.equal(expected2);
            }).catch((err) => {
                chai_1.expect.fail(err, expected2, "Should not have rejected");
            });
        });
    });
    it("should not remove a invalid dataset with invalid input id(underscore)", function () {
        const id = "courses_c";
        return insightFacade.removeDataset(id).then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "invalid id with underscore");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not remove a invalid dataset with undefined id", function () {
        const id = undefined;
        return insightFacade.removeDataset(id).then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "invalid undefined id");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not remove a invalid dataset with null id", function () {
        const id = null;
        return insightFacade.removeDataset(id).then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "invalid undefined id");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not remove a invalid dataset with empty id", function () {
        const id = "";
        return insightFacade.removeDataset(id).then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "invalid undefined id");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not remove a not existed file", function () {
        const id = "358";
        return insightFacade.removeDataset(id).then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.NotFoundError, "invalid id with underscore");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.NotFoundError);
        });
    });
    it("should not remove a dataset that is not added before", function () {
        const id = "courses";
        return insightFacade.removeDataset(id).then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.NotFoundError, "dataset not found");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.NotFoundError);
        });
    });
    it("should not remove a invalid dataset with invalid input id(whitespace)", function () {
        const id = " ";
        return insightFacade.removeDataset(id).then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "invalid id whitespace");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should add then remove successful", function () {
        const id = "courses";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result1) => {
            return insightFacade.removeDataset(id)
                .then((result) => {
                chai_1.expect(result).to.deep.equal(id);
            }).catch((err) => {
                chai_1.expect.fail(err, id, "Should not have rejected");
            });
        });
    });
    it("should not add and then remove a not added dataset", function () {
        const id = "courses";
        const id2 = "courses1";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).
            then((result) => {
            return insightFacade.removeDataset(id2).then((result1) => {
                chai_1.expect.fail(result1, IInsightFacade_1.NotFoundError, "dataset not found");
            }).catch((err) => {
                chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.NotFoundError);
            });
        });
    });
    it("should add twice then remove successful", function () {
        const id = "courses";
        const id2 = "courses1";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result1) => {
            return insightFacade.addDataset(id2, datasets[id2], IInsightFacade_1.InsightDatasetKind.Courses).
                then((result2) => {
                return insightFacade.removeDataset(id2)
                    .then((result) => {
                    chai_1.expect(result).to.deep.equal(id2);
                }).catch((err) => {
                    chai_1.expect.fail(err, id2, "Should not have rejected");
                });
            });
        });
    });
    it("should add remove then add", function () {
        const id = "courses";
        const id2 = "courses1";
        const expected = [id2];
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result1) => {
            return insightFacade.removeDataset(id)
                .then((result2) => {
                return insightFacade.addDataset(id2, datasets[id2], IInsightFacade_1.InsightDatasetKind.Courses)
                    .then((result) => {
                    chai_1.expect(result).to.deep.equal(expected);
                }).catch((err) => {
                    chai_1.expect.fail(err, expected, "Should not have rejected");
                });
            });
        });
    });
    it("list empty dataset", function () {
        const id = "courses";
        const myDataset = [];
        return insightFacade.listDatasets().then((result) => {
            chai_1.expect(result).to.deep.equal(myDataset);
        }).catch((err) => {
            chai_1.expect.fail(err, "Should not have rejected");
        });
    });
    it("list dataset", function () {
        const id = "courses";
        const myDataset = [{ id: "courses", kind: IInsightFacade_1.InsightDatasetKind.Courses, numRows: 64612 }];
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result1) => {
            return insightFacade.listDatasets().then((result) => {
                chai_1.expect(result).to.deep.equal(myDataset);
            }).catch((err) => {
                chai_1.expect.fail(err, "Should not have rejected");
            });
        });
    });
    it("list 3 datasets", function () {
        const id = "courses10";
        const id2 = "courses1";
        const id3 = "courses2";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result1) => {
            return insightFacade.addDataset(id2, datasets[id2], IInsightFacade_1.InsightDatasetKind.Courses)
                .then((result2) => {
                return insightFacade.addDataset(id3, datasets[id3], IInsightFacade_1.InsightDatasetKind.Courses).
                    then((result3) => {
                    return insightFacade.listDatasets().then((result) => {
                        chai_1.expect(result.length).equal(3);
                    }).catch((err) => {
                        chai_1.expect.fail(err, "Should not have rejected");
                    });
                });
            });
        });
    });
    it("add remove list empty", function () {
        const id = "courses1";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Courses).then((result1) => {
            return insightFacade.removeDataset(id).then((result2) => {
                return insightFacade.listDatasets().then((result) => {
                    chai_1.expect(result.length).equal(0);
                }).catch((err) => {
                    chai_1.expect.fail(err, "Should not have rejected");
                });
            });
        });
    });
    it("Should add a valid room dataset", function () {
        const id = "rooms";
        const expected = [id];
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Rooms).then((result) => {
            chai_1.expect(result).to.deep.equal(expected);
        }).catch((err) => {
            chai_1.expect.fail(err, expected, "Should not have rejected");
        });
    });
    it("Should add two valid room dataset", function () {
        const id = "rooms";
        const id2 = "rooms1";
        const expected2 = [id, id2];
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Rooms).then((result1) => {
            return insightFacade.addDataset(id2, datasets[id2], IInsightFacade_1.InsightDatasetKind.Rooms)
                .then((result) => {
                chai_1.expect(result).to.deep.equal(expected2);
            }).catch((err) => {
                chai_1.expect.fail(err, expected2, "Should not have rejected");
            });
        });
    });
    it("Should not add a repeated room dataset", function () {
        const id = "rooms";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Rooms).then((result1) => {
            return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Rooms).then((result) => {
                chai_1.expect.fail(result, IInsightFacade_1.InsightError, "should not accept repeated room dataset");
            }).catch((err) => {
                chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
            });
        });
    });
    it("should not add a invalid dataset with invalid room", function () {
        const id = "Resume";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Rooms).
            then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "invalid room");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add a invalid dataset with invalid id", function () {
        const id = "room_s";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Rooms).
            then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "invalid room id");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add a invalid dataset with invalid id", function () {
        const id = "roomswrongindex";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Rooms).
            then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "invalid room roomswrongindex");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add a invalid dataset with invalid id", function () {
        const id = "roomswrongindex";
        return insightFacade.addDataset(id, datasets["roomswrongindexnam"], IInsightFacade_1.InsightDatasetKind.Rooms).
            then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "invalid room roomswrongindexnam");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add a invalid dataset with invalid id", function () {
        const id = "roomsempty";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Rooms).
            then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "invalid no rooms");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add a invalid dataset with invalid id", function () {
        const id = "emptyroom";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Rooms).
            then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "invalid no rooms");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
    it("should not add a invalid dataset with invalid id", function () {
        const id = "emptyroom1";
        return insightFacade.addDataset(id, datasets[id], IInsightFacade_1.InsightDatasetKind.Rooms).
            then((result) => {
            chai_1.expect.fail(result, IInsightFacade_1.InsightError, "invalid no rooms");
        }).catch((err) => {
            chai_1.expect(err).to.be.instanceOf(IInsightFacade_1.InsightError);
        });
    });
});
describe("InsightFacade PerformQuery", () => {
    const datasetsToQuery = {
        courses: { id: "courses", path: "./test/data/courses.zip", kind: IInsightFacade_1.InsightDatasetKind.Courses },
        rooms: { id: "rooms", path: "./test/data/rooms.zip", kind: IInsightFacade_1.InsightDatasetKind.Rooms },
    };
    let insightFacade = new InsightFacade_1.default();
    let testQueries = [];
    before(function () {
        Util_1.default.test(`Before: ${this.test.parent.title}`);
        try {
            testQueries = TestUtil_1.default.readTestQueries();
        }
        catch (err) {
            chai_1.expect.fail("", "", `Failed to read one or more test queries. ${err}`);
        }
        const loadDatasetPromises = [];
        for (const key of Object.keys(datasetsToQuery)) {
            const ds = datasetsToQuery[key];
            const data = fs.readFileSync(ds.path).toString("base64");
            loadDatasetPromises.push(insightFacade.addDataset(ds.id, data, ds.kind));
        }
        return Promise.all(loadDatasetPromises).catch((err) => {
            return Promise.resolve("HACK TO LET QUERIES RUN");
        });
    });
    beforeEach(function () {
        Util_1.default.test(`BeforeTest: ${this.currentTest.title}`);
    });
    after(function () {
        Util_1.default.test(`After: ${this.test.parent.title}`);
    });
    afterEach(function () {
        Util_1.default.test(`AfterTest: ${this.currentTest.title}`);
    });
    it("Should run test queries", function () {
        describe("Dynamic InsightFacade PerformQuery tests", function () {
            for (const test of testQueries) {
                it(`[${test.filename}] ${test.title}`, function (done) {
                    insightFacade.performQuery(test.query).then((result) => {
                        TestUtil_1.default.checkQueryResult(test, result, done);
                    }).catch((err) => {
                        TestUtil_1.default.checkQueryResult(test, err, done);
                    });
                });
            }
        });
    });
});
//# sourceMappingURL=InsightFacade.spec.js.map