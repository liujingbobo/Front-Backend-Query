/**
 * Builds a query object using the current document object model (DOM).
 * Must use the browser's global document object {@link https://developer.mozilla.org/en-US/docs/Web/API/Document}
 * to read DOM information.
 *
 * @returns query object adhering to the query EBNF
 */
CampusExplorer.buildQuery = function () {
    let query = {};
    let trans = {};
    // TODO: implement!
    query["WHERE"] = setwhere();
    query["OPTIONS"] = setOptions();
    trans = setTransformation();

    function setwhere() {
        let kind = document.getElementsByClassName("nav-item tab active")[0].innerText.toLowerCase();
        let ver = 0;
        let operatorarray = [];
        if (kind === "rooms") {
            ver = 1;
        }
        let first = "";
        if (document.getElementsByClassName("control conditions-all-radio")[ver].children[0].getAttribute("checked") === "checked") {
            first = "AND";
        } else if (document.getElementsByClassName("control conditions-any-radio")[ver].children[0].getAttribute("checked") === "checked") {
            first = "OR";
        } else if (document.getElementsByClassName("control conditions-none-radio")[ver].children[0].getAttribute("checked") === "checked") {
            first = "NOT";
        } else {
            first = "AND";
        }
        let conditions = document.getElementsByClassName("conditions-container")[ver].children;

        for (let i = 0; i < conditions.length; i++) {
            let condition = conditions[i];
            let mkey = "";
            let not = condition.children[0].children[0].checked;
            let field = condition.children[1].children[0];
            let operator = condition.children[2].children[0];
            let term = condition.children[3].children[0].value;
            let fieldobject = {};
            let operatorobj = {};
            let fields1 = condition.children[1].children[0].children;
            for (let i = 0; i < fields1.length; i++) {
                field = fields1[i];
                if (field.selected === true) {
                    mkey = kind + "_" + field.value;
                    fieldobject[mkey] = term;
                }
            }
            let ope1 = condition.children[2].children[0].children;
            for (let i = 0; i < ope1.length; i++) {
                let ope = ope1[i];
                if (ope.selected === true) {
                    if (ope.value !== "IS") {
                        fieldobject[mkey] = Number(term);
                    }
                    let temobj = {};
                    temobj[ope.value] = fieldobject;
                    if (not) {
                        operatorobj["NOT"] = temobj;
                    } else {
                        operatorobj = temobj;
                    }
                }
            }
            operatorarray.push(operatorobj);
        }
        let operationobject = {};
        if (operatorarray.length !== 0 && operatorarray.length !== 1) {
            if (first === "NOT"){
                let tt = {};
                tt["OR"] = operatorarray;
                operationobject[first] = tt;
            } else {
                operationobject[first] = operatorarray;
            }
        } else if (operatorarray.length === 1 && first === "NOT") {
            operationobject["NOT"] = operatorarray[0];
        } else {
            operationobject = operatorarray[0];
        }
        return operationobject;
    }

    function getmkeyset(key) {
        switch(key) {
            case "courses": return ["pass", "fail", "avg", "year", "audit", "instructor", "title", "uuid", "dept", "id"];
            case "rooms": return ["lon", "lat", "seats", "href", "number", "furniture", "name", "address", "shortname", "type", "fullname"];
        }
    }

    function setOptions() {
        let kind = document.getElementsByClassName("tab-panel active")[0].attributes.getNamedItem("data-type").value;
        let column = setColumn(kind);
        let order = setOrder(kind);
        return setOp(column, order, kind);
    }

    function setColumn(kind) {
        let array = [];
        let ver = 0;
        if (kind === "rooms") {
            ver = 1;
        }
        let fields = document.getElementsByClassName("form-group columns")[ver].children[1].children;
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (field.children[0].checked) {
                if (getmkeyset(kind).includes(field.children[0].value)) {
                    array.push(kind + "_" + field.children[0].value);
                } else {
                    array.push(field.children[0].value);
                }
            }
        }
        return array;
    }

    function setOrder(kind) {
        let panelk = "";
        let nothinga = "";
        if (kind === "courses") {
            panelk = document.getElementsByClassName("control order fields")[0];
        } else {
            panelk = document.getElementsByClassName("control order fields")[1];
        }
        let keys = panelk.children[0].children;
        let orderarray = [];
        for (let i = 0; i < keys.length; i++) {
            let smallkey = keys[i];
            if (smallkey.selected) {
                if (smallkey.getAttribute("class") === "transformation") {
                    orderarray.push(smallkey.getAttribute("value"))
                } else {
                    orderarray.push(kind + "_" + smallkey.getAttribute("value"));
                }
            }
        }
        return orderarray;
    }

    function setOp(column, order, kind) {
        let options = {};
        let hi = "";
        let ver = 0;
        if (kind === "rooms") {
            ver = 1;
        }
        options["COLUMNS"] = column;
        if (order.length === 0) {
            return options;
        }
        if (document.getElementsByClassName("form-group order")[ver].children[1].children[1].children[0].getAttribute("checked") === "checked") {
            options["ORDER"] = {dir: "DOWN", keys: order};
        } else {
            options["ORDER"] = {dir: "UP", keys: order}
        }
        return options;
        options["ORDER"] = order[0];
        return options;
    }

    function setTransformation() {
        let grouparray = [];
        let applyarray = [];
        let kind = document.getElementsByClassName("tab-panel active")[0].attributes.getNamedItem("data-type").value;
        let ver = 0;
        if (kind === "rooms") {
            ver = 1;
        }
        let groupkey = document.getElementsByClassName("form-group groups")[ver].children[1].children;
        for (let i = 0; i<groupkey.length; i++) {
            let groupfield = groupkey[i];
            if (groupfield.children[0].getAttribute("checked") === "checked") {
                grouparray.push(kind + "_" + groupfield.children[0].getAttribute("value"));
            }
        }
        if (grouparray.length === 0) {
            return {};
        }
        let applyfields = document.getElementsByClassName("transformations-container")[ver].children;
        for (let i = 0; i < applyfields.length; i++) {
            let applyfield = applyfields[i];
            let obj = {};
            let operator;
            let originalkey;
            let apply = applyfield.children[0].children[0].value;
            let operatorarray = applyfield.children[1].children[0].children;
            for (let i = 0; i<operatorarray.length; i++) {
                let operatorcheck = operatorarray[i];
                if (operatorcheck.selected) {
                    operator = operatorcheck.value;
                }
            }
            let applyfieldarray = applyfield.children[2].children[0].children;
            for (let i = 0; i<applyfieldarray.length; i++) {
                let original = applyfieldarray[i];
                if (original.selected) {
                    originalkey = kind + "_" + original.getAttribute("value");
                }
            }
            let newobj = {};
            newobj[operator] = originalkey;
            obj[apply] = newobj;
            applyarray.push(obj);
        }
        //change
        return {GROUP: grouparray, APPLY: applyarray};
    }

    if (Object.keys(trans).length !== 0) {
        query["TRANSFORMATIONS"] = trans;
        return query;
    }
    return query;
};
