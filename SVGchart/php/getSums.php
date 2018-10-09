<?php 
require_once("db_connect.php");

if ($dbi) {
    // SQL query
    $q = "SELECT SUM(value) as 'sum' FROM HLCChartItems WHERE category = 1
        UNION
        SELECT SUM(value) FROM HLCChartItems WHERE category = 2";

    // Array to translate to json
    $rArray = array();

    if ($stmt = $dbi->prepare($q)) {

        //Prepare output
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($rSUM);

        //Collect results
        while($stmt->fetch()) {
            $rArray[] = [
                "sum"=>$rSUM
            ];
        }
        
        //Encode JSON
        echo json_encode($rArray);
        
        $stmt->close();        
    }
    else {
        echo "no execute statement";
    }
}
//Inform user if error
else {
        echo "Connection Error: " . mysqli_connect_error();
}
//Close connection
mysqli_close($dbi);
    
?>