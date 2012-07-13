<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<!--link rel="stylesheet" href="/resources/common/js/dojo/dojo-release-1.5.0/dojo/resources/dojo.css"/-->
	<link rel="stylesheet" href="/resources/common/js/dojo/dojo-release-1.5.0/dijit/themes/claro/claro.css"/>

    <script type="text/javascript" src="/resources/common/js/misc/log4javascript.js"></script>
	<script type="text/javascript" src="/resources/common/js/dojo/dojo-1.5.xd.js"></script>
	
    <script type="text/javascript" src="/resources/common/js/side-labs/pattern/Observer.js"></script>
    <script type="text/javascript" src="/resources/common/js/side-labs/default/String.js"></script>
    <script type="text/javascript" src="/resources/common/js/side-labs/layout/Render.js"></script>
    <script type="text/javascript" src="/resources/common/js/side-labs/model/Metadata.js"></script>

    <script type="text/javascript">
		log4javascript.setEnabled(true);
		var popUpAppender = new log4javascript.PopUpAppender();
		log4javascript.getLogger("SIDE.Layout.View").addAppender(popUpAppender);
		log4javascript.getLogger("Metadata").addAppender(popUpAppender);
//		log.setLevel(log4javascript.Level.ALL);
	</script>
	
    <script type="text/javascript" src="/resources/common/js/side-labs/layout/view-init.js"></script>

</head>
<body class="claro">
    <div id="test" class="loading">Loading...</div>
    <div id="metadata-core" class=""></div>
</body>
</html>