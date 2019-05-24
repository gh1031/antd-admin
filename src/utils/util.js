export function formatNumber(data){
  if(data!=null){
    return data.toFixed().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
  }else{
    return ;
  }
}