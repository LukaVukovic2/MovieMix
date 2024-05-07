export function getColor(rating){
  if(rating > 8){
    return "green";
  }
  else if(rating > 6){
    return "yellow";
  }
  else if(rating > 4){
    return "orange";
  }
  else {
    return "red";
  }
}