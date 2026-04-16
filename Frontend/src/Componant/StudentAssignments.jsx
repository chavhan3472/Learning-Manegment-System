// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// function StudentAssignments() {
//   const { user_email, courseid } = useParams();

//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStudentAssignments();
//   }, [user_email, courseid]);

//   const fetchStudentAssignments = async () => {
//     try {
//       const res1 = await axios.get(
//         `http://localhost:5000/getassigment/${courseid}`,
//       );

//       const allAssignments = res1.data.assignments || [];
//       console.log(allAssignments, "This The Assigment Of All Student");
//       // 👉 Get submitted assignments of this student
//       const res2 = await axios.get(
//         `http://localhost:5000/getstudentsubmission/${user_email}/${courseid}`,
//       );

//       const submitted = res2.data.data || [];

//       // 👉 Merge data (submitted + not submitted)
//       const merged = allAssignments.map((a) => {
//         const found = submitted.find((s) => s.assigmentid === a.assigmentid);

//         return {
//           ...a,
//           submitted: found ? true : false,
//           marks: found?.marks || 0,
//           feedback: found?.feedback || "Not graded",
//         };
//       });

//       setAssignments(merged);
//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center text-xl">
//         Loading Student Assignments...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white">
//       {/* HEADER */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold">👨‍🎓 Student Assignment Report</h1>
//         <p className="text-gray-300">
//           {user_email} | Course: {courseid}
//         </p>
//       </div>

//       {/* CARDS */}
//       <div className="grid md:grid-cols-2 gap-6">
//         {assignments.map((a) => (
//           <div
//             key={a.assigmentid}
//             className="bg-white text-black p-5 rounded-xl shadow hover:shadow-xl transition"
//           >
//             {/* TITLE */}
//             <h2 className="text-xl font-bold">📘 {a.title}</h2>

//             <p className="text-gray-600 mt-1">{a.description}</p>

//             {/* STATUS */}
//             <div className="mt-3 flex items-center gap-3">
//               {a.submitted ? (
//                 <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
//                   ✅ Submitted
//                 </span>
//               ) : (
//                 <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
//                   ❌ Not Submitted
//                 </span>
//               )}
//             </div>

//             {/* MARKS */}
//             <div className="mt-3">
//               <p className="text-sm">
//                 ⭐ Marks: <span className="font-bold">{a.marks}</span>
//               </p>

//               <p className="text-sm text-gray-600">💬 Feedback: {a.feedback}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default StudentAssignments;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function StudentAssignments() {
  let navigate = useNavigate();
  const { user_email, courseid } = useParams();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentAssignments();
  }, [user_email, courseid]);

  const fetchStudentAssignments = async () => {
    try {
      // ✅ 1. Get all assignments of this course
      const res1 = await axios.get(
        `http://localhost:5000/getassigment/${courseid}`,
      );

      const allAssignments = res1.data.data || [];
      console.log(allAssignments, "All Assignments");

      // ✅ 2. Get submitted assignments of this student
      const res2 = await axios.get(
        `http://localhost:5000/getstudentsubmission/${user_email}/${courseid}`,
      );

      const submitted = res2.data.data || [];
      console.log(submitted, "Submitted Assignments");

      // ✅ 3. Merge both (IMPORTANT LOGIC)
      const merged = allAssignments.map((a) => {
        const found = submitted.find(
          (s) =>
            s.assigmentid?.trim().toLowerCase() ===
            a.assigmentid?.trim().toLowerCase(),
        );

        return {
          ...a,
          submitted: !!found,
          marks: found?.marks || 0,
          feedback: found?.feedback || "Not graded",
        };
      });

      setAssignments(merged);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Loading Student Assignments...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">👨‍🎓 Student Assignment Report</h1>
        <p className="text-gray-300 mt-1">
          {user_email} | Course: {courseid}
        </p>
      </div>

      {/* EMPTY STATE */}
      {assignments.length === 0 && (
        <div className="text-center text-gray-300 text-lg">
          No Assignments Found ❌
        </div>
      )}

      {/* CARDS */}
      <div className="grid md:grid-cols-2 gap-6">
        {assignments.map((a) => (
          <div
            key={a.assigmentid}
            className="bg-white text-black p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
          >
            {/* TITLE */}
            <h2 className="text-xl font-bold mb-1">📘 {a.title}</h2>

            <p className="text-gray-600 text-sm">{a.description}</p>

            {/* STATUS */}
            <div className="mt-3">
              {a.submitted ? (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  ✅ Submitted
                </span>
              ) : (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                  ❌ Not Submitted
                </span>
              )}
            </div>

            {/* MARKS + FEEDBACK */}
            <div className="mt-4 border-t pt-3">
              <p className="text-sm">
                ⭐ Marks:{" "}
                <span className="font-bold text-blue-600">{a.marks}</span>
              </p>

              <p className="text-sm text-gray-600 mt-1">
                💬 Feedback: {a.feedback}
              </p>
            </div>

            {/* DUE DATE */}
            <div className="mt-3 text-xs text-gray-500">
              📅 Due: {new Date(a.dueDate).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-5 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        ⬅ Back
      </button>
    </div>
  );
}

export default StudentAssignments;
