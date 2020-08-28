import {expect} from "chai";
import * as fs from "fs-extra";
import {InsightDataset, InsightDatasetKind, InsightError, NotFoundError} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
import Log from "../src/Util";
import TestUtil from "./TestUtil";

// This should match the schema given to TestUtil.validate(..) in TestUtil.readTestQueries(..)
// except 'filename' which is injected when the file is read.
export interface ITestQuery {
    title: string;
    query: any;  // make any to allow testing structurally invalid queries
    isQueryValid: boolean;
    result: any;
    filename: string;  // This is injected when reading the file
}


describe("InsightFacade Add/Remove Dataset", function () {
    // Reference any datasets you've added to test/data here and they will
    // automatically be loaded in the 'before' hook.
    const datasetsToLoad: { [id: string]: string } = {
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
    let datasets: { [id: string]: string } = {};
    let insightFacade: InsightFacade;
    const cacheDir = __dirname + "/../data";

    before(function () {
        // This section runs once and loads all datasets specified in the datasetsToLoad object
        // into the datasets object
        Log.test(`Before all`);
        for (const id of Object.keys(datasetsToLoad)) {
            datasets[id] = fs.readFileSync(datasetsToLoad[id]).toString("base64");
        }
    });

    beforeEach(function () {
        // This section resets the data directory (removing any cached data) and resets the InsightFacade instance
        // This runs before each test, which should make each test independent from the previous one
        Log.test(`BeforeTest: ${this.currentTest.title}`);
        try {
            fs.removeSync(cacheDir);
            fs.mkdirSync(cacheDir);
            insightFacade = new InsightFacade();
        } catch (err) {
            Log.error(err);
        }
    });

    after(function () {
        Log.test(`After: ${this.test.parent.title}`);
    });

    afterEach(function () {
        Log.test(`AfterTest: ${this.currentTest.title}`);
    });

    it("Should add a valid room dataset", function () {
        const id: string = "rooms1";
        const expected: string[] = [id];
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Rooms).then((result: string[]) => {
            expect(result).to.deep.equal(expected);
        }).catch((err: any) => {
            expect.fail(err, expected, "Should not have rejected");
        });
    });

    // This is a unit test. You should create more like this!
    it("Should add a valid dataset", function () {
        const id: string = "courses";
        const expected: string[] = [id];
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect(result).to.deep.equal(expected);
        }).catch((err: any) => {
            expect.fail(err, expected, "Should not have rejected");
        });
    });

    it("Should add a valid dataset5", function () {
        const id: string = "courses5";
        const expected: string[] = [id];
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect(result).to.deep.equal(expected);
        }).catch((err: any) => {
            expect.fail(err, expected, "Should not have rejected");
        });
    });

    it("Should add a valid dataset10", function () {
        const id: string = "courses10";
        const expected: string[] = [id];
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect(result).to.deep.equal(expected);
        }).catch((err: any) => {
            expect.fail(err, expected, "Should not have rejected");
        });
    });

    it("Should add a valid dataset3", function () {
        const id: string = "courses3";
        const expected: string[] = [id];
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect(result).to.deep.equal(expected);
        }).catch((err: any) => {
            expect.fail(err, expected, "Should not have rejected");
        });
    });

    it("Should add a valid dataset4", function () {
        const id: string = "courses4";
        const expected: string[] = [id];
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect(result).to.deep.equal(expected);
        }).catch((err: any) => {
            expect.fail(err, expected, "Should not have rejected");
        });
    });

    it("Should add a valid dataset for courses1", function () {
        const id: string = "courses1";
        const expected: string[] = [id];
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect(result).to.deep.equal(expected);
        }).catch((err: any) => {
            expect.fail(err, expected, "Should not have rejected");
        });
    });

    it("Should add a valid dataset for courses8", function () {
        const id: string = "courses8";
        const expected: string[] = [id];
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect(result).to.deep.equal(expected);
        }).catch((err: any) => {
            expect.fail(err, expected, "Should not have rejected");
        });
    });

    it("Should add a valid dataset for courses2", function () {
        const id: string = "courses2";
        const expected: string[] = [id];
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect(result).to.deep.equal(expected);
        }).catch((err: any) => {
            expect.fail(err, expected, "Should not have rejected");
        });
    });

    it("should not add a invalid dataset with invalid input id(underscore)", function () {
        const id: string = "cour_ses";
        return insightFacade.addDataset(id, datasets["courses"], InsightDatasetKind.Courses).
        then((result: string[]) => {
            expect.fail(result, InsightError, "invalid id with underscore");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add a invalid dataset with invalid input id(whitespace)", function () {
        const id: string = " ";
        return insightFacade.addDataset(id, datasets["courses"], InsightDatasetKind.Courses)
            .then((result: string[]) => {
                expect.fail(result, InsightError, "invalid id whitespace");
            }).catch((err: any) => {
                expect(err).to.be.instanceOf(InsightError);
            });
    });

    it("should not add a invalid dataset with no valid course section", function () {
        const id: string = " ";
        return insightFacade.addDataset(id, datasets["courses"], InsightDatasetKind.Courses)
            .then((result: string[]) => {
                expect.fail(result, InsightError, "invalid id whitespace");
            }).catch((err: any) => {
                expect(err).to.be.instanceOf(InsightError);
            });
    });

    it("should not add a invalid dataset with no valid course section empty json", function () {
        const id: string = "courses15";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses)
            .then((result: string[]) => {
                expect.fail(result, InsightError, "");
            }).catch((err: any) => {
                expect(err).to.be.instanceOf(InsightError);
            });
    });

    it("should not add a not exist id dataset", function () {
        const id: string = "sdjkfskd";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect.fail(result, InsightError, "dataset not exist");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add add an empty dataset", function () {
        const id: string = "empty";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect.fail(result, InsightError, "dataset empty");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add add a non zip file", function () {
        const id: string = "Resume";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect.fail(result, InsightError, "dataset empty");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add add an dataset with no courses folder", function () {
        const id: string = "courses12";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect.fail(result, InsightError, "no course");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add add an dataset with invalid json", function () {
        const id: string = "courses13";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect.fail(result, InsightError, "no course");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add add a dataset with no course", function () {
        const id: string = "courses11";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect.fail(result, InsightError, "dataset empty");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add add a dataset with invalid course section", function () {
        const id: string = "courses6";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect.fail(result, InsightError, "dataset has no invalid course section");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add add a dataset with invalid course section missing field", function () {
        const id: string = "courses7";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect.fail(result, InsightError, "dataset has no invalid course section");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add add a dataset with undefined id", function () {
        const id: string = undefined;
        return insightFacade.addDataset(id, datasets["courses"], InsightDatasetKind.Courses).
        then((result: string[]) => {
            expect.fail(result, InsightError, "dataset has no invalid course section");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add add a dataset with null id", function () {
        const id: string = null;
        return insightFacade.addDataset(id, datasets["courses"], InsightDatasetKind.Courses).
        then((result: string[]) => {
            expect.fail(result, InsightError, "dataset has no invalid course section");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add add a dataset with empty id", function () {
        const id: string = "";
        return insightFacade.addDataset(id, datasets["courses"], InsightDatasetKind.Courses).
        then((result: string[]) => {
            expect.fail(result, InsightError, "dataset has no invalid course section");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add add a dataset with not empty json", function () {
        const id: string = "courses14";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect.fail(result, InsightError, "dataset has no invalid course section");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add add a dataset with text file", function () {
        const id: string = "courses9";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
            expect.fail(result, InsightError, "dataset has no invalid course section");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("Should not add a repeated dataset", function () {
        const id: string = "courses";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result1: string[]) => {
            return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result: string[]) => {
                expect.fail(result, InsightError, "should not accept repeated dataset");
            }).catch((err: any) => {
                expect(err).to.be.instanceOf(InsightError);
            });
        });
    });

    it("Should add two valid dataset", function () {
        const id: string = "courses2";
        const id2: string = "courses1";
        const expected2: string[] = [id, id2];
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result1: string[]) => {
            return insightFacade.addDataset(id2, datasets[id2], InsightDatasetKind.Courses)
                .then((result: string[]) => {
                    expect(result).to.deep.equal(expected2);
                }).catch((err: any) => {
                    expect.fail(err, expected2, "Should not have rejected");
                });
        });
    });

    it("should not remove a invalid dataset with invalid input id(underscore)", function () {
        const id: string = "courses_c";
        return insightFacade.removeDataset(id).then((result: string) => {
            expect.fail(result, InsightError, "invalid id with underscore");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not remove a invalid dataset with undefined id", function () {
        const id: string = undefined;
        return insightFacade.removeDataset(id).then((result: string) => {
            expect.fail(result, InsightError, "invalid undefined id");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not remove a invalid dataset with null id", function () {
        const id: string = null;
        return insightFacade.removeDataset(id).then((result: string) => {
            expect.fail(result, InsightError, "invalid undefined id");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not remove a invalid dataset with empty id", function () {
        const id: string = "";
        return insightFacade.removeDataset(id).then((result: string) => {
            expect.fail(result, InsightError, "invalid undefined id");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not remove a not existed file", function () {
        const id: string = "358";
        return insightFacade.removeDataset(id).then((result: string) => {
            expect.fail(result, NotFoundError, "invalid id with underscore");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(NotFoundError);
        });
    });

    it("should not remove a dataset that is not added before", function () {
        const id: string = "courses";
        return insightFacade.removeDataset(id).then((result: string) => {
            expect.fail(result, NotFoundError, "dataset not found");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(NotFoundError);
        });
    });

    it("should not remove a invalid dataset with invalid input id(whitespace)", function () {
        const id: string = " ";
        return insightFacade.removeDataset(id).then((result: string) => {
            expect.fail(result, InsightError, "invalid id whitespace");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should add then remove successful", function () {
        const id: string = "courses";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result1: string[]) => {
            return insightFacade.removeDataset(id)
                .then((result: string) => {
                    expect(result).to.deep.equal(id);
                }).catch((err: any) => {
                    expect.fail(err, id, "Should not have rejected");
                });
        });
    });

    it("should not add and then remove a not added dataset", function () {
        const id: string = "courses";
        const id2: string = "courses1";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).
        then((result: string[]) => {
            return insightFacade.removeDataset(id2).then((result1: string) => {
                expect.fail(result1, NotFoundError, "dataset not found");
            }).catch((err: any) => {
                expect(err).to.be.instanceOf(NotFoundError);
            });
        });
    });

    it("should add twice then remove successful", function () {
        const id: string = "courses";
        const id2: string = "courses1";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result1: string[]) => {
            return insightFacade.addDataset(id2, datasets[id2], InsightDatasetKind.Courses).
            then((result2: string[]) => {
                    return insightFacade.removeDataset(id2)
                        .then((result: string) => {
                            expect(result).to.deep.equal(id2);
                        }).catch((err: any) => {
                            expect.fail(err, id2, "Should not have rejected");
                        });
                });
        });
    });

    it("should add remove then add", function () {
        const id: string = "courses";
        const id2: string = "courses1";
        const expected: string[] = [id2];
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result1: string[]) => {
            return insightFacade.removeDataset(id)
                .then((result2: string) => {
                    return insightFacade.addDataset(id2, datasets[id2], InsightDatasetKind.Courses)
                        .then((result: string[]) => {
                            expect(result).to.deep.equal(expected);
                        }).catch((err: any) => {
                            expect.fail(err, expected, "Should not have rejected");
                        });
                });
        });
    });

    it("list empty dataset", function () {
        const id: string = "courses";
        const myDataset: InsightDataset[] = [];
        return insightFacade.listDatasets().then((result: InsightDataset[]) => {
            expect(result).to.deep.equal(myDataset);
        }).catch((err: any) => {
            expect.fail(err, "Should not have rejected");
        });
    });

    it("list dataset", function () {
        const id: string = "courses";
        const myDataset: InsightDataset[] = [{id: "courses", kind: InsightDatasetKind.Courses, numRows: 64612}];
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result1: string[]) => {
            return insightFacade.listDatasets().then((result: InsightDataset[]) => {
                expect(result).to.deep.equal(myDataset);
            }).catch((err: any) => {
                expect.fail(err, "Should not have rejected");
            });
        });
    });

    it("list 3 datasets", function () {
        const id: string = "courses10";
        const id2: string = "courses1";
        const id3: string = "courses2";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result1: string[]) => {
            return insightFacade.addDataset(id2, datasets[id2], InsightDatasetKind.Courses)
                .then((result2: string[]) => {
                    return insightFacade.addDataset(id3, datasets[id3], InsightDatasetKind.Courses).
                    then((result3: string[]) => {
                        return insightFacade.listDatasets().then((result: InsightDataset[]) => {
                            expect(result.length).equal(3);
                        }).catch((err: any) => {
                            expect.fail(err, "Should not have rejected");
                        });
                    });
                });
        });
    });

    it("add remove list empty", function () {
        const id: string = "courses1";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses).then((result1: string[]) => {
            return insightFacade.removeDataset(id).then((result2: string) => {
                return insightFacade.listDatasets().then((result: InsightDataset[]) => {
                    expect(result.length).equal(0);
                }).catch((err: any) => {
                    expect.fail(err, "Should not have rejected");
                });
            });
        });
    });

    it("Should add a valid room dataset", function () {
        const id: string = "rooms";
        const expected: string[] = [id];
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Rooms).then((result: string[]) => {
            expect(result).to.deep.equal(expected);
        }).catch((err: any) => {
            expect.fail(err, expected, "Should not have rejected");
        });
    });

    it("Should add two valid room dataset", function () {
        const id: string = "rooms";
        const id2: string = "rooms1";
        const expected2: string[] = [id, id2];
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Rooms).then((result1: string[]) => {
            return insightFacade.addDataset(id2, datasets[id2], InsightDatasetKind.Rooms)
                .then((result: string[]) => {
                    expect(result).to.deep.equal(expected2);
                }).catch((err: any) => {
                    expect.fail(err, expected2, "Should not have rejected");
                });
        });
    });

    it("Should not add a repeated room dataset", function () {
        const id: string = "rooms";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Rooms).then((result1: string[]) => {
            return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Rooms).then((result: string[]) => {
                expect.fail(result, InsightError, "should not accept repeated room dataset");
            }).catch((err: any) => {
                expect(err).to.be.instanceOf(InsightError);
            });
        });
    });

    it("should not add a invalid dataset with invalid room", function () {
        const id: string = "Resume";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Rooms).
        then((result: string[]) => {
            expect.fail(result, InsightError, "invalid room");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add a invalid dataset with invalid id", function () {
        const id: string = "room_s";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Rooms).
        then((result: string[]) => {
            expect.fail(result, InsightError, "invalid room id");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add a invalid dataset with invalid id", function () {
        const id: string = "roomswrongindex";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Rooms).
        then((result: string[]) => {
            expect.fail(result, InsightError, "invalid room roomswrongindex");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add a invalid dataset with invalid id", function () {
        const id: string = "roomswrongindex";
        return insightFacade.addDataset(id, datasets["roomswrongindexnam"], InsightDatasetKind.Rooms).
        then((result: string[]) => {
            expect.fail(result, InsightError, "invalid room roomswrongindexnam");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add a invalid dataset with invalid id", function () {
        const id: string = "roomsempty";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Rooms).
        then((result: string[]) => {
            expect.fail(result, InsightError, "invalid no rooms");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add a invalid dataset with invalid id", function () {
        const id: string = "emptyroom";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Rooms).
        then((result: string[]) => {
            expect.fail(result, InsightError, "invalid no rooms");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });

    it("should not add a invalid dataset with invalid id", function () {
        const id: string = "emptyroom1";
        return insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Rooms).
        then((result: string[]) => {
            expect.fail(result, InsightError, "invalid no rooms");
        }).catch((err: any) => {
            expect(err).to.be.instanceOf(InsightError);
        });
    });
});

/*
 * This test suite dynamically generates tests from the JSON files in test/queries.
 * You should not need to modify it; instead, add additional files to the queries directory.
 * You can still make tests the normal way, this is just a convenient tool for a majority of queries.
 */


describe("InsightFacade PerformQuery", () => {
    const datasetsToQuery: { [id: string]: any } = {
        courses: {id: "courses", path: "./test/data/courses.zip", kind: InsightDatasetKind.Courses},
        rooms: {id: "rooms", path: "./test/data/rooms.zip", kind: InsightDatasetKind.Rooms},
    };
    let insightFacade: InsightFacade = new InsightFacade();
    let testQueries: ITestQuery[] = [];

    // Load all the test queries, and call addDataset on the insightFacade instance for all the datasets
    before(function () {
        Log.test(`Before: ${this.test.parent.title}`);

        // Load the query JSON files under test/queries.
        // Fail if there is a problem reading ANY query.
        try {
            testQueries = TestUtil.readTestQueries();
        } catch (err) {
            expect.fail("", "", `Failed to read one or more test queries. ${err}`);
        }

        // Load the datasets specified in datasetsToQuery and add them to InsightFacade.
        // Will fail* if there is a problem reading ANY dataset.
        const loadDatasetPromises: Array<Promise<string[]>> = [];
        for (const key of Object.keys(datasetsToQuery)) {
            const ds = datasetsToQuery[key];
            const data = fs.readFileSync(ds.path).toString("base64");
            loadDatasetPromises.push(insightFacade.addDataset(ds.id, data, ds.kind));
        }
        return Promise.all(loadDatasetPromises).catch((err) => {
            /* *IMPORTANT NOTE: This catch is to let this run even without the implemented addDataset,
             * for the purposes of seeing all your tests run.
             * For D1, remove this catch block (but keep the Promise.all)
             */
            return Promise.resolve("HACK TO LET QUERIES RUN");
        });
    });

    beforeEach(function () {
        Log.test(`BeforeTest: ${this.currentTest.title}`);
    });

    after(function () {
        Log.test(`After: ${this.test.parent.title}`);
    });

    afterEach(function () {
        Log.test(`AfterTest: ${this.currentTest.title}`);
    });

    // Dynamically create and run a test for each query in testQueries
    // Creates an extra "test" called "Should run test queries" as a byproduct. Don't worry about it
    it("Should run test queries", function () {
        describe("Dynamic InsightFacade PerformQuery tests", function () {
            for (const test of testQueries) {
                it(`[${test.filename}] ${test.title}`, function (done) {
                    insightFacade.performQuery(test.query).then((result) => {
                        TestUtil.checkQueryResult(test, result, done);
                    }).catch((err) => {
                        TestUtil.checkQueryResult(test, err, done);
                    });
                });
            }
        });
    });
});

