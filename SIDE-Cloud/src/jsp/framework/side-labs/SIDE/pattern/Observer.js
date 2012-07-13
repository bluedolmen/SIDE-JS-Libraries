/*!
 * SIDE-Labs Library 2.0.0
 * Copyright(c) 2006-2010 BlueXML SARL
 * licensing@bluexml.com
 * http://www.bluexml.com/license
 */

goog.provide("SIDE.pattern.Observer");

/**
 * @namespace
 */
SIDE.pattern.Observer = {
};

/**
 * @type {*}
 * @static
 */
SIDE.pattern.Observer.log = new log4javascript.getLogger("SIDE.pattern.Observer");

/**
 * @param {string} channel 
 * @param {Function} subscriber
 * @param {string=} debug
 * @returns
 */
SIDE.pattern.Observer.subscribe = function(channel, subscriber, debug) {
//	if (SIDE.pattern.Observer.log.isDebugEnabled()) {
	try {
		SIDE.pattern.Observer.log.debug("Observer - Subscribing");		
		SIDE.pattern.Observer.log.debug("Channel : " + channel);
	} catch (e) {}
	dojo.subscribe(channel, subscriber);
};

/**
/**
 * @param {string} channel 
 * @param {Array} message
 * @param {string=} debug
 * @returns
 */
SIDE.pattern.Observer.publish = function(channel, message, debug) {
	try {
		SIDE.pattern.Observer.log.debug("SIDE.pattern.Observer - Publishing");
		SIDE.pattern.Observer.log.debug("Channel : ", channel);
		SIDE.pattern.Observer.log.debug("Message : ", message[0]);
	} catch (e) {}
	dojo.publish(channel, message);
};
