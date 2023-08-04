
<?session_start()?>

<meta charset="utf-8">

<?
  $name = $_POST['name'];
  $new_score = $_POST['new_score'];

  include "dbinit.php";
  mysqli_query($connect, "set names utf8");

  $sql = "select * from top_score where name='$name'";
  $result = mysqli_query($connect, $sql);
  $exit = mysqli_num_rows($result);

  if(!$name) {
    echo "<script>location.href = 'index.html';</script>";
    return false;
  }

  if($exit){
    $sql = "update top_score set score='$new_score' where name='$name'";
    mysqli_query($connect, $sql);
  } else {
    $sql = "insert into top_score (name, score) values ('$name', '$new_score')";
    mysqli_query($connect, $sql);
  }
  mysqli_close($connect);

  echo "<script>location.href = 'index.html';</script>";

?>