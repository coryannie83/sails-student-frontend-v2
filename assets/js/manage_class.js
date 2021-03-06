(function(){



  //function to delete record by settin id on form and then submitting the form
  //sets value of class id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id){
    $("#deleteform input[name=class_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getclass(record_id){
    return $.get("http://localhost:1337/class/" + record_id, function(data){
      console.log("got class");
    })
  }

  $(function(){

    //initialize variables for items in the DOM we will work with
    let manageClassForm = $("#manageClassForm");
    let addClassButton = $("#addClassButton");

    //add class button functionality
    addClassButton.click(function(){
      manageClassForm.attr("action", "/create_class");
      manageClassForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            //function to delete record
            manageClassForm.submit()
          }
        }
      });
    })

  	$("#classTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("class_id")
      manageClassForm.find("input[name=class_id]").val(recordId);
      manageClassForm.attr("action", "/update_class");
      let class = getclass(recordId);

      //populate form when api call is done (after we get class to edit)
      class.done(function(data){
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

      manageClassForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            manageClassForm.submit()
          }
        }
      });
    })


    $("#classTable").on("click", "#deleteButton", function(e){
      let recordId = $(this).data("class_id")
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete class": function() {
            //function to delete record
            deleteRecord(recordId);
          }
        }
      });
    })

  })

})();
