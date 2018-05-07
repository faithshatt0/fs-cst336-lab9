$(document).ready(function(){
    
    $("#logoutBtn").click( function() {
        window.location.href="logout.php";
        }
    );
    
    var score = 0;
    $("form").submit(function(event) {
        
        event.preventDefault();
        
        //Get answers
        var answer1 = $("input[name='question1']").val().trim();
        var answer2 = $("input[name='question2']:checked").val();
        
        console.log(answer1);
        console.log(answer2);
        
        //Checks if answers are correct
        // Question 1
        if(answer1 == "1994") {
            correctAnswer($('#question1-feedback'));
        } else {
            incorrectAnswer($('#question1-feedback'));
        }
        
        $('#question1-feedback').append("The answer is <strong>1994</strong>");

        // Question 2
        if(answer2 === "C") {
            correctAnswer($('#question2-feedback'));
        } else {
            incorrectAnswer($('#question2-feedback'));
        }
        
        $('#question2-feedback').append("The answer is <strong>Monte Rey</strong>");

        //Displays quiz score
        $('#score').html(score);
        $('#waiting').html("<img src='img/loading.gif' alt='submitting data' />");
        $("input[type='submit']").css("display", "none");

        //Submits and stores score, retrieves average score
        $.ajax({
            type : "GET",
            url  : "submitScores.php",            
            dataType : "json",
            data : {"score" : score},            
            success : function(data){
                $("#times").html(data.times);
                $("#average").html(data.average);
                $("#feedback").css("display", "block");
                $("#waiting").html("");
                $("input[type='submit']").css("display","");
                
                score = 0;
                
            },
            complete: function(data,status) { //optional, used for debugging purposes
               // alert(status);
            }

        });//AJAX
        
    }); //formSubmit
    
    //Styles a question as answered correctly
    function correctAnswer(questionFeedback){
        questionFeedback.html("Correct! ");
        questionFeedback.addClass("correct");
        questionFeedback.removeClass("incorrect");
        score++;
    }

    //Styles a question as answered incorrectly
    function incorrectAnswer(questionFeedback){
        questionFeedback.html("Incorrect! ");
        questionFeedback.addClass("incorrect");
        questionFeedback.removeClass("correct");
    }
    
}); //documentReady       