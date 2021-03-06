var exec = require('cordova/exec');
AppMobiCloud = {
    _constructors: [],
    jsVersion: '4.0.0'
};         
try
{
AppMobiCloud.notifications = [];
AppMobiCloud.pushStart = false;
AppMobiCloud.uuid;
/**
 * This class initilizes plugin on the device.
 */
AppMobiCloud.Plugin = function() {
}
 
/**
* This class provides access to Advertisement on the device.
*/
AppMobiCloud.Advertising = function() {

}
 
//Override Initialize plugin method in case of android
AppMobiCloud.Plugin.prototype.initialize = function (successCB, errorCB,userName,passWord) {
    exec(successCB, errorCB, "AppMobiCloud", "initialize", [userName, passWord]);
}
               
if (typeof AppMobiCloud.plugin == "undefined")
    AppMobiCloud.plugin = new AppMobiCloud.Plugin();

if (typeof AppMobiCloud.advertising == "undefined")
    AppMobiCloud.advertising = new AppMobiCloud.Advertising();
	
/**
* This class provides access to notifications on the device.
*/
AppMobiCloud.Notification = function() {
}
 

 
/**
* This class specifies the attributes for push users.
* @constructor
*/
AppMobiCloud.Notification.PushUserAttributes = function() {
    this.s1 = null;
    this.s2 = null;
    this.s3 = null;
    this.s4 = null;
    this.s5 = null;
    this.s6 = null;
    this.n1 = null;
    this.n2 = null;
    this.n3 = null;
    this.n4 = null;
};

//Check Push User method
AppMobiCloud.Notification.prototype.checkPushUser = function(user,pass){
    exec(null, null, "AppMobiCloud", "checkPushUser", [user, pass]);
}

//Add Push User method
AppMobiCloud.Notification.prototype.addPushUser = function(user,pass,email){
    exec(null,null, "AppMobiCloud", "addPushUser", [user, pass, email]);
}

//Get Notification List
AppMobiCloud.Notification.prototype.getNotificationsList = function(){
    var notify = [];
    for(var note in AppMobiCloud.notifications) {
        notify.push(AppMobiCloud.notifications[note].id);
    }
    return notify;
};
   
//Get Notification Data
AppMobiCloud.Notification.prototype.getNotificationData = function(id) {
    var local = null;
    for(var note in AppMobiCloud.notifications) {
        if(id==AppMobiCloud.notifications[note].id) {
            local = {};
            local.id = AppMobiCloud.notifications[note].id;
            local.msg = AppMobiCloud.notifications[note].msg;
            local.data = AppMobiCloud.notifications[note].data;
            local.userkey = AppMobiCloud.notifications[note].userkey;
            local.richurl = AppMobiCloud.notifications[note].richurl;
            local.richhtml = AppMobiCloud.notifications[note].richhtml;
            local.isRich = AppMobiCloud.notifications[note].isRich;
            break;
        }
    }
    return local;
};
           
//Edit Push User method
AppMobiCloud.Notification.prototype.editPushUser = function(newEmail, newPassword) {
    if( ( newEmail == undefined || newEmail == "" ) &&
      ( newPassword == undefined || newPassword == "" || newPassword.indexOf(' ')!=-1 || newPassword.indexOf('.')!=-1 ) &&
      ( newUser == undefined || newUser == "" || newUser.indexOf(' ')!=-1 || newUser.indexOf('.')!=-1 ) )
    {
    throw(new Error("Error: AppMobiCloud.notification.editPushUser, No new value (email or password or user) specified. The space (' ') and dot ('.') characters are not allowed in user or password."));
    }
    exec(null, null, "AppMobiCloud", "editPushUser", [newEmail, newPassword, '']);
};

//Delete Push User method
AppMobiCloud.Notification.prototype.deletePushUser = function() {
    exec(null, null, "AppMobiCloud", "deletePushUser", []);
};

//Send Push User Password method
AppMobiCloud.Notification.prototype.sendPushUserPass = function() {
    exec(null, null, "AppMobiCloud", "sendPushUserPass", []);
};

//Set Push User Attributes method
AppMobiCloud.Notification.prototype.setPushUserAttributes = function(attributes) {
    if( attributes == undefined )
    {
        throw(new Error("Error: AppMobiCloud.notification.setPushUserAttributes: attributes is required."));
    }

    if( attributes.hasOwnProperty("s1") == false || attributes.hasOwnProperty("s2") == false || attributes.hasOwnProperty("s3") == false || attributes.hasOwnProperty("s4") == false
      || attributes.hasOwnProperty("s5") == false || attributes.hasOwnProperty("s6") == false || attributes.hasOwnProperty("n1") == false
      || attributes.hasOwnProperty("n2") == false || attributes.hasOwnProperty("n3") == false || attributes.hasOwnProperty("n4") == false )
    {
        throw(new Error("Error: AppMobiCloud.notification.setPushUserAttributes: invalid attributes parameter specified. Initialize using 'new AppMobiCloud.Notification.PushUserAttributes'."));
    }

    if( (Number(attributes.n1) == NaN) || (Number(attributes.n2) == NaN) ||
      (Number(attributes.n3) == NaN) || (Number(attributes.n4) == NaN) )
    {
        throw(new Error("Error: AppMobiCloud.notification.setPushUserAttributes: attributes n1,n2,n3,n4 must be numbers."));
    }

    var parsedAttributes = "";
    for(var prop in attributes) {
        if( (prop=="s1"||prop=="s2"||prop=="s3"||prop=="s4"||prop=="s5"||prop=="s6"||prop=="n1"||prop=="n2"||prop=="n3"||prop=="n4") && attributes[prop] != null ) {
            parsedAttributes += "[";
            parsedAttributes += prop;
            parsedAttributes += "=";
            parsedAttributes += escape(attributes[prop]);
            parsedAttributes += "]";
        }
    }
    exec(null, null, "AppMobiCloud", "setPushUserAttributes", [parsedAttributes]);
};

//Find Push User method
AppMobiCloud.Notification.prototype.findPushUser = function(userID, email) {
    exec(null, null, "AppMobiCloud", "findPushUser", [userID, email]);
};

//Refresh Push Notifications method
AppMobiCloud.Notification.prototype.refreshPushNotifications = function() {
    exec(null, null, "AppMobiCloud", "refreshPushNotifications", []);
};

//Refresh User Push Notifications method
AppMobiCloud.Notification.prototype.refreshUserPushNotifications = function(user, pass, device, newerthan) {
    exec(null, null, "AppMobiCloud", "refreshUserPushNotifications", [user, pass, device, newerthan]);
};

//Read Push Notifications method
AppMobiCloud.Notification.prototype.readPushNotifications = function(notificationIDs) {
    if( notificationIDs == undefined || notificationIDs == "")
    {
    throw(new Error("Error: AppMobiCloud.notification.readPushNotifications, No notificationIDs specified."));
    }
    exec(null, null, "AppMobiCloud", "readPushNotifications", [notificationIDs]);
};

//Delete Push Notifications method
AppMobiCloud.Notification.prototype.deletePushNotifications = function(notificationIDs) {
    if( notificationIDs == undefined || notificationIDs == "")
    {
    throw(new Error("Error: AppMobiCloud.notification.deletePushNotifications, No notificationIDs specified."));
    }
    exec(null, null, "AppMobiCloud", "readPushNotifications", [notificationIDs]);
};

//Send Push Notifications method
AppMobiCloud.Notification.prototype.sendPushNotification = function(userID, message, data) {
    if( userID  == undefined || userID  == "" ||
      message == undefined || message == "" )
    {
    throw(new Error("Error: AppMobiCloud.notification.sendPushNotification, No user or message specified."));
    }

    if( typeof( data ) != "string" ) data = "";	
    if( message.length > 1024 ) throw(new Error("Error: AppMobiCloud.notification.sendPushNotification, message cannot exceed 1024 characters in length."));
    if( data.length > 1024 ) throw(new Error("Error: AppMobiCloud.notification.sendPushNotification, data cannot exceed 1024 characters in length."));

    exec(null, null, "AppMobiCloud", "sendPushNotification", [userID, message, data]);
};

//Broadcast Push Notifications method
AppMobiCloud.Notification.prototype.broadcastPushNotification = function(message, data, attributes, skip) {
    if( message == undefined || message == "" )
    {
    throw(new Error("Error: AppMobiCloud.notification.broadcastPushNotification, No message specified."));
    }

    if( typeof( data ) != "string" ) data = "";	
    if( message.length > 1024 ) throw(new Error("Error: AppMobiCloud.notification.broadcastPushNotification, message cannot exceed 1024 characters in length."));
    if( data.length > 1024 ) throw(new Error("Error: AppMobiCloud.notification.broadcastPushNotification, data cannot exceed 1024 characters in length."));

    exec(null, null, "AppMobiCloud", "broadcastPushNotification", [message, data, attributes, skip]);
};
 
//Broadcast Push Notifications method
AppMobiCloud.Notification.prototype.alert = function(message, title, button) {
    exec(null, null, "AppMobiCloud", "alert", [message, title,button]);
};
 
 //Run promotion
AppMobiCloud.Advertising.prototype.runPromotion = function(appname, storelink, promoID, protocol, Adpackage, query) {
   exec(null, null, "AppMobiCloud","runPromotion",[appname,storelink,promoID,protocol,Adpackage,query]);
};
 

if (typeof AppMobiCloud.notification == "undefined")
    AppMobiCloud.notification = new AppMobiCloud.Notification();
	
	
    /**
     * This class provides access to live update on the device.
     */
    AppMobiCloud.Device = function() {
    };
   
    if (typeof AppMobiCloud.device == "undefined")
        AppMobiCloud.device = new AppMobiCloud.Device();
               
    //Live update - installUpdate
    AppMobiCloud.Device.prototype.installUpdate = function() {
        exec(null, null, "AppMobiCloud","installUpdate",[]);
    };	
	
	/**
     * This class provides access to secure data storage on the device.
     */
    AppMobiCloud.securedData = [];
    
    AppMobiCloud.SecureData = function() {
    };
    
    if (typeof AppMobiCloud.secureData == "undefined")
        AppMobiCloud.secureData = new AppMobiCloud.SecureData();
    
    
    AppMobiCloud.SecureData.prototype.saveData = function(key, data,isMasterData,saveToServer) {
        exec(null, null, "AppMobiCloud","saveSecureData",[key, data,isMasterData, saveToServer]);
    };
    
    AppMobiCloud.SecureData.prototype.syncData = function() {
        exec(null, null, "AppMobiCloud","syncSecureData",[]);
    };
    
    AppMobiCloud.SecureData.prototype.readData = function(key,isMasterData) {
        exec(null, null, "AppMobiCloud","readSecureData",[key,isMasterData]);
    };
    
    //Get Secure Data List
    AppMobiCloud.SecureData.prototype.getSecureDataList = function(){
        var secureList = [];
        for(var secureData in AppMobiCloud.securedData) {
            secureList.push(AppMobiCloud.securedData[secureData].id);
        }
        return secureList;
    };
    
    //Get Secure Data
    AppMobiCloud.SecureData.prototype.getSecureData = function(id) {
        var local = null;
        for(var secureData in AppMobiCloud.securedData) {
            if(id==AppMobiCloud.securedData[secureData].id) {
                local = {};
                local.id = AppMobiCloud.securedData[secureData].id;
                local.key = AppMobiCloud.securedData[secureData].key;
                local.value = AppMobiCloud.securedData[secureData].value;
                break;
            }
        }
        return local;
    };
	
   /**
    * This class provides OAuth login on the device.
    */
   
   AppMobiCloud.OAuth = function() {
   };
   
   if (typeof AppMobiCloud.oauth == "undefined")
       AppMobiCloud.oauth = new AppMobiCloud.OAuth();
   
   //OAuth provider list
   AppMobiCloud.OAuth.providers = [];
   
   AppMobiCloud.OAuth.prototype.registerOAuth = function(token,provider) {
       exec(null, null, "AppMobiCloud","registerOAuth",[token,provider]);
   };

               
   //Get OAuth Data List
   AppMobiCloud.OAuth.prototype.getOAuthDataList = function(){
       var oAuthList = [];
       for(var oAuthData in AppMobiCloud.OAuth.providers) {
           oAuthList.push(AppMobiCloud.OAuth.providers[oAuthData]);
       }
       return oAuthList;
   };
}
catch(e) {
    alert("error in appmobicloud.js : "+e.message);
}

