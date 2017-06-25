(function(){



  //function to delete record by settin id on form and then submitting the form
  //sets value of grade id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id){
    $("#deleteform input[name=grade_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getgrade(record_id){
    return $.get("http://localhost:1337/grade/" + record_id, function(data){
      console.log("got grade");
    })
  }

  $(function(){

    //initialize variables for items in the DOM we will work with
    let managegradeForm = $("#managegradeForm");
    let addgradeButton = $("#addgradeButton");

    //add grade button functionality
    addgradeButton.click(function(){
      managegradeForm.attr("action", "/create_grade");
      managegradeForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            //function to delete record
            managegradeForm.submit()
          }
        }
      });
    })

  	$("#gradeTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("gradeid")
      managegradeForm.find("input[name=grade_id]").val(recordId);
      managegradeForm.attr("action", "/update_grade");
      let grade = getgrade(recordId);

      //populate form when api call is done (after we get grade to edit)
      grade.done(function(data){
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

      managegradeForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            managegradeForm.submit()
          }
        }
      });
    })


    $("#gradeTable").on("click", "#deleteButton", function(e){
      let recordId = $(this).data("gradeid")
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete grade": function() {
            //function to delete record
            deleteRecord(recordId);
          }
        }
      });
    })

  })

})();
