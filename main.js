$(document).ready(function() {

    function fetchStudents() {
        $.ajax({
            url: 'getStudents.php',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                let parent = $("#tablebody");
                parent.empty(); // kani siya kay mag Clear sa existing rows
    
                data.forEach(student => {
                    let row = `<tr>
                        <td>${student['student_id']}</td>
                        <td>${student['first_name']}</td>
                        <td>${student['last_name']}</td>
                        <td>${student['email']}</td>
                        <td>${student['gender']}</td>
                        <td>${student['course'] || 'N/A'}</td> 
                        <td>${student['user_address'] || 'N/A'}</td> 
                        <td>${student['age'] || 'N/A'}</td>
                        <td>
                            <button class="btn btn-warning btn-sm btnEditStudent" data-id="${student['student_id']}">Edit</button>
                            <button class="btn btn-danger btn-sm btnDeleteStudent" data-id="${student['student_id']}">Delete</button>
                        </td>
                    </tr>`;
                    parent.append(row);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching students:', error);
            }
        });
    }
        fetchStudents();
    
        // Add Student
        $(document).ready(function() {
            fetchStudents();
            $("#btnCreateStudent").click(function() {
                $("#addStudentModal").modal('show');
            });
            $("#btnSubmitStudent").click(function() {
                let newStudent = {
                    first_name: $("#first_name").val(),
                    last_name: $("#last_name").val(),
                    email: $("#email").val(),
                    gender: $("#gender").val(),
                    course: $("#course").val(),
                    user_address: $("#user_address").val(),
                    birthdate: $("#birthdate").val()
                };
        
                $.ajax({
                    url: "create_student.php",
                    type: "POST",
                    dataType: "json",
                    data: newStudent
                }).done(function(result) {
                    if (result.res === "success") {
                        alert("Student added successfully!");
                        fetchStudents();
                        $("#addStudentModal").modal('hide');
                        $("#addStudentForm")[0].reset();
                    } else {
                        alert("Error adding student: " + result.msg);
                    }
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    alert("AJAX request failed: " + textStatus + ", " + errorThrown);
                });
            });
        });
    
        // Edit Student
        $(document).on('click', '.btnEditStudent', function() {
            let studentId = $(this).data('id');
            
            $.ajax({
                url: "getStudents.php",
                type: "GET",
                dataType: "json",
                data: { id: studentId }
            }).done(function(student) {
                $("#editStudentId").val(student.student_id);
                $("#editFirstName").val(student.first_name);
                $("#editLastName").val(student.last_name);
                $("#editEmail").val(student.email);
                $("#editGender").val(student.gender);
                $("#editCourse").val(student.course);
                $("#editAddress").val(student.user_address);
                $("#editBirthdate").val(student.birthdate);
                $("#editModal").modal('show');
            }).fail(function(jqXHR, textStatus, errorThrown) {
                alert("Error fetching student data: " + textStatus + ", " + errorThrown);
            });
        });
    
        // Update Student
        $("#btnUpdateStudent").click(function() {
            let updatedStudent = {
                student_id: $("#editStudentId").val(),
                first_name: $("#editFirstName").val(),
                last_name: $("#editLastName").val(),
                email: $("#editEmail").val(),
                gender: $("#editGender").val(),
                course: $("#editCourse").val(),
                user_address: $("#editAddress").val(),
                birthdate: $("#editBirthdate").val()
            };
        
            console.log("Updating student:", updatedStudent);
        
            $.ajax({
                url: "update_student.php",
                type: "POST",
                dataType: "json",
                data: $.param(updatedStudent)
            }).done(function(result) {
                if (result.res === "success") {
                    alert("Student updated successfully!");
                    fetchStudents();
                    $("#editModal").modal('hide');
                } else {
                    alert("Error updating student: " + result.msg);
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                alert("AJAX request failed: " + textStatus + ", " + errorThrown);
            });
        });
    
        // Delete Student
        $(document).on('click', '.btnDeleteStudent', function() {
            let studentId = $(this).data('id');
            if (confirm("Are you sure you want to delete this student?")) {
                $.ajax({
                    url: "delete_student.php",
                    type: "POST",
                    dataType: "json",
                    data: { id: studentId }
                }).done(function(result) {
                    if (result.res === "success") {
                        alert("Student deleted successfully!");
                        fetchStudents();
                    } else {
                        alert("Error deleting student: " + result.msg);
                    }
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    alert("AJAX request failed: " + textStatus + ", " + errorThrown);
                });
            }
        });
    });