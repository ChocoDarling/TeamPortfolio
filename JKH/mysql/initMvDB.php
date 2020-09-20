<?php 
  $request = file_get_contents('php://input');
  $request = json_decode($request);

  $servername = "localhost";
  $username = "rudekrudgns";
  $password = "awdrq2e4!";
  $dbname = "rudekrudgns";
  
  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
  }
  $sql = "INSERT INTO MovieData (
      _key,
      mvPoster, 
      mvInfo, 
      mvStory, 
      mvActor, 
      openingDate, 
      mvGenre, 
      mvVideo, 
      mvTitle, 
      reservationRate, 
      mvGrade, 
      steelCut, 
      mvComment
    ) VALUES (
      ".(int)($request->_key).",
      '".$request->mvPoster."',
      '".$request->mvInfo."',
      '".$request->mvStory."',
      '".$request->mvActor."',
      '".$request->openingDate."',
      '".$request->mvGenre."',
      '".$request->mvVideo."',
      '".$request->mvTitle."',
      '".$request->reservationRate."',
      '".$request->mvGrade."',
      '".$request->steelCut."',
      '".$request->mvComment."'
    ) ON DUPLICATE KEY UPDATE 
    _key = ".(int)($request->_key).",
    mvPoster = '".$request->mvPoster."', 
    mvInfo = '".$request->mvInfo."', 
    mvStory = '".$request->mvStory."', 
    mvActor = '".$request->mvActor."', 
    openingDate = '".$request->openingDate."', 
    mvGenre = '".$request->mvGenre."', 
    mvVideo = '".$request->mvVideo."', 
    mvTitle = '".$request->mvTitle."', 
    reservationRate = '".$request->reservationRate."', 
    mvGrade = '".$request->mvGrade."', 
    steelCut = '".$request->steelCut."', 
    mvComment = '".$request->mvComment."'";
  $result = $conn->query($sql);
  $conn->close();
?>
