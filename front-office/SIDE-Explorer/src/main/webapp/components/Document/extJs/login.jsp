<html>
  <head>
    <link rel="StyleSheet" type="text/css" href="js/dojo/dijit/themes/tundra/tundra.css">
    <script type="text/javascript">
      var djConfig = {
        baseScriptUri : "js/dojo/",
        parseOnLoad : true
      };
    </script>
    <script type="text/javascript" src="js/dojo/dojo/dojo.js"></script>
    <script>
      dojo.require("dojo.parser");
      dojo.require("dijit.form.Button");
      dojo.require("dijit.Dialog");
      dojo.require("dijit.form.TextBox");
      dojo.addOnLoad(showDialog);

      function showDialog() {
        dijit.byId('dialog1').show();
      }

    </script>
  </head>
  <body class="tundra">
  <div dojoType="dijit.Dialog" id="dialog1" title="Login">
      <form action="Login" method="post" validate="true" id="loginForm">
        <table width="258">
          <tr>
            <td><label>Login</label></td>
            <td><input type="text" trim="true" dojoType="dijit.form.TextBox" value="" name="login" id="userId"/></td>
          </tr>
          <tr>
            <td><label>Password</label></td>
            <td><input type="password" trim="true" dojoType="dijit.form.TextBox" value="" name="password" id="password"/></td>
          </tr>
          <tr><td colspan="2">&nbsp;</td></tr>
          <tr>
            <td colspan="2" align="center">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" valign="top"><button dojoType="dijit.form.Button" type="submit" id="LoginButton" onClick="alert("ok");">Ok</button></td>
                  &nbsp;
                  <td align="left" valign="top"><button dojoType="dijit.form.Button" type="submit" onclick="document.Login.reset()" id="Cancel">Cancel</button></td>
                  &nbsp;
                  <td><button dojoType="dijit.form.Button" type="submit" onclick="showDialog();" id="resetPassword"> Show Dialog </button></td>
                </tr>
           </table>
           </td>
          </tr>
        </table>
      </form>
    </div>

  </body>
</html>

   
  
