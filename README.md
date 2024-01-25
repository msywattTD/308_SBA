Takes 3 parameters, CourseInfo, AssignmentGroup, and LearnerSubmissions, then formats them into a result.

CourseInfo is an object containing two values, the course ID and the course's Name.

AssignmentGroup is an object with 5 values, the assignment ID, the name of the assignment, the courseID, the group weight (unused), and an array of objects labeled assignments. These nested objects have an ID, a name, a due date, and a maximum points possible.

LearnerSubmissions is an array of objects with the student ID, the assignment ID, and an object consisting of the date submitted and the pointed earned.

The result is an array of objects with the student's ID number, their overall grade average, and a list of submitted assignments and their grade. (assignments that aren't due yet are not parsed)

Late assignments receive at 10% deduction.
