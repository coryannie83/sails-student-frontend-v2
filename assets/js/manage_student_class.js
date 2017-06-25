(function(){



  //function to delete record by settin id on form and then submitting the form
  //sets value of student_class id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id){
    $("#deleteform input[name=student_class_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getstudent_class(record_id){
    return $.get("http://localhost:1337/student_class/" + record_id, function(data){
      console.log("got student_class");
    })
  }

  $(function(){

    

    //initialize variables for items in the DOM we will work with
    let managestudent_classForm = $("#managestudent_classForm");
    let addstudent_classButton = $("#addstudent_classButton");

    //add student_class button functionality
    addstudent_classButton.click(function(){
      managestudent_classForm.attr("action", "/create_student_class");
      managestudent_classForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            //function to delete record
            managestudent_classForm.submit()
          }
        }
      });
    })

  	$("#student_classTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("student_classid")
      managestudent_classForm.find("input[name=student_class_id]").val(recordId);
      managestudent_classForm.attr("action", "/update_student_class");
      let student_class = getstudent_class(recordId);

      //populate form when api call is done (after we get student_class to edit)
      student_class.done(function(data){
        $.each(data, function(name, val){
            var $el = $('[name="'+name+'"]'),
                type = $el.attr('type');

            switch(type){
                case 'checkbox':
                    $el.attr('checked', 'checked');
                    break;
                case 'radio':
                    $el.filter('[value="'+val+'"]').attr('checked', 'checked');
                    break;
                default:
                    $el.val(val);
            }
        });
      })

      managestudent_classForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            managestudent_classForm.submit()
          }
        }
      });
    })


    $("#student_classTable").on("click", "#deleteButton", function(e){
      let recordId = $(this).data("student_classid")
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete student_class": function() {
            //function to delete record
            deleteRecord(recordId);
          }
        }
      });
    })

  })

})();
