<?php 
  $request = file_get_contents('php://input');
  $request = json_decode($request);

  $column = '*';
  $where = "";
  $findData = "";
  if ($request->columns) {
    $column = $request->columns;
  }
  if ($request->findColums) {
    $where = " WHERE ".$request->findColums;
    if ($request->findData) {
      $findData = " LIKE '%".$request->findData."%'";
    }
  }

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
  
  // 검색 : SELECT 가져올 컬럼 FROM 테이블이름 WHERE 찾을 컬럼 LIKE '%찾을 단어%';

  $sql = "SELECT ".$column." FROM MovieData".$where.$findData;
  $result = $conn->query($sql);

  $arrMv = array();
  if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
      $arrMv[] = array(
        "_key" => (int)$row["_key"],
        "mvPoster" => $row["mvPoster"],
        "mvInfo" => $row["mvInfo"],
        "mvStory" => $row["mvStory"],
        "mvActor" => $row["mvActor"],
        "openingDate" => $row["openingDate"],
        "mvGenre" => $row["mvGenre"],
        "mvVideo" => $row["mvVideo"],
        "mvTitle" => $row["mvTitle"],
        "reservationRate" => $row["reservationRate"],
        "mvGrade" => $row["mvGrade"],
        "steelCut" => $row["steelCut"],
        "mvComment" => $row["mvComment"]
      );
    }
    echo json_encode($arrMv);
  } else {
    echo json_encode('no Data');
  }
  
  $conn->close();
?>
