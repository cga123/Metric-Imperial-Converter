'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res){
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    
    if (initNum === null && initUnit === null) {
      res.send("invalid number and unit");
    } else if (initNum === null) {
      res.send("invalid number");
    } else if (initUnit === null) {
      res.send("invalid unit");
    } else {
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      res.json({ initNum, initUnit, returnNum, returnUnit, string: toString });
    }
  });

};
