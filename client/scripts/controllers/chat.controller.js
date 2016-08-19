import Ionic from 'ionic-scripts';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats, Messages } from '../../../lib/collections';
 
export default class ChatCtrl extends Controller {
  constructor() {
    super(...arguments);
 
    this.chatId = this.$stateParams.chatId;
    this.isIOS = Ionic.Platform.isWebView() && Ionic.Platform.isIOS();
    this.isCordova = Meteor.isCordova;
 
    this.helpers({
	  messages() {
	    return Messages.find({ chatId: this.chatId });
      },
      data() {
        return Chats.findOne(this.chatId);
      }
    });
  }
}

  sendMessage = function() {
	if (_.isEmpty(this.message)) return;
 
    this.callMethod('newMessage', {
      text: this.message,
      type: 'text',
      chatId: this.chatId
    });
 
    delete this.message;
  };

  inputUp = function () {
    if (this.isIOS) {
      this.keyboardHeight = 216;
    }
 
    this.scrollBottom(true);
  };
 
  inputDown = function() {
    if (this.isIOS) {
      this.keyboardHeight = 0;
    }
 
    this.$ionicScrollDelegate.$getByHandle('chatScroll').resize();
  };
 
  closeKeyboard = function () {
    if (this.isCordova) {
      cordova.plugins.Keyboard.close();
    }
  };
 
  scrollBottom = function(animate) {
    this.$timeout(() => {
      this.$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
    }, 300);
  };

ChatCtrl.$inject = ['$stateParams', '$timeout', '$ionicScrollDelegate'];
