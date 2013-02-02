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
/*
			var log = log4javascript.getLogger("SIDE.Tree");
			var popUpAppender = new log4javascript.PopUpAppender();
			log.setLevel(log4javascript.Level.ALL);
			log.addAppender(popUpAppender);
*/
			var pua = new log4javascript.PopUpAppender();	
			var log = log4javascript.getDefaultLogger().addAppender(pua);
//			log4javascript.getLogger("SIDE.pattern.Observer").addAppender(pua);
//			log4javascript.getLogger("SIDE.Tree").addAppender(pua);
			log4javascript.getLogger("SIDE.Preview").addAppender(pua);
			log4javascript.getLogger("SIDE.FlashPreview").addAppender(pua);
			log4javascript.getLogger("SIDE.PDFPreview").addAppender(pua);
			var lsa = log4javascript.getLogger("SIDE.Authenticate");
			lsa.setLevel(log4javascript.Level.INFO);
			lsa.addAppender(pua);
			log4javascript.getLogger("SIDE.Util").addAppender(pua);
			log4javascript.getLogger("SIDE.Preview").addAppender(pua);
