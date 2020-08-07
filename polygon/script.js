function Polygon() {
  return {
    getPerimeter: function() {},
    getMeasure: function () {},
  };
}

function Triangle(side) {
  var polygon = Polygon();
  polygon.side = side;
  polygon.getPerimeter = function () {
    return polygon.side*3;
  }
  polygon.getMeasure = function() {
    return polygon.side*polygon.side/2;
  }
  return polygon;
}

function Quadrilateral(side) {
  var polygon = Polygon();
  polygon.side = side;
  polygon.getPerimeter = function () {
    return polygon.side*4;
  }
  polygon.getMeasure = function() {
    return polygon.side*polygon.side;
  }
  return polygon;
}

alert("Triangle(1).getPerimeter() : " + Triangle(1).getPerimeter() +
"\nTriangle(1).getMeasure() : " + Triangle(1).getMeasure() +
"\nQuadrilateral(1).getPerimeter() : " + Quadrilateral(1).getPerimeter() +
"\nQuadrilateral(1).getMeasure() : " + Quadrilateral(1).getMeasure())