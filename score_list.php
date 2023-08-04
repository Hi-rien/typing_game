
<?
  include "dbinit.php";

  $name = $_GET['name'];
  $score = $_GET['score'];

  $sql = "select * from top_score order by score desc";
  $result = mysqli_query($connect, $sql);
  $total = mysqli_num_rows($result);

  for($i = 0; $i < $total; $i++) {
    mysqli_data_seek($result, $i);
    $row = mysqli_fetch_array($result);
    $name = $row['name'];
    $score = $row['score'];
    
?>

  <ul>
    <li class="score-item-name">name : <?=$name?></li>
    <li class="score-item-score">score : <?=$score?>점</li>
  </ul>

<?
  }
?>