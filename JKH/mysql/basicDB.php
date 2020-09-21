<?php
    $request = file_get_contents('php://input');
    $request = json_decode($request);

    if(!$request->table) return;
  
    $servername = "localhost";
    $username = "rudekrudgns";
    $password = "awdrq2e4!";
    $dbname = "rudekrudgns";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($request->command === 'get') {
        $sql = "SELECT * FROM ".$request->table;

        if ($request->condition) {
            $sql = $sql." WHERE ".$request->condition;
            if ($request->findData) {
                $findData = " LIKE '%".$request->findData."%'";
            }
        }
        
        $result = $conn->query($sql);

        if ($result->num_rows > 1) {
            $arrMv = array();
          // output data of each row
            while($row = $result->fetch_assoc()) {
                $arrMv[] = $row;
            }
            echo json_encode($arrMv);
        } else if ($result->num_rows > 0) {
            echo json_encode($result->fetch_assoc());
        } else {
            echo json_encode('no Data');
        }
    } else if ($request->command === 'init') {
        $keys = '';
        $values = '';
        foreach($request->object as $key => $value) {
            $keys = $keys.$key.", ";
            $values = $values."'".$value."', ";
        }
        $keys = mb_substr($keys, 0, -2);
        $values = mb_substr($values, 0, -2);

        $sql = "INSERT INTO ".$request->table." (".$keys.") VALUES (".$values.")";
        $result = $conn->query($sql);

        echo json_encode($result);
    } else if ($request->command === 'set') {
        $sql = "SELECT * FROM ".$request->table." WHERE id LIKE '".$request->object->id."'";
        $result = $conn->query($sql);

        if (!$result->num_rows) {
            $conn->close();
            echo json_encode('no data');
            return;
        }

        $values = '';
        foreach($request->object as $key => $value) {
            $values = $values.$key."='".$value."', ";
        }
        $values = mb_substr($values, 0, -2);

        $sql = "UPDATE ".$request->table." SET ".$values." WHERE id='".$request->object->id."'";
        $result = $conn->query($sql);

        echo json_encode($result);
    } else if ($request->command === 'delete') {
        $sql = "SELECT * FROM ".$request->table." WHERE id LIKE '".$request->id."'";
        $result = $conn->query($sql);

        if (!$result->num_rows) {
            $conn->close();
            echo json_encode('no data');
            return;
        }

        $sql = "DELETE FROM ".$request->table." WHERE id='".$request->id."'";
        $result = $conn->query($sql);

        echo json_encode($result);
    }
    
    $conn->close();
?>