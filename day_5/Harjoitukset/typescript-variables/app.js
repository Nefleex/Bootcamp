var i = 1;
var firstName = "John";
var userEmail = "abc@defg.com";
var Color;
(function(Color) {
  Color[(Color["Red"] = 1)] = "Red";
  Color[(Color["Green"] = 2)] = "Green";
  Color[(Color["Blue"] = 4)] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
