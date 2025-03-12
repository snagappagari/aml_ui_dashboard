export function StatusColor(d:any) {
     if(d==="Accepted" || d==='REQUESTED' || d==='Requested' || d==='ACCEPTED'){
        return "bg-blue-300"
     }else if(d==="Pending" || d==="INACTIVE" || d==="Inactive" || d==="UNPAID" || d==="Unpaid" || d==='inactive' || d==='TERMINATED'){
        return "bg-red-300"
     }else if(d==="In Progress"){
        return "bg-yellow-300"
     }else if(d==="Completed" || d==="COMPLETED" || d === "INUSE" || d === "inuse"
       || d==="ACTIVE" || d==="Active" || d==="Completed" || d==="Installed" || d==="PAID" || d==="Paid" || d==='active' || d==='Closed' || d==='CLOSED'){
        return "bg-green-300"
     }
     return ''
  }







