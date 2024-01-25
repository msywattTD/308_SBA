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


function avgGrade(ag, submissions) {

}

function addAssignment(ag, submissions) {
    for (i = 0; i<result.length; i++) {
      let assignID = 0;
      let assignScore = 0;
      let assignMax = 0
      let assignGrade = 0
      let runningScore = 0
      let runningMax = 0
       for (j = 0; j<submissions.length; j++) {
        
        if(result[i].id == submissions[j].learner_id) {
          assignID = submissions[j].assignment_id;
          assignScore = submissions[j].submission.score;

          for (k = 0; k<ag.assignments.length; k++) {
            if (ag.assignments[k].id == submissions[j].assignment_id) {
              assignMax = ag.assignments[k].points_possible
              runningMax += assignMax;
            }
          }
          runningScore += assignScore;
          assignGrade = Math.round(assignScore / assignMax *1000)/1000
          result[i][assignID] = assignGrade;
          console.log(`Points Earned: ${runningScore}`)
          console.log(`Points Possible: ${runningMax}`)
        }
       }
       result[i].avg = runningScore / runningMax
    }
}

// let assignID = submissions[j].assignment_id;
// let assignScore = submissions[j].submission.score;
// let assignMax = 0
// let assignGrade = 0
// let runningScore = 0
// let runningMax = 0