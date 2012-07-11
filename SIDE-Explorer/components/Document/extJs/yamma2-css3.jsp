<html>
<head>
		<jsp:include page="assets.jsp"/>

		<script type="text/javascript" src="yamma2-css3-log.js"></script>
		<script type="text/javascript" src="yamma2-css3-layout.js"></script>


		<jsp:include page="assets-css3.jsp"/>

		<jsp:include page="assets-components.jsp"/>
		<jsp:include page="assets-properties.jsp"/>

		<script type="text/javascript" src="main-require.js"></script>
		<script type="text/javascript" src="main-pre.js"></script>

		<script type="text/javascript" src="yamma2-css3-main.js"></script>

</head>
<body class="impress-not-supported">

<div class="fallback-message">
    <p>Your browser <b>doesn't support the features required</b> by impress.js, so you are presented with a simplified version of this presentation.</p>
    <p>For the best experience please use the latest <b>Chrome</b>, <b>Safari</b> or <b>Firefox</b> browser.</p>
</div>

<div id="impress">

    <div id="bored" class="step slide" data-x="-1000" data-y="-1500">
        <q>This application provides navigation logic a little unusual</q>
        <q>Based on <strong>CSS3</strong>. Requires <strong>modern</strong> browser like FF, Chrome or Safari</q>
        <q><a href="javascript:api.goto('choose-workflow')">Choose workflow</a></q>
    </div>

    <div id="analyze-content" class="step" data-x="850" data-y="2000" data-rotate="-90" data-scale="1">
    	<p>
    		<a href="javascript:api.goto('choose-workflow')">Choose workflow</a>
    		<a href="javascript:api.goto('take-a-decision')">Take a decision</a>
    	</p>
		<div id="display-attachments">Analyse content</div>
    </div>

    <div id="choose-workflow" class="step" data-x="3500" data-y="1000" data-rotate="180" data-scale="2">
    	<p>
    		<a href="javascript:api.goto('analyze-content')">Analyze content</a>
    		<a href="javascript:api.goto('take-a-decision')">Take a decision</a>
    	</p>
    	<div id="choose-workflow">Choose workflow</div>
    </div>

    <div id="take-a-decision" class="step" data-x="2825" data-y="-1325" data-rotate="360" data-scale="3">
    	<p>
    		<a href="javascript:api.goto('analyze-content')">Analyze content</a>
    		<a href="javascript:api.goto('choose-workflow')">Choose workflow</a>
    	</p>
		<div id="take-the-decision">Take a decision</div>
    </div>

    <div id="imagination" class="step" data-x="6700" data-y="-300" data-scale="6">
        <p>The only <b>limit</b> is your <b class="imagination">imagination</b></p>
    </div>

    <div id="source" class="step" data-x="6300" data-y="2000" data-rotate="20" data-scale="2">
        <q>For extJS + alfresco + mail management application, go to <a href="http://www.side-labs.org">SIDE-Labs</a>, petit padawan</q>
    </div>

    <div id="one-more-thing" class="step" data-x="6000" data-y="4000" data-scale="2">
        <q>For css3 information, go to <a href="http://github.com/bartaz/impress.js">github/bartaz/impress.js</a>, Luke!</q>
    </div>

    <div id="overview" class="step" data-x="3000" data-y="1500" data-scale="10">
    </div>

</div>

<div class="hint">
    <p>Use a spacebar or arrow keys to navigate</p>
</div>
<script>
if ("ontouchstart" in document.documentElement) {
    document.querySelector(".hint").innerHTML = "<p>Tap on the left or right to navigate</p>";
}
</script>

<script src="../../resources/impress/js/impress.js"></script>
<script>
	var api = impress();
	api.init();
</script>

</body>
</html>
