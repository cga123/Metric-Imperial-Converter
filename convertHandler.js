function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = input.match(/^[.\d\/]+/);
    if (!result) return 1;
    result = result[0];
    if ((result.match(/\//g) || []).length > 1) return null;
    if (result.toString().includes("/")) {
      let [num, denom] = result.split("/");
      result = parseFloat(num) / parseFloat(denom);
    } else {
      result = parseFloat(result);
    }
    return isNaN(result) ? null : result;
  };
  
  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+$/);
    if (!result) return null;
    result = result[0].toLowerCase();
    switch(result) {
      case "km": case "mi": case "lbs": case "kg": case "l": case "gal":
        return result === "l" ? "L" : result;
      default:
        return null;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let units = {
      km: "mi",
      mi: "km",
      lbs: "kg",
      kg: "lbs",
      L: "gal",
      l: "gal",
      gal: "L"
    };
    return units[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    let units = {
      km: "kilometers",
      mi: "miles",
      lbs: "pounds",
      kg: "kilograms",
      L: "liters",
      l: "liters",
      gal: "gallons"
    };
    return units[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit.toLowerCase()) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
    }
    
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
