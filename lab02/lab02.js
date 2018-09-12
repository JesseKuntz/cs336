// Date: 9/12/2018
// Name: Jesse Kuntz

// ----------------------------------
// Person Prototype
function Person(name, birthdate, friends, greeting) {
    this.name = name,
    this.birthdate = birthdate,
    this.friends = friends,
    this.greeting = greeting;
}

Person.prototype.setName = function(newName) {
    this.name = newName;
}

Person.prototype.addFriend = function(newFriend) {
    this.friends.push(newFriend);
}

Person.prototype.printGreeting = function() {
    console.log(this.greeting);
}

// function cred: http://jsfiddle.net/codeandcloud/n33RJ/
Person.prototype.computeAge = function() {
    var today = new Date();
    var formattedBirthDate = new Date(this.birthdate);
    var age = today.getFullYear() - formattedBirthDate.getFullYear();
    var m = today.getMonth() - formattedBirthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < formattedBirthDate.getDate())) {
        age--;
    }
    return age;
}

// ----------------------------------
// Testing Person
var Jesse = new Person("Jesse", "1996/12/30", [], "Hello Gov'ner!");

// These are my friends.
var Kenneth = new Person("Kenneth", "2000/01/01", [], "Whaddup.");
var Andrew = new Person("Andrew", "1990/01/01", [], "I love Link.");

// Add some friends, and check that they were added.
Jesse.addFriend(Andrew);
Jesse.addFriend(Kenneth);

console.log("Here are a list of my friends and their ages: ");
for (var i = 0, len = Jesse.friends.length; i < len; i++) {
    console.log("Name: " + Jesse.friends[i].name + ", Age: " + Jesse.friends[i].computeAge());
}

// Check the computeAge function.
console.log("My age is: " + Jesse.computeAge());

// Helper function for some age comparison.
function compareAge(firstPerson, secondPerson) {
    return firstPerson.computeAge() > secondPerson.computeAge() ? "older" : "younger";
}

// Do some age comparison.
console.log("I am " + compareAge(Jesse, Kenneth) + " than Kenneth and I am " + compareAge(Jesse, Andrew) + " than Andrew.")

// Check the printGreeting function.
console.log("And now for my greeting: ");
Jesse.printGreeting();

// Check the setName function.
console.log("Original name: " + Jesse.name);
Jesse.setName("Spaghetti");
console.log("New name: " + Jesse.name);

// ----------------------------------
// Student Prototype
function Student(name, birthdate, friends, greeting, subject) {
    Person.call(this, name, birthdate, friends, greeting)

    this.subject = subject;
}

Student.prototype = new Person();

// ----------------------------------
// Testing Student
var Leo = new Student("Leo", "1900/01/01", [], "Hey, my name is Leo and I am a student.", "Karate");

console.log("Leo is a Student: " + (Leo instanceof Student));
console.log("Leo is a Person: " + (Leo instanceof Person));
console.log("Jesse is a Student: " + (Jesse instanceof Student));

console.log("Leo is " + Leo.computeAge() + " years old.");

Leo.addFriend(Jesse);

console.log("Here are a list of Leo's friends and their ages: ");
for (var i = 0, len = Leo.friends.length; i < len; i++) {
    console.log("Name: " + Leo.friends[i].name + ", Age: " + Leo.friends[i].computeAge());
}

console.log("And now for Leo's greeting: ");
Leo.printGreeting();