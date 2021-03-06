define([
  'text!js/templates/user/userProfile.html'
, 'js/models/user/user'
], function( userProfileTemplate, UserModel ) {
  var UserProfileView = Backbone.View.extend({
    className: 'user-profile'
  , template: _.template( userProfileTemplate )
  , initialize: function( options ) {
      this.App = options.App;

      this.model = new UserModel({
        username: options.username
      });
    }
  , events: {
      'click .btn--add-friend.btn--positive': 'requestAddFriend'
    }
  , render: function() {
      var self = this;
      this.model.fetch({
        error: function( model, res, options ) {
          console.log( res );
        }
      , success: function( model, res, options ) {
          var attributes = _.clone( model.attributes )
            , friends = self.model.get( 'friends' )
            , friendRequestsReceived = self.model.get( 'friendRequests' ).received
            , activeUserId = self.App.Views.root.model.get( '_id' )
            , profileUserId = self.model.get( '_id' );

          var areFriends = _.contains( friends, activeUserId )
            , sentFriendRequest = _.contains( friendRequestsReceived, activeUserId );

          attributes.isFriendable = ( !areFriends && !sentFriendRequest );
          self.$el.html( self.template( attributes ) );
        }
      });
    }
  , requestAddFriend: function() {
      var self = this;
      this.App.socket.emit('request:addFriend', {
        requesteeId: self.model.get( '_id' )
      , requesterId: self.App.Views.root.model.get( '_id' )
      });
      this.App.socket.on('processed:addFriend', function() {
        console.log( 'add friend request successfully sent' );
        self.render();
        self.App.Views.root.model.fetch();
        console.log( 'logged-in user\'s model...', self.App.Views.root.model );
      });
    }
  });

  return UserProfileView;
});
