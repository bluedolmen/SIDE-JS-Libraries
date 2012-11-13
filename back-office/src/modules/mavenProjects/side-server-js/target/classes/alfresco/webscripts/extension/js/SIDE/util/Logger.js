<import resource="classpath:alfresco/webscripts/extension/js/SIDE/base.js">

SIDE.define("SIDE.util.Logger");

/**
 * This class provides a logger more advanced than native logger. But,
 * the true solution should be to use Log4javascript.
 *
 * Nevertheless, to avoid such an overhead, we could augment default logger
 * with the following behaviors
 *
 * @author Jean-Christophe Kermagoret
 *
 * @class Logger
 * @static
 * @module SIDE.Util
 *
 */

/**
 * Formats a comment line with provided separators
 *
 * @method log
 * @param {String} logMessage
 * @param {String} [_c1=*] First level separator
 * @param {String} [_c2=-] Second level separator
 * @param {String} [nbOfOccurrences=30]
 * @returns {String}
 */
SIDE.util.Logger.log = function(logMessage, _c1, _c2, _nbOfOccurrences) {
  var c1 = _c1 || "*";
  var c2 = _c2 || "-";
  var nbOfOccurrences = _nbOfOccurrences || 30;

  var sep1 = "";
  var sep2 = "";
  for (var i = 0; i < nbOfOccurrences; i++) {
    sep1 += c1;
    sep2 += c2;
  }
  logger.log("\n" + sep1);
  logger.log(logMessage);
  logger.log(sep2 + "\n");
}

/**
 * Dumps/logs obecjt's content according it has or not properties
 *
 * @method dump
 * @param {Object} o
 * @returns
 */
SIDE.util.Logger.dump = function(o) {
  if (o.properties) {
	  for (p in o.properties) {
	    logger.log(p + " = " + o.properties[p]);
	  }
  } else {
	  for (p in o) {
	    logger.log(p + " = " + o[p]);
	  }
  }
}

/**
 *
 * @param The default logger object is augmented to provide more flexibility
 * @returns {Boolean}
 */
/*
logger.isEnabled = function(level) {
  var property = "is"
      		  + level[0].toUpperCase() + level.substring(1,level.length).toLowerCase()
      		  + "Enabled";
  if (logger[property]()) {
    return true;
  } else {
    return false;
  }
}

logger.isDebugEnabled = logger.isWarnLoggingEnabled
logger.isErrorEnabled = logger.isWarnLoggingEnabled
logger.isFatalEnabled = logger.isWarnLoggingEnabled
logger.isWarnEnabled = logger.isWarnLoggingEnabled
logger.isInfoEnabled = logger.isWarnLoggingEnabled

logger.noLog = function (msg) {};
logger.debug = logger.isEnabled("debug") ? logger.log  : logger.noLog;
logger.fatal = logger.isEnabled("warn")  ? logger.warn : logger.noLog;
logger.error = logger.isEnabled("error") ? logger.warn : logger.noLog;
logger.info  = logger.isEnabled("info")  ? logger.warn : logger.noLog;

*/