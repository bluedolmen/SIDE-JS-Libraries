<import resource="classpath:alfresco/webscripts/extension/js/external/log4javascript.js">

var logger = log4javascript.getLogger();
var appender = new log4javascript.AlertAppender();
var popUpLayout = new log4javascript.PatternLayout("%d{HH:mm:ss} %-5p - %m%n");
appender.setLayout(popUpLayout);
logger.setLevel(log4javascript.Level.ALL);
logger.addAppender(appender);

// AlertAppender Redirection to console
// A File logger should be a good idea
alert = function(x) {
  print(x.replace(/(\r\n$|\n$|\r$)/gm,""));
};