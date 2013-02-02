/**
  * Copyright BlueXML 2012. All right reserved.
  * 
  * This file is released under GPLv3
  *
  * If you are looking for a more business friendly license
  * please contact sales@bluexml.com
  */

/**
  * Copyright BlueXML 2012. All right reserved.
  * 
  * This file is released under GPLv3
  *
  * If you are looking for a more business friendly license
  * please contact sales@bluexml.com
  */

	log4javascript.setEnabled(true);
	var pua = new log4javascript.PopUpAppender();	
	var log = log4javascript.getDefaultLogger().addAppender(pua);

	log4javascript.getLogger("SIDE.component.view.CMISView").addAppender(pua);

	var lsa = log4javascript.getLogger("SIDE.security.Authenticate");
	lsa.setLevel(log4javascript.Level.INFO);
	lsa.addAppender(pua);

	log4javascript.getLogger("SIDE.component.store.CMISStore").addAppender(pua);
	log4javascript.getLogger("SIDE.Util").addAppender(pua);
	