let reporter=require('cucumber-html-reporter');
var os=require('os');
let os_type=os.type();
let options={
    theme:'hierarchy',
    jsonFile:'./reports/ExecutionReport.json',
    output:'./reports/htmlReport.html',
    reportSuiteAsScenarios:true,
    scenarioTimestamp:true,
    launchReport:true,
    brandTitle:'Test Automation Report',
    metadata: {
        "App Version":"0.3.2",
        "Test Environment": "QA",
        "Browser": "Chrome",
        "Platform": "Windows 10",
        "Parallel": "Scenarios",
        "Executed": "Remote"
    },
    failedSummaryReport: true,
};
reporter.generate(options);