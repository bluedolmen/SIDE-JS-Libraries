<html>
<head>

	<jsp:include page="assets.jsp"/>

	<script type="text/javascript" src="grid-with-preview-log.js"></script> 
	<script type="text/javascript" src="grid-with-preview-layout.js"></script> 

	<jsp:include page="assets-components.jsp"/>

	<script type="text/javascript" src="main-require.js"></script> 
	<script type="text/javascript" src="main-pre.js"></script> 

	<jsp:include page="assets-properties.jsp"/>				
    <script type="text/javascript" src="grid-with-preview-main.js"></script>

</head>
<body>
    <div id="grid1" class="height: 300px;"></div>
    <div id="grid2" class="height: 300px;"></div>
    <div id="detail"></div>
    <div id="preview_flash" style="width: 50%; float: left;"></div>
    <div id="preview_pdf" style="width: 49%; float: left;"></div>    
</body>
</html>