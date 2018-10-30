// Dependencies
let express = require("express");

let burger = require("../models/burger.js");

let router = express.Router();

// Routes
router.get("/", (req, res) => {
    burger.all((data) => {
        let burgerGuy = {
            burgers: data
        };
        res.render("index", burgerGuy);
    });
});

router.post("/api/burgers", (req, res) => {
    burger.insertOne(["burger_name", "devoured"], [req.body.name, req.body.devoured], (result) => {
        res.json({id: result.insertId});
    } );
});

router.put("/api/burgers/:id", (req, res) => {
    let condition = "id = " + req.params.id;
    
    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, (result) => {
        if (result.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});


// Export the router
module.exports = router;