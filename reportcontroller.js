var config=require('../config.json');
var dailysumm=require('./dailySummary/dailysummary');
var trx=require('./dailyTransaction/daily');

console.log('Report Type',config.reporttype.report_type);

if(config.reporttype.report_type=='Daily Summary'){
    dailysumm.DailySummary();
}
else if(config.reporttype.report_type=='Daily Transaction' || config.reporttype.report_type=='Monthly Transaction'){
    trx.TransactionReportGenerate(config.reporttype.report_type);
}
else if(config.reporttype.report_type=='' || config.reporttype.report_type==null || config.reporttype.report_type==undefined){
  console.log('Please specify Report type');
}else{
    console.log('Invalid Report Type');
}