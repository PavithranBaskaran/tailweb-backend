const router = require("express").Router();
const Student = require("../Models/Student");
const { verifyToken } = require("./verifyToken");

//Add Student and Mark

router.post("/add-student/:userid", verifyToken, async (request, response) => {
  const newStudent = new Student({
    name: request.body.name,
    mark: request.body.mark,
    subject: request.body.subject,
    userid: request.params.userid,
  });

  try {
    let findStudent = await Student.findOneAndUpdate(
      {
        name: request.body.name,
        subject: request.body.subject,
        userid: request.params.userid,
      },
      {
        $inc: { mark: request.body.mark },
      }
    );
    if (findStudent) {
      response.status(200).json({
        message: "Data Updated!",
        findStudent,
      });
    } else {
      let savedStudent = await newStudent.save();
      response.status(200).json({
        message: "Data added!",
        savedStudent,
      });
    }
  } catch (error) {
    response.status(500).json(error);
  }
});

router.get("/dashboard/:userid", verifyToken, async (request, response) => {
  try {
    const students = await Student.find({ userid: request.params.userid });
    if (students) {
      response.status(200).json(students);
    } else {
      response.json({ message: "No Data" });
    }
  } catch (error) {
    response.status(500).json(error);
  }
});

router.get("/:userid/:id", verifyToken, async (request, response) => {
  try {
    const student = await Student.findById(request.params.id);
    if (student) {
      response.status(200).json(student);
    } else {
      response.json({ message: "No Data Found" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

router.put("/:userid/:id", verifyToken, async (request, response) => {
  try {
    const student = await Student.findByIdAndUpdate(request.params.id, {
      $set: {
        name: request.body.name,
        subject: request.body.subject,
        mark: request.body.mark,
      },
    });
    // const students = await Student.find();

    if (student) {
      response.status(200).json({ student, message: "Successfully Updated" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

router.delete("/:userid/:id", verifyToken, async (request, response) => {
  try {
    const student = await Student.findByIdAndDelete(request.params.id);
    const students = await Student.find({ userid: request.params.userid });
    if (student) {
      response.status(200).json({ students, message: "Successfully Deleted" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});
module.exports = router;
