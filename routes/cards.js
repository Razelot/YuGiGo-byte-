const express = require('express');
const router = express.Router();

const sqlite = require('sqlite3');
const db = new sqlite.Database('./cards.cdb');

const attribute = require('../definitions/attribute.json');
const race = require('../definitions/race.json');
const type = require('../definitions/type.json');

// Format the card object
function format_card(card) {

    // Invalid card
    if (!card) { return; }

    let card_obj = {};
    card_obj['name'] = card['name'];
    card_obj['attribute'] = attribute[card['attribute']];
    card_obj['level'] = card['level'];
    card_obj['race'] = race[card['race']];
    card_obj['type'] = type[card['type']];
    card_obj['atk'] = card['atk'];
    card_obj['def'] = card['def'];
    card_obj['desc'] = card['desc'];

    return card_obj
}

// Get All Cards
router.get('/cards/', (req, res, next) => {
    const sql = "select t.name, d.attribute, d.race, d.type, d.level, d.atk, d.def from datas d, texts t where d.id = t.id group by name";

    let cards = [];

    db.each(sql, (err, card) => { // Format each card
        if (err) {
            attribute
            res.send(err.message);
        } else {
            let card_obj = format_card(card);
            cards.push(card_obj);
        }
    }, (err) => { // Display after all cards formatted
        res.json(cards);
    });

});

// Search by name or description
router.get('/cards/:query', (req, res, next) => {
    // const sql = "select * from texts where upper(name) like upper('%" + req.params.query + "%')";
    const sql = "select t.name, d.attribute, d.race, d.type, d.level, d.atk, d.def from datas d, texts t where d.id = t.id and upper(t.name) like upper('%" + decodeURI(req.params.query) + "%') group by name";

    let cards = [];

    db.each(sql, (err, card) => { // Format each card
        if (err) {
            attribute
            res.send(err.message);
        } else {
            let card_obj = format_card(card);
            cards.push(card_obj);
        }
    }, (err) => { // Display after all cards formatted
        res.json(cards);
    });
});

// Get Single Card
router.get('/card/:name', (req, res, next) => {
    const sql = "select t.name, d.attribute, d.race, d.type, d.level, d.atk, d.def, t.desc from datas d, texts t where d.id = t.id and upper(t.name)='" + decodeURI(req.params.name).toUpperCase() + "'";

    db.get(sql, (err, card) => {
        if (err) {
            res.send(err.message);
            return;
        } else {
            let card_obj = format_card(card);
            res.json(card_obj);
        }
    });
});

module.exports = router;