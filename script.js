// The provided course information.
const CourseInfo = {
    id: 4451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
//   function getLearnerData(course, ag, submissions) {
//     // here, we would process this data to achieve the desired result.
//     const result = [
//       {
//         id: 125,
//         avg: 0.985, // (47 + 150) / (50 + 150)
//         1: 0.94, // 47 / 50
//         2: 1.0 // 150 / 150
//       },
//       {
//         id: 132,
//         avg: 0.82, // (39 + 125) / (50 + 150)
//         1: 0.78, // 39 / 50
//         2: 0.833 // late: (140 - 15) / 150
//       }
//     ];

//     return result;
//   }
  
//   const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
//   console.log(result);
const result = [];
const idSet = new Set([])
getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)
 
//----------------------- START

function getLearnerData(course, ag, submissions) {
    courseValidation(course, ag) //course ID validation fires first
    newStudent(submissions) // adds students to array 
    addAssignment(ag, submissions)
}

console.log(result)


function courseValidation(course, ag){ 
    if (ag.course_id != course.id) {
        return "Course ID's do not match."
    }
}


function newStudent(submissions) {
    for (i = 0; i<submissions.length; i++) {
        if (!idSet.has(submissions[i].learner_id)) { //student ID does not exist yet
            let newStudent = {id: submissions[i].learner_id, avg: 0}
            result.push(newStudent) //add student to result
            idSet.add(submissions[i].learner_id) //add student's ID to set to prevent copies
        }
    }
}


function addAssignment(ag, submissions) { 
    for (i = 0; i<result.length; i++) { //loop through students
      let assignID = 0;
      let assignScore = 0;
      let assignMax = 0
      let assignGrade = 0
      let runningScore = 0
      let runningMax = 0
       for (j = 0; j<submissions.length; j++) {  //loop through assignments
        if(result[i].id == submissions[j].learner_id) { //matching student with their assignments
          assignID = submissions[j].assignment_id;
          assignScore = submissions[j].submission.score;
          let dueDate = 0

          //idk if there was a better way to do this but needed the date in this format
          const date = new Date()
          const day = date.getDate()
          const month = date.getMonth()+1
          const year = date.getFullYear()
          const today = `${year}-`+`${month}-`+`${day}`

          for (k = 0; k<ag.assignments.length; k++) {
            if (ag.assignments[k].id == submissions[j].assignment_id) { //matches assignment ID to get the due date and max points
              dueDate = ag.assignments[k].due_at
              const submitDate = submissions[j].submission.submitted_at
              if (dueDate > today) {continue} //skips adding to the runningScore if its not due yet

              try { //making sure its a number that's not 0
                100 / ag.assignments[k].points_possible
              } catch (error) {
                console.error(error)
              }
              assignMax = ag.assignments[k].points_possible
              runningMax += assignMax;

              submitDate > dueDate ? assignScore -= (assignMax*.1) : null //late deduction
              runningScore += assignScore;
            }
          }
          if (dueDate > today) {continue} //skips adding the assignment to the student object if the assignment isn't due yet
          assignGrade = Math.round(assignScore / assignMax *1000)/1000 //converts grade into a percent
          result[i][assignID] = assignGrade; //adds a new key-value pair with the key being the assignment ID
        }
       }
       result[i].avg = Math.round(runningScore / runningMax *1000)/1000 //sets avg rounded to 3 decimals
    }
}

// let assignID = submissions[j].assignment_id;
// let assignScore = submissions[j].submission.score;
// let assignMax = 0
// let assignGrade = 0
// let runningScore = 0
// let runningMax = 0