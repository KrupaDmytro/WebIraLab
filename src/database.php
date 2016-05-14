<?php

error_reporting(E_ALL);
ini_set('display_startup_errors',1);
ini_set('display_errors',1);
error_reporting(-1);

echo "Testing database PDO connection...<br>";

$SECRET = "diu7ajksf8sj,vKLDHliewudksfj"; //  place this in WebApp settings


$connenv = getenv("SQLAZURECONNSTR_defaultConnection");
parse_str(str_replace(";", "&", $connenv), $connarray);

$connstring = "sqlsrv:Server=".$connarray["Data_Source"].";Database=".$connarray["Initial_Catalog"];
$user = $connarray["User_Id"];
$pass = $connarray["Password"];

function printCollations($conn)
{
    $sql = "SELECT name, description FROM sys.fn_helpcollations()";
    foreach ($conn->query($sql) as $row)
    {
        print $row['name'] . "\t";
        print $row['description'] . "<br>";
    }
}
try
{
    $conn = new PDO( $connstring, $user, $pass );

    $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

    $sqlcreate ="CREATE TABLE news( ID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,".
        "new_name         VARCHAR( 250 ) NOT NULL,".
        "descr      VARCHAR( 128 ) NOT NULL,";


    try { $conn->exec($sqlcreate); } catch ( PDOException $e ) { echo "Create table error. May be it exists."; }

    print("The table was created.<br>");

    $sqlinsert = "insert into news (new_name,descr) values (?, ?)";
    $insertquery = $conn->prepare($sqlinsert);

    // test set of users
    $myusers = array(
        array("New1", "Non-interesting"),
        array("New2", "Some interesting"),
        array("New3", "Big news") );

    foreach($myusers as $user)
    {
        $username = $user[0];
        $userpasshash = hash( "whirlpool", $SECRET.$user[1].$SECRET, false );
        $isAdmin=$user[2];
        $insertquery->execute(array($username, $userpasshash, $isAdmin));

        echo "Insert error code = ".$insertquery->errorCode()." ";
        echo "Number of rows inserted = ".$insertquery->rowCount()."<br>";
    }

    print "<br>Selecting rows from the table...<br>";

    $sqlselect = "SELECT * FROM news";
    foreach ($conn->query($sqlselect) as $row)
    {
        print   htmlspecialchars($row['login'])." ".
            htmlspecialchars($row['password'])." ".
            "admin=".htmlspecialchars($row['admin'])."<br>";
    }

    print "Dropping the table...<br>";

    $sqldrop ="DROP TABLE news";

    $conn->exec($sqldrop);

    print "The table was dropped <br>";
}
catch ( PDOException $e )
{
    // TODO: There is a security problem here. Do not do this in production!!!
    print( "PDO Error : " );
    die(print_r($e));
}
?>