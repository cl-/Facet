function createPersonClass(){
  //It's shorter to type out attribute names using javascript object notation.
  var PersonProtoSource = {
    firstName: '',
    lastName: '',
    displayOrder : ["positions","educations"]
  };

  function Person(){
    for (var attr in PersonProtoSource){
      this[attr] = PersonProtoSource[attr]; //PersonProto = Object.create(PersonProtoSource);
    }
  } //class //empty

  var PersonProto = Person.prototype;
  PersonProto.addData_linkedin = function(dataObj) {
    var p = this;
    p.linkedin = {};
    for (var attr in dataObj){
      if (typeof dataObj[attr] !== 'function'
        && dataObj.hasOwnProperty[attr]){
          p.linkedin[attr] = dataObj[attr];
      }//endof if
    }//endof for-loop
  };

  return Person;
}
var Person = createPersonClass();
USER_PERSON = new Person();


/*
LINKEDIN

formattedName
pictureUrl
headline //optional
summary //optional
emailAddress //REPLACE
id

skills
    skill.name
    id //noneed

positions.values[#indexNum]
    company.name
    title
    startDate
        year
        month
    isCurrent //optional //boolean
    endDate //note: no endDate if isCurrent is true
        year
        month
    summary
    id //noneed

honorsAwards[#indexNum]
    name
    issuer
    //date NOT GIVEN
    id //noneed

education.values[#indexNum]
    schoolName
    degree
    fieldOfStudy
    startDate.year //no month
    endDate.year //no month
    notes //optional
    id //noneed

location
    country.code
    name

*/








