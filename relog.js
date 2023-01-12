//AutoRelog/AntiDisconnect
function LoginDoLogin() { //rewrite login to variabilize credentials for later use
    if (!LoginSubmitted && ServerIsConnected) {
        this.LoginName = ElementValue("InputName");
        this.LoginPassword = ElementValue("InputPassword");
        var letters = /^[a-zA-Z0-9]+$/;
        if (LoginName.match(letters) && LoginPassword.match(letters) && (LoginName.length > 0) && (LoginName.length <= 20) && (LoginPassword.length > 0) && (LoginPassword.length <= 20)) {
            LoginSetSubmitted();
            ServerSend("AccountLogin", {
                AccountName: LoginName,
                Password: LoginPassword
            });
        } else LoginStatusReset("InvalidNamePassword");
    }
    LoginUpdateMessage();
}
 
function ServerDisconnect(data, close = false) { //rewrite disconnect to prevent relog screen
    if (!ServerIsConnected) return;
    ChatRoomSendLocal(
        "<p style='background-color:#5fbd7a'>Disconnected! Reconnecting...</p>"
    );
    const ShouldRelog = Player.Name != "";
    AutoRelog();
    let msg = data;
    if (data) {
        console.warn(data);
        msg = data;
    }
    ServerSetConnected(false, msg);
    if (close) {
        ServerSocket.disconnect();
    }
}
 
function AutoRelog() {
    if (ServerPlayerIsInChatRoom()) {
        RelogChatLog = document.getElementById("TextAreaChatLog").cloneNode(true);
        RelogChatLog.id = "RelogChatLog";
        RelogChatLog.name = "RelogChatLog";
        RelogInputText = ElementValue("InputChat").trim();
        ElementRemove("InputChat");
        ElementRemove("TextAreaChatLog");
        CurrentScreen = "ChatSearch";
        CurrentModule = "Online";
        CurrentCharacter = null;
    } else {
        RelogChatLog = null;
        RelogInputText = "";
    }
    RelogData = {
        Screen: CurrentScreen,
        Module: CurrentModule,
        Character: CurrentCharacter
    };
    CurrentCharacter = null;
    ServerSend("AccountLogin", {
        AccountName: LoginName,
        Password: LoginPassword
    });
}
