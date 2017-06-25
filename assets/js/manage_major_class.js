(function(){



  //function to delete record by settin id on form and then submitting the form
  //sets value of major_class id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id){
    $("#deleteform input[name=major_class_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getmajor_class(record_id){
    return $.get("http://localhost:1337/major_class/" + record_id, function(data){
      console.log("got major_class");
    })
  }

  $(function(){

    //initialize variables for items in the DOM we will work with
    let managemajor_classForm = $("#managemajor_classForm");
    let addmajor_classButton = $("#addmajor_classButton");

    //add major_class button functionality
    addmajor_classButton.click(function(){
      managemajor_classForm.attr("action", "/create_major_class");
      managemajor_classForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            //function to delete record
            managemajor_classForm.submit()
          }
        }
      });
    })

  	$("#major_classTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("major_classid")
      managemajor_classForm.find("input[name=major_class_id]").val(recordId);
      managemajor_classForm.attr("action", "/update_major_class");
      let major_class = getmajor_class(recordId);

      //populate form when api call is done (after we get major_class to edit)
      major_class.done(function(data){
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

      managemajor_classForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            managemajor_classForm.submit()
          }
        }
      });
    })


    $("#major_classTable").on("click", "#deleteButton", function(e){
      let recordId = $(this).data("major_classid")
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete major_class": function() {
            //function to delete record
            deleteRecord(recordId);
          }
        }
      });
    })

  })

})();
