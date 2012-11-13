<html>
<head>

	<!--jsp:include page="../components/Document/extJs/assets.jsp"/-->

	<style type="text/css" media="screen,projection">/*<![CDATA[*/ @import "http://www.side-labs.org/wiki/skins/sidelabsorg2/main.css"; /*]]>*/</style>

	<link rel="stylesheet" type="text/css" href="css/browser.css">
	<link rel="stylesheet" type="text/css" href="/side-demo/console/resources/css/custom.css">

    <link rel="stylesheet" type="text/css" href="/resources/common/js/extJs/ext-3.2.1/resources/css/ext-all.css" />
    <script type="text/javascript" src="/resources/common/js/extJs/ext-3.2.1/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="/resources/common/js/extJs/ext-3.2.1/ext-all-debug.js"></script>
    <script type="text/javascript" src="/resources/common/js/extJs/ux-3.2.1/ux-all.js"></script>
    <script type="text/javascript" src="/resources/common/js/extJs/ux-3.2.1/miframe.js"></script>

    <link rel="stylesheet" type="text/css" href="/resources/common/js/extJs/ux-3.2.1/css/Portal.css" />
    <script type="text/javascript" src="/resources/common/js/extJs/ux-3.2.1/Portal.js"></script>
    <script type="text/javascript" src="/resources/common/js/extJs/ux-3.2.1/PortalColumn.js"></script>
    <script type="text/javascript" src="/resources/common/js/extJs/ux-3.2.1/Portlet.js"></script>


	<!--script type="text/javascript" src="/resources/common/js/dojo/dojo-1.6.0.xd.js"></script-->
	<script type="text/javascript" src="/resources/common/js/dojo/dojo-release-1.6.1/dojo/dojo.js.uncompressed.js"></script>

	<script type="text/javascript" src="/resources/common/js/jquery/jquery-1.6.2.min.js"></script>

	<script type="text/javascript" src="/resources/common/js/misc/log4javascript.js"></script>
	<script type="text/javascript" src="/resources/common/js/misc/pdfobject_min.js"></script>
	<script type="text/javascript" src="/resources/common/js/misc/jsSHA/src/sha1.js"></script>
	<script type="text/javascript" src="/resources/common/js/side-labs/SIDE/augment/String.js"></script>
    <script type="text/javascript" src="/resources/common/js/side-labs/SIDE/external/deepCopy.js"></script>
	<script type="text/javascript" src="/resources/common/js/misc/xml2json/xml2json.js"></script>

	<script type="text/javascript" src="/resources/common/js/misc/xml2json/JPath.js"></script>
	<script type="text/javascript" src="/resources/common/js/misc/json/jsonselect.min.js"></script>

	<script type="text/javascript" src="/resources/common/js/google/google-closure-20110323-r790/closure/goog/base.js"></script>

	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/Base.js"></script>
	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/Util.js"></script>
	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/pattern/Observer.js"></script>
	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/security/Authenticator.js"></script>
	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/data/CMISStore.js"></script>
	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/utils/CMIS.js"></script>
	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/model/data/Metadata.js"></script>
	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/model/view/Metadata.js"></script>

	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/view/ui/Preview.js"></script>
	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/view/ui/FlashPreview.js"></script>
	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/view/ui/PDFPreview.js"></script>

	<!--script type="text/javascript" src="../components/Document/extJs/main-pre.js"></script-->
	<script type="text/javascript" src="main-pre.js"></script>

<!--
	<link rel="stylesheet" type="text/css" href="css/browser.css">
	<link rel="stylesheet" type="text/css" href="/side-demo/console/resources/css/custom.css">

    <link rel="stylesheet" type="text/css" href="/resources/common/js/extJs/ext-3.2.1/resources/css/ext-all.css" />
    <script type="text/javascript" src="/resources/common/js/extJs/ext-3.2.1/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="/resources/common/js/extJs/ext-3.2.1/ext-all-debug.js"></script>
    <script type="text/javascript" src="/resources/common/js/extJs/ux-3.2.1/ux-all.js"></script>
    <script type="text/javascript" src="/resources/common/js/extJs/ux-3.2.1/miframe.js"></script>

	<script type="text/javascript" src="/resources/common/js/dojo/dojo-release-1.6.1/dojo/dojo.js.uncompressed.js"></script>
	<script type="text/javascript" src="/resources/common/js/jquery/jquery-1.6.2.min.js"></script>
	<script type="text/javascript" src="/resources/common/js/google/google-closure-20110323-r790/closure/goog/base.js"></script>

	<script type="text/javascript" src="/resources/common/js/misc/log4javascript.js"></script>
	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/Base.js"></script>
	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/Util.js"></script>
	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/pattern/Observer.js"></script>
	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/security/Authenticator.js"></script>
	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/model/data/Metadata.js"></script>

	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/view/ui/Preview.js"></script>
	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/view/ui/FlashPreview.js"></script>
	<script type="text/javascript" src="/cloud/framework/side-labs/SIDE/view/ui/PDFPreview.js"></script>
-->

    <script type="text/javascript" src="index-metadata.js"></script>
    <script type="text/javascript" src="index-layout.js"></script>
    <script type="text/javascript" src="/side-demo/console/index-main.js?key=64e53bb3c427fd800361260f2f0845add4ad6c46"></script>
</head>
<body style="background-color: white;">

<div id="external-header">
		<div id="header">
			<div id="content">
			<div id="lefttitle">

		 	    <a href="/wiki/index.php/SIDE4:Overview"
		    		title="SIDE4:Overview">
		    		<img align="middle" border="0" src="http://www.side-labs.com/en/skins/sidelabscom/images2/logos/sidelabs-white-25.gif"/>
		    	    </a>
			    <!--<a href="/fr/">FR</a> | <a href="/en/">EN</a>-->
			</div>

			<div id="twitter">
				<a href="http://www.twitter.com/sidelabs"><img src="http://twitter-badges.s3.amazonaws.com/follow_us-a.png" alt="Follow sidelabs on Twitter"/></a>
			</div>

			<div id="info">
				Visit
				<a class="item" href="/en/index.php/Product:SIDE-Support">SIDE-Labs.com</a>
				<a class="item outline" href="http://www.side-labs.com/en/index.php/Product:SIDE-Support:Subscription">Get Professional Subscription</a>
			</div>
			</div>
		</div>

		<div id="tabs">
			<div class="squeeze">
				<div class="separator">
					<a accesskey="1" href="/wiki/index.php/SIDE4:Overview">Home</a>
				</div>
				<div class="separator">
					<a accesskey="d" href="/wiki/index.php/SIDE4:Downloads">Downloads</a>
				</div>
				<div class="separator">
					<a accesskey="f" href="/wiki/index.php/SIDE4:Features">Features</a>
				</div>
				<div class="separator">
					<a accesskey="t" href="/wiki/index.php/SIDE4:Tutorials">Tutorials</a>
				</div>
				<div class="separator">
					<a accesskey="c" href="/wiki/index.php/SIDE4:Community">Community</a>
				</div>
				<div class="separator">
					<a accesskey="o" href="/wiki/index.php/SIDE4:SAR">SIDE Application Repository</a>
				</div>
				<div class="noseparator">
					<a accesskey="p" href="http://www.side-labs.com">Professional Support</a>
				</div>
			</div>
		</div>
	</div>

    <div style="display:none;">

        <div id="start-div">
            <div style="float:left;" ><img src="http://www.side-labs.org/resources/icons/crystal_project/128x128/apps/ksirtet.png" /></div>
            <div style="margin-left:100px;">
                <h2>SIDE-Labs</h2>
                <h2>Welcome to SIDE-Labs, developed by BlueXML</h2>
                <p>This is your application showroom. All the elements that have been generated
                with SIDE are available here. You can copy the url on the bottom left and paste
                it into your browser: you should see the same result into a standalone view.</p>
                <p>What does that mean? It means you can create your own Share application, based on
                alternative technologies if you are not interested by learning Alfresco Share or Y!UI</p>

                <p>Select an item from the tree to the left to begin.</p>
                <p>Jean-Christophe Kermagoret (jck@bluexml.com)</p>

                <p>All these elements have been generated with SIDE, released under open source GPL.
                Feel free to download at http://www.side-labs.org.</p>
            </div>
        </div>

        <div id="details">
        	<p>
        		<span class="embedIframe">Embed Iframe:</span><input id="embedIframe-input" value=""></input>
        	</p>
        	<p>
        		<span class="directLink">Direct Link:</span><input id="directLink-input" value=""></input> -
        		<a href="" id="directLink-href" target="_blank">Open the link in a new window</a>
        	</p>
        </div>

        <div id="container">
      		<iframe id="containerBody" class="x-panel-body" style="frameBorder:0;width:100%;height:100%;"></iframe>
    	</div>

    </div>
</body>
</html>
